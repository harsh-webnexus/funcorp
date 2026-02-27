// src/app/checkout/types/checkout.ts
export interface Customer {
  email: string;
  isLoggedIn: boolean;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  vendor: string;
  sku: string;
  condition: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zone: string;
  postalCode: string;
  phone: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  brands?: string[];
  description?: string;
  instructions?: string;
}

export interface CheckoutFormData {
  email: string;
  marketingOptIn: boolean;
  smsOptIn: boolean;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  billingSameAsShipping: boolean;
  billingAddress?: ShippingAddress;
}

// Type guard for validation result
export type ValidationResult = 
  | { success: true }
  | { error: string };