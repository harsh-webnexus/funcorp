'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ParentCollection {
  id: string
  name: string
  href: string
}
interface CollectionHeaderProps {
  title: string
  description?: string
  bannerImage?: string
  subCollections?: {
    name: string
    href: string
    image?: string
  }[]
  parentCollection?: ParentCollection  // Add this
}


export default function CollectionHeader({ 
  title, 
  description, 
  bannerImage,
  subCollections 
}: CollectionHeaderProps) {
  return (
    <div className="collection-header">
      {bannerImage && (
        <div className="collection-banner">
          <div className="relative h-48 md:h-64 lg:h-80 w-full">
            <Image
              src={bannerImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      
      <div className="container-custom py-6 md:py-8">
        <div className="collection-content">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E9454D] uppercase mb-2">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 max-w-3xl mx-auto md:mx-0">
                {description}
              </p>
            )}
          </div>

          {subCollections && subCollections.length > 0 && (
            <div className="sub-collection-wrapper mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#232323]">Shop by Category</h3>
                <button className="text-sm text-[#E9454D] hover:underline">
                  Show More
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {subCollections.map((sub, index) => (
                  <Link key={index} href={sub.href} className="group">
                    <div className="text-center">
                      {sub.image && (
                        <div className="relative aspect-square w-full mb-2 overflow-hidden rounded-lg">
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <span className="text-sm font-medium text-[#232323] group-hover:text-[#E9454D]">
                        {sub.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}