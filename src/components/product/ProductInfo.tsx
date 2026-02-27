'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/lib/types'

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState('New')
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const router = useRouter()
  const { addToCart } = useCart()

  // Fixed: Add proper null checks for comparePrice
  const hasOldPrice = product.comparePrice != null && product.comparePrice > product.price
  
  // Fixed: Only calculate discount if comparePrice exists
  const discount = hasOldPrice && product.comparePrice != null
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    
    // Add product to cart with selected quantity
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      vendor: product.vendor,
      sku: product.sku
    }, quantity)
    
    // Small delay for better UX, then redirect to cart
    setTimeout(() => {
      router.push('/cart')
    }, 300)
  }

  return (
    <div className="productView-product">
      {/* Title */}
      <h1 className="productView-title text-2xl md:text-3xl font-bold text-[#232323] mb-4">
        {product.title}
      </h1>

      {/* Vendor & SKU Info */}
      <div className="productView-info space-y-2 mb-4">
        <div className="productView-info-item flex gap-2">
          <span className="productView-info-name text-gray-500 min-w-[80px]">Vendor:</span>
          <span className="productView-info-value">
            <Link href={`/collections/${product.vendor.toLowerCase()}`} className="hover:text-[#E9454D]">
              {product.vendor}
            </Link>
          </span>
        </div>
        <div className="productView-info-item flex gap-2">
          <span className="productView-info-name text-gray-500 min-w-[80px]">SKU:</span>
          <span className="productView-info-value">{product.sku || `PROD-${product.id}`}</span>
        </div>
        <div className="productView-info-item flex gap-2">
          <span className="productView-info-name text-gray-500 min-w-[80px]">Country of Origin:</span>
          <span className="productView-info-value">Indonesia</span>
        </div>
      </div>

      {/* Old MRP Notice - from your page source */}
      {hasOldPrice && product.comparePrice != null && (
        <div className="product-customInformation bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="product-customInformation__content">
            <div className="product__text title">
              <h2 className="text-sm font-semibold text-blue-800">
                Old MRP (pre 22/09/25) - ₹{product.comparePrice}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Price */}
      <div className="productView-price mb-4">
        <div className="price price--medium">
          <div className="price__sale flex items-center gap-3">
            <span className="price-item price-item--sale text-3xl font-bold text-[#232323]">
              MRP ₹{product.price}
            </span>
            {hasOldPrice && product.comparePrice != null && (
              <>
                <span className="price-item price-item--regular text-gray-400 line-through">
                  MRP ₹{product.comparePrice}
                </span>
                {discount > 0 && (
                  <span className="bg-[#E9454D] text-white px-2 py-1 text-sm rounded">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Variant Selection - from your page source */}
      <div className="productView-options mb-6">
        <div className="productView-variants">
          <fieldset className="product-form__input mb-4">
            <legend className="form__label text-sm font-medium mb-2">
              Condition: <span className="text-[#E9454D]">{selectedVariant}</span>
            </legend>
            <div className="flex gap-2">
              {['New'].map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                    selectedVariant === variant
                      ? 'border-[#E9454D] bg-[#E9454D] text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Available Offers - from your page source */}
      <div className="product-customInformation border border-green-200 bg-green-50 rounded-lg p-4 mb-4">
        <div className="product-customInformation__content">
          <div className="product__text title flex items-center gap-2 mb-2">
            <h2 className="text-sm font-semibold text-green-800">Available Offers</h2>
          </div>
          <div className="product__text des text-sm text-green-700">
            <b>PAYMENT OFFER*</b>
            <li>Get upto ₹250 cashback on payment via <b>MobiKwik</b> wallet. Code MBK250.</li>
            <u className="text-xs"><b>*T&C Apply</b></u>
          </div>
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="productView-buttons mb-4">
        <div className="productView-group">
          <div className="pvGroup-row flex gap-4">
            {/* Quantity Selector */}
            <div className="productView-quantity">
              <div className="quantity__container flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-[#00b300] text-white py-3 px-6 font-bold hover:bg-[#fccf39] hover:text-[#E9454D] transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>

            {/* Wishlist Button */}
            <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:border-[#E9454D] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5">
                <path d="M 9.5 5 C 5.363281 5 2 8.402344 2 12.5 C 2 13.929688 2.648438 15.167969 3.25 16.0625 C 3.851563 16.957031 4.46875 17.53125 4.46875 17.53125 L 15.28125 28.375 L 16 29.09375 L 16.71875 28.375 L 27.53125 17.53125 C 27.53125 17.53125 30 15.355469 30 12.5 C 30 8.402344 26.636719 5 22.5 5 C 19.066406 5 16.855469 7.066406 16 7.9375 C 15.144531 7.066406 12.933594 5 9.5 5 Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Shipping Info - from your page source */}
      <div className="product-customInformation border border-gray-200 rounded-lg p-4">
        <div className="product-customInformation__content">
          <div className="product__text title flex items-center gap-2 mb-2">
            <h2 className="text-sm font-semibold">Free shipping on most prepaid orders over ₹699.</h2>
          </div>
          <div className="product__text des text-sm text-gray-600">
            <p>Delivery Time - 3 to 8 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}