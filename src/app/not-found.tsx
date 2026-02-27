import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#E9454D] mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="mb-8">The page you are looking for doesnot exist.</p>
        <Link 
          href="/" 
          className="bg-[#E9454D] text-white px-6 py-3 font-bold hover:bg-[#232323] transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}