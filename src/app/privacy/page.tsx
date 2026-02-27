import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | FunCorp',
  description: 'Thank you for visiting our website. At FunCorp, we are keenly aware of the trust our users place in us and our responsibility to protect their privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="page-width page-width--narrow">
      <div className="container mx-auto px-4 py-8 max-w-4xl text-red ">
        <h1 className="main-page-title page-header text-3xl font-bold mb-8 text-gray-900">
          Privacy Policy
        </h1>
        
        <div className="rte prose prose-lg max-w-none text-gray-700">
          <p>Thank you for visiting our website. At FunCorp, we are keenly aware of the trust our users (hereinafter referred to as “You” “Your” “Yourself”) place in us and our responsibility to protect their privacy.</p>
          
          <p>This privacy policy tells You how we use personal information collected through this website. Please read this privacy policy before using the site or submitting any personal information. By using the site, You are accepting the practices described in this privacy policy. These practices may be changed, but any changes will be posted and changes will only apply to activities and information on going forward, not on a retroactive basis. You are encouraged to review the privacy policy whenever you visit the site to make sure that You understand how any personal information You provide will be used.</p>
          
          <p>Note: the privacy practices set forth in this privacy policy are for this website only. If You link to other websites, please review the privacy policies posted on those sites.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">COLLECTION OF INFORMATION</h3>
          <p>We may collect personally identifiable information, such as names, postal addresses, email addresses, etc, when voluntarily submitted by our visitors. This information is only used to fulfil Your specific request, unless You give us permission to use it in another manner, for example to add You to one of our mailing lists.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">COOKIE/TRACKING TECHNOLOGY</h3>
          <p>The website may use cookie and tracking technology depending on the features offered. Cookie and tracking technology are useful for gathering information such as browser type and operating system, tracking the number of visitors to the site, and understanding how visitors use the site. Cookies can also help customise the site for visitors. Personal information cannot be collected via cookies and other tracking technology; however, if You previously provided personally identifiable information, cookies may be tied to such information. Aggregate cookie and tracking information may be shared with third parties. On collecting data based on user demographics, including age and gender, the website does not utilise such information to individually identify a visitor. The data gathered is only referred to for providing better offers based on group segmentation and improving the user experience and interface.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">DISTRIBUTION OF INFORMATION</h3>
          <p>Any personally identifiable information You submit with the site will ONLY be disclosed to service providers who are linked to Your request. We will not disclose, sell, share or in any way reveal Your information to any other third party. However, we may share information with governmental agencies or other companies assisting us in fraud prevention or investigation. We may do so when: (1) permitted or required by law; or, (2) trying to protect against or prevent actual or potential fraud or unauthorised transactions; or, (3) investigating fraud that has already taken place.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">COMMITMENT TO DATA SECURITY</h3>
          <p>Your personally identifiable information is kept secure. Only authorised employees, agents and contractors (who have agreed to keep information secure and confidential) have access to this information. All emails and newsletters from this site allow You to opt out of further mailings.</p>
          
          <p>In certain cases, specifically with regard to particular products, You might be required to provide Your credit or debit card details to the approved payment gateways while making the payment. In this regard You agree to provide correct and accurate credit/debit card details to the approved payment gateways to avail of services on the website. You shall not use a credit/debit card which is not lawfully owned by You, ie in any transaction, You must use Your own credit/debit card. The information provided by You will not be utilised or shared with any third party unless required in relation to fraud verifications or by law, regulation or court order. You will be solely responsible for the security and confidentiality of Your credit/debit card details. FunCorp expressly disclaims all liabilities that may arise as a consequence of any unauthorised use of Your credit/debit card.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">DISCLAIMER</h3>
          <p>The information contained in this website is for general information purposes only. The information is provided by FunCorp and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>
          
          <p>In no event will we be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with the use of this website.</p>
          
          <p>Through this website, you are able to link to other websites which are not under the control of FunCorp. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.</p>
          
          <p>Every effort is made to keep the website up and running smoothly. However, FunCorp takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.</p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">CONTACT INFORMATION</h3>
          <p>For any questions, concerns, or comments about our privacy policy, you may contact us (Mon-Sat, 10am–7pm) on +91 62917-97701 or info@funcorp.in</p>
          
          <p>
            <a href="https://funcorp.in/" className="text-blue-600 hover:underline">www.funcorp.in</a>
            <span> </span>reserves the right to modify and/or change the terms of this policy without any prior notice.
          </p>
        </div>
      </div>
    </div>
  );
}