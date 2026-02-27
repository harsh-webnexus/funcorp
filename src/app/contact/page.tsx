'use client'

import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface FormData {
  name: string
  phone: string
  email: string
  comment: string
}

// ------------------------------------------------------------------
// Main Contact Page Component
// ------------------------------------------------------------------
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    comment: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    // Simulate form submission – replace with actual API call
    try {
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent.',
      })
      setFormData({ name: '', phone: '', email: '', comment: '' })
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us – FunCorp</title>
        <meta
          name="description"
          content="India's Largest Online Store Exclusively for Toys, Games, Baby Gear, Party Decor, Kids Books & Kids Furniture."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.funcorp.in/pages/contact" />
        {/* Fonts (as used in original) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="min-h-screen bg-white font-poppins">
        {/* Header placeholder – replace with your actual header component */}
        <div className="bg-[#e9454d] py-2.5 px-4 text-white text-center text-sm">
          <p>FREE SHIPPING on orders over ₹499 | COD available</p>
        </div>

        {/* Main Contact Section */}
        <section className="py-12 md:py-16 px-4 container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* LEFT COLUMN – CONTACT FORM */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
              <h1 className="text-3xl md:text-4xl font-bold text-[#e9454d] uppercase tracking-wide mb-8 text-center md:text-left">
                Contact Us
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9454d] focus:border-transparent outline-none transition"
                    placeholder="Your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9454d] focus:border-transparent outline-none transition"
                    placeholder="10-digit mobile number"
                  />
                </div>

                {/* Email (required) */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9454d] focus:border-transparent outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Comment (required) */}
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={6}
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e9454d] focus:border-transparent outline-none transition resize-y"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Submit button & status */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#e9454d] hover:bg-[#d13d45] text-white font-semibold py-3 px-6 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Contact'}
                  </button>
                  {submitStatus.type && (
                    <p
                      className={`mt-3 text-sm text-center ${
                        submitStatus.type === 'success'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN – INFO & WHATSAPP */}
            <div className="bg-[#fafafa] p-6 md:p-8 rounded-lg flex flex-col">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#e9454d] mb-4">
                HOW CAN WE HELP YOU?
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Get in touch by filling out the form. We&apos;re also available
                on WhatsApp Monday–Saturday, 11am–6pm IST.
                <br />
                <br />
                We are happy to hear all of your suggestions and queries.
              </p>

              <a
                href="https://api.whatsapp.com/send/?phone=916291236626&text=Hey+there%2C+I+have+a+question%21&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20b859] text-white font-bold py-3 px-8 rounded-md transition w-full sm:w-auto text-center mb-8"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2 6.798 2 2.538 6.193 2.523 11.396c-.005 1.751.46 3.467 1.33 5.005L2.5 21.5l5.242-1.312c1.476.816 3.14 1.246 4.848 1.246h.004c5.202 0 9.463-4.194 9.478-9.398.008-2.51-.975-4.872-2.857-6.76zm-7.06 14.595h-.003c-1.498 0-2.97-.405-4.24-1.167l-.304-.18-3.112.815.832-3.036-.198-.315a8.912 8.912 0 01-1.37-4.767c.014-4.908 4.004-8.898 8.925-8.898 2.383 0 4.625.93 6.31 2.618 1.684 1.687 2.61 3.93 2.602 6.317-.014 4.91-4.002 8.897-8.913 8.897zm4.898-6.667c-.27-.135-1.596-.787-1.842-.877-.247-.09-.427-.135-.606.135-.18.27-.697.877-.855 1.057-.158.18-.316.203-.586.068-.27-.135-1.14-.42-2.17-1.34-.802-.716-1.344-1.6-1.502-1.87-.158-.27-.017-.416.118-.55.122-.122.27-.317.405-.475.135-.158.18-.27.27-.45.09-.18.045-.338-.022-.473-.068-.135-.606-1.46-.83-1.998-.218-.524-.44-.454-.606-.463-.157-.007-.337-.007-.517-.007-.18 0-.472.067-.72.338-.247.27-.945.923-.945 2.252 0 1.33.968 2.615 1.103 2.795.135.18 1.877 2.875 4.553 3.94.636.254 1.132.405 1.52.52.64.19 1.224.164 1.686.1.514-.07 1.596-.652 1.82-1.282.225-.63.225-1.17.158-1.282-.067-.113-.246-.18-.516-.293z" />
                </svg>
                WHATSAPP US
              </a>

              <div className="border-t border-gray-300 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Corporate Details :
                </h3>
                <address className="not-italic text-gray-700 leading-relaxed">
                  FUNCORP BUSINESS PRIVATE LIMITED
                  <br />
                  Kolkata, West Bengal, India
                </address>
              </div>

              {/* Optional: Social links (as in footer) */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-800 mb-3">
                  follow funcorp here
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/funcorp.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#e9454d] transition"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/funcorp.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#e9454d] transition"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.85-.07-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.266-.07-1.646-.07-4.85 0-3.204.012-3.584.07-4.85.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.452.144 3.898.637 2.633 1.902 1.367 3.168.874 4.722.802 6.323.744 7.603.73 8.011.73 12s.014 4.397.072 5.677c.072 1.601.565 3.155 1.83 4.42 1.266 1.266 2.82 1.759 4.421 1.83 1.28.058 1.688.072 5.677.072 3.989 0 4.397-.014 5.677-.072 1.601-.072 3.155-.565 4.42-1.83 1.266-1.266 1.759-2.82 1.83-4.421.058-1.28.072-1.688.072-5.677 0-3.989-.014-4.397-.072-5.677-.072-1.601-.565-3.155-1.83-4.42C20.845 1.367 19.291.874 17.69.802 16.41.744 16.002.73 12 .73z" />
                      <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                      <circle cx="18.406" cy="5.594" r="1.44" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@funcorpindia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#e9454d] transition"
                    aria-label="YouTube"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a2.98 2.98 0 00-2.102-2.102C19.507 3.5 12 3.5 12 3.5s-7.507 0-9.396.584A2.98 2.98 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.98 2.98 0 002.102 2.102c1.89.584 9.396.584 9.396.584s7.507 0 9.396-.584a2.98 2.98 0 002.102-2.102C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/funcorpIN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#e9454d] transition"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-4.707 13.94 13.94 0 001.542-5.949c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insta feed placeholder (matching original section) */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div id="insta-feed" className="w-full text-center text-gray-500">
              {/* Instagram feed would be injected here via external script */}
              <p className="text-sm">✨ Follow us @funcorp.in for daily fun</p>
            </div>
          </div>
        </section>

        {/* Footer placeholder – replace with your actual footer */}
        <footer className="bg-[#e95144] text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-sm">
            <p>ⓒ2024 FUNCORP BUSINESS PRIVATE LIMITED</p>
          </div>
        </footer>
      </main>
    </>
  )
}