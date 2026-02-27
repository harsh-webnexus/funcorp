'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import CartItem from './CartItem'

export default function CartItems() {
  const { items, updateQuantity, removeFromCart } = useCart()
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  // Handler with proper types
  const handleUpdateQuantity = async (id: number, quantity: number): Promise<void> => {
    setUpdatingId(id)
    await updateQuantity(id, quantity)
    setUpdatingId(null)
  }

  // Handler with proper types
  const handleRemove = async (id: number): Promise<void> => {
    setUpdatingId(id)
    await removeFromCart(id)
    setUpdatingId(null)
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-gray-500 mb-4">Your cart is empty</div>
        <Link 
          href="/" 
          className="text-[#E9454D] hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Cart Header - Desktop Only */}
      <div className="hidden lg:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-center">Total</div>
      </div>

      {/* Cart Items List */}
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
            isUpdating={updatingId === item.id}
          />
        ))}
      </div>

      {/* Note about gift wrap (from original) */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 hidden" id="is-a-gift">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" aria-hidden="true" focusable="false" viewBox="0 0 512 512">
              <path fill="currentColor" d="M464 144h-39.3c9.5-13.4 15.3-29.9 15.3-48 0-44.1-33.4-80-74.5-80-42.3 0-66.8 25.4-109.5 95.8C213.3 41.4 188.8 16 146.5 16 105.4 16 72 51.9 72 96c0 18.1 5.8 34.6 15.3 48H48c-26.5 0-48 21.5-48 48v96c0 8.8 7.2 16 16 16h16v144c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304h16c8.8 0 16-7.2 16-16v-96c0-26.5-21.5-48-48-48z"></path>
            </svg>
            <span className="text-sm">DO YOU WANT A GIFT WRAP? <span className="font-bold">ONLY FOR ₹50 (per item)</span></span>
          </div>
          <button className="bg-[#E9454D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#d13a42]">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}