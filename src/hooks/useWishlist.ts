'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
  vendor: string;
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const loadWishlist = () => {
      try {
        // Use user-specific key if logged in
        const storageKey = user.isAuthenticated && user.email 
          ? `wishlist_${user.email}` 
          : 'wishlist';
        
        const storedWishlist = localStorage.getItem(storageKey);
        if (storedWishlist) {
          setItems(JSON.parse(storedWishlist));
        } else {
          // Try generic wishlist if user-specific not found
          const genericWishlist = localStorage.getItem('wishlist');
          if (genericWishlist) {
            setItems(JSON.parse(genericWishlist));
          }
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();

    // Listen for wishlist updates from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith('wishlist')) {
        try {
          setItems(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (error) {
          console.error('Error parsing wishlist update:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user.isAuthenticated, user.email]);

  // Get total items
  const totalItems = items.length;

  // Add to wishlist
  const addToWishlist = (product: WishlistItem) => {
    setItems(prevItems => {
      // Check if already in wishlist
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems;
      }
      
      const newItems = [...prevItems, product];
      
      // Save to localStorage with user-specific key if logged in
      const storageKey = user.isAuthenticated && user.email 
        ? `wishlist_${user.email}` 
        : 'wishlist';
      
      localStorage.setItem(storageKey, JSON.stringify(newItems));
      
      // Also save to generic wishlist for guests
      if (!user.isAuthenticated) {
        localStorage.setItem('wishlist', JSON.stringify(newItems));
      }
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      return newItems;
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (id: number) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      
      const storageKey = user.isAuthenticated && user.email 
        ? `wishlist_${user.email}` 
        : 'wishlist';
      
      localStorage.setItem(storageKey, JSON.stringify(newItems));
      
      // Update generic wishlist if guest
      if (!user.isAuthenticated) {
        localStorage.setItem('wishlist', JSON.stringify(newItems));
      }
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      return newItems;
    });
  };

  // Check if item is in wishlist
  const isInWishlist = (id: number) => {
    return items.some(item => item.id === id);
  };

  // Clear wishlist
  const clearWishlist = () => {
    setItems([]);
    
    const storageKey = user.isAuthenticated && user.email 
      ? `wishlist_${user.email}` 
      : 'wishlist';
    
    localStorage.removeItem(storageKey);
    
    if (!user.isAuthenticated) {
      localStorage.removeItem('wishlist');
    }
    
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return {
    items,
    totalItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };
}