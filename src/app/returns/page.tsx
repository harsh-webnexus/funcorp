import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RETURNS & CANCELLATION POLICY | FunCorp',
  description: 'RETURN ELIGIBILITY - Check if you are eligible for a return.',
};

export default function ReturnsCancellationPolicyPage() {
  return (
    <div className="page-width page-width--narrow">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="main-page-title page-header text-3xl font-bold mb-8 text-[#E9454D]">
          RETURNS & CANCELLATION POLICY
        </h1>
        
        <div className="rte prose prose-lg max-w-none text-gray-700">
          <h3 className="text-xl font-semibold mt-8 mb-4 text-center text-[#E9454D]">RETURN ELIGIBILITY</h3>
          <p>Please check if you are eligible for a return below:</p>
          
          <h5 className="text-lg font-semibold mt-6 mb-2 text-[#E9454D]">INCORRECT PRODUCT</h5>
          <p>An incorrect product has been delivered to you where the delivered product does not match the item in the order confirmation email. This is not valid for products where it is mentioned that design/styles may vary on the website.</p>
          
          <h5 className="text-lg font-semibold mt-6 mb-2 text-[#E9454D]">MANUFACTURING DEFECT</h5>
          <p>If you feel the product is damaged or has a manufacturing defect, please photograph this as soon as you have opened the packaging and immediately share the same with our team. (Note: In such a case, please share the videos/pictures of the damaged product with us the same day of receiving the product.)</p>
          
          <p>For complaints on manufacturing defective products, an email from the customer may have to be sent to the respective manufacturer/brand authorities notifying them of the defect in the product with images and videos to validate the claim. Funcorp will assist the customer during the entire process.</p>
          
          <p>Please email us at <a href="mailto:sales@funcorp.in" className="text-[#E9454D] hover:underline">sales@funcorp.in</a> with the details of the product and your Order number. Our team will share the brand email address at which the request needs to be raised. Without this step, a return request for a defective product will not be accepted by Funcorp.</p>
          
          <h5 className="text-lg font-semibold mt-6 mb-2 text-[#E9454D]">REQUISITES FOR RETURN</h5>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Product outer box should be in the original mint condition with price tags.</li>
            <li>Products should not be used, worn out or torn/damaged.</li>
            <li>The originally shipped labels and invoice should be made available.</li>
          </ul>
          
          <h5 className="text-lg font-semibold mt-6 mb-2 text-[#E9454D]">TIME PERIOD</h5>
          <p>Please contact our customer care department within 48 hours of delivery, in case you wish to return any products and your purchase meets the above criteria. our return window shuts 48 hours after the product is delivered to you.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-center text-[#E9454D]">NEXT STEPS FOR YOU</h3>
          
          <p>If your purchase meets our return criteria stated above, please contact our customer care team over email at <a href="mailto:sales@funcorp.in" className="text-[#E9454D] hover:underline">sales@funcorp.in</a>.</p>
          
          <p>Please share the following in order to facilitate a smooth return:</p>
          
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>Order number</li>
            <li>Delivery address</li>
            <li>Reason for exchange</li>
            <li>Images/videos of the item</li>
          </ol>
          
          <p>Post verification, a reverse pick-up will be scheduled within 3-7 business days.</p>
          
          <p className="italic"><em>Please Note: The reverse shipping option is only available for certain pin codes in India. For all the locations, where reverse shipping is not available, you are requested to ship the product on your own within 7 days of receiving it. Please ship the product to a Kolkata based address that is provided by our team.</em></p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-center text-[#E9454D]">NON-RETURNABLE PRODUCTS</h3>
          
          <p>Certain products are not returnable and hence are not subjected to our return policy. The same will be specified on the individual product and brand pages.</p>
          
          <p>Packaging Damaged products are non returnable as all these products go through a strict QC process by our Quality team. Additionally, images of each and every product are shared with the customer after they place an order. Packaging damaged products are shipped only after a customer is satisfied with the condition of the product and its box.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-center text-[#E9454D]">CANCELLATION POLICY</h3>
          
          <p>Funcorp prides itself on shipping out orders as soon as possible. If you wish to cancel your order, then please send an email to us at <a href="mailto:sales@funcorp.in" className="text-[#E9454D] hover:underline">sales@funcorp.in</a> with your product and order details. The email must be sent within 4 hours of placing the order and also during our working hours.</p>
          
          <p>Please note that once an order has been shipped, it cannot be cancelled.</p>
        </div>
      </div>
    </div>
  );
}