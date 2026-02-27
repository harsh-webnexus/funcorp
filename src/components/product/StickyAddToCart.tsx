'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image'
import { Product } from '@/lib/types'

interface ProductInfoProps {
  product: Product // Use proper type instead of any
}

export default function StickyAddToCart({ product }: ProductInfoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const productForm = document.querySelector('.productView-buttons')
      if (productForm) {
        const productFormBottom = productForm.getBoundingClientRect().bottom + window.scrollY
        setIsVisible(scrollPosition > productFormBottom - 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transform transition-transform">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h3 className="text-sm font-medium line-clamp-1">{product.title}</h3>
              <p className="text-lg font-bold text-[#232323]">₹{product.price}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Quantity */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:text-gray-900"
              >
                -
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:text-gray-900"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product, quantity)}
              className="bg-[#00b300] text-white px-6 py-2 font-medium hover:bg-[#fccf39] hover:text-[#E9454D] transition-colors rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}