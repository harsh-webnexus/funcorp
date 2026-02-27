import ProductCard from '@/components/ui/ProductCard'
import { Product } from '@/lib/types' // Import your Product type

interface RelatedProductsProps {
  products: Product[] // Use the actual Product type
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold text-center mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}