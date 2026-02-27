'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa'
import { useCart } from '@/hooks/useCart'

interface ProductCardProps {
  product: {
    id: number
    title: string
    price: number
    comparePrice?: number | null
    image: string
    vendor: string
    badge?: string
    sku?: string
  }
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const router = useRouter()
  const { addToCart } = useCart()
  
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    
    // Add product to cart with quantity 1
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      vendor: product.vendor,
      sku: product.sku
    }, 1)
    
    // Simulate a small delay for better UX, then redirect to cart
    setTimeout(() => {
      router.push('/cart')
    }, 300)
  }

  // List View
  if (viewMode === 'list') {
    return (
      <div className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="relative w-full md:w-48 h-48">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
              />
            </Link>
            
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-[#E9454D] text-white text-xs px-2 py-1">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <Link href={`/vendor/${product.vendor}`} className="text-sm text-gray-500 hover:text-[#E9454D]">
              {product.vendor}
            </Link>
            
            <Link href={`/product/${product.id}`}>
              <h3 className="text-lg font-medium mt-1 mb-2 hover:text-[#E9454D]">
                {product.title}
              </h3>
            </Link>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {/* Add product description here if available */}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-[#232323]">₹{product.price}</span>
              {product.comparePrice && (
                <span className="text-lg text-gray-400 line-through">₹{product.comparePrice}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 bg-[#E9454D] text-white py-3 font-bold hover:bg-[#232323] transition-colors flex items-center justify-center gap-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingCart />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
                <FaEye />
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-3 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <FaHeart className={isWishlisted ? 'fill-[#E9454D]' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View
  return (
    <div 
      className="group bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square mb-4">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </Link>
        
        {/* Quick actions on hover */}
        {isHovered && (
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#E9454D] hover:text-white transition-colors"
            >
              <FaHeart className={isWishlisted ? 'fill-[#E9454D]' : ''} />
            </button>
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#E9454D] hover:text-white transition-colors">
              <FaEye />
            </button>
          </div>
        )}
        
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#E9454D] text-white text-xs px-2 py-1">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="text-center">
        <Link href={`/vendor/${product.vendor}`} className="text-xs text-gray-500 hover:text-[#E9454D]">
          {product.vendor}
        </Link>
        
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium mt-1 mb-2 line-clamp-2 hover:text-[#E9454D]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-lg font-bold text-[#232323]">₹{product.price}</span>
          {product.comparePrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.comparePrice}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-[#E9454D] text-white py-2 font-bold hover:bg-[#232323] transition-colors flex items-center justify-center gap-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaShoppingCart />
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}