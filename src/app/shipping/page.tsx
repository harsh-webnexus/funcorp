import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | FunCorp',
  description: 'The following information summarises the shipping policy: Funcorp provides shipping to most pin codes in India.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="page-width page-width--narrow text-[#E9454D]">
      <div className="container mx-auto px-4 py-8 max-w-4xl text-[#E9454D]">
        <h1 className="main-page-title page-header text-3xl font-bold mb-8 text-gray-900 text-[#E9454D]">
          Shipping Policy
        </h1>
        
        <div className="rte prose prose-lg max-w-none text-gray-700">
          {/* Same content as above */}
          <p>The following information summarises the shipping policy:</p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Funcorp provides shipping to most pin codes in India.</li>
            <li>Orders placed before 11.30 am are dispatched/shipped on the same day, and the rest within the next working day except for Sundays and holidays.</li>
            <li>All prepaid orders shipped on priority basis.</li>
            <li>All Cash on delivery (COD) orders are verified by a customer service representative by the medium of calling on the registered number associated with the order. Funcorp will make 3 such attempts to verify the order, in addition to a whatsapp attempt as well. If the order still remains unverified after 3 days from the order, the order will be cancelled.</li>
            <li>Maximum products are eligible for <span>Cash on delivery (COD).</span></li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">SHIPPING CHARGES</h3>
          <p>The following schedule describes the shipping charge structure:</p>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300" style={{ height: '240.729px' }}>
              <thead>
                <tr style={{ height: '46.1458px' }}>
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold" style={{ width: '254.422px' }}>Product Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold" style={{ width: '154.219px' }}>Order Amount</th>
                  <th className="border border-gray-300 px-4 py-2 text-center font-semibold" style={{ width: '145.375px' }}>Shipping Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: '46.1458px' }}>
                  <td className="border border-gray-300 px-4 py-2 text-center">Normal Products</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">0 - 699</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">70</td>
                </tr>
                <tr style={{ height: '46.1458px' }}>
                  <td className="border border-gray-300 px-4 py-2 text-center">Normal Products</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Above 699</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">0</td>
                </tr>
                <tr style={{ height: '46.1458px' }}>
                  <td className="border border-gray-300 px-4 py-2 text-center">Limited Edition Collection</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">0 - 299</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">200</td>
                </tr>
                <tr style={{ height: '46.1458px' }}>
                  <td className="border border-gray-300 px-4 py-2 text-center">Limited Edition Collection</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">300 - 899</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Upto 500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">Please note that for every COD order an additional INR 100 will charged on the account of handling charges.</p>
          
          <p className="mt-2">Please also note the shipping charge structure of exceptional products:</p>

          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300" style={{ height: '357.049px' }}>
              <thead>
                <tr style={{ height: '24.3403px' }}>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold" style={{ width: '222px' }}>Product Type/Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold" style={{ width: '159px' }}>Order Quantity</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold" style={{ width: '158px' }}>Shipping Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: '24.3403px' }}>
                  <td className="border border-gray-300 px-4 py-2">Hot Wheels Mainline</td>
                  <td className="border border-gray-300 px-4 py-2">1 Model</td>
                  <td className="border border-gray-300 px-4 py-2">100</td>
                </tr>
                <tr style={{ height: '58.1424px' }}>
                  <td className="border border-gray-300 px-4 py-2">Hot Wheels Anniversary Edition Pack (Limited Edition)</td>
                  <td className="border border-gray-300 px-4 py-2">1 Model</td>
                  <td className="border border-gray-300 px-4 py-2">200</td>
                </tr>
                <tr style={{ height: '47.5px' }}>
                  <td className="border border-gray-300 px-4 py-2">Hot Wheels Pop Culture & Car Culture (Limited Edition)</td>
                  <td className="border border-gray-300 px-4 py-2">1 Model</td>
                  <td className="border border-gray-300 px-4 py-2">300</td>
                </tr>
                <tr style={{ height: '58.1424px' }}>
                  <td className="border border-gray-300 px-4 py-2">Hot Wheels Ultra Hots Retro Series (Limited Edition)</td>
                  <td className="border border-gray-300 px-4 py-2">1 Model</td>
                  <td className="border border-gray-300 px-4 py-2">120</td>
                </tr>
                <tr style={{ height: '47.5px' }}>
                  <td className="border border-gray-300 px-4 py-2">Hot Wheels F1 Series (Limited Edition)</td>
                  <td className="border border-gray-300 px-4 py-2">1 Model</td>
                  <td className="border border-gray-300 px-4 py-2">500</td>
                </tr>
                <tr style={{ height: '38.8542px' }}>
                  <td className="border border-gray-300 px-4 py-2">Hot Wheels Pack Of 5</td>
                  <td className="border border-gray-300 px-4 py-2">1 Pack (5 Models)</td>
                  <td className="border border-gray-300 px-4 py-2">600</td>
                </tr>
                <tr style={{ height: '58.2292px' }}>
                  <td className="border border-gray-300 px-4 py-2">Hot Wheels Neon Speeders Edition (Limited Edition)</td>
                  <td className="border border-gray-300 px-4 py-2">1 Pack</td>
                  <td className="border border-gray-300 px-4 py-2">120</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Continue with the rest of the content... */}
          <p className="mt-4">
            <span className="text-sm">These shipping and handling charges are not refundable in the case of return/cancellation of the product or the order.</span>
          </p>

          <p>The shipping and handling charges can be modified by FunCorp at any point without prior intimation. The new charges would reflect on the product page as well as in the checkout flow.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">ESTIMATED DELIVERY TIME</h3>
          <p>Approximate delivery time according to city of delivery is mentioned below:</p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Tier 1 cities - 3-4 days</li>
            <li>Tier 2 cities - 4-6 days</li>
            <li>Tier 3 cities - 4-8 days</li>
            <li>Kolkata - Same or next day</li>
            <li>J&amp;K &amp; North East - 6 - 8 days</li>
          </ul>

          <p>Items weighing over 2 kilos or high volume may take a couple of days longer to reach.</p>
          <p>The delivery date provided in the order confirmation email are tentative. It may change once the order is shipped. During the monsoons, please expect a delay in delivery.</p>
          <p>FunCorp tries to provide the best customer experience possible by delivering the products as per the Estimated Delivery Date communicated as above. However, at times there might be unexpected delays in the delivery of your order due to unavoidable and undetermined logistics challenges beyond our control for which FunCorp is not liable and would request its users to cooperate as FunCorp continuously tries to nought such instances. Also, FunCorp reserves the right to cancel your order at its sole discretion in cases where it takes longer than usual delivery time or the shipment is physically untraceable and refund the amount paid for cancelled product(s).</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">EXPRESS SHIPPING</h3>
          <p>Please email us at sales@funcorp.in in case you need express shipping. We provide express shipping to a few pin codes across India at a nominal charge (based on PIN code).</p>
          <p>For any special occasions such as birthdays, festive events, etc - Please inform us over email or WhatsApp so that we can arrange delivery accordingly.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">HIDDEN CHARGES (SALES TAX, OCTROI, ETC)</h3>
          <p>You will get the final price during check out. Our prices are all inclusive and you need not pay anything extra.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">INTERNATIONAL LOCATIONS</h3>
          <p>Currently we do not deliver to locations outside India. Customers will be able to make their purchases on our site from anywhere in the world with credit/debit cards issued in India and many other countries, however, it must be ensured the delivery address is in India.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">TRACKING PACKAGES</h3>
          <p>We will mail you the name of the courier company and the tracking number of your consignment in your registered email address. In case you do not receive a mail from us within 24hrs of placing an order please check your spam folder. Tracking may not appear online for up to another 24 hours in some cases, so please wait until your package is scanned by the courier company.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">NON-AVAILABILITY ON DELIVERY</h3>
          <p>Our delivery partners will attempt to deliver the package multiple times before it is returned back to our warehouse. Please provide your correct mobile number in the delivery address as it will help in making a faster delivery.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">REVERSE SHIPPING</h3>
          <p>We charge a nominal fee of INR 100 for all orders that will require Reverse Shipping.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">CHANGE IN DELIVERY DETAILS</h3>
          <p>Any change in delivery details after the order is shipped is not possible.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">RESHIPPING OF UNACCEPTED ORDERS</h3>
          <p>In case you do not accept any prepaid order that has been shipped, and request for a second shipping, Funcorp will charge a delivery charge of the original amount as well as a nominal processing fee of INR 150 per order.</p>
        </div>
      </div>
    </div>
  );
}