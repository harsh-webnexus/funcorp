'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#E9454D] mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="bg-[#E9454D] text-white px-6 py-3 font-bold hover:bg-[#232323] transition-colors mr-4"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="bg-[#232323] text-white px-6 py-3 font-bold hover:bg-[#E9454D] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}