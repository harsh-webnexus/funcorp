// import { Product, Collection, FilterSection, SubCollection } from './types'
// import { products } from './data' // Import products from your data file

// // Define mockFilters in this file or import it
// const mockFilters: FilterSection[] = [
//   {
//     title: 'Brand',
//     options: [
//       { label: 'Dragon-I', count: 3, value: 'dragon-i' },
//       { label: 'Funskool', count: 9, value: 'funskool' },
//       { label: 'Jurassic World', count: 1, value: 'jurassic-world' },
//       { label: 'Marvel', count: 11, value: 'marvel' },
//       { label: 'Marvel Legends', count: 2, value: 'marvel-legends' },
//       { label: 'Mattel', count: 1, value: 'mattel' },
//       { label: 'My Little Pony', count: 2, value: 'my-little-pony' },
//       { label: 'Peppa Pig', count: 1, value: 'peppa-pig' },
//       { label: 'Star Wars', count: 2, value: 'star-wars' },
//       { label: 'Transformers', count: 8, value: 'transformers' },
//     ]
//   },
//   {
//     title: 'Price',
//     options: [
//       { label: 'Under ₹500', count: 15, value: 'under-500' },
//       { label: '₹500 - ₹1000', count: 12, value: '500-1000' },
//       { label: '₹1000 - ₹2000', count: 8, value: '1000-2000' },
//       { label: 'Above ₹2000', count: 5, value: 'above-2000' },
//     ]
//   },
//   {
//     title: 'Age Group',
//     options: [
//       { label: '1-3 Years', count: 6, value: '1-3' },
//       { label: '4-7 Years', count: 31, value: '4-7' },
//       { label: '8-10 Years', count: 26, value: '8-10' },
//       { label: '11-14 Years', count: 20, value: '11-14' },
//       { label: '14+ Years', count: 21, value: '14-plus' },
//     ]
//   },
//   {
//     title: 'Discount',
//     options: [
//       { label: 'Upto 10%', count: 5, value: 'upto-10' },
//       { label: '10% - 20%', count: 13, value: '10-20' },
//       { label: '20% - 30%', count: 12, value: '20-30' },
//       { label: '30% - 40%', count: 3, value: '30-40' },
//       { label: '40% - 50%', count: 3, value: '40-50' },
//       { label: 'Above 50%', count: 2, value: 'above-50' },
//     ]
//   },
//   {
//     title: 'Availability',
//     options: [
//       { label: 'In stock', count: 40, value: 'in-stock' },
//       { label: 'Out of stock', count: 1, value: 'out-of-stock' },
//     ]
//   },
//   {
//     title: 'Condition',
//     options: [
//       { label: 'New', count: 40, value: 'new' },
//       { label: 'Packaging Damaged', count: 1, value: 'packaging-damaged' },
//     ]
//   }
// ]

// // Simulate API calls with mock data
// export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
//   // Simulate network delay
//   await new Promise(resolve => setTimeout(resolve, 300))
  
//   const collections: Record<string, Collection> = {
//     'action-figures': {
//       id: 'action-figures',
//       title: 'Action Figures',
//       description: 'Shop for Action Figures Online in India at FunCorp. Choose your favourite toy Superhero from Marvel, DC, Transformers & More.',
//       bannerImage: '/images/Action_Figures.webp',
//       products: products.actionFigures || [], // Now products is imported
//       subCollections: [
//         { name: 'Marvel', href: '/collections/marvel', image: '/images/marvel-sub.jpg' },
//         { name: 'DC', href: '/collections/dc', image: '/images/dc-sub.jpg' },
//         { name: 'Transformers', href: '/collections/transformers', image: '/images/transformers-sub.jpg' },
//       ]
//     },
//     'lego': {
//       id: 'lego',
//       title: 'LEGO',
//       description: 'Explore the magical world of LEGO. From City to Technic, find the perfect set for builders of all ages.',
//       bannerImage: '/images/lego-banner.jpg',
//       products: products.lego || [], // Now products is imported
//       subCollections: [
//         { name: 'LEGO City', href: '/collections/lego-city' },
//         { name: 'LEGO Technic', href: '/collections/lego-technic' },
//         { name: 'LEGO Friends', href: '/collections/lego-friends' },
//       ]
//     },
//     'barbie': {
//       id: 'barbie',
//       title: 'Barbie',
//       description: 'Barbie dolls, playsets, and accessories. Inspire imaginations with the world of Barbie.',
//       bannerImage: '/images/barbie-banner.jpg',
//       products: products.barbie || [], // Now products is imported
//       subCollections: [
//         { name: 'Barbie Dolls', href: '/collections/barbie-dolls' },
//         { name: 'Barbie Dreamhouse', href: '/collections/barbie-dreamhouse' },
//         { name: 'Barbie Accessories', href: '/collections/barbie-accessories' },
//       ]
//     }
//   }
  
//   return collections[slug] || null
// }

// export async function getFiltersForCollection(collectionId: string): Promise<FilterSection[]> {
//   await new Promise(resolve => setTimeout(resolve, 200))
//   return mockFilters // Now mockFilters is defined above
// }