'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
interface ProductTabsProps {
  product: Product // Replace with proper type
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('about')

  const tabs = [
    { id: 'about', label: 'About The Product' },
    { id: 'specs', label: 'Specification' },
    { id: 'ideal', label: 'Ideal For' },
    { id: 'shipping', label: 'Shipping & Return' }
  ]

  return (
    <div className="productView-tab mt-12 border-t border-gray-200">
      {/* Tab Headers */}
      <div className="tabs-horizontal flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-title px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#E9454D] text-[#E9454D]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs-contents py-6">
        {/* About The Product */}
        {activeTab === 'about' && (
          <div className="tab-content prose max-w-none">
            <h2 className="text-lg font-bold mb-4">PRODUCT FEATURES</h2>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>Ariel from Disneys The Little Mermaid – Features Ariel in a lovely pink dress with her signature flowing red hair.</li>
              <li>Child-Friendly Size – Easy to hold and play with, making it perfect for small hands and big imaginations.</li>
              <li>Great Gift Option – A perfect surprise for birthdays, party returns, or Disney Princess fans aged 3+.</li>
              <li>Official Mattel Product – Made with durable and child-safe materials for long-lasting fun.</li>
              <li>Imaginative Princess Play – Encourages storytelling, roleplay, and creativity with everyone favorite mermaid princess.</li>
            </ul>
            
            <h2 className="text-lg font-bold mb-4">PRODUCT DESCRIPTION</h2>
            <p className="mb-4">
              Make a splash in playtime with the Disney Princess Ariel Mini Figure, beautifully designed for young fans of The Little Mermaid. Dressed in a shimmering pink gown, Ariel is ready to join your child world of magical adventures above the sea. This delightful mini figure is part of the official Disney Princess collection and is perfectly sized for imaginative play, on-the-go fun, or enchanting display. Ideal for kids aged 3 and up, this mini Ariel brings the wonder of Disney storytelling right into their hands!
            </p>
            <p className="text-sm text-gray-600 italic">Product Includes - 1x Doll</p>
          </div>
        )}

        {/* Specification */}
        {activeTab === 'specs' && (
          <div className="tab-content">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900 w-1/3">Brand</td>
                    <td className="py-3 text-sm text-gray-600">{product.vendor}</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">Assembly Required</td>
                    <td className="py-3 text-sm text-gray-600">No</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">Batteries Required</td>
                    <td className="py-3 text-sm text-gray-600">No</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">Electric</td>
                    <td className="py-3 text-sm text-gray-600">No</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">Manufactured By</td>
                    <td className="py-3 text-sm text-gray-600">Pt. Mattel Indonesia</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">Imported By</td>
                    <td className="py-3 text-sm text-gray-600">Mattel Toys India Private Limited</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">GST Rate</td>
                    <td className="py-3 text-sm text-gray-600">5%</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">GTIN</td>
                    <td className="py-3 text-sm text-gray-600">194735229796</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">HSN Code</td>
                    <td className="py-3 text-sm text-gray-600">95030020</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">Minimum Recommended Age</td>
                    <td className="py-3 text-sm text-gray-600">3 years</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-900">Country of Origin</td>
                    <td className="py-3 text-sm text-gray-600">Indonesia</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Ideal For */}
        {activeTab === 'ideal' && (
          <div className="tab-content">
            <p className="text-gray-600">1-3 Years, 4-7 Years, 8-10 Years, and 11-14 Years</p>
          </div>
        )}

        {/* Shipping & Return */}
        {activeTab === 'shipping' && (
          <div className="tab-content prose max-w-none">
            <h2 className="text-xl font-bold text-center mb-6">RETURNS POLICY</h2>
            
            <h3 className="text-lg font-semibold mt-6 mb-3">RETURN ELIGIBILITY</h3>
            
            <h4 className="font-medium mt-4">INCORRECT PRODUCT</h4>
            <p>An incorrect product has been delivered to you where the delivered product does not match the item in the order confirmation email.</p>
            
            <h4 className="font-medium mt-4">MANUFACTURING DEFECT</h4>
            <p>If you feel the product is damaged or has a manufacturing defect, please photograph this as soon as you have opened the packaging and immediately share the same with our team.</p>
            
            <h4 className="font-medium mt-4">REQUISITES FOR RETURN</h4>
            <ul className="list-disc pl-5">
              <li>Product outer box should be in the original mint condition with price tags.</li>
              <li>Products should not be used, worn out or torn/damaged.</li>
              <li>The originally shipped labels and invoice should be made available.</li>
            </ul>
            
            <h4 className="font-medium mt-4">TIME PERIOD</h4>
            <p>Please contact our customer care department within 48 hours of delivery.</p>
            
            <h2 className="text-xl font-bold text-center mt-8 mb-6">CANCELLATION POLICY</h2>
            <p>If you wish to cancel your order, please send an email within 4 hours of placing the order.</p>
            
            <h2 className="text-xl font-bold text-center mt-8 mb-6">REFUND POLICY</h2>
            <p>The amount that will be refunded will be calculated based on the scenario.</p>
          </div>
        )}
      </div>
    </div>
  )
}