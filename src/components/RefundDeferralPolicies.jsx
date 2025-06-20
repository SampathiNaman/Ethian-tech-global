import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

const RefundDeferralPolicies = () => {
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
            <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faFileContract} className="text-[#D62A91]" />
              Refund and Deferral Policy
            </h1>
            <NavLink 
              to="/policy" 
              className="inline-flex items-center gap-2 px-4 py-2 text-[#D62A91] hover:text-[#B91C7B] transition-colors duration-200 text-sm font-medium border border-[#D62A91] rounded-lg hover:bg-[#D62A91] hover:text-white"
            >
              <FontAwesomeIcon icon={faShieldHalved} />
              View Privacy Policy
            </NavLink>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Refund Policy</h2>
          <div className="text-gray-600 space-y-4 leading-relaxed">
            <p>
              A Learner can claim a <span className="font-semibold text-[#D62A91]">100% refund</span> of the amount paid towards the Program by sending an email to <a href="mailto:info@ethiantech.com" className="text-[#D62A91] underline hover:text-blue-600">info@ethiantech.com</a> within <span className="font-semibold">10 days</span> from the date of the first class (i.e. the meet and greet session) of the relevant Program (“Refund Window”). No questions will be asked during this refund window.
            </p>
            <p>
              <span className="font-semibold">No refund</span> will be possible after the expiry of the 10-day Refund Window. For the avoidance of doubt, a Learner will not be entitled to another Refund Window in the event of a cohort change or course deferral.
            </p>
            <p>
              Refunds will only be made to the Learner’s bank account via NEFT/IMPS/RTGS or other suitable methods, as deemed fit by EthianTech. Learners may be required to provide supporting documents (such as a cancelled cheque) for account verification.
            </p>
            <p>
              Refunds will be processed within <span className="font-semibold">30 business days</span> of receipt of all required information and documentation from the Learner.
            </p>
            <p className="font-semibold">Refunds will not be provided for:</p>
            <ul className="list-disc ml-8 space-y-1">
              <li>Lack of usage due to various reasons with the program after the Refund Window.</li>
              <li>Any requests made after the Refund Window expires, regardless of course progress.</li>
            </ul>
          </div>
        </div>

        {/* Deferral Policy */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Deferral Policy</h2>
          <div className="text-gray-600 space-y-6 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">A. Pre-Program Commencement Deferral</h3>
              <ul className="list-disc ml-8 space-y-1">
                <li>If a Learner is unable to commence the program due to unavoidable circumstances, they may defer to a future cohort by raising a request before the Program Commencement Date.</li>
                <li>The Learner must pay <span className="font-semibold">50% of the Total Program Fee</span> (inclusive of taxes) upfront for the deferral request to be approved. Until this payment is made, the Learner will be assumed to continue in the same cohort.</li>
                <li>The deferral is allowed only once and must be to a cohort scheduled to start within 1 year of the originally enrolled batch’s start date.</li>
                <li>If the Learner fails to complete the payment before the original Program Commencement Date, the deferral request will expire, and the standard refund policy will apply.</li>
                <li>The Learner will be charged based on the prevailing Total Program Fee of the new batch they opt for. No additional deferral fee will be charged.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">B. Post-Program Commencement Deferral</h3>
              <ul className="list-disc ml-8 space-y-1">
                <li>Learners who are facing genuine challenges in continuing the course can request a deferral within <span className="font-semibold">7 days</span> of the Program Commencement Date.</li>
                <li>A deferral fee of <span className="font-semibold">10% of the Total Program Fee</span> (inclusive of taxes) and any differential program fee (if applicable) between the current and deferred batch must be paid within 7 days of the deferral request.</li>
                <li>Failure to complete payment within this 7-day window will result in the Learner continuing in the current cohort.</li>
                <li>Upon successful payment, the Learner’s login will be disabled, and they will join the new cohort from the last graded assignment in the previous cohort. All progress and grades will carry forward.</li>
                <li>Deferral requests will not be entertained once the cohort has concluded (i.e. after the last grace deadline).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Summary of Refund and Deferral</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Scenario</th>
                  <th className="px-4 py-2 border-b text-left">Fee Deducted / Requirement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">Within 10 days of first class</td>
                  <td className="px-4 py-2 border-b">100% refund, no questions asked</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">After 10 days of first class</td>
                  <td className="px-4 py-2 border-b">No refund</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Pre-Program Deferral</td>
                  <td className="px-4 py-2 border-b">50% of Program Fee upfront, no additional deferral fee</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Post-Program Deferral (within 7 days)</td>
                  <td className="px-4 py-2 border-b">10% of Program Fee as deferral fee + differential fees</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Post-Program Deferral (after 7 days)</td>
                  <td className="px-4 py-2">Must continue in current cohort</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-gray-500 text-sm mt-8" data-aos="fade-up">
          Last Updated: {new Date("2025-6-15").toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

export default RefundDeferralPolicies; 