'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  isLoggedIn: boolean;
}

const SHOP_DATA = {
  name: 'FunCorp',
  logo: 'https://cdn.shopify.com/s/files/1/0666/6472/6828/files/funcorp_logo_4.1_rounded_244403f1-1528-4c16-a112-f9975f172778_200x60@2x.png?v=1696322451.webp',
  privacyUrl: '/policies/privacy-policy',
  termsUrl: '/policies/terms-of-service',
};

export default function AuthenticationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is already logged in - FIXED
  useEffect(() => {
    const checkExistingLogin = () => {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.isLoggedIn) {
          // Check if this is a fresh login (has redirect parameter)
          // or if user just landed on login page while already logged in
          const hasRedirect = window.location.search.includes('redirect');
          const justLoggedIn = sessionStorage.getItem('justLoggedIn');
          
          if (!hasRedirect && !justLoggedIn) {
            // User is already logged in and just landed on login page
            // Redirect them to home
            router.push('/');
          } else if (justLoggedIn) {
            // This is a fresh login, clear the flag
            sessionStorage.removeItem('justLoggedIn');
          }
          // If hasRedirect is true, user is in the process of logging in
          // so we don't redirect automatically
        }
      }
    };

    checkExistingLogin();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching email and password
      const user = users.find((u: UserData) => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      );

      if (user) {
        // Set flag for fresh login
        sessionStorage.setItem('justLoggedIn', 'true');
        
        // Create user session data (excluding password)
        const userSession = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          isLoggedIn: true,
          loginTime: new Date().toISOString(),
        };

        // Store in localStorage based on "remember me" preference
        if (rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify({
            ...userSession,
            rememberMe: true
          }));
        } else {
          // Store in sessionStorage for temporary session
          sessionStorage.setItem('currentUser', JSON.stringify(userSession));
          // Also store minimal data in localStorage for persistence
          localStorage.setItem('currentUser', JSON.stringify({
            ...userSession,
            rememberMe: false
          }));
        }

        // Update the users array to mark this user as logged in
        const updatedUsers = users.map((u: UserData) => ({
          ...u,
          isLoggedIn: u.email === user.email
        }));
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Store user email for header display
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('isAuthenticated', 'true');

        // Dispatch auth change event
        window.dispatchEvent(new Event('authChange'));

        // Success - redirect to the original page or home
        router.push(redirectPath);
        router.refresh();
      } else {
        // Check if user exists but password is wrong
        const userExists = users.some((u: UserData) => 
          u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (userExists) {
          setError('Incorrect password. Please try again.');
        } else {
          setError('No account found with this email. Please register first.');
        }
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-48 h-14">
            <Image
              src={SHOP_DATA.logo}
              alt={`${SHOP_DATA.name} Logo`}
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Header */}
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            New to {SHOP_DATA.name}?{' '}
            <Link 
              href={`/register?redirect=${encodeURIComponent(redirectPath)}`} 
              className="font-medium text-[#E9454D] hover:text-[#d13d45] transition-colors"
            >
              Create an account
            </Link>
          </p>
          {redirectPath !== '/' && (
            <p className="mt-2 text-xs text-gray-500">
              You will  be redirected back to continue your{' '}
              {redirectPath.includes('cart') ? 'shopping' : 'checkout'}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          
          {/* Display success message if coming from registration */}
          {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('registered') === 'true' && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Registration successful! Please login with your credentials.
              </p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Sign In Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#E9454D] focus:outline-none focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20 transition-colors sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#E9454D] focus:outline-none focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20 transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D] transition-colors"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  href="/forgot-password" 
                  className="font-medium text-[#E9454D] hover:text-[#d13d45] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`flex w-full justify-center rounded-lg bg-[#E9454D] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#d13d45] focus:outline-none focus:ring-2 focus:ring-[#E9454D] focus:ring-offset-2 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social login */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E9454D] focus:ring-offset-2 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E9454D] focus:ring-offset-2 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1C5.3 1 1 4.3 1 9c0 3.5 2.3 6.5 5.5 7.6.4.1.6-.2.6-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.2.5.7.5 1.3v2.2c0 .2.2.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6 0-4.7-4.3-8-9-8z" />
              </svg>
              Apple
            </button>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href={SHOP_DATA.termsUrl} className="font-medium text-[#E9454D] hover:text-[#d13d45] transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href={SHOP_DATA.privacyUrl} className="font-medium text-[#E9454D] hover:text-[#d13d45] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}