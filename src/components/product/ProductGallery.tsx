'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ProductGalleryProps {
  images: string[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div className="productView-images-wrapper">
      {/* Main Image */}
      <div className="productView-image-wrapper">
        <div className="productView-badge badge-left">
          {/* Add badges here if needed */}
        </div>
        
        <div className="productView-nav">
          <div 
            className="productView-image productView-image-square cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          >
            <div className="productView-img-container">
              <div className="media">
                <Image
                  id="product-featured-image"
                  src={images[selectedImage]}
                  alt={title}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Zoom Icon */}
        <div className="productView-iconZoom">
          <svg className="icon icon-zoom-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20}>
            <path d="M416 176V86.63L246.6 256L416 425.4V336c0-8.844 7.156-16 16-16s16 7.156 16 16v128c0 8.844-7.156 16-16 16h-128c-8.844 0-16-7.156-16-16s7.156-16 16-16h89.38L224 278.6L54.63 448H144C152.8 448 160 455.2 160 464S152.8 480 144 480h-128C7.156 480 0 472.8 0 464v-128C0 327.2 7.156 320 16 320S32 327.2 32 336v89.38L201.4 256L32 86.63V176C32 184.8 24.84 192 16 192S0 184.8 0 176v-128C0 39.16 7.156 32 16 32h128C152.8 32 160 39.16 160 48S152.8 64 144 64H54.63L224 233.4L393.4 64H304C295.2 64 288 56.84 288 48S295.2 32 304 32h128C440.8 32 448 39.16 448 48v128C448 184.8 440.8 192 432 192S416 184.8 416 176z"/>
          </svg>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="productView-thumbnail-wrapper">
          <div className="productView-for flex gap-2 mt-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`productView-thumbnail flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden ${
                  selectedImage === index ? 'border-[#E9454D]' : 'border-transparent'
                }`}
              >
                <div className="productView-thumbnail-link h-full">
                  <Image
                    src={image}
                    alt={`${title} - View ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map(src => ({ src }))}
        index={selectedImage}
      />
    </div>
  )
}