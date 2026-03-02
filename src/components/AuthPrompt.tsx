'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('Please login to continue');
  const [redirectPath, setRedirectPath] = useState('/cart');
  const pathname = usePathname();

  useEffect(() => {
    const handleShowAuthPrompt = (event: CustomEvent) => {
      setMessage(event.detail?.message || 'Please login to continue');
      setRedirectPath(event.detail?.redirect || pathname || '/cart');
      setIsVisible(true);
    };

    window.addEventListener('showAuthPrompt', handleShowAuthPrompt as EventListener);

    return () => {
      window.removeEventListener('showAuthPrompt', handleShowAuthPrompt as EventListener);
    };
  }, [pathname]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectPath)}`}
              className="flex-1 bg-[#E9454D] text-white px-4 py-2 rounded-md hover:bg-[#d13a42] transition-colors"
              onClick={handleClose}
            >
              Login
            </Link>
            <Link
              href={`/register?redirect=${encodeURIComponent(redirectPath)}`}
              className="flex-1 border border-[#E9454D] text-[#E9454D] px-4 py-2 rounded-md hover:bg-[#E9454D] hover:text-white transition-colors"
              onClick={handleClose}
            >
              Register
            </Link>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}