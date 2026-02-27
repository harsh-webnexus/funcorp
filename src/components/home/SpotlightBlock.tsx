'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const spotlightItems = [
  {
    id: 1,
    image: '/images/Hot_Wheels.webp',
    link: '/collections/hot-wheels',
    alt: 'Hot Wheels'
  },
  {
    id: 2,
    image: '/images/Barbie.webp',
    link: '/collections/barbie',
    alt: 'Barbie'
  },
  {
    id: 3,
    image: '/images/Nerf-1.webp',
    link: '/collections/nerf',
    alt: 'Nerf'
  },
  {
    id: 4,
    image: '/images/Play_Hour.webp',
    link: '/collections/play-hour',
    alt: 'Play Hour'
  },
  {
    id: 5,
    image: '/images/Giggles.webp',
    link: '/collections/giggles',
    alt: 'Giggles'
  },
  {
    id: 6,
    image: '/images/Lego.webp',
    link: '/collections/lego',
    alt: 'Lego'
  },
  {
    id: 7,
    image: '/images/Playshifu-square.webp',
    link: '/collections/playshifu',
    alt: 'Playshifu'
  }
]

export default function SpotlightBlock() {
  return (
    <section className="py-4 md:py-6">
      <div className="container-custom">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="spotlight-slider"
        >
          {spotlightItems.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={item.link} className="block group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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