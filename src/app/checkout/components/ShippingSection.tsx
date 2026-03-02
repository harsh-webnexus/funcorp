'use client';

import React, { useState, useEffect } from 'react';
import { ShippingAddress } from '../types/checkout';
import { validatePincode, getShippingCost } from '../actions/checkout';

interface Props {
  address: ShippingAddress;
  onChange: (address: Partial<ShippingAddress>) => void;
}

export default function ShippingSection({ address, onChange }: Props) {
  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const handlePincodeBlur = async () => {
    if (address.postalCode.length === 6) {
      const validation = await validatePincode(address.postalCode);
      if (!validation.isValid) {
        setPincodeError(validation.message || 'Invalid PIN code');
        setShippingCost(null);
      } else {
        setPincodeError(null);
        const cost = await getShippingCost(address.postalCode);
        setShippingCost(cost);
      }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={address.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
              placeholder="John"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={address.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 1 *
          </label>
          <input
            type="text"
            id="address1"
            value={address.address1}
            onChange={(e) => onChange({ address1: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
            placeholder="Street address, P.O. box"
          />
        </div>

        <div>
          <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            id="address2"
            value={address.address2 || ''}
            onChange={(e) => onChange({ address2: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
            placeholder="Apartment, suite, unit, building"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              value={address.city}
              onChange={(e) => onChange({ city: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
              placeholder="Mumbai"
            />
          </div>

          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              id="zone"
              value={address.zone}
              onChange={(e) => onChange({ zone: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
              placeholder="Maharashtra"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
              PIN Code *
            </label>
            <input
              type="text"
              id="postalCode"
              value={address.postalCode}
              onChange={(e) => onChange({ postalCode: e.target.value })}
              onBlur={handlePincodeBlur}
              required
              maxLength={6}
              pattern="[0-9]{6}"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
              placeholder="400001"
            />
            {pincodeError && (
              <p className="mt-1 text-xs text-red-600">{pincodeError}</p>
            )}
            {shippingCost !== null && !pincodeError && (
              <p className="mt-1 text-xs text-green-600">
                Shipping: ₹{shippingCost}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={address.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              required
              maxLength={10}
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E9454D] focus:ring-2 focus:ring-[#E9454D] focus:ring-opacity-20"
              placeholder="9876543210"
            />
          </div>
        </div>
      </div>
    </div>
  );
}