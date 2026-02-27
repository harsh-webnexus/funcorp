'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BrandTabBlockProps {
  type?: 'lego' | 'characters'
}

const legoCategories = [
  { name: 'LEGO City', logo: '/products/lego-city.avif', link: '/collections/lego' },
  { name: 'LEGO Technic', logo: '/products/lego-technic.webp', link: '/collections/lego' },
  { name: 'LEGO Friends', logo: '/products/lego-friends.avif', link: '/collections/lego' },
  { name: 'LEGO Duplo', logo: '/products/lego-duplo.avif', link: '/collections/lego' },
  { name: 'LEGO Classic', logo: '/products/lego-classic.webp', link: '/collections/lego' },
  { name: 'LEGO Creator', logo: '/products/lego-creator.webp', link: '/collections/lego' },
  { name: 'LEGO Marvel', logo: '/products/lego-marvel.webp', link: '/collections/lego' },
  { name: 'LEGO Ninjago', logo: '/products/lego-ninjago.webp', link: '/collections/lego' },
  { name: 'LEGO Speed Champions', logo: '/products/lego-speed-champions.webp', link: '/collections/lego' },
  { name: 'LEGO Dots', logo: '/products/lego-dots.webp', link: '/collections/lego' },
  { name: 'LEGO Architecture', logo: '/products/lego-architecture.webp', link: '/collections/lego' },
  { name: 'LEGO Star Wars', logo: '/products/lego-star-wars.webp', link: '/collections/lego' },
  { name: 'LEGO Super Heroes', logo: '/products/lego-super-heroes.webp', link: '/collections/lego' },
  { name: 'LEGO Ideas', logo: '/products/lego-ideas.webp', link: '/collections/lego' },
  { name: 'LEGO Harry Potter', logo: '/products/lego-harry-potter.webp', link: '/collections/lego' },
  { name: 'LEGO Disney', logo: '/products/lego-disney.webp', link: '/collections/lego' },
  { name: 'LEGO Minecraft', logo: '/products/lego-minecraft.webp', link: '/collections/lego' },
  { name: 'LEGO Botanicals', logo: '/products/lego-botanicals.webp', link: '/collections/lego' },
]

const characters = [
  { name: 'Barbie', logo: '/characters/barbie.webp', link: '/collections/barbie' },
  { name: 'Peppa Pig', logo: '/characters/peppa-pig.webp', link: '/collections/peppa-pig' },
  { name: 'Harry Potter', logo: '/characters/harry-potter.webp', link: '/collections/harry-potter' },
  { name: 'Spiderman', logo: '/characters/spiderman.webp', link: '/collections/spiderman' },
  { name: 'Batman', logo: '/characters/batman.webp', link: '/collections/batman' },
  { name: 'Transformers', logo: '/characters/transformers.webp', link: '/collections/transformers' },
  { name: 'Disney Frozen', logo: '/characters/disney-frozen.webp', link: '/collections/disney-frozen' },
  { name: 'Disney Princess', logo: '/characters/disney-princess.webp', link: '/collections/disney-princess' },
  { name: 'Masha & Bear', logo: '/characters/masha-the-bear.webp', link: '/collections/masha-bear' },
  { name: 'Jurassic World', logo: '/characters/jurassic-world.webp', link: '/collections/jurassic-world' },
  { name: 'Star Wars', logo: '/characters/star-wars.webp', link: '/collections/star-wars' },
  { name: 'Disney Cars', logo: '/characters/disney-cars.webp', link: '/collections/rc' },
  { name: 'Marvel Avengers', logo: '/characters/marvel-avengers.webp', link: '/collections/avengers' },
  { name: 'Chhota Bheem', logo: '/characters/chhota-bheem.webp', link: '/collections/chhota-bheem' },
  { name: 'Mickey Mouse', logo: '/characters/mickey-mouse.webp', link: '/collections/mickey-mouse' },
  { name: 'Minnie Mouse', logo: '/characters/minnie-mouse.webp', link: '/collections/minnie-mouse' },
  { name: 'Disney', logo: '/characters/disney.webp', link: '/collections/disney' },
  { name: 'Minecraft', logo: '/characters/minecraft.webp', link: '/collections/minecraft' },
]

export default function BrandTabBlock({ type = 'lego' }: BrandTabBlockProps) {
  const [showAll, setShowAll] = useState(false)
  const items = type === 'lego' ? legoCategories : characters
  const bgColor = type === 'lego' ? '#fbc80b' : 'transparent'
  const borderColor = type === 'lego' ? '#ffc206' : 'rgba(0,0,0,0)'
  const title = type === 'lego' ? 'CHOOSE YOUR FAVOURITE LEGO' : 'THEMES & CHARACTERS'
  const visibleItems = showAll ? items : items.slice(0, 6)

  return (
    <section className="py-6 md:py-10" style={{ backgroundColor: bgColor }}>
      <div className="container-custom">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-[#1991e2] text-2xl md:text-3xl font-bold">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {visibleItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="group block"
              style={{ borderColor }}
            >
              <div className="relative aspect-[3/2] mb-2">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>

        {items.length > 6 && (
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#4dac8b] text-white px-6 py-2 font-bold hover:bg-opacity-90 transition-colors"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}