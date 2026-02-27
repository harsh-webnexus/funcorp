// import { products } from "./data"
// import { SubCollection } from "./types"

// type BrandConfig = {
//   title: string
//   description: string
//   bannerImage: string
//   subCollections?: SubCollection[]
// }

// export const brandCollections: Record<string, BrandConfig> = {
//   barbie: {
//     title: "Barbie",
//     description:
//       "Shop Barbie Dolls, Accessories & Dreamhouses online at best prices.",
//     bannerImage: "/images/barbie_wallpaper.webp",
//     subCollections: [
//       { name: "Barbie Dolls", href: "/collections/barbie-dolls", image: "/images/barbie-dolls-sub.jpg" },
//       { name: "Barbie Dreamhouse", href: "/collections/barbie-dreamhouse", image: "/images/barbie-dreamhouse-sub.jpg" },
//       { name: "Barbie Accessories", href: "/collections/barbie-accessories", image: "/images/barbie-accessories-sub.jpg" },
//     ]
//   },

//   lego: {
//     title: "LEGO",
//     description:
//       "Explore LEGO building sets for kids and adults.",
//     bannerImage: "/images/lego-banner.jpg",
//     subCollections: [
//       { name: "LEGO City", href: "/collections/lego-city", image: "/images/lego-city.jpg" },
//       { name: "LEGO Technic", href: "/collections/lego-technic", image: "/images/lego-technic.jpg" },
//       { name: "LEGO Friends", href: "/collections/lego-friends", image: "/images/lego-friends.jpg" },
//     ]
//   },

//   "hot-wheels": {
//     title: "Hot Wheels",
//     description:
//       "Shop Hot Wheels cars, tracks & playsets.",
//     bannerImage: "/images/hotwheels-banner.jpg"
//   },

//   nerf: {
//     title: "Nerf",
//     description:
//       "Shop Nerf blasters, darts & accessories.",
//     bannerImage: "/images/nerf-banner.jpg"
//   },

//   funskool: {
//     title: "Funskool",
//     description:
//       "Funskool toys for all age groups.",
//     bannerImage: "/images/funskool-banner.jpg"
//   },

//   giggles: {
//     title: "Giggles",
//     description:
//       "Giggles toys for toddlers and preschoolers.",
//     bannerImage: "/images/giggles-banner.jpg"
//   },

//   majorette: {
//     title: "Majorette",
//     description:
//       "Premium die-cast cars from Majorette.",
//     bannerImage: "/images/majorette-banner.jpg"
//   },

//   disney: {
//     title: "Disney",
//     description:
//       "Shop Disney toys, characters & playsets.",
//     bannerImage: "/images/disney-banner.jpg"
//   }
// }

// export function getCollectionBySlug(slug: string) {
//   const config = brandCollections[slug]

//   if (!config) return null

//   return {
//     id: slug,
//     title: config.title,
//     description: config.description,
//     bannerImage: config.bannerImage,
//     subCollections: config.subCollections || [],
//     products: products[slug] || [],
//     totalProducts: products[slug]?.length || 0
//   }
// }
