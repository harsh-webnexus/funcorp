import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'REFUND POLICY | FunCorp',
  description: 'REFUND AMOUNT LOST PRODUCT At the time of delivery if an item is lost in-transit by the courier, we will provide a full refund to the customer.',
};

export default function RefundPolicyPage() {
  return (
    <div className="page-width page-width--narrow">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="main-page-title page-header text-3xl font-bold mb-8 text-gray-900">
          REFUND POLICY
        </h1>
        
        <div className="rte prose prose-lg max-w-none text-gray-700">
          <h3 className="text-xl font-semibold mt-8 mb-4 text-center text-gray-900">REFUND AMOUNT</h3>
          
          <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-800">LOST PRODUCT</h4>
          <p>At the time of delivery if an item is lost in-transit by the courier, we will provide a full refund to the customer.</p>
          
          <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-800">WRONG OR DAMAGED PRODUCT DELIVERED</h4>
          <p>In case you receive a wrong or damaged product, and qualify for a return as our return policy, we will provide a full refund to you. The refund will be initiated only after the products are received at our warehouse, and successfully pass the quality check.</p>
          
          <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-800">CANCELLED ORDERS</h4>
          <p>For all orders that are cancelled, we will provide a full refund to you.</p>
          
          <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-800">UNDELIVERED ORDERS</h4>
          <p>For all prepaid orders that are not accepted by you and are returned to our warehouse, a small processing fee of INR 100 will be charged to you, and the balance will be refunded to you. Please note that the shipping and handling charges that were charged to you while placing the order will not be refunded in this case.</p>
          
          <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-800">DISCOUNTED PRODUCT</h4>
          <p>If any or all the products that were originally part of an order placed using a coupon or offer are returned then the coupon code/offer will no longer be applicable on the order. The benefit of the coupon/offer will also not be included in the refund. If the product(s) returned are part of any free offer such as Buy 2 get 1 free or Buy 1 get 1 free, all the products related to the offer have to be returned, as they have been purchased as part of a group offer.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-center text-gray-900">MODE OF REFUND</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>In case of online payment, the refund will be provided to you in the form of store credits or store voucher.</li>
            <li>In case of COD orders, the refund will be provided to the customer in the form of store credits or store voucher.</li>
            <li>In case of cancellations, the refund will be provided to you in the form of store credits or store voucher.</li>
            <li>We do not offer refunds to your bank account or credit card.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}