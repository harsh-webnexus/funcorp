'use client'

import Link from 'next/link'
import { FaPhone, FaEnvelope } from 'react-icons/fa'

export default function TopBar() {
  return (
    <div className="bg-[#E9454D] text-white py-2">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center">
            <FaPhone className="mr-2 text-[#fccf39]" size={12} />
            +91 1234567890
          </span>
          <span className="flex items-center">
            <FaEnvelope className="mr-2 text-[#fccf39]" size={12} />
            sales@funcorp.in
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <Link href="/track-order" className="hover:text-[#fccf39]">Track Order</Link>
          <Link href="/contact" className="hover:text-[#fccf39]">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}