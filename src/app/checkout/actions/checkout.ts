// src/app/checkout/actions/checkout.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ShippingAddress, CheckoutFormData, Cart } from '../types/checkout';

interface CashfreeSessionData {
  amount: number;
  customerEmail: string;
  customerPhone: string;
  orderId: string;
}

interface CODOrderData {
  customer: { email: string };
  shippingAddress: ShippingAddress;
  items: Cart['items'];
  subtotal: number;
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

  // Process based on payment method
  switch (formData.paymentMethod) {
    case 'cashfree':
      // Create Cashfree payment session
      const paymentSession = await createCashfreeSession({
        amount: cart.subtotal,
        customerEmail: formData.email,
        customerPhone: formData.shippingAddress.phone,
        orderId: generateOrderId()
      });

      // Store order info in session before redirect
      await storePendingOrder(formData, cart);

      // Redirect to Cashfree
      redirect(paymentSession.paymentUrl);

    case 'cod':
      // Create COD order
      const order = await createCODOrder({
        customer: { email: formData.email },
        shippingAddress: formData.shippingAddress,
        items: cart.items,
        subtotal: cart.subtotal
      });

      // Clear cart
      await clearCart();

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

async function storePendingOrder(formData: CheckoutFormData, cart: Cart): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('pending_order', JSON.stringify({
    ...formData,
    cart,
    timestamp: Date.now()
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

async function clearCart(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('cart');
}

function generateOrderId(): string {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
}

async function createCashfreeSession(data: CashfreeSessionData): Promise<{ paymentUrl: string }> {
  // Implement Cashfree API integration
  // This would call your backend API or Cashfree directly
  return {
    paymentUrl: `https://pay.cashfree.com/links/${data.orderId}`
  };
}

async function createCODOrder(data: CODOrderData): Promise<{ id: string }> {
  // Implement COD order creation
  // This would save to your database
  return {
    id: generateOrderId()
  };
}