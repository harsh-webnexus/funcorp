'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { FaArrowLeft, FaPrint, FaDownload, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && !user.isAuthenticated) {
      router.push('/signin');
    }
  }, [isLoading, user.isAuthenticated, router]);

  // Sample order data - replace with actual API call
  useEffect(() => {
    // Mock order data based on ID
    setOrder({
      id: params.id,
      date: '2024-03-01',
      status: 'processing',
      paymentMethod: 'Credit Card',
      subtotal: 1299,
      shipping: 50,
      total: 1349,
      items: [
        {
          id: 1,
          name: 'Hot Wheels Premium Car',
          price: 489,
          quantity: 1,
          image: '/sample-product.jpg',
        },
        {
          id: 2,
          name: 'Fisher Price Stacking Cups',
          price: 137,
          quantity: 1,
          image: '/sample-product2.jpg',
        },
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street, Apt 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '9876543210',
      },
      timeline: [
        { status: 'Order Placed', date: '2024-03-01 10:30 AM', completed: true },
        { status: 'Payment Confirmed', date: '2024-03-01 10:35 AM', completed: true },
        { status: 'Processing', date: '2024-03-01 11:00 AM', completed: true },
        { status: 'Shipped', date: null, completed: false },
        { status: 'Delivered', date: null, completed: false },
      ],
    });
  }, [params.id]);

  if (isLoading || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E9454D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Order Placed': return <FaClock className="text-blue-500" />;
      case 'Payment Confirmed': return <FaCheckCircle className="text-green-500" />;
      case 'Processing': return <FaClock className="text-yellow-500" />;
      case 'Shipped': return <FaTruck className="text-purple-500" />;
      case 'Delivered': return <FaCheckCircle className="text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl mx-auto px-4">
        {/* Back button */}
        <Link
          href="/profile"
          className="inline-flex items-center text-gray-600 hover:text-[#E9454D] mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" size={14} />
          Back to Profile
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-500 mt-1">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <FaPrint size={16} />
                <span>Print</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <FaDownload size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
              order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
              order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Order Timeline</h2>
          <div className="relative">
            {order.timeline.map((step: any, index: number) => (
              <div key={step.status} className="flex items-start mb-6 last:mb-0">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {getStatusIcon(step.status)}
                  </div>
                  {index < order.timeline.length - 1 && (
                    <div className={`absolute top-8 left-4 w-0.5 h-12 -ml-0.5 ${
                      order.timeline[index + 1].completed ? 'bg-green-200' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <p className={`font-medium ${
                    step.completed ? 'text-gray-900' : 'text-gray-400'
                  }`}>{step.status}</p>
                  <p className="text-sm text-gray-500">
                    {step.date || 'Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                  <div>
                    <Link 
                      href={`/product/${item.id}`}
                      className="font-medium text-gray-900 hover:text-[#E9454D]"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{order.shipping}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Payment Method: <span className="font-medium">{order.paymentMethod}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Need help with this order?{' '}
            <Link href="/contact" className="text-[#E9454D] hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}