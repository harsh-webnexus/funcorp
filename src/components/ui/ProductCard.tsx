'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaHeart, FaShoppingCart, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

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
    images?: string[] // Optional additional images
  }
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  // Prepare all images for the viewer
  const allImages = product.images && product.images.length > 0 
    ? [product.image, ...product.images] 
    : [product.image]
  
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const isWishlisted = isInWishlist(product.id)

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

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsWishlistLoading(true)
    
    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id)
      } else {
        await addToWishlist({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          vendor: product.vendor
        })
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
    } finally {
      setIsWishlistLoading(false)
    }
  }

  const handleOpenImageViewer = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowImageViewer(true)
    setCurrentImageIndex(0)
  }

  const handleCloseImageViewer = () => {
    setShowImageViewer(false)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    )
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    )
  }

  // List View
  if (viewMode === 'list') {
    return (
      <>
        <div className="group bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="relative w-full md:w-48 h-48">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain cursor-pointer"
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
                
                <button 
                  onClick={handleOpenImageViewer}
                  className="p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  title="View full screen"
                >
                  <FaEye />
                </button>
                
                <button 
                  onClick={handleWishlistToggle}
                  disabled={isWishlistLoading}
                  className={`p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 ${
                    isWishlisted ? 'bg-[#E9454D] border-[#E9454D] text-white hover:bg-[#d13a42]' : ''
                  }`}
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isWishlistLoading ? (
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FaHeart className={isWishlisted ? 'fill-white' : ''} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Screen Image Viewer Modal */}
        {showImageViewer && (
          <FullScreenImageViewer
            images={allImages}
            currentIndex={currentImageIndex}
            productTitle={product.title}
            onClose={handleCloseImageViewer}
            onPrev={handlePrevImage}
            onNext={handleNextImage}
          />
        )}
      </>
    )
  }

  // Grid View
  return (
    <>
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
              className="object-contain cursor-pointer"
            />
          </Link>
          
          {/* Quick actions on hover */}
          {isHovered && (
            <div className="absolute right-2 top-2 flex flex-col gap-2">
              <button 
                onClick={handleWishlistToggle}
                disabled={isWishlistLoading}
                className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#E9454D] hover:text-white transition-colors disabled:opacity-50 ${
                  isWishlisted ? 'bg-[#E9454D] text-white' : ''
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {isWishlistLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaHeart className={isWishlisted ? 'fill-white' : ''} />
                )}
              </button>
              
              <button 
                onClick={handleOpenImageViewer}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#E9454D] hover:text-white transition-colors"
                title="View full screen"
              >
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

      {/* Full Screen Image Viewer Modal */}
      {showImageViewer && (
        <FullScreenImageViewer
          images={allImages}
          currentIndex={currentImageIndex}
          productTitle={product.title}
          onClose={handleCloseImageViewer}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </>
  )
}

// Full Screen Image Viewer Component
function FullScreenImageViewer({ 
  images, 
  currentIndex, 
  productTitle,
  onClose, 
  onPrev, 
  onNext 
}: { 
  images: string[]
  currentIndex: number
  productTitle: string
  onClose: () => void
  onPrev: (e: React.MouseEvent) => void
  onNext: (e: React.MouseEvent) => void
}) {
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2"
        aria-label="Close"
      >
        <FaTimes size={24} />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Previous image"
        >
          <FaChevronLeft size={24} />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Next image"
        >
          <FaChevronRight size={24} />
        </button>
      )}

      {/* Image container */}
      <div 
        className="relative w-full h-full max-w-7xl max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`${productTitle} - Image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Thumbnail navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  // You can add a function to jump to specific image
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}