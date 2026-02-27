import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    name: 'Dolls & Accessories',
    image: '/images/Dolls_Accessories.webp',
    link: '/collections/dolls-accessories'
  },
  {
    name: 'Cars & Vehicle Playsets',
    image: '/images/Cars_Vehicle_Playsets.webp',
    link: '/collections/cars-playsets'
  },
  {
    name: 'Board & Card Games',
    image: '/images/Board_Card_Games.webp',
    link: '/collections/board-games'
  },
  {
    name: 'Action Figures',
    image: '/images/Action_Figures.webp',
    link: '/collections/action-figures'
  },
  {
    name: 'Building & Construction',
    image: '/images/Building_Construction.webp',
    link: '/collections/building-construction'
  },
  {
    name: 'Learning & Educational',
    image: '/images/Learning_Educational.webp',
    link: '/collections/learning-educational'
  },
  {
    name: 'Soft Toys',
    image: '/images/Soft_Toys.webp',
    link: '/collections/soft-toys'
  },
  {
    name: 'Art & Craft Kits',
    image: '/images/Art_Craft_Kits.webp',
    link: '/collections/art-craft-kits'
  }
]

export default function CategoryGrid() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#f44336] mb-2 md:mb-0">
            SHOP BY CATEGORY
          </h2>
          <Link 
            href="/collections/barbie" 
            className="text-[#f44336] font-bold hover:underline text-sm md:text-base"
          >
            VIEW ALL PRODUCTS →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={category.link}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}