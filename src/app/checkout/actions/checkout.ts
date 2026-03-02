'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { 
  ShippingAddress, 
  CheckoutFormData, 
  Cart, 
  CartItem,
  Order,
  PendingOrderData,
  UserData 
} from '../types/checkout';

interface CashfreeSessionData {
  amount: number;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  orderId: string;
  orderItems: CartItem[];
}

interface CashfreeOrderItem {
  name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
}

interface CashfreeCustomerDetails {
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

interface CashfreeOrderData {
  order_id: string;
  order_amount: number;
  order_currency: string;
  order_note: string;
  customer_details: CashfreeCustomerDetails;
  order_meta: {
    return_url: string;
    notify_url: string;
    payment_methods: string;
  };
  order_items: CashfreeOrderItem[];
}

interface OrderTotals {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

interface CODOrderData {
  customer: { 
    email: string;
    name: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  orderDate: string;
}

export async function validateAddress(address: ShippingAddress) {
  // Validate Indian PIN code (6 digits)
  const pinCodeRegex = /^\d{6}$/;
  if (!pinCodeRegex.test(address.postalCode)) {
    return { error: 'Please enter a valid 6-digit PIN code' };
  }

  // Validate phone number (10 digits)
  const phoneRegex = /^\d{10}$/;
  const cleanPhone = address.phone.replace(/\D/g, '');
  if (!phoneRegex.test(cleanPhone)) {
    return { error: 'Please enter a valid 10-digit phone number' };
  }

  // Validate required fields
  if (!address.address || !address.city || !address.state) {
    return { error: 'Please fill in all required address fields' };
  }

  return { success: true };
}

export async function processPayment(formData: CheckoutFormData) {
  // Get cookies - need to await in Next.js 15
  const cookieStore = await cookies();
  
  // Validate cart exists
  const cart = await getCartFromSession();
  if (!cart || cart.items.length === 0) {
    return { error: 'Your cart is empty' };
  }

  // Validate shipping address
  const addressValidation = await validateAddress(formData.shippingAddress);
  if ('error' in addressValidation) {
    return addressValidation;
  }

  // Calculate totals
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 500 ? 0 : 40; // Free shipping above ₹500
  const tax = Math.round(subtotal * 0.18 * 100) / 100; // 18% GST rounded to 2 decimals
  const total = Math.round((subtotal + shippingCost + tax) * 100) / 100;

  // Get user data if logged in
  const userData = await getUserData();

  // Process based on payment method
  switch (formData.paymentMethod) {
    case 'cashfree':
      // Create Cashfree payment session
      const paymentSession = await createCashfreeSession({
        amount: total,
        customerEmail: formData.email || userData?.email || '',
        customerPhone: formData.shippingAddress.phone,
        customerName: `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`.trim() || userData?.name || 'Customer',
        orderId: generateOrderId(),
        orderItems: cart.items
      });

      // Store order info in session before redirect
      await storePendingOrder({
        formData,
        cart,
        totals: { subtotal, shippingCost, tax, total },
        userData,
        timestamp: Date.now()
      });

      // Redirect to Cashfree
      redirect(paymentSession.paymentUrl);

    case 'cod':
      // Create COD order
      const order = await createCODOrder({
        customer: { 
          email: formData.email || userData?.email || '',
          name: `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`.trim() || userData?.name || 'Guest Customer',
          phone: formData.shippingAddress.phone
        },
        shippingAddress: formData.shippingAddress,
        items: cart.items,
        subtotal,
        shippingCost,
        tax,
        total,
        orderDate: new Date().toISOString()
      });

      // Store order in database/localStorage
      await saveOrder(order);

      // Clear cart
      await clearCart();

      // Store order ID in cookie for thank you page
      cookieStore.set('last_order', order.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 // 1 hour
      });

      // Redirect to thank you page
      redirect(`/order-confirmation/${order.id}`);

    default:
      return { error: 'Invalid payment method' };
  }
}

// Helper functions
async function getCartFromSession(): Promise<Cart | null> {
  try {
    const cookieStore = await cookies();
    const cartData = cookieStore.get('cart');
    
    if (!cartData) {
      return null;
    }
    
    return JSON.parse(cartData.value) as Cart;
  } catch (error) {
    console.error('Error parsing cart data:', error);
    return null;
  }
}

async function getUserData(): Promise<UserData | null> {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get('user_data');
    
    if (!userData) {
      return null;
    }
    
    return JSON.parse(userData.value) as UserData;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

async function storePendingOrder(data: PendingOrderData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('pending_order', JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

async function saveOrder(order: Order): Promise<void> {
  try {
    const cookieStore = await cookies();
    
    // Get existing orders
    const existingOrders = cookieStore.get('orders');
    const orders: Order[] = existingOrders ? JSON.parse(existingOrders.value) : [];
    
    // Add new order
    orders.push(order);
    
    // Save back to cookie
    cookieStore.set('orders', JSON.stringify(orders), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
  } catch (error) {
    console.error('Error saving order:', error);
  }
}

async function clearCart(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('cart');
}

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

async function createCashfreeSession(data: CashfreeSessionData): Promise<{ paymentUrl: string }> {
  // Cashfree API integration
  const CASHFREE_API_URL = process.env.CASHFREE_API_URL || 'https://api.cashfree.com/pg';
  const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
  const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

  try {
    // Prepare order data for Cashfree
    const orderData: CashfreeOrderData = {
      order_id: data.orderId,
      order_amount: data.amount,
      order_currency: 'INR',
      order_note: 'Order from FunCorp',
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/cashfree/return`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/cashfree/webhook`,
        payment_methods: 'cc,dc,upi,nb',
      },
      order_items: data.orderItems.map(item => ({
        name: item.title,
        quantity: item.quantity,
        unit_price: item.price,
        total_amount: item.price * item.quantity
      }))
    };

    // For demo purposes, return a mock URL
    console.log('Cashfree order data:', orderData);
    
    return {
      paymentUrl: `https://pay.cashfree.com/links/${data.orderId}`
    };
  } catch (error) {
    console.error('Error creating Cashfree session:', error);
    throw new Error('Failed to create payment session');
  }
}

async function createCODOrder(data: CODOrderData): Promise<Order> {
  const orderId = generateOrderId();
  
  const order: Order = {
    id: orderId,
    customer: data.customer,
    shippingAddress: data.shippingAddress,
    items: data.items,
    subtotal: data.subtotal,
    shippingCost: data.shippingCost,
    tax: data.tax,
    total: data.total,
    orderDate: data.orderDate,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'processing',
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days later
  };

  // Save order to database/localStorage
  await saveOrder(order);

  return order;
}

// Additional utility functions
export async function getShippingCost(pincode: string): Promise<number> {
  // Implement pincode-based shipping cost logic
  const pincodePrefix = parseInt(pincode.substring(0, 3));
  
  // Example logic: Different zones have different shipping costs
  if (pincodePrefix >= 700 && pincodePrefix <= 799) {
    return 40; // Zone 1
  } else if (pincodePrefix >= 800 && pincodePrefix <= 899) {
    return 60; // Zone 2
  } else {
    return 80; // Rest of India
  }
}

export async function calculateTax(subtotal: number): Promise<number> {
  // Calculate GST (18% for most items)
  return Math.round(subtotal * 0.18 * 100) / 100;
}

export async function validatePincode(pincode: string): Promise<{ isValid: boolean; message?: string }> {
  const pinCodeRegex = /^\d{6}$/;
  
  if (!pinCodeRegex.test(pincode)) {
    return { isValid: false, message: 'Please enter a valid 6-digit PIN code' };
  }

  return { isValid: true };
}