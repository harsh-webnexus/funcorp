'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaBars, FaChevronRight } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'

// Define the type for category items
interface CategoryItem {
  name: string;
  href?: string;
  subItems?: { name: string; href: string; }[];
}

// Categories data
const categories: CategoryItem[] = [
  { 
    name: 'ACTION FIGURES', 
     href: '/collections/action-figures'
  },
  { 
    name: 'ACTIVITY TOYS & KITS', 
    
    subItems: [
      { name: 'Art & Craft Kits', href: '/collections/art-craft-kits' },
      { name: 'Dough & Clay Kits', href: '/collections/dough-clay' },
      { name: 'Interactive Toys', href: '/collections/interactive-toys' },
      { name: 'Learning & Educational', href: '/collections/learning-educational' },
      { name: 'playsets', href: '/collections/playsets' },
    ]
  },
  { 
    name: 'BABY & TODDLER TOYS', 
   
    subItems: [
      { name: 'Baby Toys', href: '/collections/baby-toys' },
      { name: 'Bath Toys', href: '/collections/bath-toys' },
      { name: 'Pull-Along Toys', href: '/collections/pull-along-toys' },
      
    ]
  },
  { 
    name: 'BOOKS FOR KIDS', 
    
    subItems: [
      { name: 'Colouring Books', href: '/collections/colouring-books' },
      { name: 'Drawing Painting & Colouring Books', href: '/collections/drawing-books' },
      { name: 'Early Learning Books', href: '/collections/early-learning-books' },
      { name: 'Interactive & Activity Books', href: '/collections/activity-books' },
      { name: 'Picture Books', href: '/collections/picture-books' },
      { name: 'Reference Books', href: '/collections/reference-books' },
      { name: 'Story Books', href: '/collections/story-books' },
    ]
  },
  { 
    name: 'BUILDING & CONSTRUCTION', 
    href: '/collections/building-construction'
  },
  { 
    name: 'CARS, VEHICLES, TRAINS & TRACKS', 
    
    subItems: [
      { name: 'Cars & Vehicle Playsets', href: '/collections/cars-playsets' },
      { name: 'Remote Controlled (RC) Cars & Vehicles', href: '/collections/rc-cars' },
      { name: 'Ride-On Toys', href: '/collections/ride-on-toys' },
      { name: 'Trains & Railway Sets', href: '/collections/trains-railway' },
      
    ]
  },
  { 
    name: 'COLLECTIBLES', 
    href: '/collections/collectibles'
  },
  { 
    name: 'DOLLS', 
   
    subItems: [
      { name: 'Dolls & Accessories', href: '/collections/dolls-accessories' },
      { name: 'Doll Houses', href: '/collections/doll-houses' },
      
    ]
  },
  { 
    name: 'GAMES & PUZZLES', 
    
   subItems: [
      { name: 'Board Games', href: '/collections/board-games' },
      { name: 'Card Games', href: '/collections/card-games' },
      { name: 'Puzzles', href: '/collections/puzzles' },
     
    ]
  },
  { 
    name: 'OUTDOOR PLAY & SPORTS', 
    href: '/collections/outdoor-sports'
  },
  { 
    name: 'PLAY & SCHOOL FURNITURE', 
    href: '/collections/play-school-furniture'
  },
  { 
    name: 'SOFT TOYS & PLUSH', 
    href: '/collections/soft-toys'
  },
  { 
    name: 'TOY GUNS & BULLETS', 
    href: '/collections/toy-guns-bullets'
  },
  { 
    name: 'OTHER TOYS & GAMES', 
    
    subItems: [
      { name: 'Bubbleheads', href: '/collections/bubbleheads' },
      { name: 'Costumes & Masks', href: '/collections/costumes-masks' },
      { name: 'Musical Toys & Speakers', href: '/collections/musical-toys' },
      { name: 'Spinning Tops', href: '/collections/spinning-tops' },
    ]
  },
  { 
    name: 'PARTY DECORATIONS', 
    href: '/collections/party-decorations'
  }
]

// Dropdown data for other menus
const dropdownData = {
  'top-brands': [
    { name: 'Barbie', href: '/collections/barbie' },
    { name: 'Lego', href: '/collections/lego' },
    { name: 'Hot Wheels', href: '/collections/hot-wheels' },
    { name: 'Nerf', href: '/collections/nerf' },
    { name: 'Funskool', href: '/collections/funskool' },
    { name: 'Giggles', href: '/collections/giggles' },
    { name: 'Majorette', href: '/collections/majorette' },
    { name: 'Disney', href: '/collections/disney' },
    // { name: 'All Brands', href: '/' },
  ],
  'shop-by-theme': [
    { 
      name: 'Disney Characters', 
      href: '/collections/disney',
      subItems: [
        { name: 'Disney Princess', href: '/collections/disney-princess' },
        { name: 'Disney Frozen', href: '/collections/disney-frozen' },
        { name: 'Disney (All Products)', href: '/collections/disney' }
      ]
    },
    { 
      name: 'Marvel Universe', 
      href: '/collections/marvel',
      subItems: [
        { name: 'Spiderman', href: '/collections/spiderman' },
        { name: 'Iron Man', href: '/collections/iron-man' },
        { name: 'Hulk', href: '/collections/hulk' },
        { name: 'Captain America', href: '/collections/captain-america' },
        { name: 'Avengers', href: '/collections/avengers' }
      ]
    },
    { 
      name: 'DC Universe', 
      href: '/collections/dc',
      subItems: [
        { name: 'Batman', href: '/collections/batman' },
        { name: 'Superman', href: '/collections/superman' },
        { name: 'Wonder Woman', href: '/collections/wonder-woman' }
      ]
    },
    { name: 'Jurassic World', href: '/collections/jurassic-world' },
    { name: 'Transformers', href: '/collections/transformers' },
    { name: 'Star Wars', href: '/collections/star-wars' },
  ],
  'other-brands': [
    
    { name: 'Fisher Price', href: '/collections/fisher-price' },
    { name: 'Hasbro Gaming', href: '/collections/hasbro-gaming' },
    { name: 'Mattel Games', href: '/collections/mattel-games' },
    { name: 'McFarlane', href: '/collections/mcfarlane' },
    { name: 'Monopoly', href: '/collections/monopoly' },
    { name: 'Ok Play', href: '/collections/ok-play' },
    { name: 'Play-Doh', href: '/collections/play-doh' },
    { name: 'Play Hour', href: '/collections/play-hour' },
    { name: 'PlayShifu', href: '/collections/playshifu' },
    { name: 'Simba', href: '/collections/simba' },
    { name: 'Skillmatics', href: '/collections/skillmatics' },
    { name: 'Spin Master', href: '/collections/spin-master' },
    { name: 'Thomas & Friends', href: '/collections/thomas-friends' },
    { name: 'Uno', href: '/collections/uno' },
  ],
  'shop-by-age': [
    { name: '0 To 12 Months', href: '/collections/0-12-months' },
    { name: '1 To 3 Years', href: '/collections/1-3-years' },
    { name: '4 To 7 Years', href: '/collections/4-7-years' },
    { name: '8 To 10 Years', href: '/collections/8-10-years' },
    { name: '11 To 14 Years', href: '/collections/11-14-years' },
    { name: '14+ Years', href: '/collections/14-plus' },
  ],
  'special-offers': [
    { name: 'Clearance', href: '/collections/clearance' },
    { name: 'Packaging Damaged', href: '/collections/packaging-damaged' },
  ],
}

export default function Header() {
  const { user, isLoading, logout } = useAuth();
  const { totalItems: wishlistCount } = useWishlist();
  const { totalItems: cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
    setActiveSubMenu(null)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
    setActiveSubMenu(null)
  }

  const handleCategoriesMouseEnter = () => {
    setShowCategories(true)
  }

  const handleCategoriesMouseLeave = () => {
    setShowCategories(false)
    setActiveSubMenu(null)
  }

  const handleSubMenuEnter = (itemName: string) => {
    setActiveSubMenu(itemName)
  }

  const handleSubMenuLeave = () => {
    setActiveSubMenu(null)
  }

  // Get display name (either full name or email)
  const displayName = user.name || user.email;
  const displayInitial = displayName ? displayName.charAt(0).toUpperCase() : '?';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom max-w-7xl mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/Logo.avif" 
              alt="FunCorp" 
              width={200} 
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search the store"
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#fd6506]"
              />
              <button className="absolute right-0 top-0 h-full px-6 bg-[#fd6506] text-white rounded-full hover:bg-[#E9454D] transition-colors">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {/* User Menu - Shows email instead of Sign In when authenticated */}
            {!isLoading && (
              <>
                {user.isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center space-x-2 text-[#E9454D] hover:text-[#fccf39] transition-colors"
                    >
                      <div className="w-8 h-8 bg-[#E9454D] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {displayInitial}
                      </div>
                      <span className="hidden lg:block text-sm max-w-[100px] truncate">
                        {displayName}
                      </span>
                    </button>

                    {/* User Dropdown */}
                    {isUserDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsUserDropdownOpen(false)}
                        />
                        
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                          <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {user.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {user.email}
                            </p>
                          </div>
                          
                          <Link
                            href="/profile"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9454D] hover:text-white transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            My Account
                          </Link>
                          
                          <Link
                            href="/orders"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9454D] hover:text-white transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            My Orders
                          </Link>
                          
                          <Link
                            href="/wishlist"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#E9454D] hover:text-white transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Wishlist
                          </Link>
                          
                          <button
                            onClick={() => {
                              logout();
                              setIsUserDropdownOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200 mt-2 pt-2"
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link href="/account" className="hidden lg:flex items-center text-[#E9454D] hover:text-[#fccf39] transition-colors">
                    <FaUser size={20} className="mr-2" />
                    <span className="text-sm">Sign In</span>
                  </Link>
                )}
              </>
            )}
            
            {/* Wishlist Icon with Dynamic Count */}
            <Link href="/wishlist" className="relative text-[#E9454D] hover:text-[#fccf39] transition-colors">
              <FaHeart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fccf39] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart Icon with Dynamic Count */}
            <Link href="/cart" className="relative text-[#E9454D] hover:text-[#fccf39] transition-colors">
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fccf39] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-[#E9454D]"
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:block border-t border-gray-200">
          <div className="flex items-center">
            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleCategoriesMouseEnter}
              onMouseLeave={handleCategoriesMouseLeave}
            >
              <button className="flex items-center px-6 py-3 bg-[#E9454D] text-white font-bold">
                <span className="mr-2">☰</span>
                Categories
              </button>
              
{showCategories && (
  <div className="absolute left-0 top-full w-[280px] bg-white shadow-lg z-50">
    <ul className="py-1">
      {categories.map((category) => (
        <li 
          key={category.name}
          className="relative"
          onMouseEnter={() => category.subItems && handleSubMenuEnter(category.name)}
          onMouseLeave={handleSubMenuLeave}
        >
          {/* Conditionally render Link or span based on whether href exists */}
          {category.href ? (
            <Link 
              href={category.href}
              className="flex items-center justify-between px-3 py-1.5 text-xs text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors font-medium"
              onClick={() => setShowCategories(false)}
            >
              <span className="truncate">{category.name}</span>
              {category.subItems && <FaChevronRight className="text-[10px]" />}
            </Link>
          ) : (
            <div className="flex items-center justify-between px-3 py-1.5 text-xs text-[#E9454D] font-medium cursor-default">
              <span className="truncate">{category.name}</span>
              {category.subItems && <FaChevronRight className="text-[10px]" />}
            </div>
          )}
          
          {/* Sub-menu for categories with subItems */}
          {category.subItems && activeSubMenu === category.name && (
            <div className="absolute left-full top-0 w-[250px] bg-white shadow-lg z-50 border-l border-gray-200">
              <ul className="py-1">
                {category.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link 
                      href={subItem.href}
                      className="block px-3 py-1.5 text-xs text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors"
                      onClick={() => {
                        setShowCategories(false)
                        setActiveSubMenu(null)
                      }}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
)}
            </div>

            {/* Main Menu with Dropdowns */}
            <ul className="flex items-center ml-8 space-x-1">
              {/* Top Brands */}
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('top-brands')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="inline-block cursor-default px-4 py-3 text-[#E9454D] font-bold hover:bg-[#E9454D] hover:text-white transition-colors">
                  Top Brands
                </span>
                {activeDropdown === 'top-brands' && (
                  <div className="absolute left-0 top-full w-[220px] bg-white shadow-lg z-50">
                    <ul className="py-2">
                      {dropdownData['top-brands'].map((item) => (
                        <li key={item.name}>
                          <Link 
                            href={item.href}
                            className="block px-6 py-2.5 text-sm text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Shop by Theme */}
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('shop-by-theme')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="inline-block cursor-default px-4 py-3 text-[#E9454D] font-bold hover:bg-[#E9454D] hover:text-white transition-colors">
                  Shop by Theme
                </span>
                {activeDropdown === 'shop-by-theme' && (
                  <div className="absolute left-0 top-full w-[280px] bg-white shadow-lg z-50">
                    <ul className="py-2">
                      {dropdownData['shop-by-theme'].map((item) => (
                        <li 
                          key={item.name}
                          className="relative"
                          onMouseEnter={() => item.subItems && handleSubMenuEnter(item.name)}
                          onMouseLeave={handleSubMenuLeave}
                        >
                          <Link 
                            href={item.href}
                            className="flex items-center justify-between px-6 py-2.5 text-sm text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span>{item.name}</span>
                            {item.subItems && <FaChevronRight className="text-xs" />}
                          </Link>
                          
                          {/* Sub-menu for items with subItems */}
                          {item.subItems && activeSubMenu === item.name && (
                            <div className="absolute left-full top-0 w-[220px] bg-white shadow-lg z-50">
                              <ul className="py-2">
                                {item.subItems.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link 
                                      href={subItem.href}
                                      className="block px-6 py-2.5 text-sm text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors"
                                      onClick={() => {
                                        setActiveDropdown(null)
                                        setActiveSubMenu(null)
                                      }}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Other Brands */}
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('other-brands')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="inline-block cursor-default px-4 py-3 text-[#E9454D] font-bold hover:bg-[#E9454D] hover:text-white transition-colors">
                  Other Brands
                </span>
                {activeDropdown === 'other-brands' && (
                  <div className="absolute left-0 top-full w-[240px] bg-white shadow-lg z-50 max-h-[400px] overflow-y-auto">
                    <ul className="py-2">
                      {dropdownData['other-brands'].map((item) => (
                        <li key={item.name}>
                          <Link 
                            href={item.href}
                            className="block px-6 py-2.5 text-sm text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Shop by Age */}
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('shop-by-age')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="inline-block cursor-default px-4 py-3 text-[#E9454D] font-bold hover:bg-[#E9454D] hover:text-white transition-colors">
                  Shop by Age
                </span>
                {activeDropdown === 'shop-by-age' && (
                  <div className="absolute left-0 top-full w-[220px] bg-white shadow-lg z-50">
                    <ul className="py-2">
                      {dropdownData['shop-by-age'].map((item) => (
                        <li key={item.name}>
                          <Link 
                            href={item.href}
                            className="block px-6 py-2.5 text-sm text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Special Offers */}
              <li 
                className="relative"
                onMouseEnter={() => handleMouseEnter('special-offers')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="inline-block cursor-default px-4 py-3 text-[#E9454D] font-bold hover:bg-[#E9454D] hover:text-white transition-colors">
                  Special Offers
                </span>
                {activeDropdown === 'special-offers' && (
                  <div className="absolute left-0 top-full w-[220px] bg-white shadow-lg z-50">
                    <ul className="py-2">
                      {dropdownData['special-offers'].map((item) => (
                        <li key={item.name}>
                          <Link 
                            href={item.href}
                            className="block px-6 py-2.5 text-sm text-[#E9454D] hover:bg-[#E9454D] hover:text-white transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
            <div className="p-4">
              {/* Mobile User Info */}
              {user.isAuthenticated ? (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  href="/account" 
                  className="block mb-4 p-3 bg-[#E9454D] text-white text-center rounded-lg hover:bg-[#d13d45]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In / Register
                </Link>
              )}
              
              <ul className="space-y-2">
                <li><Link href="/collections/top-brands" className="block py-2 text-[#E9454D] font-bold" onClick={() => setIsMenuOpen(false)}>Top Brands</Link></li>
                <li><Link href="/collections/shop-by-theme" className="block py-2 text-[#E9454D] font-bold" onClick={() => setIsMenuOpen(false)}>Shop by Theme</Link></li>
                <li><Link href="/collections/other-brands" className="block py-2 text-[#E9454D] font-bold" onClick={() => setIsMenuOpen(false)}>Other Brands</Link></li>
                <li><Link href="/collections/shop-by-age" className="block py-2 text-[#E9454D] font-bold" onClick={() => setIsMenuOpen(false)}>Shop by Age</Link></li>
                <li><Link href="/collections/special-offers" className="block py-2 text-[#E9454D] font-bold" onClick={() => setIsMenuOpen(false)}>Special Offers</Link></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}