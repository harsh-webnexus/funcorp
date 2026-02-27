// src/app/checkout/components/ContactSection.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  email: string;
  marketingOptIn: boolean;
  smsOptIn: boolean;
  onChange: (updates: Partial<{
    email: string;
    marketingOptIn: boolean;
    smsOptIn: boolean;
  }>) => void;
  isLoggedIn: boolean;
}

export default function ContactSection({ 
  email, 
  marketingOptIn, 
  smsOptIn, 
  onChange,
  isLoggedIn 
}: Props) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Indian state data for phone code
  const countryCode = '+91';

  return (
    <section aria-label="Contact information">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
      
      {isLoggedIn ? (
        // Logged in user view
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {email.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">{email}</p>
                <p className="text-xs text-gray-500">Logged in</p>
              </div>
            </div>
            
            {/* More actions button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="More actions for this account"
                aria-expanded={showMoreOptions}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {showMoreOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      // Handle logout
                      window.location.href = '/logout';
                    }}
                  >
                    Log out
                  </button>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account settings
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Guest user view - Email input
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => onChange({ email: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          {/* Marketing opt-in for guests */}
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="marketing_opt_in"
                  name="marketing_opt_in"
                  checked={marketingOptIn}
                  onChange={(e) => onChange({ marketingOptIn: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="marketing_opt_in" className="text-sm text-gray-700">
                  Email me with news and offers
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMS Marketing Opt-in (shown for both logged in and guest) */}
      <div className="mt-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="sms_marketing_opt_in"
              name="sms_marketing_opt_in"
              checked={smsOptIn}
              onChange={(e) => onChange({ smsOptIn: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="sms_marketing_opt_in" className="text-sm text-gray-700">
              Text me with news and offers
            </label>
            {smsOptIn && (
              <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <p>
                  By checking this box, you agree to receive recurring automated promotional and 
                  personalized marketing text messages from FunCorp at the phone number provided. 
                  Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. 
                  Msg frequency varies. Msg & data rates may apply.
                </p>
                <button
                  type="button"
                  className="mt-1 text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => {
                    // Show terms
                    alert('Terms and conditions for SMS marketing would be shown here');
                  }}
                >
                  View Terms & Privacy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help text for phone number (shown when SMS is checked) */}
      {smsOptIn && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs">
            You&apos;ll be able to enter your phone number in the shipping section
          </span>
        </div>
      )}

      {/* Already have an account? Sign in link for guests */}
      {!isLoggedIn && (
        <div className="mt-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
          <span>Already have an account? </span>
          <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Sign in
          </Link>
        </div>
      )}

      {/* Email validation hint */}
      {email && !email.includes('@') && email.length > 0 && (
        <p className="mt-2 text-sm text-red-600">
          Please enter a valid email address
        </p>
      )}
    </section>
  );
}