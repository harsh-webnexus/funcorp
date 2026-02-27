import { notFound } from 'next/navigation'
import Image from 'next/image'
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
  
  // Try to parse as numeric ID
  const numericId = parseInt(id)
  
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
  
  // Try to find by numeric ID first
  if (!isNaN(numericId)) {
    const productById = allProducts.find(p => p.id === numericId)
    if (productById) {
      console.log('✅ Found product by ID:', productById.title)
      return productById
    }
  }
  
  // If not found by ID, try by handle (URL-friendly name)
  const productByHandle = allProducts.find(p => 
    p.handle === id || 
    p.title.toLowerCase().replace(/\s+/g, '-') === id
  )
  
  if (productByHandle) {
    console.log('✅ Found product by handle:', productByHandle.title)
    return productByHandle
  }
  
  console.log('❌ Product not found for ID/handle:', id)
  return null
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params to get the ID
  const resolvedParams = await params
  const productId = resolvedParams.id
  
  // Fetch the product
  const product = getProductById(productId)
  
  // If product not found, show 404 page
  if (!product) {
    notFound()
  }
  
  // Generate collection slug from vendor
  const collectionSlug = product.vendor.toLowerCase().replace(/\s+/g, '-')
  
  // Get all products for related products
  const allProducts = [
    ...(products.actionFigures || []),
    ...(products.lego || []),
    ...(products.barbie || []),
    ...(products.softToys || []),
    ...(products.disneyPrincess || []),
  ]
  
  // Find related products (same vendor or category)
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.vendor === product.vendor || p.category === product.category))
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
              {product.vendor}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.title}</span>
          </nav>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery 
              images={product.images || [product.image]} 
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

      {/* Sticky Add to Cart */}
      <StickyAddToCart product={product} />
    </>
  )
}