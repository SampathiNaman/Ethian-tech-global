import React from 'react';
import PolicySection from '../components/PolicySection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const REFUND_POLICY = {
    title: "Refund Policy",
    content: [
      {
        title: "Refund Eligibility",
        content: "Students are eligible for a full refund of the course fee if they withdraw from the course within 7 days of the course start date, provided they have not accessed more than 20% of the course content."
      },
      {
        title: "Refund Process",
        content: "To request a refund, students must submit a formal request through the course platform or contact the course administrator. The request must include the reason for withdrawal and any supporting documentation."
      },
      {
        title: "Refund Timeline",
        content: "Refunds will be processed within 15 business days of the approved refund request. The refunded amount will be credited to the original payment method used for the course purchase."
      },
      {
        title: "Non-Refundable Items",
        content: "The following items are non-refundable:\n• Course materials and resources that have been accessed or downloaded\n• Any additional services or features purchased separately\n• Processing fees associated with the course purchase"
      },
      {
        title: "Special Circumstances",
        content: "In cases of medical emergencies or other extenuating circumstances, students may be eligible for a partial refund or credit towards a future course. Each case will be evaluated on an individual basis."
      }
    ]
  };
  
const DEFERRAL_POLICY = {
    title: "Deferral Policy",
    content: [
      {
        title: "Deferral Eligibility",
        content: "Students may request to defer their course enrollment to a future session under the following circumstances:\n• Medical emergencies\n• Military deployment\n• Natural disasters\n• Other extenuating circumstances"
      },
      {
        title: "Deferral Process",
        content: "To request a deferral, students must submit a formal request at least 14 days before the course start date. The request must include the reason for deferral and any supporting documentation."
      },
      {
        title: "Deferral Timeline",
        content: "Deferred students must enroll in a future course session within 12 months of their original course start date. Failure to do so will result in the forfeiture of the course fee."
      },
      {
        title: "Deferral Limitations",
        content: "Students are limited to one deferral per course purchase. Additional deferrals may be granted in exceptional circumstances at the discretion of the course administrator."
      },
      {
        title: "Course Content Updates",
        content: "Deferred students will be enrolled in the most current version of the course available at the time of their new start date. Course content and materials may differ from the original course version."
      }
    ]
  };
  
const POLICY_SUMMARY = {
    title: "Policy Summary",
    content: [
      {
        title: "Refund Policy",
        items: [
          "Full refund within 7 days of course start",
          "Must not access more than 20% of content",
          "15 business days processing time",
          "Non-refundable items: accessed materials, processing fees",
          "Special circumstances considered individually"
        ]
      },
      {
        title: "Deferral Policy",
        items: [
          "Request 14 days before course start",
          "Valid for 12 months from original start date",
          "One deferral per course purchase",
          "Medical, military, disaster circumstances",
          "Current course version at new start date"
        ]
      }
    ]
  }; 

const Policies = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faFileContract} className="text-[#D62A91]" />
              Refund and Deferral Policy
            </h1>
          </div>

          {/* Policy Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{POLICY_SUMMARY.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {POLICY_SUMMARY.content.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#D62A91] mr-2">•</span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Policies */}
          <div id="refund-policy">
            <PolicySection title={REFUND_POLICY.title} content={REFUND_POLICY.content} />
          </div>
          <div id="deferral-policy">
            <PolicySection title={DEFERRAL_POLICY.title} content={DEFERRAL_POLICY.content} />
          </div>

          {/* Last Updated */}
          <div className="text-center text-gray-500 text-sm mt-8">
            Last Updated: {new Date("2025-6-15").toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Policies; 