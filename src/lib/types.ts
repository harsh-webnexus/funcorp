


// Category types for navigation
export interface Category {
  name: string
  href: string
  icon?: string
}

// Brand types for brand slider
export interface Brand {
  name: string
  logo: string
  href: string
}

// Age group types for age section
export interface AgeGroup {
  name: string
  image: string
  href: string
}

// Collection page types
export interface SubCollection {
  id: string  // Add id field
  name: string
  href: string
  image?: string
}

// Add ParentCollection interface
export interface ParentCollection {
  id: string
  name: string  // Use 'name' to match your existing pattern
  href: string
}

export interface Collection {
  id: string
  title: string
  description: string
  bannerImage?: string
  products: Product[]
  subCollections?: SubCollection[]
  totalProducts?: number
  parentCollection?: ParentCollection  // Add this optional property
}

export interface CategoryItem {
  name: string;
  href: string;
  subCategories?: { name: string; href: string; }[];
}

// Filter types
export interface FilterOption {
  label: string
  count: number
  value: string
}

export interface FilterSection {
  title: string
  options: FilterOption[]
}

// You can also add other shared types here as your project grows
export interface Character {
  name: string
  logo: string
  href: string
}

export interface Testimonial {
  id: number
  name: string
  comment: string
  rating: number
  image?: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  slug: string
}
export interface Product {
  id: number
  title: string
  handle?: string
  description?: string
  vendor: string
  category?: string
  price: number
  comparePrice?: number | null  // Allow null
  image: string
  images?: string[]
  sku?: string
  available?: boolean
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: number
  title: string
  price: number
  available: boolean
  sku?: string
}