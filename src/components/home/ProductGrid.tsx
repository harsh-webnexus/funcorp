'use client'

import { useState } from 'react'
import ProductCard from '@/components/ui/ProductCard'
import { FaTh, FaThList } from 'react-icons/fa'

interface Product {
  id: number
  title: string
  price: number
  comparePrice?: number | null
  image: string
  vendor: string
  badge?: string
}

interface ProductGridProps {
  products: Product[]
  totalProducts: number
  onSortChange: (sort: string) => void
  currentSort: string
  onLoadMore: () => void
  hasMore: boolean
  loading?: boolean
  collectionTitle?: string
}

export default function ProductGrid({
  products,
  totalProducts,
  onSortChange,
  currentSort,
  onLoadMore,
  hasMore,
  loading = false,
  collectionTitle
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const sortOptions = [
    { value: 'manual', label: 'Featured' },
    { value: 'best-selling', label: 'Best selling' },
    { value: 'title-ascending', label: 'Alphabetically, A-Z' },
    { value: 'title-descending', label: 'Alphabetically, Z-A' },
    { value: 'price-ascending', label: 'Price, low to high' },
    { value: 'price-descending', label: 'Price, high to low' },
    { value: 'created-descending', label: 'Date, new to old' },
    { value: 'created-ascending', label: 'Date, old to new' },
  ]

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filter</span>
          </button>
          
          {/* <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{products.length}</span> of{' '}
            <span className="font-medium">{totalProducts}</span> results
          </div> */}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Sort Dropdown */}
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#E9454D]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#E9454D] text-white' : 'text-gray-500 hover:text-[#E9454D]'}`}
            >
              <FaTh />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#E9454D] text-white' : 'text-gray-500 hover:text-[#E9454D]'}`}
            >
              <FaThList />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <>
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
              : 'space-y-4'
          }>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8 mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Showing {products.length} of {totalProducts} total</span>
              <span>{Math.round((products.length / totalProducts) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E9454D] rounded-full transition-all duration-300"
                style={{ width: `${(products.length / totalProducts) * 100}%` }}
              />
            </div>
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={onLoadMore}
                disabled={loading}
                className="px-8 py-3 bg-[#E9454D] text-white font-bold rounded-md hover:bg-[#d13a42] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Loading...' : 'Show More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}