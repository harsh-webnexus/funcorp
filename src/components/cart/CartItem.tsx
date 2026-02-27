'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CartItem as CartItemType } from '@/hooks/useCart'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: number, quantity: number) => Promise<void>
  onRemove: (id: number) => Promise<void>
  isUpdating: boolean
}

export default function CartItem({ item, onUpdateQuantity, onRemove, isUpdating }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    await onUpdateQuantity(item.id, newQuantity)
  }

  // Mock data - replace with actual data from your API
  const originalPrice = item.price * 2 // Example: showing original price before discount
  const hasDiscount = originalPrice > item.price

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/product/${item.id}`} className="flex-shrink-0">
            <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1">
            <Link href={`/product/${item.id}`} className="hover:text-[#E9454D]">
              <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">{item.vendor}</p>
            
            {/* Variant */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">New</span>
              <button className="text-gray-400 hover:text-[#E9454D]">
                <svg className="w-4 h-4" viewBox="0 0 576 512">
                  <path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6z"></path>
                </svg>
              </button>
            </div>

            {/* Price and Quantity - Mobile */}
            <div className="flex items-center justify-between mt-3">
              <div>
                {hasDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#E9454D]">₹{item.price}</span>
                    <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
                  </div>
                ) : (
                  <span className="font-bold">₹{item.price}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || isUpdating}
                    className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={isUpdating}
                    className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  disabled={isUpdating}
                  className="text-gray-400 hover:text-[#E9454D] disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="currentColor" d="M38.98 6.97l-14.98 14.98-14.98-14.98-2.02 2.02 14.98 14.98-14.98 14.98 2.02 2.02 14.98-14.98 14.98 14.98 2.02-2.02-14.98-14.98 14.98-14.98z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
        {/* Product Info (6 cols) */}
        <div className="col-span-6">
          <div className="flex items-center gap-4">
            <Link href={`/product/${item.id}`} className="flex-shrink-0">
              <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div>
              <Link href={`/product/${item.id}`} className="hover:text-[#E9454D]">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
              </Link>
              <p className="text-sm text-gray-500">{item.vendor}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">New</span>
                <button className="text-gray-400 hover:text-[#E9454D]">
                  <svg className="w-4 h-4" viewBox="0 0 576 512">
                    <path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price (2 cols) */}
        <div className="col-span-2 text-center">
          {hasDiscount ? (
            <div>
              <span className="font-bold text-[#E9454D]">₹{item.price}</span>
              <span className="block text-sm text-gray-400 line-through">₹{originalPrice}</span>
            </div>
          ) : (
            <span className="font-bold">₹{item.price}</span>
          )}
        </div>

        {/* Quantity (2 cols) */}
        <div className="col-span-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
                className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isUpdating}
                className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Total (2 cols) */}
        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <span className="font-bold">₹{item.price * quantity}</span>
            <button
              onClick={() => onRemove(item.id)}
              disabled={isUpdating}
              className="text-gray-400 hover:text-[#E9454D] disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="currentColor" d="M38.98 6.97l-14.98 14.98-14.98-14.98-2.02 2.02 14.98 14.98-14.98 14.98 2.02 2.02 14.98-14.98 14.98 14.98 2.02-2.02-14.98-14.98 14.98-14.98z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}