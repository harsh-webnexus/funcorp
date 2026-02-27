'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import CollectionHeader from '../CollectionHeader'
import FilterSidebar from '../FilterSidebar'
import ProductGrid from '@/components/home/ProductGrid'
import { products } from '@/lib/data'
import Categories from '@/components/home/Categories'

import { Collection as CollectionType, FilterSection, SubCollection, ParentCollection } from '@/lib/types'

const mockFilters: FilterSection[] = [
  {
    title: 'Product Type',
    options: [
      { label: 'Toys & Games', count: 145, value: 'toys-games' },
    ]
  },
  {
    title: 'Product Category',
    options: [
      { label: 'Art & Craft Kits', count: 2, value: 'art-craft' },
      { label: 'Board Games', count: 1, value: 'board-games' },
      { label: 'Cars & Vehicle Playsets', count: 1, value: 'cars-playsets' },
      { label: 'Doll Houses', count: 1, value: 'doll-houses' },
      { label: 'Dolls & Accessories', count: 140, value: 'dolls-accessories' },
    ]
  },
  {
    title: 'Brand',
    options: [
      { label: 'Barbie', count: 144, value: 'barbie' },
      { label: 'Monopoly', count: 1, value: 'monopoly' },
    ]
  },
  {
    title: 'Discount',
    options: [
      { label: 'Upto 10%', count: 16, value: 'upto-10' },
      { label: '10% - 20%', count: 24, value: '10-20' },
      { label: '20% - 30%', count: 58, value: '20-30' },
      { label: '30% - 40%', count: 8, value: '30-40' },
      { label: '40% - 50%', count: 1, value: '40-50' },
    ]
  },
  {
    title: 'Age Group',
    options: [
      { label: '1-3 Years', count: 138, value: '1-3' },
      { label: '4-7 Years', count: 144, value: '4-7' },
      { label: '8-10 Years', count: 116, value: '8-10' },
      { label: '11-14 Years', count: 109, value: '11-14' },
      { label: '14+ Years', count: 23, value: '14-plus' },
    ]
  },
  {
    title: 'Availability',
    options: [
      { label: 'In stock', count: 145, value: 'in-stock' },
      { label: 'Out of stock', count: 3, value: 'out-of-stock' },
    ]
  },
  {
    title: 'Condition',
    options: [
      { label: 'New', count: 145, value: 'new' },
      { label: 'Packaging Damaged', count: 4, value: 'packaging-damaged' },
    ]
  }
]

export default function CollectionPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [collection, setCollection] = useState<CollectionType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState('best-selling')
  const [page, setPage] = useState(1)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)

  const productsPerPage = 30

  // Load collection data
  useEffect(() => {
    let isMounted = true

    const fetchCollection = async () => {
      setLoading(true)
      setError(null)

      try {
        await new Promise(resolve => setTimeout(resolve, 500))

        if (!isMounted) return

        // ===== BARBIE =====
        if (slug === "barbie") {
          setCollection({
            id: "barbie",
            title: "Barbie",
            description: "Shop Barbie Dolls, Accessories & Dreamhouses online at best prices.",
            bannerImage: "/images/barbie_wallpaper.webp",
            products: products.barbie || [],
            subCollections: [],
            totalProducts: products.barbie?.length || 0
          })

        // ===== LEGO =====
        } else if (slug === "lego") {
          setCollection({
            id: "lego",
            title: "LEGO",
            description: "Explore LEGO building sets for kids and adults.",
            bannerImage: "/images/lego-banner.webp",
            products: products.lego || [],
            subCollections: [],
            totalProducts: products.lego?.length || 0
          })

        // ===== HOT WHEELS =====
        } else if (slug === "hot-wheels") {
          setCollection({
            id: "hot-wheels",
            title: "Hot Wheels",
            description: "Shop Hot Wheels cars, tracks & playsets.",
            bannerImage: "/images/Hot_Wheels.webp",
            products: products.hotwheels || [],
            subCollections: [],
            totalProducts: products.hotwheels?.length || 0
          })

        // ===== NERF =====
        } else if (slug === "nerf") {
          setCollection({
            id: "nerf",
            title: "Nerf",
            description: "Shop Nerf blasters, darts & accessories.",
            bannerImage: "/images/Nerf.webp",
            products: products.nerf || [],
            subCollections: [],
            totalProducts: products.nerf?.length || 0
          })

        // ===== FUNSKOOL =====
        } else if (slug === "funskool") {
          setCollection({
            id: "funskool",
            title: "Funskool",
            description: "Funskool toys for all age groups.",
            bannerImage: "/images/Picture_Books.webp",
            products: products.funskool || [],
            subCollections: [],
            totalProducts: products.funskool?.length || 0
          })

        // ===== GIGGLES =====
        } else if (slug === "giggles") {
          setCollection({
            id: "giggles",
            title: "Giggles",
            description: "Giggles toys for toddlers and preschoolers.",
            bannerImage: "/images/Giggles-banner.webp",
            products: products.giggles || [],
            subCollections: [],
            totalProducts: products.giggles?.length || 0
          })

        // ===== MAJORETTE =====
        } else if (slug === "majorette") {
          setCollection({
            id: "majorette",
            title: "Majorette",
            description: "Premium die-cast cars from Majorette.",
            bannerImage: "/images/majorette-banner.webp",
            products: products.majorette || [],
            subCollections: [],
            totalProducts: products.majorette?.length || 0
          })
           // marvel
           } else if (slug === "marvel") {
          setCollection({
            id: "marvel",
            title: "Marvel",
            description: "Premium die-cast cars from marvel.",
            bannerImage: "/images/majorette-banner.webp",
            products: products.marvel || [],
            subCollections: [
              // { id: "Spiderman", name: "Spiderman", href: "/collections/spiderman" },
              // { id: "Iron man", name: "Iron Man", href: "/collections/iron-man" },
              // { id: "Hulk", name: "Hulk", href: "/collections/hulk" },
              // { id: "Captain America", name: "Captain America", href: "/collections/captain-america" },
              // { id: "Avengers", name: "Avengers", href: "/collections/avengers" },
            ],
            totalProducts: products.marvel?.length || 0
          })
          } else if (slug === "iron-man") {
          setCollection({
            id: "ironman",
            title: "ironman",
            description: "Shop ironman, accessories & playsets online.",
            bannerImage:"https://www.funcorp.in/cdn/shop/files/51nulYApKiL._SL1000_940x.jpg?v=1750944114",

            products: products.ironman || [],
            subCollections: [],
            totalProducts: products.ironman?.length || 0,
            parentCollection: {
              id: "marvel",
              name: "marvel",
              href: "/collections/marvel"
            }
            
          })
          } else if (slug === "spiderman") {
          setCollection({
            id: "spiderman",
            title: "spiderman",
            description: "Shop spiderman, accessories & playsets online.",
            bannerImage:"https://www.funcorp.in/cdn/shop/files/Spider-Man_banner_pc-min_1920x.jpg?v=1682579200",
            products: products.spiderman || [],
            subCollections: [],
            totalProducts: products.spiderman?.length || 0,
            parentCollection: {
              id: "marvel",
              name: "marvel",
              href: "/collections/marvel"
            }
            
          })
          } else if (slug === "hulk") {
          setCollection({
            id: "hulk",
            title: "hulk",
            description: "Shop hulk, accessories & playsets online.",
            
            products: products.hulk || [],
            subCollections: [],
            totalProducts: products.hulk?.length || 0,
            parentCollection: {
              id: "marvel",
              name: "marvel",
              href: "/collections/marvel"
            }
            
          })
          } else if (slug === "avengers") {
          setCollection({
            id: "avengers",
            title: "avengers",
            description: "Shop avengers, accessories & playsets online.",
            
            products: products.avengers || [],
            subCollections: [],
            totalProducts: products.avengers?.length || 0,
            parentCollection: {
              id: "marvel",
              name: "marvel",
              href: "/collections/marvel"
            }
            
          })
          } else if (slug === "captain-america") {
          setCollection({
            id: "captain-america",
            title: "captain-america",
            description: "Shop captain-america, accessories & playsets online.",
            bannerImage:"https://www.funcorp.in/cdn/shop/files/Spider-Man_banner_pc-min_1920x.jpg?v=1682579200",

            products: products.captainamerica || [],
            subCollections: [],
            totalProducts: products.captainamerica?.length || 0,
            parentCollection: {
              id: "marvel",
              name: "marvel",
              href: "/collections/marvel"
            }
            
          })
          } else if (slug === "dc") {
          setCollection({
            id: "marvel",
            title: "Marvel",
            description: "Premium die-cast cars from marvel.",
            
            products: products.marvel || [],
            subCollections: [
              // { id: "batman", name: "Batman", href: "/collections/batman" },
              // { id: "superman", name: "Superman", href: "/collections/superman" },
              // { id: "wonder woman", name: "Wonder woman", href: "/collections/wonder-woman" },
            ],
            totalProducts: products.marvel?.length || 0
          })
          } else if (slug === "batman") {
          setCollection({
            id: "batman",
            title: "batman",
            description: "Shop batman, accessories & playsets online.",
            
            products: products.batman || [],
            subCollections: [],
            totalProducts: products.batman?.length || 0,
            parentCollection: {
              id: "marvel",
              name: "marvel",
              href: "/collections/marvel#"
            }
            
          })
          } else if (slug === "superman") {
          setCollection({
            id: "superman",
            title: "superman",
            description: "Shop superman, accessories & playsets online.",
            
            products: products.superman || [],
            subCollections: [],
            totalProducts: products.superman?.length || 0,
            parentCollection: {
              id: "marvel",
              name: "marvel",
              href: "/collections/marvel#"
            }
            
          })
          } else if (slug === "wonder-woman") {
          setCollection({
            id: "woner woman",
            title: "wonder woman",
            description: "Shop wonder woman, accessories & playsets online.",
            
            products: products.wonderwoman || [],
            subCollections: [],
            totalProducts: products.wonderwoman?.length || 0,
            parentCollection: {
              id: "marvel",
              name: "Marvel",
              href: "/collections/marvel#"
            }
            
          })
        // ===== DISNEY =====
        } else if (slug === "disney") {
          setCollection({
            id: "disney",
            title: "Disney",
            description: "Shop Disney toys, characters & playsets.",
            bannerImage: "/images/Disney_mattel.webp",
            products: products.disney || [],
            subCollections: [
              // { id: "disney-princess", name: "Disney Princess", href: "/collections/disney-princess" },
              // { id: "disney-frozen", name: "Disney Frozen", href: "/collections/disney-frozen" },
            ],
            totalProducts: products.disney?.length || 0
          })

        // ===== DISNEY PRINCESS (Sub-collection) =====
        } else if (slug === "disney-princess") {
          setCollection({
            id: "disney-princess",
            title: "Disney Princess",
            description: "Shop Disney Princess dolls, accessories & playsets online.",
            bannerImage: "/images/Disney_mattel.webp",
            products: products.disneyPrincess || [],
            subCollections: [],
            totalProducts: products.disneyPrincess?.length || 0,
            parentCollection: {
              id: "disney",
              name: "Disney",
              href: "/collections/disney"
            }
            
          })
 } else if (slug === "disney-frozen") {
          setCollection({
            id: "disney-frozen",
            title: "Disney Frozen",
            description: "Shop Disney Frozen dolls, accessories & playsets online.",
            bannerImage: "/images/Disney_mattel.webp",
            products: products.disneyFrozen || [],
            subCollections: [],
            totalProducts: products.disneyFrozen?.length || 0,
            parentCollection: {
              id: "disney",
              name: "Disney",
              href: "/collections/disney"
            }
            
          })
          } else if (slug === "jurassic-world") {
          setCollection({
            id: "jurassic-world",
            title: "jurassic-world",
            description: "Shop jurassic-world toys, characters & playsets.",
            
            products: products.jurassicworld || [],
            subCollections: [
            ],
            totalProducts: products.jurassicworld?.length || 0
          })
          } else if (slug === "transformers") {
          setCollection({
            id: "transformers",
            title: "transformers",
            description: "Shop transformers toys, characters & playsets.",
            
            products: products.transformers || [],
            subCollections: [
            ],
            totalProducts: products.transformers?.length || 0
          })
          } else if (slug === "star-wars") {
          setCollection({
            id: "star-wars",
            title: "star-wars",
            description: "Shop star-wars toys, characters & playsets.",
            
            products: products.starwars || [],
            subCollections: [
            ],
            totalProducts: products.starwars?.length || 0
          })
          } else if (slug === "0-12-months") {
          setCollection({
            id: "Age 0-12 MONTHS",
            title: "Age-0-12 MONTHS",
            description: "Shop Age 0-12 MONTHS toys, characters & playsets.",
            
            products: products.small || [],
            subCollections: [
            ],
            totalProducts: products.small?.length || 0
          })
          } else if (slug === "1-3-years") {
          setCollection({
            id: "Age 1-3 YEARS",
            title: "Age 1-3 YEARS",
            description: "Shop Age 1-3 YEARS  toys, characters & playsets.",
            
            products: products.small1|| [],
            subCollections: [
            ],
            totalProducts: products.small1?.length || 0
          })
          } else if (slug === "4-7-years") {
          setCollection({
            id: "Age 4-7 YEARS",
            title: "AAge 4-7 YEARS",
            description: "Shop Age 4-7 YEARS toys, characters & playsets.",
            
            products: products.small1 || [],
            subCollections: [
            ],
            totalProducts: products.small1?.length || 0
          })
          } else if (slug === "8-10-years") {
          setCollection({
            id: "Age 8-10 YEARS",
            title: "Age 8-10 YEARS",
            description: "Shop Age 8-10 YEARS toys, characters & playsets.",
            
            products: products.small1 || [],
            subCollections: [
            ],
            totalProducts: products.small1?.length || 0
          })
          } else if (slug === "11-14-years") {
          setCollection({
            id: "Age 11-14 YEARS",
            title: "Age 11-14 YEARS",
            description: "Shop Age 11-14 YEARS toys, characters & playsets.",
            
            products: products.small1 || [],
            subCollections: [
            ],
            totalProducts: products.small1?.length || 0
          })
          } else if (slug === "14-plus") {
          setCollection({
            id: "Age 14+ YEARS",
            title: "Age 14+ YEARS",
            description: "Shop Age 14+ YEARS toys, characters & playsets.",
            
            products: products.small2 || [],
            subCollections: [
            ],
            totalProducts: products.small2?.length || 0
          })
          } else if (slug === "clearance") {
          setCollection({
            id: "clearance",
            title: "CLEARANCE",
            description: "Shop CLEARANCE toys, characters & playsets.",
            
            products: products.clearance || [],
            subCollections: [
            ],
            totalProducts: products.clearance?.length || 0
          })
           } else if (slug === "packaging-damaged") {
          setCollection({
            id: "Packaging Damaged Products",
            title: "Packaging Damaged Products",
            description: "Packaging Damaged Productstoys, characters & playsets.",
            
            products: products.packagingdamaged|| [],
            subCollections: [
            ],
            totalProducts: products.packagingdamaged?.length || 0
          })
          } else if (slug === "fisher-price") {
          setCollection({
            id: "Fisher Price",
            title: "Fisher Price",
            description: "Fisher Price stoys, characters & playsets.",
            bannerImage:"https://www.funcorp.in/cdn/shop/files/FP_Offer_PC_1920x.jpg?v=1694770284",
            products: products.fisherprice|| [],
            subCollections: [
            ],
            totalProducts: products.fisherprice?.length || 0
          })
          } else if (slug === "hasbro-gaming") {
          setCollection({
            id: "Hasbro Gaming",
            title: "Hasbro Gaming",
            description: "Hasbro Gaming stoys, characters & playsets.",
            
            products: products.hasbrogaming|| [],
            subCollections: [
            ],
            totalProducts: products.hasbrogaming?.length || 0
          })
          } else if (slug === "mattel-games") {
          setCollection({
            id: "mattel",
            title: "Mattel",
            description: "matteltoys, characters & playsets.",
            // bannerImage:"/image/Packaging-Damaged.webp",
            products: products.mattel|| [],
            subCollections: [
            ],
            totalProducts: products.mattel?.length || 0
          })
          } else if (slug === "mcfarlane") {
          setCollection({
            id: "mcfarlane",
            title: "McFarlane",
            description: "mmcfarlane, characters & playsets.",
            bannerImage:"https://www.funcorp.in/cdn/shop/files/McFarlane_PC_banner_1920x.jpg?v=1688808409",
            products: products.mcfarlane|| [],
            subCollections: [
            ],
            totalProducts: products.mcfarlane?.length || 0
          })
           } else if (slug === "monopoly") {
          setCollection({
            id: "monopoly",
            title: "Monopoly",
            description: "monopoly, characters & playsets.",
            
            products: products.monopoly|| [],
            subCollections: [
            ],
            totalProducts: products.monopoly?.length || 0
          })
           } else if (slug === "play-doh") {
          setCollection({
            id: "play-doh",
            title: "Play-Doh",
            description: "play-doh, characters & playsets.",
            
            products: products.playdoh|| [],
            subCollections: [
            ],
            totalProducts: products.playdoh?.length || 0
          })
           } else if (slug === "play-hour") {
          setCollection({
            id: "play-hour",
            title: "Play-Hour",
            description: "play-hour, characters & playsets.",
            
            products: products.playhour|| [],
            subCollections: [
            ],
            totalProducts: products.playhour?.length || 0
          })
          } else if (slug === "playshifu") {
          setCollection({
            id: "playshifu",
            title: "PlayShifu",
            description: "playshifu, characters & playsets.",
            bannerImage:"https://www.funcorp.in/cdn/shop/files/Shifu_Banner_Sale_PC_1920x.jpg?v=1686564172",
            products: products.playshifu|| [],
            subCollections: [
            ],
            totalProducts: products.playshifu?.length || 0
          })
           } else if (slug === "simba") {
          setCollection({
            id: "simba",
            title: "Simba",
            description: "simba, characters & playsets.",
            
            products: products.simba|| [],
            subCollections: [
            ],
            totalProducts: products.simba?.length || 0
          })
           } else if (slug === "skillmatics") {
          setCollection({
            id: "skillmatics",
            title: "Skillmatics",
            description: "skillmatics, characters & playsets.",
            
            products: products.skillmatics|| [],
            subCollections: [
            ],
            totalProducts: products.skillmatics?.length || 0
          })
          } else if (slug === "uno") {
          setCollection({
            id: "uno",
            title: "UNO",
            description: "uno, characters & playsets.",
            
            products: products.uno|| [],
            subCollections: [
            ],
            totalProducts: products.uno?.length || 0
          })
          //action figures
           } else if (slug === "action-figures") {
          setCollection({
            id: "action-figures",
            title: "Action Figures",
            description: "Action Figures, characters & playsets.",
            
            products: products.actionfigures|| [],
            subCollections: [
            ],
            totalProducts: products.actionfigures?.length || 0
          })
          //baby-toddler-toys
           } else if (slug === "baby-toddler-toys") {
          setCollection({
            id: "baby-toddler-toys",
            title: "Baby & Toddler Toys",
            description: "Baby & Toddler Toys, characters & playsets.",
            
            products: products.babytoddler|| [],
            subCollections: [
            ],
            totalProducts: products.babytoddler?.length || 0
          })
          //bath-toys
           } else if (slug === "bath-toys") {
          setCollection({
            id: "bath-toys",
            title: "Bath Toys",
            description: "Bath Toys, characters & playsets.",
            
            products: products.bathtoys|| [],
            subCollections: [
            ],
            totalProducts: products.bathtoys?.length || 0
          })
          //baby-toys
           } else if (slug === "baby-toys") {
          setCollection({
            id: "baby-toys",
            title: "Baby & Toddler Toys",
            description: "Baby & Toddler Toys, characters & playsets.",
            
            products: products.babytoys|| [],
            subCollections: [
            ],
            totalProducts: products.babytoys?.length || 0
          })
          //pull-along-toys
           } else if (slug === "pull-along-toys") {
          setCollection({
            id: "pull-along-toys",
            title: "Pull-Along Toys",
            description: "Pull-Along Toys, characters & playsets.",
            
            products: products.pulltoys|| [],
            subCollections: [
            ],
            totalProducts: products.pulltoys?.length || 0
          })
          //colouring-books-for-adults
           } else if (slug === "colouring-books") {
          setCollection({
            id: "colouring-books-for-adults",
            title: "Colouring Books for Adults",
            description: "Colouring Books for Adults, characters & playsets.",
            
            products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
          //drawing-painting-colouring-books
           } else if (slug === "drawing-books") {
          setCollection({
            id: "drawing-painting-colouring-books",
            title: "Drawing Painting & Colouring Books",
            description: "Drawing Painting & Colouring Books, characters & playsets.",
            
            products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
          //early-learning-books
           } else if (slug === "early-learning-books") {
          setCollection({
            id: "early-learning-books",
            title: "Early Learning Books",
            description: "Early Learning Books, characters & playsets.",
            
            products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
          //interactive-activity-books
           } else if (slug === "interactive-activity-books") {
          setCollection({
            id: "interactive-activity-books",
            title: "Interactive & Activity Books",
            description: "Interactive & Activity Books, characters & playsets.",
            
            products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
          //picture-books
           } else if (slug === "picture-books") {
          setCollection({
            id: "picture-books",
            title: "Picture Books",
            description: "Picture Books, characters & playsets.",
            
            products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
          //reference-books
           } else if (slug === "reference-books") {
          setCollection({
            id: "reference-books",
            title: "Reference Books",
            description: "Reference Books, characters & playsets.",
            
            products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
          //story-books
           } else if (slug === "story-books") {
          setCollection({
            id: "story-books",
            title: "Story Books",
            description: "Story Books, characters & playsets.",
            
            products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
          //building &  constructions 
           } else if (slug === "building-construction") {
          setCollection({
            id: "building-construction",
            title: "Building & Construction",
            description: "Building & Construction, characters & playsets.",
            
             products: products.building|| [],
            subCollections: [
            ],
            totalProducts: products.building?.length || 0
          })
          //party decorations 
           } else if (slug === "party-decorations") {
          setCollection({
            id: "party-decorations-1",
            title: "Party Decorations",
            description: "Party Decorations, characters & playsets.",
            
             products: products.party|| [],
            subCollections: [
            ],
            totalProducts: products.party?.length || 0
          })
          //toy-guns-bullets 
           } else if (slug === "toy-guns-bullets") {
          setCollection({
            id: "toy-guns-bullets",
            title: "Toy Guns & Bullets",
            description: "Toy Guns & Bullets, characters & playsets.",
            
             products: products.bullets|| [],
            subCollections: [
            ],
            totalProducts: products.bullets?.length || 0
          })
          //soft-toys
           } else if (slug === "soft-toys") {
          setCollection({
            id: "soft-toys",
            title: "Soft Toys",
            description: "Soft Toys, characters & playsets.",
            bannerImage:"https://www.funcorp.in/cdn/shop/files/Play_Hour_Brand_Page_PC_1920x_crop_center.jpg?v=1704891426" ,
             products: products.softtoys|| [],
            subCollections: [
            ],
            totalProducts: products.softtoys?.length || 0
          })
          //play-school-furniture
           } else if (slug === "play-school-furniture") {
          setCollection({
            id: "play-school-furniture",
            title: "Soft Toys",
            description: "Play & School Furniture, characters & playsets.",
           
             products: products.playschool|| [],
            subCollections: [
            ],
            totalProducts: products.playschool?.length || 0
          })
          
          
          //cars-vehicle-playsets
           } else if (slug === "cars-playsets") {
          setCollection({
            id: "cars-vehicle-playsets",
            title: "Cars & Vehicle Playsets",
            description: "Cars & Vehicle Playsets, characters & playsets.",
           
             products: products.playsets|| [],
            subCollections: [
            ],
            totalProducts: products.playsets?.length || 0
          })
          //peppa-pig
           } else if (slug === "peppa-pig") {
          setCollection({
            id: "peppa-pig",
            title: "Peppa Pig",
            description: "Peppa Pig",
           
             products: products.peepa|| [],
            subCollections: [
            ],
            totalProducts: products.peepa?.length || 0
          })
           //harry-potter
           } else if (slug === "harry-potter") {
          setCollection({
            id: "harry-potter",
            title: "Harry Potter",
            description: "Harry Potter",
           
             products: products.potter|| [],
            subCollections: [
            ],
            totalProducts: products.potter?.length || 0
          })
           //masha-bear
           } else if (slug === "masha-bear") {
          setCollection({
            id: "masha-bear",
            title: "Masha and the Bear",
            description: "Masha and the Bear",
           
             products: products.bear|| [],
            subCollections: [
            ],
            totalProducts: products.bear?.length || 0
          })
          //rc-cars
           } else if (slug === "rc-cars") {
          setCollection({
            id: "cars-vehicle-playsets",
            title: "Remote Controlled (RC) Cars & Vehicles",
            description: "Remote Controlled (RC) Cars & Vehicles, characters & playsets.",
           
             products: products.rc|| [],
            subCollections: [
            ],
            totalProducts: products.rc?.length || 0
          })
          //mickey-mouse
           } else if (slug === "mickey-mouse") {
          setCollection({
            id: "mickey-mouse",
            title: "Mickey Mouse",
            description: "Mickey Mouse.",
           
             products: products.mouse|| [],
            subCollections: [
            ],
            totalProducts: products.mouse?.length || 0
          })
          //minnie-mouse
           } else if (slug === "minnie-mouse") {
          setCollection({
            id: "minnie-mouse",
            title: "Minnie Mouse",
            description: "Minnie Mouse.",
           
             products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
           //minnie-mouse
           } else if (slug === "minnie-mouse") {
          setCollection({
            id: "minnie-mouse",
            title: "Minnie Mouse",
            description: "Minnie Mouse.",
           
              products: products.ridetoys|| [],
            subCollections: [
            ],
            totalProducts: products.ridetoys?.length || 0
          })
           //minecraft
           } else if (slug === "minecraft") {
          setCollection({
            id: "minecraft",
            title: "Minecraft",
            description: "Minecraft",
           
             products: products.minecraft|| [],
            subCollections: [
            ],
            totalProducts: products.minecraft?.length || 0
          })
           //minecraft
           } else if (slug === "chhota-bheem") {
          setCollection({
            id: "chhota-bheem",
            title: "Chhota Bheem",
            description: "chhota-bheem",
           
             products:  [],
            subCollections: [
            ],
            totalProducts:  0
          })
          //ride-on-toys
           } else if (slug === "ride-on-toys") {
          setCollection({
            id: "ride-on-toys",
            title: "Ride-On Toys",
            description: "Ride-On Toys, characters & playsets.",
           
             products: products.ridetoys|| [],
            subCollections: [
            ],
            totalProducts: products.ridetoys?.length || 0
          })
          //trains-railway
           } else if (slug === "trains-railway") {
          setCollection({
            id: "trains-railway",
            title: "Trains & Railway Sets",
            description: "Trains & Railway Sets, characters & playsets.",
           
             products: [],
            subCollections: [
            ],
            totalProducts: 0
          })
          //dolls-accessories
           } else if (slug === "dolls-accessories") {
          setCollection({
            id: "dolls-accessories",
            title: "Dolls & Accessories",
            description: "Dolls & Accessories, characters & playsets.",
           
              products: products.barbie|| [],
            subCollections: [
            ],
            totalProducts: products.barbie?.length || 0
          })
          //doll-houses
           } else if (slug === "doll-houses") {
          setCollection({
            id: "doll-houses",
            title: "Doll Houses",
            description: "Doll Houses, characters & playsets.",
           
              products: products.dollhouse|| [],
            subCollections: [
            ],
            totalProducts: products.dollhouse?.length || 0
          })
          //board-games
           } else if (slug === "board-games") {
          setCollection({
            id: "board-games",
            title: "Board Games",
            description: "Board Games, characters & playsets.",
           
              products: products.boardgames|| [],
            subCollections: [
            ],
            totalProducts: products.boardgames?.length || 0
          })
            //card-games
           } else if (slug === "card-games") {
          setCollection({
            id: "card-games",
            title: "Card Games",
            description: "Card Games, characters & playsets.",
           
              products: products.cardgames|| [],
            subCollections: [
            ],
            totalProducts: products.cardgames?.length || 0
          })
           //puzzles
           } else if (slug === "puzzles") {
          setCollection({
            id: "puzzles",
            title: "Puzzles",
            description: "Puzzles, characters & playsets.",
           
              products: products.puzzles|| [],
            subCollections: [
            ],
            totalProducts: products.puzzles?.length || 0
          })
          //baby-care
           } else if (slug === "baby-care") {
          setCollection({
            id: "baby-care",
            title: "Baby Care & Gear",
            description: "Baby Care & Gear, characters & playsets.",
           
              products: [],
            subCollections: [
            ],
            totalProducts: 0
          })
          //books
           } else if (slug === "books") {
          setCollection({
            id: "books",
            title: "Books",
            description: "Books",
           
              products: products.learning|| [],
            subCollections: [
            ],
            totalProducts: products.learning?.length || 0
          })
          //bubbleheads
           } else if (slug === "bubbleheads") {
          setCollection({
            id: "bubbleheads",
            title: "Bobbleheads",
            description: "Bobbleheads, characters & playsets.",
           
              products:  [],
            subCollections: [
            ],
            totalProducts: 0
          })
          //costumes-masks
           } else if (slug === "costumes-masks") {
          setCollection({
            id: "costumes-masks",
            title: "Costumes & Masks",
            description: "Costumes & Masks, characters & playsets.",
           
              products: products.masks|| [],
            subCollections: [
            ],
            totalProducts: products.masks?.length || 0
          })
          //spinning-tops
           } else if (slug === "spinning-tops") {
          setCollection({
            id: "musical-toys",
            title: "Spinning Tops",
            description: "Spinning Tops, characters & playsets.",
           
              products: products.spinning|| [],
            subCollections: [
            ],
            totalProducts: products.spinning?.length || 0
          })
           //musical-toys
           } else if (slug === "musical-toys") {
          setCollection({
            id: "musical-toys",
            title: "Musical Toys & Speakers",
            description: "Musical Toys & Speakers, characters & playsets.",
           
              products: products.musical|| [],
            subCollections: [
            ],
            totalProducts: products.musical?.length || 0
          })
           //art-craft-kits
           } else if (slug === "art-craft-kits") {
          setCollection({
            id: "art-craft-kits",
            title: "Art & Craft Kits",
            description: "Art & Craft Kits, characters & playsets.",
           
              products: products.craftkits|| [],
            subCollections: [
            ],
            totalProducts: products.craftkits?.length || 0
          })
          //dough-clay
           } else if (slug === "dough-clay") {
          setCollection({
            id: "dough-clay",
            title: "Dough",
            description: "Dough, characters & playsets.",
           
              products: products.dough|| [],
            subCollections: [
            ],
            totalProducts: products.dough?.length || 0
          })
           //learning-educational
           } else if (slug === "learning-educational") {
          setCollection({
            id: "learning-educational",
            title: "Learning & Educational",
            description: "Learning & Educational, characters & playsets.",
           
              products: products.learning|| [],
            subCollections: [
            ],
            totalProducts: products.learning?.length || 0
          })
           //interactive-toys
           } else if (slug === "interactive-toys") {
          setCollection({
            id: "interactive-toys",
            title: "Interactive Toys",
            description: "Interactive Toys, characters & playsets.",
           
              products: products.interactivetoys|| [],
            subCollections: [
            ],
            totalProducts: products.interactivetoys?.length || 0
          })
           //playsets
           } else if (slug === "playsets") {
          setCollection({
            id: "playsets",
            title: "Playsets",
            description: " characters & playsets.",
           
              products: products.playsets|| [],
            subCollections: [
            ],
            totalProducts: products.playsets?.length || 0
          })
        // ===== DEFAULT =====
        } else {
          const productData = products[slug as keyof typeof products]
          
          setCollection({
            id: slug,
            title: slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " "),
            description: `Shop for ${slug} products online.`,
            // bannerImage: "/images/placeholder-banner.jpg",
            products: productData || [],
            subCollections: [],
            totalProducts: productData?.length || 0
          })
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load collection")
          console.error(err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCollection()

    return () => {
      isMounted = false
    }
  }, [slug])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!collection) return []
    
    let filtered = [...collection.products]

    // Apply brand filter
    if (activeFilters['Brand']?.length) {
      filtered = filtered.filter(p => 
        activeFilters['Brand'].includes(p.vendor.toLowerCase().replace(' ', '-'))
      )
    }

    // Apply price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange.min && p.price <= priceRange.max
    )

    // Apply sorting
    switch (sortBy) {
      case 'price-ascending':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-descending':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'title-ascending':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-descending':
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    return filtered
  }, [collection, activeFilters, sortBy, priceRange])

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * productsPerPage)
  }, [filteredProducts, page])

  const hasMore = displayedProducts.length < filteredProducts.length
  const totalResults = filteredProducts.length

  const handleFilterChange = useCallback((filterType: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[filterType] || []
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      
      return { ...prev, [filterType]: updated }
    })
    setPage(1)
  }, [])

  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    setPriceRange({ min, max })
    setPage(1)
  }, [])

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort)
    setPage(1)
  }, [])

  const handleLoadMore = useCallback(() => {
    setLoadMoreLoading(true)
    setTimeout(() => {
      setPage(prev => prev + 1)
      setLoadMoreLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E9454D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collection...</p>
        </div>
      </div>
    )
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#E9454D] mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error || 'Collection not found'}</p>
          <Link 
            href="/" 
            className="bg-[#E9454D] text-white px-6 py-3 rounded-md hover:bg-[#d13a42] inline-block"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Collection Header */}
      <CollectionHeader
        title={collection.title}
        bannerImage={collection.bannerImage}
        subCollections={collection.subCollections}
        parentCollection={collection.parentCollection}
      />

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={mockFilters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onPriceRangeChange={handlePriceRangeChange}
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid
              products={displayedProducts}
              totalProducts={totalResults}
              onSortChange={handleSortChange}
              currentSort={sortBy}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              loading={loadMoreLoading}
              collectionTitle={collection.title}
            />
          </div>
        </div>
      </div>

      {/* Recently Viewed Section */}
      <div className="container-custom py-12">
        <h3 className="text-xl font-bold text-center mb-6">Recently Viewed Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
       {/* Categories Section - Added at the bottom */}
      <Categories 
        title="TOP CATEGORIES"
        initialDisplayCount={9}
      />
    </div>

    
  )
}