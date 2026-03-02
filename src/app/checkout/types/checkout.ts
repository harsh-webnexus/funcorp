// app/checkout/types/checkout.ts

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  vendor: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
}

export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CheckoutFormData {
  email?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: 'cashfree' | 'cod' | 'card' | 'upi';
  saveInfo?: boolean;
}

export interface UserData {
  email: string;
  name: string;
  phone?: string;
}

export interface Order {
  id: string;
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
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  estimatedDelivery?: string;
}

export interface PendingOrderData {
  formData: CheckoutFormData;
  cart: Cart;
  totals: {
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
  };
  userData: UserData | null;
  timestamp: number;
}