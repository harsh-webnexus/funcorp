'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContactSection from './ContactSection';
import ShippingSection from './ShippingSection';
import PaymentSection from './PaymentSection';
import { processPayment } from '../actions/checkout';
import { Cart, Customer, CheckoutFormData, ShippingAddress, PaymentResult } from '../types/checkout';

interface Props {
  cart: Cart;
  customer: Customer | null;
}

interface CustomerWithName {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  isLoggedIn: boolean;
}

export default function CheckoutForm({ cart, customer }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Helper function to get name parts
  const getNamesFromCustomer = (): { firstName: string; lastName: string } => {
    const customerWithName = customer as CustomerWithName | null;
    
    if (customerWithName?.firstName && customerWithName?.lastName) {
      return {
        firstName: customerWithName.firstName,
        lastName: customerWithName.lastName
      };
    }
    
    // If we have a full name in the customer object, split it
    if (customerWithName?.name) {
      const parts = customerWithName.name.trim().split(' ');
      return {
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' ') || ''
      };
    }
    
    return { firstName: '', lastName: '' };
  };

  // Initialize form data
  const [formData, setFormData] = useState<CheckoutFormData>(() => {
    const { firstName, lastName } = getNamesFromCustomer();
    const customerWithName = customer as CustomerWithName | null;
    
    return {
      email: customer?.email || '',
      marketingOptIn: false,
      smsOptIn: false,
      shippingAddress: {
        firstName: firstName,
        lastName: lastName,
        address1: '',
        address2: '',
        city: '',
        zone: '',
        postalCode: '',
        phone: customer?.phone || '',
        country: 'IN'
      },
      paymentMethod: 'cashfree',
      billingSameAsShipping: true,
      saveInfo: false
    };
  });

  // Load saved address from localStorage if available
  useEffect(() => {
    const loadSavedAddress = () => {
      const savedAddresses = localStorage.getItem('userAddresses');
      if (savedAddresses) {
        try {
          interface SavedAddress {
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
          
          const addresses: SavedAddress[] = JSON.parse(savedAddresses);
          const defaultAddress = addresses.find((addr) => addr.isDefault);
          
          if (defaultAddress) {
            setFormData(prev => ({
              ...prev,
              shippingAddress: {
                firstName: defaultAddress.firstName || prev.shippingAddress.firstName,
                lastName: defaultAddress.lastName || prev.shippingAddress.lastName,
                address1: defaultAddress.addressLine1 || '',
                address2: defaultAddress.addressLine2 || '',
                city: defaultAddress.city || '',
                zone: defaultAddress.state || '',
                postalCode: defaultAddress.pincode || '',
                phone: defaultAddress.phone || prev.shippingAddress.phone,
                country: 'IN'
              }
            }));
          }
        } catch (e) {
          console.error('Error loading saved address:', e);
        }
      }
    };

    loadSavedAddress();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form before submission
      if (!formData.email) {
        throw new Error('Email is required');
      }
      if (!formData.shippingAddress.firstName || !formData.shippingAddress.lastName) {
        throw new Error('Full name is required');
      }
      if (!formData.shippingAddress.address1) {
        throw new Error('Address is required');
      }
      if (!formData.shippingAddress.city) {
        throw new Error('City is required');
      }
      if (!formData.shippingAddress.zone) {
        throw new Error('State is required');
      }
      if (!formData.shippingAddress.postalCode || formData.shippingAddress.postalCode.length !== 6) {
        throw new Error('Valid 6-digit PIN code is required');
      }
      if (!formData.shippingAddress.phone || formData.shippingAddress.phone.length !== 10) {
        throw new Error('Valid 10-digit phone number is required');
      }

      // Save cart to cookie for server action
      document.cookie = `cart=${JSON.stringify(cart)}; path=/; max-age=3600`;

      // Save user data to cookie if logged in
      if (customer) {
        const customerWithName = customer as CustomerWithName;
        const userData = {
          email: customer.email,
          name: customerWithName.firstName && customerWithName.lastName ? 
            `${customerWithName.firstName} ${customerWithName.lastName}`.trim() : 
            customerWithName.name || '',
          phone: customer.phone || '',
          isLoggedIn: customer.isLoggedIn
        };
        document.cookie = `user_data=${JSON.stringify(userData)}; path=/; max-age=3600`;
      }

      const result = await processPayment(formData) as PaymentResult;
      
      if (result && 'error' in result) {
        setError(result.error);
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // If redirect happens, the function will redirect
      // If not, we handle the response
    } catch (error) {
      console.error('Payment processing error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during checkout');
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (updates: Partial<CheckoutFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateShippingAddress = (addressUpdates: Partial<ShippingAddress>) => {
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        ...addressUpdates
      }
    }));
  };

  // Save address to localStorage if user opts in
  const saveAddressToLocalStorage = () => {
    if (formData.saveInfo) {
      const addressToSave = {
        id: Date.now().toString(),
        type: 'home' as const,
        firstName: formData.shippingAddress.firstName,
        lastName: formData.shippingAddress.lastName,
        addressLine1: formData.shippingAddress.address1,
        addressLine2: formData.shippingAddress.address2 || '',
        city: formData.shippingAddress.city,
        state: formData.shippingAddress.zone,
        pincode: formData.shippingAddress.postalCode,
        phone: formData.shippingAddress.phone,
        isDefault: true
      };

      const existingAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
      const updatedAddresses = [...existingAddresses, addressToSave];
      localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
    }
  };

  // Calculate safe values with fallbacks
  const safeCart = {
    items: cart?.items || [],
    total: cart?.total || 0,
    subtotal: cart?.subtotal || 0,
    itemCount: cart?.itemCount || 0
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

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
      <ShippingSection
        address={formData.shippingAddress}
        onChange={updateShippingAddress}
      />

      <div className="border-t border-gray-200 my-6"></div>

      {/* Save Address Checkbox */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.saveInfo || false}
            onChange={(e) => {
              updateFormData({ saveInfo: e.target.checked });
              if (e.target.checked) {
                saveAddressToLocalStorage();
              }
            }}
            className="h-4 w-4 rounded border-gray-300 text-[#E9454D] focus:ring-[#E9454D]"
          />
          <span className="ml-2 text-sm text-gray-700">
            Save this address for next time
          </span>
        </label>
      </div>

      {/* Payment Section */}
      <PaymentSection
        selectedMethod={formData.paymentMethod}
        billingSameAsShipping={formData.billingSameAsShipping}
        onMethodChange={(method) => updateFormData({ paymentMethod: method })}
        onBillingChange={(same) => updateFormData({ billingSameAsShipping: same })}
      />

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E9454D] text-white py-3 px-4 rounded-lg hover:bg-[#d13d45] focus:outline-none focus:ring-2 focus:ring-[#E9454D] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Pay ₹${safeCart.total.toFixed(2)}`
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By completing your purchase, you agree to our{' '}
          <a href="/terms" className="text-[#E9454D] hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="/privacy" className="text-[#E9454D] hover:underline">Privacy Policy</a>
        </p>
      </div>
    </form>
  );
}