'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { 
  FaHeart, 
  FaShoppingCart, 
  FaTrash, 
  FaShare, 
  FaCheck, 
  FaSpinner,
  FaExclamationTriangle,
  FaTimes
} from 'react-icons/fa';

// Define the WishlistItem type (adjust based on your actual data structure)
interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
  vendor: string;
  // add other properties as needed
}

// Define the pending action type
interface PendingAction {
  type: 'single' | 'all' | 'selected';
  item?: WishlistItem;
}

// Brand data
const brands = [
  { name: 'Disney', logo: '/brands/disney-logo.webp', href: '/collections/disney' },
  { name: 'Nerf', logo: '/brands/Nerf.webp', href: '/collections/nerf' },
  { name: 'Hot Wheels', logo: '/brands/Hot_Wheels.webp', href: '/collections/hot-wheels' },
  { name: 'Barbie', logo: '/brands/Barbie.webp', href: '/collections/barbie' },
  { name: 'Lego', logo: '/brands/Lego.webp', href: '/collections/lego' },
  { name: 'Funskool', logo: '/brands/FunskooL.webp', href: '/collections/funskool' },
  { name: 'Marvel', logo: '/brands/Marvel.webp', href: '/collections/marvel' },
  { name: 'Giggles', logo: '/brands/Giggles.webp', href: '/collections/giggles' },
  { name: 'Hasbro', logo: '/brands/Hasbro.webp', href: '/collections/hasbro-gaming' },
  { name: 'Fisher-Price', logo: '/brands/Fisher-Price.webp', href: '/collections/fisher-price' },
  { name: 'Mattel', logo: '/brands/Mattel.webp', href: '/collections/mattel-games' },
  { name: 'Majorette', logo: '/brands/majorette.avif', href: '/collections/majorette' },
];

export default function WishlistPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { items: wishlistItems, totalItems, removeFromWishlist, clearWishlist, isLoading: wishlistLoading } = useWishlist();
  const { addToCart } = useCart();
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [addingAllToCart, setAddingAllToCart] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [addedToCartMap, setAddedToCartMap] = useState<Record<number, boolean>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  const isEmpty = wishlistItems.length === 0;
  const estimatedValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  // Check authentication before actions
  const requireAuth = (action: () => void, actionType: 'single' | 'all' | 'selected', item?: WishlistItem) => {
    if (!user.isAuthenticated) {
      setPendingAction({ type: actionType, item });
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!requireAuth(() => {}, 'all')) return;
    
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  // Handle single item selection
  const handleSelectItem = (id: number) => {
    if (!requireAuth(() => {}, 'single')) return;
    
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Handle add to cart for single item
  const handleAddToCart = async (item: WishlistItem) => {
    if (!requireAuth(() => handleAddToCart(item), 'single', item)) return;
    
    setAddingToCart(item.id);
    try {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        vendor: item.vendor
      }, 1);
      
      setAddedToCartMap(prev => ({ ...prev, [item.id]: true }));
      
      setTimeout(() => {
        setAddingToCart(null);
        setTimeout(() => {
          setAddedToCartMap(prev => ({ ...prev, [item.id]: false }));
        }, 2000);
      }, 500);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(null);
    }
  };

  // Handle add all to cart
  const handleAddAllToCart = async () => {
    if (!requireAuth(handleAddAllToCart, 'all')) return;
    
    setAddingAllToCart(true);
    
    try {
      for (const item of wishlistItems) {
        addToCart({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          vendor: item.vendor
        }, 1);
        
        setAddedToCartMap(prev => ({ ...prev, [item.id]: true }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setTimeout(() => {
        setAddingAllToCart(false);
        setTimeout(() => {
          setAddedToCartMap({});
        }, 3000);
      }, 500);
      
    } catch (error) {
      console.error('Error adding all to cart:', error);
      setAddingAllToCart(false);
    }
  };

  // Handle add selected to cart
  const handleAddSelectedToCart = async () => {
    if (!requireAuth(handleAddSelectedToCart, 'selected')) return;
    
    const selectedProducts = wishlistItems.filter(item => selectedItems.includes(item.id));
    
    for (const item of selectedProducts) {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        vendor: item.vendor
      }, 1);
      
      setAddedToCartMap(prev => ({ ...prev, [item.id]: true }));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setTimeout(() => {
      setAddedToCartMap({});
    }, 3000);
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (id: number) => {
    if (!requireAuth(() => handleRemoveFromWishlist(id), 'single')) return;
    removeFromWishlist(id);
  };

  // Handle clear wishlist
  const handleClearWishlist = () => {
    if (!requireAuth(handleClearWishlist, 'all')) return;
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      setSelectedItems([]);
    }
  };

  // Handle share wishlist
  const handleShare = async () => {
    if (!requireAuth(handleShare, 'all')) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Wishlist from FunCorp',
          text: `Check out my wishlist with ${totalItems} items worth ₹${estimatedValue}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  // Handle auth modal actions
  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    setPendingAction(null);
  };

  const handleSignIn = () => {
    router.push('/signin?redirect=wishlist');
    setShowAuthModal(false);
    setPendingAction(null);
  };

  const handleSignUp = () => {
    router.push('/register?redirect=wishlist');
    setShowAuthModal(false);
    setPendingAction(null);
  };

  if (wishlistLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#E9454D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your wishlist...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            My Wishlist
          </h1>
          {!isEmpty && user.isAuthenticated && (
            <p className="text-gray-600 mt-2 text-center">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} saved • Estimated Value: ₹{estimatedValue}
            </p>
          )}
          {!user.isAuthenticated && (
            <p className="text-gray-500 mt-2 text-center">
              <FaExclamationTriangle className="inline mr-2 text-yellow-500" />
              Please sign in to manage your wishlist
            </p>
          )}
        </div>

        {isEmpty ? (
          /* Empty Wishlist View */
          <div className="max-w-6xl mx-auto">
            {/* Empty Wishlist Message */}
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center mb-12">
              <div className="text-gray-400 mb-4">
                <FaHeart className="w-24 h-24 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                {user.isAuthenticated 
                  ? "Save items you love to your wishlist and they'll appear here."
                  : "Sign in to create and manage your wishlist."}
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link 
                  href="/" 
                  className="inline-block bg-[#E9454D] text-white px-6 py-3 font-medium hover:bg-[#d13a42] transition-colors rounded-md"
                >
                  Start Shopping
                </Link>
                {!user.isAuthenticated && (
                  <Link
                    href="/account"
                    className="inline-block border-2 border-[#E9454D] text-[#E9454D] px-6 py-3 font-medium hover:bg-[#E9454D] hover:text-white transition-colors rounded-md"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>

            {/* Popular Brands Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Brands</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#E9454D]/30"
                  >
                    <div className="relative h-16 w-full mb-3">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <p className="text-center text-sm font-medium text-gray-700 group-hover:text-[#E9454D] transition-colors">
                      {brand.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Wishlist with Items - Only shown to authenticated users */
          user.isAuthenticated ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Wishlist Items - Left Column */}
              <div className="flex-1">
                {/* Wishlist Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedItems.length === wishlistItems.length}
                          onChange={handleSelectAll}
                          className="w-4 h-4 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D]"
                        />
                        <span className="text-sm text-gray-700">Select All ({wishlistItems.length})</span>
                      </label>
                      
                      {selectedItems.length > 0 && (
                        <button
                          onClick={handleAddSelectedToCart}
                          className="flex items-center space-x-2 px-4 py-2 bg-[#E9454D] text-white text-sm rounded-lg hover:bg-[#d13a42] transition-colors"
                        >
                          <FaShoppingCart size={14} />
                          <span>Add Selected ({selectedItems.length}) to Cart</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaShare size={14} />
                        <span>Share Wishlist</span>
                      </button>
                      
                      {shareSuccess && (
                        <span className="text-sm text-green-600 animate-pulse">
                          Link copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Wishlist Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      {/* Product Image */}
                      <Link href={`/product/${item.id}`} className="block relative h-48 bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Selection Checkbox */}
                        <div className="absolute top-2 left-2 z-10">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D]"
                          />
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveFromWishlist(item.id);
                          }}
                          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FaTrash size={14} />
                        </button>

                        {/* Added to Cart Badge */}
                        {addedToCartMap[item.id] && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                              <FaCheck size={14} />
                              Added to Cart
                            </div>
                          </div>
                        )}
                      </Link>

                      {/* Product Info */}
                      <div className="p-4">
                        <Link href={`/product/${item.id}`} className="hover:text-[#E9454D]">
                          <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[3rem]">
                            {item.title}
                          </h3>
                        </Link>
                        
                        <Link 
                          href={`/collections/${item.vendor?.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-gray-500 hover:text-[#E9454D] mt-1 inline-block"
                        >
                          {item.vendor}
                        </Link>

                        {/* Price */}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-lg font-bold text-[#E9454D]">₹{item.price}</span>
                          
                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(item)}
                            disabled={addingToCart === item.id || addedToCartMap[item.id]}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                              addedToCartMap[item.id]
                                ? 'bg-green-500 text-white cursor-default'
                                : 'bg-[#E9454D] text-white hover:bg-[#d13a42]'
                            } ${addingToCart === item.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {addingToCart === item.id ? (
                              <>
                                <FaSpinner className="animate-spin" size={14} />
                                <span>Adding...</span>
                              </>
                            ) : addedToCartMap[item.id] ? (
                              <>
                                <FaCheck size={14} />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <FaShoppingCart size={14} />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Wishlist Button */}
                {wishlistItems.length > 0 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleClearWishlist}
                      className="text-sm text-red-600 hover:text-red-700 hover:underline"
                    >
                      Clear Wishlist
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist Summary - Right Column */}
              <div className="lg:w-96">
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-lg font-bold mb-4">WISHLIST SUMMARY</h2>
                  
                  <div className="space-y-3 mb-6">
                    {/* Total Items */}
                    <div className="flex justify-between text-gray-600">
                      <span>Total Items</span>
                      <span className="font-medium">{totalItems}</span>
                    </div>

                    {/* Estimated Value */}
                    <div className="flex justify-between text-gray-600">
                      <span>Estimated Value</span>
                      <span className="font-bold text-[#E9454D]">₹{estimatedValue}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-gray-200 space-y-3">
                      <button
                        onClick={handleAddAllToCart}
                        disabled={addingAllToCart}
                        className={`w-full bg-[#E9454D] text-white py-3 font-bold rounded-md transition-colors flex items-center justify-center space-x-2 ${
                          addingAllToCart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d13a42]'
                        }`}
                      >
                        {addingAllToCart ? (
                          <>
                            <FaSpinner className="animate-spin" size={16} />
                            <span>Adding All...</span>
                          </>
                        ) : (
                          <>
                            <FaShoppingCart size={16} />
                            <span>Add All to Cart</span>
                          </>
                        )}
                      </button>

                      <Link
                        href="/cart"
                        className="block w-full text-center border-2 border-[#E9454D] text-[#E9454D] py-3 font-bold hover:bg-[#E9454D] hover:text-white transition-colors rounded-md"
                      >
                        View Cart
                      </Link>

                      <Link
                        href="/"
                        className="block w-full text-center text-sm text-gray-600 hover:text-[#E9454D] transition-colors"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>

                  {/* Success Message */}
                  {addingAllToCart === false && addedToCartMap && Object.keys(addedToCartMap).length === wishlistItems.length && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-600 flex items-center gap-2">
                        <FaCheck className="text-green-600" />
                        All items added to cart successfully!
                      </p>
                    </div>
                  )}

                  {/* Quick Brand Links */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">SHOP BY BRAND</h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.slice(0, 6).map((brand) => (
                        <Link
                          key={brand.name}
                          href={brand.href}
                          className="text-xs px-2 py-1 bg-gray-100 rounded-md hover:bg-[#E9454D] hover:text-white transition-colors"
                        >
                          {brand.name}
                        </Link>
                      ))}
                      <Link href="/brands" className="text-xs px-2 py-1 text-[#E9454D] hover:underline">
                        View all
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Unauthenticated View - Show message instead of wishlist items */
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <FaExclamationTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your wishlist</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Please sign in to access your saved items and manage your wishlist.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/account"
                  className="px-8 py-3 bg-[#E9454D] text-white font-medium rounded-lg hover:bg-[#d13a42] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-3 border-2 border-[#E9454D] text-[#E9454D] font-medium rounded-lg hover:bg-[#E9454D] hover:text-white transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )
        )}

        {/* Authentication Required Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
              <button
                onClick={handleAuthModalClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
              
              <div className="text-center">
                <FaExclamationTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Authentication Required</h3>
                <p className="text-gray-600 mb-6">
                  Please sign in to {pendingAction?.type === 'single' ? 'add items to cart' : 
                    pendingAction?.type === 'all' ? 'add all items to cart' : 
                    'manage your wishlist'}.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleSignIn}
                    className="w-full bg-[#E9454D] text-white py-3 font-medium rounded-lg hover:bg-[#d13a42] transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="w-full border-2 border-[#E9454D] text-[#E9454D] py-3 font-medium rounded-lg hover:bg-[#E9454D] hover:text-white transition-colors"
                  >
                    Create New Account
                  </button>
                  <button
                    onClick={handleAuthModalClose}
                    className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}