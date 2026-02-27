'use client'

import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface FilterOption {
  label: string
  count: number
  value: string
}

interface FilterSection {
  title: string
  options: FilterOption[]
}

interface FilterSidebarProps {
  filters: FilterSection[]
  activeFilters: Record<string, string[]>
  onFilterChange: (filterType: string, value: string) => void
  onPriceRangeChange: (min: number, max: number) => void
  minPrice: number
  maxPrice: number
}

export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onPriceRangeChange,
  minPrice,
  maxPrice
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    filters.reduce((acc, filter) => ({ ...acc, [filter.title]: true }), {})
  )
  const [priceMin, setPriceMin] = useState(minPrice)
  const [priceMax, setPriceMax] = useState(maxPrice)

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }))
  }

  const handlePriceApply = () => {
    onPriceRangeChange(priceMin, priceMax)
  }

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).reduce(
    (acc, curr) => acc + curr.length, 0
  )

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#232323]">Filters</h2>
        {activeFilterCount > 0 && (
          <button 
            onClick={() => window.location.reload()} 
            className="text-sm text-[#E9454D] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Active Filters</span>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-[#E9454D] hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([type, values]) => (
              values.map(value => {
                const filter = filters.find(f => f.title === type)
                const option = filter?.options.find(o => o.value === value)
                return (
                  <button
                    key={`${type}-${value}`}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200"
                    onClick={() => onFilterChange(type, value)}
                  >
                    <span>{option?.label || value}</span>
                    <span className="text-xs ml-1">✕</span>
                  </button>
                )
              })
            ))}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-4">
        {filters.map((section) => (
          <div key={section.title} className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full text-left font-semibold text-[#232323]"
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              {expandedSections[section.title] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {expandedSections[section.title] && (
              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                {section.options.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#E9454D] group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D]"
                      checked={activeFilters[section.title]?.includes(option.value)}
                      onChange={() => onFilterChange(section.title, option.value)}
                    />
                    <span className="flex-1">{option.label}</span>
                    <span className="text-gray-400 text-xs">({option.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Price Range Filter */}
        <div className="border-b border-gray-200 pb-4">
          <button
            className="flex items-center justify-between w-full text-left font-semibold text-[#232323]"
            onClick={() => toggleSection('Price Range')}
          >
            <span>Price Range</span>
            {expandedSections['Price Range'] ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {expandedSections['Price Range'] && (
            <div className="mt-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Min</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                      min={0}
                      max={priceMax}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Max</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                      min={priceMin}
                      max={10000}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handlePriceApply}
                className="w-full bg-[#E9454D] text-white py-2 rounded-md text-sm font-medium hover:bg-[#d13a42] transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}