'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:border-[#E9454D]"
      />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#E9454D] text-white px-6 py-2 rounded-full hover:bg-[#d13a42] transition-colors"
      >
        Search
      </button>
    </form>
  )
}