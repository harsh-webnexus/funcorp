// src/app/checkout/components/CheckoutForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ContactSection from './ContactSection';
// import ShippingSection from './ShippingSection';
// import PaymentSection from './PaymentSection';
import { processPayment } from '../actions/checkout';
import { Cart, Customer, CheckoutFormData } from '../types/checkout';

interface Props {
  cart: Cart;
  customer: Customer | null;
}

export default function CheckoutForm({ cart, customer }: Props) {
//   const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: customer?.email || '',
    marketingOptIn: false,
    smsOptIn: false,
    shippingAddress: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      address1: '',
      address2: '',
      city: '',
      zone: '',
      postalCode: '',
      phone: customer?.phone || '',
      country: 'IN'
    },
    paymentMethod: 'cashfree',
    billingSameAsShipping: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await processPayment(formData);
      if (result && 'error' in result) {
        // Show error to user
        alert(result.error);
        setIsSubmitting(false);
      }
      // If redirect happens, the function will redirect
      // If not, we handle the response
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsSubmitting(false);
    }
  };

  const updateFormData = (updates: Partial<CheckoutFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      {/* Contact Section */}
      <ContactSection
        email={formData.email}
        marketingOptIn={formData.marketingOptIn}
        smsOptIn={formData.smsOptIn}
        onChange={updateFormData}
        isLoggedIn={customer?.isLoggedIn || false}
      />

      <div className="border-t border-gray-200 my-6"></div>

      {/* Shipping Section */}
      {/* <ShippingSection
        address={formData.shippingAddress}
        onChange={(address) => updateFormData({ shippingAddress: address })}
      /> */}

      <div className="border-t border-gray-200 my-6"></div>

      {/* Payment Section */}
      {/* <PaymentSection
        selectedMethod={formData.paymentMethod}
        billingSameAsShipping={formData.billingSameAsShipping}
        onMethodChange={(method) => updateFormData({ paymentMethod: method })}
        onBillingChange={(same) => updateFormData({ billingSameAsShipping: same })}
      /> */}

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Processing...' : `Pay ₹${cart.subtotal.toFixed(2)}`}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By completing your purchase, you agree to our{' '}
          <a href="/terms" className="text-indigo-600 hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </form>
  );
}