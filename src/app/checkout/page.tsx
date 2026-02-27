// src/app/checkout/page.tsx
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import Loading from './loading';

// Types
interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  vendor: string;
  sku: string;
  condition: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

interface Customer {
  email: string;
  isLoggedIn: boolean;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
}

// Server Component
export default async function CheckoutPage() {
  // Get cart from cookies or session
  const cart = await getCart();
  
  // Redirect to cart if empty
  if (cart.itemCount === 0) {
    redirect('/cart');
  }

  // Get customer info if logged in
  const customer = await getCustomer();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Suspense fallback={<Loading />}>
              <CheckoutForm 
                cart={cart} 
                customer={customer}
              />
            </Suspense>
          </div>

          {/* Order Summary Sidebar - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Server actions to get data
async function getCart(): Promise<Cart> {
  try {
    const cookieStore = await cookies();
    const cartData = cookieStore.get('cart');
    
    if (cartData) {
      return JSON.parse(cartData.value) as Cart;
    }
  } catch (error) {
    console.error('Error reading cart from cookies:', error);
  }

  // Return sample data if no cart in cookies (for development)
  return {
    items: [
      {
        id: '1',
        productId: '43980435030316',
        title: 'Majorette Street Cars Assortment - Design & Style May Vary, Only 1 Car Included',
        price: 167.00,
        compareAtPrice: 185.00,
        image: 'https://cdn.shopify.com/s/files/1/0666/6472/6828/files/01ac06af-6253-487c-b7b2-c94a7d381f20.jpg?v=1767007458',
        vendor: 'Majorette',
        sku: 'SIM-212053051',
        condition: 'New',
        quantity: 1
      },
      {
        id: '2',
        productId: '52586049831212',
        title: 'Hot Wheels 2026 DC Comics Batman-Themed Silver Celebration Series 1:64 Scale - Set Of 5 Cars',
        price: 1495.00,
        compareAtPrice: 1495.00,
        image: 'https://cdn.shopify.com/s/files/1/0666/6472/6828/files/WhatsAppImage2026-01-14at12.57.03PM.webp?v=1769254333',
        vendor: 'Hot Wheels',
        sku: 'MTL-HDG89-A',
        condition: 'New',
        quantity: 1
      },
      {
        id: '3',
        productId: '43980052332844',
        title: 'Fisher Price Stacking Cups',
        price: 137.00,
        compareAtPrice: 278.00,
        image: 'https://cdn.shopify.com/s/files/1/0666/6472/6828/products/fisher_price_stacking_cups_1.jpg?v=1675922439',
        vendor: 'Fisher Price',
        sku: 'MTL-GCM79',
        condition: 'New',
        quantity: 1
      }
    ],
    subtotal: 1799.00,
    itemCount: 3
  };
}

async function getCustomer(): Promise<Customer | null> {
  try {
    // Check if user is logged in (from session/cookies)
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const userData = cookieStore.get('user');
    
    if (!session) {
      return null;
    }

    if (userData) {
      return JSON.parse(userData.value) as Customer;
    }

    // Return mock customer data for development
    return {
      email: 'sharma9870harsh@gmail.com',
      isLoggedIn: true,
      firstName: null,
      lastName: null,
      phone: null
    };
  } catch (error) {
    console.error('Error reading customer from cookies:', error);
    return null;
  }
}