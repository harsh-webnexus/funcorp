import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import AuthPrompt from '@/components/AuthPrompt'
// import MobileMenu from '@/components/layout/MobileMenu'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Best Toys, Games, Kids Books, Party Decor & Furniture Store | FunCorp',
  description: "India's Largest Online Store Exclusively for Toys, Games, Baby Gear, Party Decor, Kids Books & Kids Furniture.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <TopBar />
        <Header />
        {/* <MobileMenu /> */}
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AuthPrompt />
      </body>
    </html>
  )
}