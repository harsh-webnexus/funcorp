// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import Link from 'next/link'
// import { FaTimes, FaChevronRight, FaChevronDown } from 'react-icons/fa'
// import { categories } from '@/lib/data'

// // Define types for brands
// interface Brand {
//   name: string;
//   href: string;
// }

// const brands: Brand[] = [
//   { name: 'Barbie', href: '/collections/barbie' },
//   { name: 'Lego', href: '/collections/lego' },
//   { name: 'Hot Wheels', href: '/collections/hot-wheels' },
//   { name: 'Nerf', href: '/collections/nerf' },
//   { name: 'Funskool', href: '/collections/funskool' },
//   { name: 'Giggles', href: '/collections/giggles' },
//   { name: 'Majorette', href: '/collections/majorette' },
//   { name: 'Disney', href: '/collections/disney' },
//   { name: 'Fisher Price', href: '/collections/fisher-price' },
//   { name: 'Hasbro Gaming', href: '/collections/hasbro-gaming' },
//   { name: 'Mattel Games', href: '/collections/mattel' },
//   { name: 'McFarlane', href: '/collections/mcfarlane' },
//   { name: 'Monopoly', href: '/collections/monopoly' },
//   { name: 'Ok Play', href: '/collections/ok-play' },
//   { name: 'Play-Doh', href: '/collections/play-doh' },
//   { name: 'Play Hour', href: '/collections/play-hour' },
//   { name: 'PlayShifu', href: '/collections/playshifu' },
//   { name: 'Simba', href: '/collections/simba' },
//   { name: 'Skillmatics', href: '/collections/skillmatics' },
//   { name: 'Spin Master', href: '/collections/spin-master' },
//   { name: 'Thomas & Friends', href: '/collections/thomas-friends' },
//   { name: 'Uno', href: '/collections/uno' },
// ]

// export default function MobileMenu() {
//   const [isOpen, setIsOpen] = useState<boolean>(false)
//   const [showCategories, setShowCategories] = useState<boolean>(false)
//   const [showTopBrands, setShowTopBrands] = useState<boolean>(false)
//   const [showShopByTheme, setShowShopByTheme] = useState<boolean>(false)
//   const [showOtherBrands, setShowOtherBrands] = useState<boolean>(false)
//   const [showShopByAge, setShowShopByAge] = useState<boolean>(false)
//   const [showSpecialOffers, setShowSpecialOffers] = useState<boolean>(false)
  
//   // Refs for hover tracking
//   const topBrandsRef = useRef<HTMLDivElement>(null)
//   const shopByThemeRef = useRef<HTMLDivElement>(null)
//   const otherBrandsRef = useRef<HTMLDivElement>(null)
//   const shopByAgeRef = useRef<HTMLDivElement>(null)
//   const specialOffersRef = useRef<HTMLDivElement>(null)

//   // Debug hover events
//   const handleTopBrandsMouseEnter = () => {
//     console.log('Mouse entered Top Brands')
//     setShowTopBrands(true)
//   }

//   const handleTopBrandsMouseLeave = () => {
//     console.log('Mouse left Top Brands')
//     setShowTopBrands(false)
//   }

//   // Handle click outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (topBrandsRef.current && !topBrandsRef.current.contains(event.target as Node)) {
//         setShowTopBrands(false)
//       }
//       if (shopByThemeRef.current && !shopByThemeRef.current.contains(event.target as Node)) {
//         setShowShopByTheme(false)
//       }
//       if (otherBrandsRef.current && !otherBrandsRef.current.contains(event.target as Node)) {
//         setShowOtherBrands(false)
//       }
//       if (shopByAgeRef.current && !shopByAgeRef.current.contains(event.target as Node)) {
//         setShowShopByAge(false)
//       }
//       if (specialOffersRef.current && !specialOffersRef.current.contains(event.target as Node)) {
//         setShowSpecialOffers(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-50"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Menu Panel */}
//       <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="font-bold text-lg">Menu</h2>
//           <button onClick={() => setIsOpen(false)} className="p-2">
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <div className="overflow-y-auto h-full pb-20">
//           {/* Categories */}
//           <div className="border-b">
//             <button 
//               onClick={() => setShowCategories(!showCategories)}
//               className="flex items-center justify-between w-full p-4 font-bold hover:bg-gray-50"
//             >
//               <span>Categories</span>
//               <FaChevronRight className={`transform transition-transform ${showCategories ? 'rotate-90' : ''}`} />
//             </button>
            
//             {showCategories && (
//               <div className="bg-gray-50">
//                 {categories.map((category) => (
//                   <Link
//                     key={category.name}
//                     href={category.href}
//                     className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white transition-colors"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {category.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Top Brands with hover dropdown */}
//           <div 
//             ref={topBrandsRef}
//             className="border-b relative"
//             onMouseEnter={handleTopBrandsMouseEnter}
//             onMouseLeave={handleTopBrandsMouseLeave}
//           >
//             <div 
//               className="flex items-center justify-between w-full p-4 font-bold hover:bg-gray-50 cursor-pointer"
//               onClick={() => setShowTopBrands(!showTopBrands)}
//             >
//               <span>Top Brands</span>
//               <FaChevronDown className={`transform transition-transform ${showTopBrands ? 'rotate-180' : ''}`} />
//             </div>
            
//             {/* Dropdown menu - positioned absolutely for better hover control */}
//             {showTopBrands && (
//               <div 
//                 className="bg-gray-50 max-h-64 overflow-y-auto absolute left-0 right-0 z-10 shadow-lg"
//                 onMouseEnter={() => setShowTopBrands(true)}
//                 onMouseLeave={() => setShowTopBrands(false)}
//               >
//                 {brands.slice(0, 8).map((brand) => (
//                   <Link
//                     key={brand.name}
//                     href={brand.href}
//                     className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white transition-colors"
//                     onClick={() => {
//                       setIsOpen(false)
//                       setShowTopBrands(false)
//                     }}
//                   >
//                     {brand.name}
//                   </Link>
//                 ))}
//                 <Link
//                   href="/pages/brands"
//                   className="block p-3 pl-8 font-semibold text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors border-t"
//                   onClick={() => {
//                     setIsOpen(false)
//                     setShowTopBrands(false)
//                   }}
//                 >
//                   View All Brands →
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Shop by Theme with hover dropdown */}
//           <div 
//             ref={shopByThemeRef}
//             className="border-b relative"
//             onMouseEnter={() => setShowShopByTheme(true)}
//             onMouseLeave={() => setShowShopByTheme(false)}
//           >
//             <div 
//               className="flex items-center justify-between w-full p-4 font-bold hover:bg-gray-50 cursor-pointer"
//               onClick={() => setShowShopByTheme(!showShopByTheme)}
//             >
//               <span>Shop by Theme</span>
//               <FaChevronDown className={`transform transition-transform ${showShopByTheme ? 'rotate-180' : ''}`} />
//             </div>
            
//             {showShopByTheme && (
//               <div 
//                 className="bg-gray-50 absolute left-0 right-0 z-10 shadow-lg"
//                 onMouseEnter={() => setShowShopByTheme(true)}
//                 onMouseLeave={() => setShowShopByTheme(false)}
//               >
//                 <div className="p-2">
//                   <p className="px-4 py-2 text-sm font-semibold text-gray-500">DISNEY CHARACTERS</p>
//                   <Link href="/collections/disney-princess" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Disney Princess</Link>
//                   <Link href="/collections/disney-frozen" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Disney Frozen</Link>
//                   <Link href="/collections/disney" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Disney (All Products)</Link>
//                 </div>
//                 <div className="p-2 border-t">
//                   <p className="px-4 py-2 text-sm font-semibold text-gray-500">MARVEL UNIVERSE</p>
//                   <Link href="/collections/spiderman" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Spiderman</Link>
//                   <Link href="/collections/iron-man" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Iron Man</Link>
//                   <Link href="/collections/hulk" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Hulk</Link>
//                   <Link href="/collections/captain-america" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Captain America</Link>
//                   <Link href="/collections/avengers" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Avengers</Link>
//                 </div>
//                 <div className="p-2 border-t">
//                   <p className="px-4 py-2 text-sm font-semibold text-gray-500">DC UNIVERSE</p>
//                   <Link href="/collections/batman" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Batman</Link>
//                   <Link href="/collections/superman" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Superman</Link>
//                   <Link href="/collections/wonder-woman" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Wonder Woman</Link>
//                 </div>
//                 <div className="p-2 border-t">
//                   <Link href="/collections/jurassic-world" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Jurassic World</Link>
//                   <Link href="/collections/transformers" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Transformers</Link>
//                   <Link href="/collections/star-wars" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Star Wars</Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Other Brands with hover dropdown */}
//           <div 
//             ref={otherBrandsRef}
//             className="border-b relative"
//             onMouseEnter={() => setShowOtherBrands(true)}
//             onMouseLeave={() => setShowOtherBrands(false)}
//           >
//             <div 
//               className="flex items-center justify-between w-full p-4 font-bold hover:bg-gray-50 cursor-pointer"
//               onClick={() => setShowOtherBrands(!showOtherBrands)}
//             >
//               <span>Other Brands</span>
//               <FaChevronDown className={`transform transition-transform ${showOtherBrands ? 'rotate-180' : ''}`} />
//             </div>
            
//             {showOtherBrands && (
//               <div 
//                 className="bg-gray-50 max-h-64 overflow-y-auto absolute left-0 right-0 z-10 shadow-lg"
//                 onMouseEnter={() => setShowOtherBrands(true)}
//                 onMouseLeave={() => setShowOtherBrands(false)}
//               >
//                 {brands.slice(8).map((brand) => (
//                   <Link
//                     key={brand.name}
//                     href={brand.href}
//                     className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white transition-colors"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {brand.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Shop by Age with hover dropdown */}
//           <div 
//             ref={shopByAgeRef}
//             className="border-b relative"
//             onMouseEnter={() => setShowShopByAge(true)}
//             onMouseLeave={() => setShowShopByAge(false)}
//           >
//             <div 
//               className="flex items-center justify-between w-full p-4 font-bold hover:bg-gray-50 cursor-pointer"
//               onClick={() => setShowShopByAge(!showShopByAge)}
//             >
//               <span>Shop by Age</span>
//               <FaChevronDown className={`transform transition-transform ${showShopByAge ? 'rotate-180' : ''}`} />
//             </div>
            
//             {showShopByAge && (
//               <div 
//                 className="bg-gray-50 absolute left-0 right-0 z-10 shadow-lg"
//                 onMouseEnter={() => setShowShopByAge(true)}
//                 onMouseLeave={() => setShowShopByAge(false)}
//               >
//                 <Link href="/collections/0-12-months" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>0 to 12 Months</Link>
//                 <Link href="/collections/age-1-2-years" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>1 to 3 Years</Link>
//                 <Link href="/collections/age-3-4-years" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>4 to 7 Years</Link>
//                 <Link href="/collections/age-8-11-years" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>8 to 10 Years</Link>
//                 <Link href="/collections/age-12-14-years" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>11 to 14 Years</Link>
//                 <Link href="/collections/age-5-7-years" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>14+ Years</Link>
//               </div>
//             )}
//           </div>

//           {/* Special Offers with hover dropdown */}
//           <div 
//             ref={specialOffersRef}
//             className="border-b relative"
//             onMouseEnter={() => setShowSpecialOffers(true)}
//             onMouseLeave={() => setShowSpecialOffers(false)}
//           >
//             <div 
//               className="flex items-center justify-between w-full p-4 font-bold hover:bg-gray-50 cursor-pointer"
//               onClick={() => setShowSpecialOffers(!showSpecialOffers)}
//             >
//               <span>Special Offers</span>
//               <FaChevronDown className={`transform transition-transform ${showSpecialOffers ? 'rotate-180' : ''}`} />
//             </div>
            
//             {showSpecialOffers && (
//               <div 
//                 className="bg-gray-50 absolute left-0 right-0 z-10 shadow-lg"
//                 onMouseEnter={() => setShowSpecialOffers(true)}
//                 onMouseLeave={() => setShowSpecialOffers(false)}
//               >
//                 <Link href="/collections/clearance" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Clearance</Link>
//                 <Link href="/collections/packaging-damaged" className="block p-3 pl-8 hover:bg-[#E9454D] hover:text-white" onClick={() => setIsOpen(false)}>Packaging Damaged</Link>
//               </div>
//             )}
//           </div>

//           {/* Account Links */}
//           <div className="p-4 border-t mt-4">
//             <Link href="https://customer.funcorp.in?locale=en&region_country=IN" className="block mb-3 font-medium hover:text-[#E9454D]" onClick={() => setIsOpen(false)}>Sign In</Link>
//             <Link href="https://customer.funcorp.in?locale=en&region_country=IN" className="block font-medium hover:text-[#E9454D]" onClick={() => setIsOpen(false)}>Create Account</Link>
//           </div>

//           {/* Contact Link */}
//           <div className="p-4 border-t">
//             <Link href="/pages/contact" className="block font-medium hover:text-[#E9454D]" onClick={() => setIsOpen(false)}>Contact Us</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }