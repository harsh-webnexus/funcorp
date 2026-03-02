'use client';

import { useCart } from '@/hooks/useCart';
import CartItems from '@/components/cart/CartItems';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Brand data
const brands = [
  { name: 'Disney', logo: '/brands/disney-logo.webp', href: '/collections/disney' },
  { name: 'Nerf', logo: '/brands/Nerf.webp', href: '/collections/nerf' },
  { name: 'Hot Wheels', logo: '/brands/Hot_Wheels.webp', href: '/collections/hot-wheels' },
  { name: 'Barbie', logo: '/brands/Barbie.webp', href: '/collections/barbie' },
  { name: 'Lego', logo: '/brands/Lego.webp', href: '/collections/lego' },
  { name: 'Funskool', logo: '/brands/FunskooL.webp', href: '/collections/funskool' },
  { name: 'Marvel', logo: '/brands/Marvel.webp', href: '/collections/marvel' },
  { name: 'Giggles', logo: '/brands/Giggles.webp', href: '/collections/giggles' },
  { name: 'Hasbro', logo: '/brands/Hasbro.webp', href: '/collections/hasbro-gaming' },
  { name: 'Fisher-Price', logo: '/brands/Fisher-Price.webp', href: '/collections/fisher-price' },
  { name: 'Mattel', logo: '/brands/Mattel.webp', href: '/collections/mattel-games' },
  { name: 'Majorette', logo: '/brands/majorette.avif', href: '/collections/majorette' },
];

export default function CartPage() {
  const { items, totalItems, isAuthenticated, isLoading } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isEmpty = !items || items.length === 0;

  // Redirect to login if trying to access cart while not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && items.length > 0) {
      router.push('/login?redirect=/cart');
    }
  }, [isAuthenticated, isLoading, items.length, router]);

  // Show loading state
  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#E9454D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading cart...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Shopping Cart
          </h1>
        </div>

        {!isAuthenticated ? (
          /* Not Logged In View */
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center mb-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.031M16 21v-2m4 0v-4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Please Login to View Cart</h2>
              <p className="text-gray-600 mb-6">You need to be logged in to view and manage your cart.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/login?redirect=/cart" 
                  className="bg-[#E9454D] text-white px-6 py-3 font-medium hover:bg-[#d13a42] transition-colors rounded-md"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="border border-[#E9454D] text-[#E9454D] px-6 py-3 font-medium hover:bg-[#E9454D] hover:text-white transition-colors rounded-md"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Popular Brands Section for non-logged in users */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Brands</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {brands.slice(0, 8).map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#E9454D]/30"
                  >
                    <div className="relative h-16 w-full mb-3">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-center text-sm font-medium text-gray-700 group-hover:text-[#E9454D] transition-colors">
                      {brand.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : isEmpty ? (
          /* Empty Cart View (Logged In) */
          <div className="max-w-6xl mx-auto">
            {/* Empty Cart Message */}
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center mb-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link 
                href="/" 
                className="inline-block bg-[#E9454D] text-white px-6 py-3 font-medium hover:bg-[#d13a42] transition-colors rounded-md"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Popular Brands Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Brands</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#E9454D]/30"
                  >
                    <div className="relative h-16 w-full mb-3">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-center text-sm font-medium text-gray-700 group-hover:text-[#E9454D] transition-colors">
                      {brand.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse All Products Link */}
            <div className="mt-12 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center text-[#E9454D] hover:text-[#d13a42] font-medium"
              >
                Browse All Products
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          /* Cart with Items - Show Summary */
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items - Left Column */}
            <div className="flex-1">
              <CartItems />
            </div>

            {/* Cart Summary - Right Column */}
            <div className="lg:w-96">
              <CartSummary />
              
              {/* Quick Brand Links */}
              <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Shop by Brand</h4>
                <div className="flex flex-wrap gap-2">
                  {brands.slice(0, 6).map((brand) => (
                    <Link
                      key={brand.name}
                      href={brand.href}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-md hover:bg-[#E9454D] hover:text-white transition-colors"
                    >
                      {brand.name}
                    </Link>
                  ))}
                  <Link href="/" className="text-xs px-2 py-1 text-[#E9454D] hover:underline">
                    View all
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}