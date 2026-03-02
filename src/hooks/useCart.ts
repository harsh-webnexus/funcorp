'use client';

import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  vendor: string;
}

// Auth check helper
const isUserLoggedIn = (): boolean => {
  try {
    const currentUser = localStorage.getItem('currentUser');
    const userEmail = localStorage.getItem('userEmail');
    return !!(currentUser || userEmail);
  } catch (error) {
    return false;
  }
};

// Get user email helper
const getUserEmail = (): string | null => {
  try {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsed = JSON.parse(currentUser);
      return parsed.email || null;
    }
    return localStorage.getItem('userEmail');
  } catch (error) {
    return null;
  }
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isUserLoggedIn();
      setIsAuthenticated(loggedIn);
    };

    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        setIsLoading(true);
        
        // Always try to load cart first, regardless of auth state
        const userEmail = getUserEmail();
        
        if (userEmail) {
          // Try to load user-specific cart
          const userCartKey = `cart_${userEmail}`;
          const storedCart = localStorage.getItem(userCartKey);
          
          if (storedCart) {
            setItems(JSON.parse(storedCart));
          } else {
            // If no user cart, check for guest cart and migrate
            const guestCart = localStorage.getItem('guest_cart');
            if (guestCart) {
              const parsedGuestCart = JSON.parse(guestCart);
              setItems(parsedGuestCart);
              // Migrate to user cart
              localStorage.setItem(userCartKey, guestCart);
              localStorage.removeItem('guest_cart');
            } else {
              setItems([]);
            }
          }
        } else {
          // Not logged in - use guest cart
          const guestCart = localStorage.getItem('guest_cart');
          if (guestCart) {
            setItems(JSON.parse(guestCart));
          } else {
            setItems([]);
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []); // Remove isAuthenticated dependency - load on mount only

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      const userEmail = getUserEmail();
      
      if (userEmail) {
        // Save to user-specific cart
        const userCartKey = `cart_${userEmail}`;
        localStorage.setItem(userCartKey, JSON.stringify(items));
      } else {
        // Save to guest cart
        localStorage.setItem('guest_cart', JSON.stringify(items));
      }
      
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }, [items, isLoading]);

  // Calculate total items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Add to cart
  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Show login prompt
      window.dispatchEvent(new CustomEvent('showAuthPrompt', { 
        detail: { 
          message: 'Please login to add items to cart',
          redirect: window.location.pathname 
        } 
      }));
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        // Update quantity if item exists
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...prevItems, { ...product, quantity }];
      }

      return newItems;
    });
  };

  // Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('showAuthPrompt', { 
        detail: { message: 'Please login to update cart' } 
      }));
      return;
    }

    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('showAuthPrompt', { 
        detail: { message: 'Please login to remove items from cart' } 
      }));
      return;
    }

    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('showAuthPrompt', { 
        detail: { message: 'Please login to clear cart' } 
      }));
      return;
    }

    setItems([]);
  };

  return {
    items,
    totalItems,
    totalPrice,
    isLoading,
    isAuthenticated,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}