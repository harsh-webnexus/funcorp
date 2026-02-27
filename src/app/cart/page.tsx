import Link from 'next/link'
import CartItems from '@/components/cart/CartItems'
import CartSummary from '@/components/cart/CartSummary'

export default function CartPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#E9454D]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Your cart</span>
        </nav>

        {/* Page Header */}
        <h1 className="page-header text-center text-2xl md:text-3xl font-bold mb-8">
          Your cart
        </h1>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* Cart Summary - Right Column */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}