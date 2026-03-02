'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaHeart,
  FaShoppingBag,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaLock,
  FaTruck,
  FaCreditCard
} from 'react-icons/fa';

interface UserData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: string;
  isLoggedIn: boolean;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  items: number;
}

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
  vendor: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // User data state
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    createdAt: '',
    isLoggedIn: false,
  });

  // Addresses state
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      
      // Check if user is authenticated
      const currentUser = localStorage.getItem('currentUser');
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userName');

      if (!isAuthenticated || !currentUser) {
        router.push('/account');
        return;
      }

      // Parse current user data
      if (currentUser) {
        try {
          const parsedUser = JSON.parse(currentUser);
          
          // Get full user data from users array
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const registeredUser = users.find((u: UserData) => 
            u.email.toLowerCase() === parsedUser.email.toLowerCase()
          );

          if (registeredUser) {
            setUserData({
              name: registeredUser.name || userName || '',
              email: registeredUser.email || parsedUser.email || '',
              phone: registeredUser.phone || '',
              createdAt: registeredUser.createdAt || new Date().toISOString(),
              isLoggedIn: true,
            });
          } else {
            // Fallback to stored user data
            setUserData({
              name: userName || '',
              email: userEmail || parsedUser.email || '',
              phone: '',
              createdAt: new Date().toISOString(),
              isLoggedIn: true,
            });
          }
        } catch (e) {
          console.error('Error parsing user data', e);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Load addresses from localStorage
  useEffect(() => {
    const storedAddresses = localStorage.getItem('userAddresses');
    if (storedAddresses) {
      try {
        setAddresses(JSON.parse(storedAddresses));
      } catch (e) {
        console.error('Error parsing addresses', e);
      }
    }
  }, []);

  // Load orders from localStorage (for demo purposes)
  useEffect(() => {
    // In a real app, you'd fetch orders from an API
    // For demo, we'll create sample orders
    const sampleOrders: Order[] = [
      {
        id: 'ORD-2024-001',
        date: '2024-01-15',
        total: 2499,
        status: 'delivered',
        items: 3,
      },
      {
        id: 'ORD-2024-002',
        date: '2024-02-20',
        total: 3899,
        status: 'shipped',
        items: 2,
      },
      {
        id: 'ORD-2024-003',
        date: '2024-03-01',
        total: 1299,
        status: 'processing',
        items: 1,
      },
    ];
    setOrders(sampleOrders);
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (e) {
        console.error('Error parsing wishlist', e);
      }
    }
  }, []);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem('userAddresses', JSON.stringify(addresses));
    }
  }, [addresses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Split name into firstName and lastName if needed
    if (name === 'name') {
      setUserData(prev => ({
        ...prev,
        name: value,
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveProfile = () => {
    // Update user in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: UserData) => {
      if (u.email.toLowerCase() === userData.email.toLowerCase()) {
        return {
          ...u,
          name: userData.name,
          phone: userData.phone,
        };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    localStorage.setItem('currentUser', JSON.stringify({
      ...currentUser,
      name: userData.name,
    }));
    
    // Update userName for header
    localStorage.setItem('userName', userData.name);
    sessionStorage.setItem('userName', userData.name);
    
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newAddress: Address = {
      id: editingAddress?.id || Date.now().toString(),
      type: formData.get('addressType') as 'home' | 'work' | 'other',
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      addressLine1: formData.get('addressLine1') as string,
      addressLine2: formData.get('addressLine2') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      pincode: formData.get('pincode') as string,
      phone: formData.get('phone') as string,
      isDefault: formData.get('isDefault') === 'on',
    };

    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? newAddress : addr
      ));
    } else {
      // Add new address
      if (newAddress.isDefault) {
        // Remove default from other addresses
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })));
      }
      setAddresses([...addresses, newAddress]);
    }

    setShowAddressForm(false);
    setEditingAddress(null);
    form.reset();
  };

  const handleDeleteAddress = (addressId: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
    }
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId,
    })));
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    sessionStorage.clear();
    
    // Update users array to mark as logged out
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: UserData) => ({
      ...u,
      isLoggedIn: false,
    }));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    router.push('/account');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E9454D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const fullName = userData.name || 'User';
  const displayInitial = fullName.charAt(0).toUpperCase();
  const firstName = fullName.split(' ')[0] || '';
  const lastName = fullName.split(' ').slice(1).join(' ') || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              {/* User Info Card */}
              <div className="p-6 bg-gradient-to-r from-[#E9454D] to-[#d13d45] text-white text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-[#E9454D] mx-auto mb-3">
                  {displayInitial}
                </div>
                <h2 className="font-semibold text-lg">{fullName}</h2>
                <p className="text-sm text-white/80 mt-1">{userData.email}</p>
                {userData.createdAt && (
                  <p className="text-xs text-white/60 mt-2 flex items-center justify-center">
                    <FaCalendarAlt className="mr-1" size={12} />
                    Member since {new Date(userData.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Navigation Tabs */}
              <nav className="p-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                    activeTab === 'profile' 
                      ? 'bg-[#E9454D] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaUser size={18} />
                  <span className="font-medium">Profile Information</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                    activeTab === 'orders' 
                      ? 'bg-[#E9454D] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaShoppingBag size={18} />
                  <span className="font-medium">My Orders</span>
                  {orders.length > 0 && (
                    <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {orders.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                    activeTab === 'addresses' 
                      ? 'bg-[#E9454D] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaMapMarkerAlt size={18} />
                  <span className="font-medium">Saved Addresses</span>
                </button>

                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                    activeTab === 'wishlist' 
                      ? 'bg-[#E9454D] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaHeart size={18} />
                  <span className="font-medium">Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                    activeTab === 'payment' 
                      ? 'bg-[#E9454D] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaCreditCard size={18} />
                  <span className="font-medium">Payment Methods</span>
                </button>

                <div className="border-t border-gray-200 my-4"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FaSignOutAlt size={18} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 text-[#E9454D] border border-[#E9454D] rounded-lg hover:bg-[#E9454D] hover:text-white transition-colors"
                    >
                      <FaEdit size={16} />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FaSave size={16} />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <FaTimes size={16} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                        {userData.name || 'Not provided'}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                      <FaEnvelope className="text-gray-400 mr-2" size={16} />
                      <p className="text-gray-900 flex-1">{userData.email}</p>
                      <FaLock className="text-gray-400" size={14} />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                        <FaPhone className="text-gray-400 mr-2" size={16} />
                        <p className="text-gray-900">{userData.phone || 'Not provided'}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Change Link */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    href="/change-password"
                    className="text-[#E9454D] hover:text-[#d13d45] font-medium flex items-center space-x-2"
                  >
                    <FaLock size={16} />
                    <span>Change Password</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Orders</h2>
                
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <Link 
                              href={`/order/${order.id}`}
                              className="text-lg font-semibold text-[#E9454D] hover:underline"
                            >
                              {order.id}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <span className="text-lg font-bold text-gray-900">₹{order.total}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-sm text-gray-600">{order.items} items</p>
                          <Link 
                            href={`/order/${order.id}`}
                            className="text-sm text-[#E9454D] hover:underline"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaShoppingBag className="mx-auto text-gray-300 text-5xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't placed any orders.</p>
                    <Link
                      href="/"
                      className="inline-flex items-center px-6 py-3 bg-[#E9454D] text-white font-medium rounded-lg hover:bg-[#d13d45] transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                  <button
                    onClick={() => {
                      setEditingAddress(null);
                      setShowAddressForm(true);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#E9454D] text-white rounded-lg hover:bg-[#d13d45] transition-colors"
                  >
                    <FaMapMarkerAlt size={16} />
                    <span>Add New Address</span>
                  </button>
                </div>

                {showAddressForm && (
                  <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {editingAddress ? 'Edit Address' : 'Add New Address'}
                    </h3>
                    <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          defaultValue={editingAddress?.firstName || firstName}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D]"
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          defaultValue={editingAddress?.lastName || lastName}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D]"
                        />
                      </div>

                      {/* Address Line 1 */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                        <input
                          type="text"
                          name="addressLine1"
                          required
                          defaultValue={editingAddress?.addressLine1}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D]"
                        />
                      </div>

                      {/* Address Line 2 */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          name="addressLine2"
                          defaultValue={editingAddress?.addressLine2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D]"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          defaultValue={editingAddress?.city}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D]"
                        />
                      </div>

                      {/* State */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          required
                          defaultValue={editingAddress?.state}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D]"
                        />
                      </div>

                      {/* Pincode */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          pattern="[0-9]{6}"
                          maxLength={6}
                          defaultValue={editingAddress?.pincode}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D]"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                          defaultValue={editingAddress?.phone || userData.phone}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D]"
                        />
                      </div>

                      {/* Address Type */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                        <div className="flex space-x-4">
                          {(['home', 'work', 'other'] as const).map((type) => (
                            <label key={type} className="flex items-center">
                              <input
                                type="radio"
                                name="addressType"
                                value={type}
                                defaultChecked={editingAddress?.type === type || type === 'home'}
                                className="mr-2 text-[#E9454D] focus:ring-[#E9454D]"
                              />
                              <span className="text-sm text-gray-700 capitalize">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Default Address Checkbox */}
                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="isDefault"
                            className="mr-2 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D]"
                            defaultChecked={editingAddress?.isDefault}
                          />
                          <span className="text-sm text-gray-700">Set as default address</span>
                        </label>
                      </div>

                      {/* Form Actions */}
                      <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddressForm(false);
                            setEditingAddress(null);
                          }}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-[#E9454D] text-white rounded-lg hover:bg-[#d13d45] transition-colors"
                        >
                          {editingAddress ? 'Update Address' : 'Save Address'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Addresses List */}
                {addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="relative border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full capitalize">
                            {address.type}
                          </span>
                        </div>
                        
                        <p className="font-medium text-gray-900">
                          {address.firstName} {address.lastName}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.addressLine1}
                          {address.addressLine2 && <>, {address.addressLine2}</>}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          <FaPhone className="inline mr-1 text-gray-400" size={12} />
                          {address.phone}
                        </p>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            disabled={address.isDefault}
                            className={`text-xs ${
                              address.isDefault 
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-[#E9454D] hover:underline'
                            }`}
                          >
                            Set as Default
                          </button>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingAddress(address);
                                setShowAddressForm(true);
                              }}
                              className="text-xs text-gray-600 hover:text-[#E9454D]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="mx-auto text-gray-300 text-5xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                    <p className="text-gray-500 mb-6">Add an address to make checkout faster.</p>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <Link 
                              href={`/product/${item.id}`}
                              className="font-medium text-gray-900 hover:text-[#E9454D] line-clamp-2"
                            >
                              {item.title}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{item.vendor}</p>
                            <p className="text-[#E9454D] font-bold mt-2">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => {
                              // Add to cart functionality
                              alert('Added to cart!');
                            }}
                            className="text-sm bg-[#E9454D] text-white px-4 py-2 rounded-lg hover:bg-[#d13d45] transition-colors"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => {
                              const newWishlist = wishlist.filter(w => w.id !== item.id);
                              setWishlist(newWishlist);
                              localStorage.setItem('wishlist', JSON.stringify(newWishlist));
                            }}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaHeart className="mx-auto text-gray-300 text-5xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Save items you love to your wishlist.</p>
                    <Link
                      href="/"
                      className="inline-flex items-center px-6 py-3 bg-[#E9454D] text-white font-medium rounded-lg hover:bg-[#d13d45] transition-colors"
                    >
                      Explore Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#E9454D] text-white rounded-lg hover:bg-[#d13d45] transition-colors">
                    <FaCreditCard size={16} />
                    <span>Add Payment Method</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Sample saved cards */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">VISA **** 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                        <button className="text-gray-400 hover:text-red-600">
                          <FaTimes size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          MC
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Mastercard **** 8888</p>
                          <p className="text-sm text-gray-500">Expires 08/24</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-600">
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <FaTruck className="inline mr-2" />
                    Your payment methods are securely stored. We never store your full card details.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}