'use client';

import React from 'react';
import { CheckoutFormData } from '../types/checkout';

interface Props {
  email: string;
  marketingOptIn: boolean;
  smsOptIn: boolean;
  onChange: (updates: Partial<Pick<CheckoutFormData, 'email' | 'marketingOptIn' | 'smsOptIn'>>) => void;
  isLoggedIn: boolean;
}

export default function ContactSection({ 
  email, 
  marketingOptIn, 
  smsOptIn, 
  onChange,
  isLoggedIn 
}: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => onChange({ email: e.target.value })}
            required
            disabled={isLoggedIn}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => onChange({ marketingOptIn: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D]"
            />
            <span className="ml-2 text-sm text-gray-700">
              Email me with news and offers
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={smsOptIn}
              onChange={(e) => onChange({ smsOptIn: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D]"
            />
            <span className="ml-2 text-sm text-gray-700">
              Text me with order updates
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}