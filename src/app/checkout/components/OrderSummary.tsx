// src/app/checkout/components/OrderSummary.tsx
import Image from 'next/image';
import { Cart } from '../types/checkout';

interface Props {
  cart: Cart;
}

export default function OrderSummary({ cart }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-md"
              />
              <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm text-gray-800 line-clamp-2">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.condition}</p>
            </div>
            
            <div className="text-sm font-medium text-gray-900">
              ₹{item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({cart.itemCount} items)</span>
          <span className="font-medium">₹{cart.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-500">Enter shipping address</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{cart.subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Including ₹0.00 in taxes
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
      </div>
    </div>
  );
}