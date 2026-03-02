'use client';

import React from 'react';

interface Props {
  selectedMethod: 'cod' | 'cashfree';
  billingSameAsShipping: boolean;
  onMethodChange: (method: 'cod' | 'cashfree') => void;
  onBillingChange: (same: boolean) => void;
}

export default function PaymentSection({ 
  selectedMethod, 
  billingSameAsShipping, 
  onMethodChange,
  onBillingChange 
}: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
      
      <div className="space-y-3 mb-6">
        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#E9454D] transition-colors">
          <input
            type="radio"
            name="paymentMethod"
            value="cashfree"
            checked={selectedMethod === 'cashfree'}
            onChange={(e) => onMethodChange('cashfree')}
            className="h-4 w-4 text-[#E9454D] focus:ring-[#E9454D]"
          />
          <div className="ml-3">
            <span className="font-medium text-gray-900">Pay Online</span>
            <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Net Banking</p>
          </div>
        </label>

        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#E9454D] transition-colors">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={selectedMethod === 'cod'}
            onChange={(e) => onMethodChange('cod')}
            className="h-4 w-4 text-[#E9454D] focus:ring-[#E9454D]"
          />
          <div className="ml-3">
            <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
            <p className="text-sm text-gray-500">Pay when you receive your order</p>
          </div>
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={billingSameAsShipping}
            onChange={(e) => onBillingChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D]"
          />
          <span className="ml-2 text-sm text-gray-700">
            Billing address same as shipping address
          </span>
        </label>
      </div>
    </div>
  );
}