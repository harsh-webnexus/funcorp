'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useMemo } from 'react';
import { Cart, CartItem } from '../types/checkout';

// Define the type for items from useCart hook (matching what the hook actually returns)
interface UseCartItem {
  id: string | number;  // id can be string or number
  name?: string;
  title?: string;
  price: number;
  quantity: number;
  image?: string;
  vendor?: string;
}

export default function OrderSummary() {
  const { items, totalPrice, totalItems } = useCart();
  
  // Transform cart data to match the Cart type from checkout
  const cartData = useMemo<Cart | null>(() => {
    if (!items || items.length === 0) {
      return null;
    }

    // Transform each item to match CartItem type
    const transformedItems: CartItem[] = items.map((item: UseCartItem) => ({
      id: String(item.id), // Convert id to string to match CartItem type
      title: item.title || item.name || 'Product',
      price: item.price || 0,
      quantity: item.quantity || 1,
      image: item.image || '/placeholder-image.jpg',
      vendor: item.vendor || 'FunCorp'
    }));

    // Calculate subtotal from items if totalPrice is not available
    const calculatedSubtotal = transformedItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );

    return {
      items: transformedItems,
      subtotal: totalPrice || calculatedSubtotal,
      total: totalPrice || calculatedSubtotal,
      itemCount: totalItems || transformedItems.length
    };
  }, [items, totalPrice, totalItems]);

  // Show loading state if cart data is not ready
  if (!cartData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      {/* Cart Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cartData.items.length > 0 ? (
          cartData.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.image || '/placeholder-image.jpg'}
                  alt={item.title || 'Product'}
                  fill
                  className="object-cover rounded-md"
                />
                <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {item.quantity || 1}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm text-gray-800 line-clamp-2">{item.title || 'Product'}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.vendor || 'FunCorp'}</p>
              </div>
              
              <div className="text-sm font-medium text-gray-900">
                ₹{item.price.toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No items in cart</p>
        )}
      </div>

      {/* Cost Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({cartData.itemCount} items)</span>
          <span className="font-medium">₹{cartData.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-500">Calculated at next step</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{cartData.total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Including estimated taxes
          </p>
        </div>
      </div>

      {/* Secure Checkout Notice */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure checkout</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Your payment information is encrypted and secure
        </p>
      </div>
    </div>
  );
}