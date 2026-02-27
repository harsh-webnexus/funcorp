'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

// Define a proper type for the product that can be added to cart
export interface CartProduct {
  id: number
  title: string
  price: number
  image: string
  vendor: string
  sku?: string
}

export interface CartItem extends CartProduct {
  quantity: number
}

interface UseCartReturn {
  items: CartItem[]
  addToCart: (product: CartProduct, quantity: number) => void
  removeFromCart: (productId: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isFirstRender = useRef(true)
  const initialLoadDone = useRef(false)

  // Load cart from localStorage only once on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          setItems(parsedCart)
          console.log('Loaded cart from localStorage:', parsedCart)
        }
      } catch (error) {
        console.error('Failed to parse cart:', error)
      } finally {
        setIsLoading(false)
        initialLoadDone.current = true
      }
    }
    
    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes, but with safeguards
  useEffect(() => {
    // Don't save during initial load or first render
    if (isLoading || isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Only save if we've done initial load and items have changed
    if (initialLoadDone.current) {
      console.log('Saving cart to localStorage:', items)
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isLoading])

  const addToCart = useCallback((product: CartProduct, quantity: number) => {
    console.log('Adding to cart:', product, 'quantity:', quantity)
    
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
      
      if (existingItemIndex >= 0) {
        // Product exists - update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        console.log('Updated existing item:', updatedItems[existingItemIndex])
        return updatedItems
      } else {
        // Product doesn't exist - add new item
        const newItem: CartItem = {
          ...product,
          quantity
        }
        console.log('Added new item:', newItem)
        return [...prevItems, newItem]
      }
    })
  }, [])

  const removeFromCart = useCallback(async (productId: number) => {
    console.log('Removing from cart:', productId)
    setItems(prevItems => prevItems.filter(item => item.id !== productId))
  }, [])

  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    if (quantity < 1) return
    
    console.log('Updating quantity:', productId, 'to', quantity)
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    console.log('Clearing cart')
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  }
}