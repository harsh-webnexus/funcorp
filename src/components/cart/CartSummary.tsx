'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { useEffect } from 'react'

export default function CartSummary() {
  const { items, totalPrice, totalItems } = useCart()
  
  // Debug logs
  useEffect(() => {
    // console.log('CartSummary - items:', items)
    // console.log('CartSummary - totalPrice:', totalPrice)
    // console.log('CartSummary - totalItems:', totalItems)
  }, [items, totalPrice, totalItems])
  
  const subtotal = totalPrice
  const grandTotal = subtotal

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
      <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>
      
      <div className="space-y-3 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-sm">Calculated at checkout</span>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
          <span>Total:</span>
          <span className="text-[#E9454D]">₹{grandTotal}</span>
        </div>

        {/* Items count */}
        <p className="text-xs text-gray-500">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => window.location.href = '/checkout'}
        className="w-full bg-[#E9454D] text-white py-3 font-bold hover:bg-[#d13a42] transition-colors rounded-md mb-3"
      >
        Proceed To Checkout
      </button>

      {/* Continue Shopping Button */}
      <Link
        href="/"
        className="block w-full text-center border-2 border-[#E9454D] text-[#E9454D] py-3 font-bold hover:bg-[#E9454D] hover:text-white transition-colors rounded-md mb-6"
      >
        Continue shopping
      </Link>

      {/* Payment Methods */}
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">We accept:</p>
        <div className="flex justify-center gap-2 flex-wrap">
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">Visa</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">Mastercard</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">UPI</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">COD</span>
        </div>
      </div>
    </div>
  )
}