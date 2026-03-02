import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/data'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductTabs from '@/components/product/ProductTabs'
import StickyAddToCart from '@/components/product/StickyAddToCart'
import RelatedProducts from '@/components/product/RelatedProducts'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

// FETCHING LOGIC - This finds the product by ID or handle
const getProductById = (id: string) => {
  console.log('🔍 Looking for product with ID/handle:', id)
  console.log('Type of ID:', typeof id)
  
  // Combine all products from your data
  const allProducts = [
    ...(products.actionFigures || []),
    ...(products.lego || []),
    ...(products.barbie || []),
    ...(products.softToys || []),
    ...(products.disneyPrincess || []),
    ...(products.hotWheels || []),
    ...(products.nerf || []),
    ...(products.funskool || []),
    ...(products.giggles || []),
    ...(products.majorette || []),
    ...(products.marvel || []),
    ...(products.ironman || []),
    ...(products.spiderman || []),
    ...(products.hulk || []),
    ...(products.avengers || []),
    ...(products.captainamerica || []),
    ...(products.batman || []),
    ...(products.superman || []),
    ...(products.wonderwoman || []),
    ...(products.disneyFrozen || []),
    ...(products.jurassicworld || []),
    ...(products.transformers || []),
    ...(products.starwars || []),
    ...(products.clearance || []),
    ...(products.packagingdamaged || []),
    ...(products.fisherprice || []),
    ...(products.hasbrogaming || []),
    ...(products.mattel || []),
    ...(products.mcfarlane || []),
    ...(products.monopoly || []),
    ...(products.playdoh || []),
    ...(products.playhour || []),
    ...(products.playshifu || []),
    ...(products.simba || []),
    ...(products.skillmatics || []),
    ...(products.uno || []),
  ]
  
  console.log('Total products loaded:', allProducts.length)
  console.log('First few product IDs:', allProducts.slice(0, 3).map(p => ({ 
    id: p.id, 
    type: typeof p.id,
    title: p.title?.substring(0, 30)
  })))
  
  // IMPORTANT: Convert both to string for comparison
  // Product IDs in data are numbers, URL params are strings
  const productById = allProducts.find(p => 
    String(p.id) === String(id) // Convert both to string for comparison
  )
  
  if (productById) {
    console.log('✅ Found product by ID:', productById.title)
    return productById
  }
  
  // If not found by ID, try by handle (URL-friendly name)
  const productByHandle = allProducts.find(p => 
    p.handle === id || 
    p.title?.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
  )
  
  if (productByHandle) {
    console.log('✅ Found product by handle:', productByHandle.title)
    return productByHandle
  }
  
  console.log('❌ Product not found for ID/handle:', id)
  console.log('Available IDs:', allProducts.slice(0, 10).map(p => p.id))
  return null
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params to get the ID
  const resolvedParams = await params
  const productId = resolvedParams.id
  
  console.log('='.repeat(50))
  console.log('ProductPage - Requested ID from URL:', productId)
  console.log('='.repeat(50))
  
  // Fetch the product
  const product = getProductById(productId)
  
  // If product not found, show 404 page
  if (!product) {
    console.log('❌ Product not found, showing 404')
    notFound()
  }
  
  console.log('✅ Product found, rendering page for:', product.title)
  
  // Generate collection slug from vendor
  const collectionSlug = product.vendor?.toLowerCase().replace(/\s+/g, '-') || 'products'
  
  // Get all products for related products (limit to avoid performance issues)
  const allProducts = [
    ...(products.actionFigures || []),
    ...(products.lego || []),
    ...(products.barbie || []),
    ...(products.softToys || []),
    ...(products.disneyPrincess || []),
    ...(products.hotWheels || []),
  ]
  
  // Find related products (same vendor or category)
  const relatedProducts = allProducts
    .filter(p => String(p.id) !== String(product.id) && (p.vendor === product.vendor || p.category === product.category))
    .slice(0, 8)
  
  return (
    <>
      <div className="bg-white">
        <div className="container-custom py-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#E9454D]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link 
              href={`/collections/${collectionSlug}`} 
              className="hover:text-[#E9454D]"
            >
              {product.vendor || 'Products'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.title}</span>
          </nav>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery 
              images={product.images || (product.image ? [product.image] : [])} 
              title={product.title}
            />
            <ProductInfo product={product} />
          </div>

          {/* Product Tabs */}
          <ProductTabs product={product} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} />
          )}
        </div>
      </div>

      {/* Sticky Add to Cart
      <StickyAddToCart product={product} /> */}
    </>
  )
}