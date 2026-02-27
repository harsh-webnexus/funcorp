'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { brands } from '@/lib/data'

import 'swiper/css'
import 'swiper/css/autoplay'

export default function BrandSlider() {
  return (
    <section className="bg-white py-4 md:py-6">
      <div className="container-custom">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
          className="brand-slider"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.name}>
              <Link href={brand.href} className="block">
                <div className="relative aspect-square">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}