import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

const PRIVACY_POLICY_SECTIONS = [
  {
    title: "Information We Collect",
    content: `We collect various types of personal information depending on your interaction with us:

• Information You Provide Directly:
  o Contact Information: Name, job title, company name, email address, phone number, and postal address when you inquire about our services, download resources, subscribe to our newsletter, or fill out a contact form.
  o Communication Content: Information you provide in your communications with us, such as emails, phone calls, or meeting notes.
  o Business Information: Details about your business needs, challenges, existing IT infrastructure, and project requirements when you engage us for consulting services.
  o Payment Information: If you are a client, billing address and payment details (e.g., bank account information for invoices, credit card details processed securely by third-party payment processors). We do not store full payment card details on our servers.
  o Resume/Application Information: If you apply for a job with us, information included in your resume, cover letter, and application forms.

• Information We Collect Automatically:
  o Website Usage Data: IP address, browser type, operating system, referring URLs, pages visited, time spent on pages, and navigation paths on our website. This is collected through cookies, web beacons, and similar technologies.
  o Device Information: Information about the device you use to access our services, such as device type, unique device identifiers, and mobile network information.

• Information from Third Parties:
  o We may receive information from third-party sources, such as business partners, public databases, or social media platforms, to supplement the information you provide, for marketing purposes, or to verify information.`
  },
  {
    title: "How We Use Your Information",
    content: `We use the personal information we collect for various business purposes, including:

• To Provide and Manage Our Services: 
  o Delivering the IT consulting and solution services you request.
  o Managing our client relationships and contracts.
  o Providing support and maintenance for our services.
  o Billing and payment processing.

• For Communication: 
  o Responding to your inquiries and requests.
  o Sending important notices, updates, and administrative messages related to our services.
  o Sending newsletters, marketing communications, and promotional materials about our services that may be of interest to you (you can opt-out at any time).

• For Website Improvement and Personalization: 
  o Analyzing website usage to understand user behavior and improve website functionality and content.
  o Personalizing your experience on our website.

• For Business Operations and Analytics: 
  o Conducting internal research and development.
  o Improving our service offerings and developing new ones.
  o Performing data analysis and audits.

• For Security and Compliance: 
  o Protecting against fraud, unauthorized transactions, and other liabilities.
  o Ensuring the security of our website, systems, and client data.
  o Complying with applicable laws, regulations, legal processes, and governmental requests.
  o Enforcing our terms and conditions.

• For Recruitment: 
  o Processing job applications and evaluating candidates.`
  },
  {
    title: "How We Share Your Information",
    content: `We do not sell your personal information. We may share your information with third parties in the following circumstances:

• Service Providers: We may share information with trusted third-party service providers who perform services on our behalf, such as website hosting, data analysis, payment processing, customer support, marketing, and IT infrastructure services. These providers are obligated to protect your information and use it only for the purposes for which it was provided.

• Business Partners: We may share information with business partners with whom we collaborate on projects or services, provided they adhere to similar privacy standards.

• Legal Requirements and Law Enforcement: We may disclose your information if required to do so by law, in response to a subpoena or court order, or if we believe in good faith that such action is necessary to comply with legal obligations, protect our rights or property, prevent fraud, or ensure the safety of our users or the public.

• Business Transfers: In the event of a merger, acquisition, sale of assets, or other business transaction, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your personal information, as well as any choices you may have regarding your personal information.

• With Your Consent: We may disclose your information for any other purpose with your explicit consent.`
  },
  {
    title: "Data Security",
    content: `We implement reasonable technical, administrative, and physical safeguards designed to protect personal information from unauthorized access, use, disclosure, alteration, or destruction. These measures include, but are not limited to, encryption, access controls, firewalls, and regular security assessments.

While we strive to protect your personal information, no method of transmission over the internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.`
  },
  {
    title: "Data Retention",
    content: `We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure of your personal information, the purposes for which we process your personal information, and whether we can achieve those purposes through other means, as well as applicable legal requirements.`
  },
  {
    title: "Your Privacy Choices and Rights",
    content: `Depending on your jurisdiction, you may have certain rights regarding your personal information:

• Access and Correction: You may request access to the personal information we hold about you and request corrections to any inaccuracies.

• Opt-Out of Marketing Communications: You can opt-out of receiving marketing emails from us by following the unsubscribe instructions included in those emails or by contacting us directly. Please note that even if you opt-out of marketing communications, we may still send you non-promotional messages related to your account or our business relationship.

• Deletion: In certain circumstances, you may have the right to request the deletion of your personal information.

• Data Portability: You may have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format.

• Objection/Restriction: You may have the right to object to or request restriction of certain processing activities.

To exercise any of these rights, please contact us using the contact information provided below. We will respond to your request in accordance with applicable laws.`
  },
  {
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites or services that are not operated by us. This Privacy Policy does not apply to the practices of third parties. We encourage you to review the privacy policies of any third-party sites you visit.`
  },
  {
    title: "Children's Privacy",
    content: `Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without verifiable parental consent, we will take steps to delete that information.`
  },
  {
    title: "Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy on our website with a new "Effective Date." We encourage you to review this policy periodically. Your continued use of our website or services after any changes indicates your acceptance of the updated Privacy Policy.`
  },
  {
    title: "Contact Us",
    content: `If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:

Ethian Global Tech LLC
8433 Oak Bush Ter, Columbia, MD 21045, USA
Email: info@ethiantech.com
Phone: 443-675-8888`
  }
];

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8" data-aos="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
                <FontAwesomeIcon icon={faShieldHalved} className="text-[#D62A91]" />
                Privacy Policy for Ethian Global Tech LLC
              </h1>
              <p className="text-gray-600 mt-2">Effective Date: May 27, 2025</p>
            </div>
            <NavLink 
              to="/refund-deferral-policies" 
              className="inline-flex items-center gap-2 px-4 py-2 text-[#D62A91] hover:text-[#B91C7B] transition-colors duration-200 text-sm font-medium border border-[#D62A91] rounded-lg hover:bg-[#D62A91] hover:text-white"
            >
              <FontAwesomeIcon icon={faFileContract} />
              View Refund Policy
            </NavLink>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <div className="text-gray-600 space-y-4 leading-relaxed">
            <p>
              Ethian Global Tech LLC ("Ethian Global Tech," "we," "us," or "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and protect personal information when you interact with us through our website (www.ethianltech.com), our services, and other communications.
            </p>
            <p>
              As an IT consulting and solutions services provider based in the USA, we understand the importance of data privacy. We serve businesses, primarily small to medium-sized enterprises (SMEs), and this policy outlines our practices concerning the personal information of our clients, prospective clients, website visitors, and other individuals we interact with.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <div className="space-y-8">
            {PRIVACY_POLICY_SECTIONS.map((section, index) => (
              <div 
                key={index} 
                className="border-b border-gray-200 pb-8 last:border-b-0"
                id={section.title.toLowerCase().replace(/\s+/g, '-')}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-[#D62A91]">{index + 1}.</span>
                  {section.title}
                </h3>
                <div className="text-gray-600 space-y-3">
                  {section.content.split('\n').map((line, i) => (
                    <p key={i} className="leading-relaxed">
                      {line.startsWith('•') ? (
                        <span className="flex items-start gap-2">
                          <span className="text-[#D62A91]">•</span>
                          <span>{line.substring(1).trim()}</span>
                        </span>
                      ) : line.startsWith('  o') ? (
                        <span className="flex items-start gap-2 ml-4">
                          <span className="text-[#D62A91]">o</span>
                          <span>{line.substring(3).trim()}</span>
                        </span>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-gray-500 text-sm mt-8" data-aos="fade-up">
          Last Updated: {new Date("2025-05-27").toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 