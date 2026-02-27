import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#e95144] text-white">
      {/* Main Footer */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Information Column */}
          <div>
            <h3 className="text-[#fccf39] font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link href="/returns" className="hover:text-[#fccf39]">Returns & Cancellation</Link></li>
              <li><Link href="/refund" className="hover:text-[#fccf39]">Refunds</Link></li>
              <li><Link href="/shipping" className="hover:text-[#fccf39]">Shipping Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-[#fccf39]">Privacy and Cookies</Link></li>
              <li><Link href="/terms" className="hover:text-[#fccf39]">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-[#fccf39]">Contact Us</Link></li>
            </ul>
          </div>

          {/* Featured Brands Column */}
          <div>
            <h3 className="text-[#fccf39] font-bold mb-4">Featured Brands</h3>
            <ul className="space-y-2">
              <li><Link href="/collections/barbie" className="hover:text-[#fccf39]">Barbie</Link></li>
              <li><Link href="/collections/disney" className="hover:text-[#fccf39]">Disney</Link></li>
              <li><Link href="/collections/lego" className="hover:text-[#fccf39]">Lego</Link></li>
              <li><Link href="/collections/hot-wheels" className="hover:text-[#fccf39]">Hot Wheels</Link></li>
              <li><Link href="/collections/nerf" className="hover:text-[#fccf39]">Nerf</Link></li>
              <li><Link href="/collections/marvel" className="hover:text-[#fccf39]">Marvel</Link></li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-[#fccf39] font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/collections/baby-toys" className="hover:text-[#fccf39]">Toys & Games</Link></li>
              <li><Link href="/collections/baby-care" className="hover:text-[#fccf39]">Baby Care & Gear</Link></li>
              <li><Link href="/collections/party-decorations" className="hover:text-[#fccf39]">Party Decorations</Link></li>
              <li><Link href="/collections/books" className="hover:text-[#fccf39]">Kids Books</Link></li>
              <li><Link href="/collections/action-figures" className="hover:text-[#fccf39]">Action Figures</Link></li>
              <li><Link href="/collections/collectibles" className="hover:text-[#fccf39]">Collectibles</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-[#fccf39] font-bold mb-4">Newsletter Sign Up</h3>
            <p className="text-sm mb-4">Sign up for exclusive updates, new arrivals & insider only discounts</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 bg-[#fccf39] text-[#e95144] placeholder-[#e95144] border border-white focus:outline-none"
              />
              <button className="bg-white text-[#e9454d] px-6 py-2 font-bold hover:bg-[#e9454d] hover:text-white transition-colors">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <h3 className="text-[#fccf39] font-bold mb-4 text-center">Follow FunCorp Here</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="bg-white p-3 rounded-full text-[#ffc206] hover:bg-[#ffc206] hover:text-white transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="bg-white p-3 rounded-full text-[#ffc206] hover:bg-[#ffc206] hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="bg-white p-3 rounded-full text-[#ffc206] hover:bg-[#ffc206] hover:text-white transition-colors">
              <FaYoutube size={20} />
            </a>
            <a href="#" className="bg-white p-3 rounded-full text-[#ffc206] hover:bg-[#ffc206] hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#fccf39] py-4">
        <div className="container-custom text-center text-[#e95144] text-sm">
          <p>ⓒ2024 FUNCORP BUSINESS PRIVATE LIMITED</p>
        </div>
      </div>
    </footer>
  )
}