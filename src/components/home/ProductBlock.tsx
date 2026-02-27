'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { products } from '@/lib/data'

import 'swiper/css'
import 'swiper/css/navigation'

interface ProductBlockProps {
  title: string
  viewAllLink: string
  viewAllText: string
  collection: keyof typeof products
  bgColor?: string
}

export default function ProductBlock({ 
  title, 
  viewAllLink, 
  viewAllText, 
  collection,
  bgColor = 'transparent'
}: ProductBlockProps) {
  
  const productList = products[collection] || []

  return (
    <section className="py-8 md:py-12" style={{ backgroundColor: bgColor }}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#E9454D]">{title}</h2>
          <Link 
            href={viewAllLink}
            className="text-[#E9454D] font-bold hover:underline mt-2 md:mt-0"
          >
            {viewAllText} →
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="product-slider"
        >
          {productList.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}