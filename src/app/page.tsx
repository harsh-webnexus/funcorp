import BrandSlider from '@/components/home/BrandSlider'
import SpotlightBlock from '@/components/home/SpotlightBlock'
import ProductBlock from '@/components/home/ProductBlock'
import AgeSection from '@/components/home/AgeSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import BrandTabBlock from '@/components/home/BrandTabBlock'
import CustomServiceBlock from '@/components/home/CustomServiceBlock'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Brand Slider */}
      <BrandSlider />
      
      {/* Spotlight Banner */}
      <SpotlightBlock />
      
      {/* Age Section */}
      <AgeSection />
      
      {/* Shop by Category */}
      <CategoryGrid />
      
      {/* Double Banner */}
      <section className="container-custom my-8 md:my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/collections/disney" className="block overflow-hidden group">
            <div className="relative aspect-[2/1] w-full">
              <Image 
                src="/images/Disney_mattel.webp" 
                alt="Disney Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </a>
          <a href="/collections/hot-wheels" className="block overflow-hidden group">
            <div className="relative aspect-[2/1] w-full">
              <Image 
                src="/images/Monster_trucks.webp" 
                alt="Hot Wheels Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </a>
        </div>
      </section>
      
      {/* Lego Shop */}
      <ProductBlock 
        title="THE LEGO SHOP"
        viewAllLink="/collections/lego"
        viewAllText="VISIT LEGO STORE"
        collection="lego"
        bgColor="#fbc80b"
      />
      
      {/* Lego Brand Tab */}
      <BrandTabBlock />
      
      {/* Barbie New Launches */}
      <ProductBlock 
        title="BARBIE NEW LAUNCHES"
        viewAllLink="/collections/barbie"
        viewAllText="VISIT BARBIE STORE"
        collection="barbie"
        bgColor="#f8badc"
      />
      
      {/* Themes & Characters */}
      <BrandTabBlock type="characters" />
      
      {/* Packaging Damaged Banner */}
      <section className="bg-[#e95144] py-12 md:py-16 my-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative aspect-[2/1] w-full">
                <Image 
                  src="/images/packaging-Damaged.webp" 
                  alt="Packaging Damaged Products"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              <h4 className="text-[#fccf39] text-lg md:text-xl font-bold mb-4">Limited Stocks*</h4>
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">PACKAGING DAMAGED PRODUCTS</h2>
              <p className="text-[#fccf39] mb-6">Get EXCITING DEALS on your favourite TOYS, GAMES & MORE!</p>
              <a 
                href="/collections/packaging-damaged" 
                className="inline-block bg-white text-[#232323] px-8 py-3 font-bold uppercase hover:bg-[#fccf39] transition-colors"
              >
                SHOP NOW
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Soft Toys */}
      <ProductBlock 
        title="SOFT TOYS & PLUSH"
        viewAllLink="/collections/soft-toys"
        viewAllText="VIEW ALL"
        collection="softToys"
      />
      
      {/* Brand Banners */}
      <section className="container-custom my-8 md:my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/collections/nerf" className="block overflow-hidden group">
            <div className="relative aspect-square w-full">
              <Image 
                src="/images/Nerf.webp" 
                alt="Nerf"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </a>
          <a href="/collections/play-doh" className="block overflow-hidden group">
            <div className="relative aspect-square w-full">
              <Image 
                src="/images/play_Doh.webp" 
                alt="Play-Doh"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </a>
          <a href="/collections/hasbro-gaming" className="block overflow-hidden group">
            <div className="relative aspect-square w-full">
              <Image 
                src="/images/Hasbro_Gaming.webp" 
                alt="Hasbro Gaming"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </a>
        </div>
      </section>
      
      {/* Books Section */}
      <section className="container-custom my-12">
        <div className="section-title">
          <h2>BOOKS FOR KIDS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <a href="/collections/early-learning-books" className="block">
              <div className="relative aspect-square w-full">
                <Image 
                  src="/images/Early_Learning_Books.webp" 
                  alt="Early Learning Books"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </a>
            <a href="/collections/story-books" className="block">
              <div className="relative aspect-square w-full">
                <Image 
                  src="/images/Story_Books.webp" 
                  alt="Story Books"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </a>
            <a href="/collections/interactive-activity-books" className="block">
              <div className="relative aspect-square w-full">
                <Image 
                  src="/images/Interactive_Activity_Books.webp" 
                  alt="Activity Books"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </a>
            <a href="/collections/picture-books" className="block">
              <div className="relative aspect-square w-full">
                <Image 
                  src="/images/Picture_Books.webp" 
                  alt="Picture Books"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </a>
          </div>
          <a href="/collections/drawing-books" className="block">
            <div className="relative aspect-square md:aspect-auto md:h-full w-full">
              <Image 
                src="/images/Drawing_Painting_Colouring_Books.webp" 
                alt="Drawing Books"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </a>
        </div>
      </section>
      
      
      
      {/* Payment Banner */}
      <section className="container-custom my-8">
        <div className="relative aspect-[3/1] w-full">
          <Image 
            src="/images/payment-banner.webp" 
            alt="Payment Options"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>
      
      {/* Why Choose Us */}
      <CustomServiceBlock />
    </div>
  )
}