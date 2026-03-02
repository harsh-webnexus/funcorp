'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import { Cart, Customer, CartItem } from './types/checkout';

// Define types for localStorage data
interface StoredCartItem {
  id?: string;
  productId?: string;
  title?: string;
  name?: string;
  price?: number | string;
  quantity?: number;
  image?: string;
  images?: string[];
  vendor?: string;
}

interface StoredCart {
  items?: StoredCartItem[];
  subtotal?: number;
  total?: number;
  itemCount?: number;
}

interface StoredUser {
  email?: string;
  name?: string;
  phone?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCheckoutData = () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Load cart from localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          try {
            const parsedCart = JSON.parse(storedCart) as StoredCart | StoredCartItem[] | null;
            
            // Transform the cart data to match the Cart type
            let transformedCart: Cart;
            
            // Handle different cart structures
            if (parsedCart && 'items' in parsedCart && Array.isArray(parsedCart.items)) {
              // Cart is an object with items array
              const transformedItems: CartItem[] = parsedCart.items.map((item: StoredCartItem) => ({
                id: item.id || item.productId || `temp-${Date.now()}-${Math.random()}`,
                title: item.title || item.name || 'Product',
                price: typeof item.price === 'number' ? item.price : parseFloat(String(item.price)) || 0,
                quantity: item.quantity || 1,
                image: item.image || (item.images && item.images[0]) || '/placeholder-image.jpg',
                vendor: item.vendor || 'FunCorp'
              }));

              // Calculate totals if not provided
              const calculatedSubtotal = transformedItems.reduce(
                (sum: number, item: CartItem) => sum + (item.price * item.quantity), 
                0
              );

              transformedCart = {
                items: transformedItems,
                subtotal: parsedCart.subtotal || calculatedSubtotal,
                total: parsedCart.total || calculatedSubtotal,
                itemCount: parsedCart.itemCount || transformedItems.length
              };
            } 
            else if (Array.isArray(parsedCart)) {
              // Cart is just an array of items
              const transformedItems: CartItem[] = parsedCart.map((item: StoredCartItem) => ({
                id: item.id || item.productId || `temp-${Date.now()}-${Math.random()}`,
                title: item.title || item.name || 'Product',
                price: typeof item.price === 'number' ? item.price : parseFloat(String(item.price)) || 0,
                quantity: item.quantity || 1,
                image: item.image || (item.images && item.images[0]) || '/placeholder-image.jpg',
                vendor: item.vendor || 'FunCorp'
              }));

              const calculatedSubtotal = transformedItems.reduce(
                (sum: number, item: CartItem) => sum + (item.price * item.quantity), 
                0
              );

              transformedCart = {
                items: transformedItems,
                subtotal: calculatedSubtotal,
                total: calculatedSubtotal,
                itemCount: transformedItems.length
              };
            }
            else {
              // Empty or invalid cart
              transformedCart = {
                items: [],
                subtotal: 0,
                total: 0,
                itemCount: 0
              };
            }
            
            setCart(transformedCart);
            
            // Redirect if cart is empty
            if (transformedCart.items.length === 0) {
              router.push('/cart');
              return;
            }
          } catch (e) {
            console.error('Error parsing cart:', e);
            setError('Error loading cart data');
          }
        } else {
          // Redirect to cart if empty
          router.push('/cart');
          return;
        }

        // Load user data from localStorage
        try {
          const currentUser = localStorage.getItem('currentUser');
          const users = JSON.parse(localStorage.getItem('users') || '[]') as StoredUser[];
          const userEmail = localStorage.getItem('userEmail');
          const userName = localStorage.getItem('userName');
          
          if (currentUser) {
            const parsedUser = JSON.parse(currentUser) as StoredUser;
            
            // Find full user data from users array
            const registeredUser = users.find((u: StoredUser) => 
              u.email?.toLowerCase() === parsedUser.email?.toLowerCase()
            );

            if (registeredUser) {
              const nameParts = (registeredUser.name || '').split(' ');
              setCustomer({
                email: registeredUser.email || '',
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                phone: registeredUser.phone || '',
                isLoggedIn: true
              });
            } else if (userEmail) {
              const nameParts = (userName || '').split(' ');
              setCustomer({
                email: userEmail,
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                phone: '',
                isLoggedIn: true
              });
            }
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
          // Don't set error for user data - guest checkout is fine
        }
      } catch (e) {
        console.error('Error loading checkout data:', e);
        setError('Failed to load checkout data');
      } finally {
        setIsLoading(false);
      }
    };

    loadCheckoutData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E9454D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/cart')}
            className="px-6 py-2 bg-[#E9454D] text-white rounded-lg hover:bg-[#d13d45] transition-colors"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm cart={cart} customer={customer} />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}