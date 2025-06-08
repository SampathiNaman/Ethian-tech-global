import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { INSTALLMENT_OPTIONS, calculatePerInstallmentAmount, calculateInstallmentFee, formatCurrency, formatFeePercentage } from "../utils/installmentUtils";
import { useAuth } from '../context/AuthContext';

const CourseCard = () => {
  const navigate = useNavigate();
  const { user, openLoginPopup } = useAuth();
  const [selectedInstallments, setSelectedInstallments] = useState(1);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  const coursePrice = 1999; // Price in USD
  const currency = 'USD';
  const service = 'advanced_generative_ai_course';

  useEffect(() => {
    AOS.init({ duration: 1300 });
  }, []);

  const handleEnroll = () => {
    const paymentDetails = {
      amount: coursePrice,
      currency: currency,
      numberOfInstallments: selectedInstallments,
      isAutomatic: isAutomatic,
      service: service
    };

    if (user) {
      if (selectedInstallments === 1) {
        navigate('/payment', { state: paymentDetails });
      } else {
        navigate('/installment-payment', { state: paymentDetails });
      }
    } else {
      const redirectPath = selectedInstallments === 1 ? '/payment' : '/installment-payment';
      openLoginPopup(redirectPath, paymentDetails);
    }
  };

  const renderInstallmentDetails = () => {
    const perInstallmentAmount = calculatePerInstallmentAmount(coursePrice, selectedInstallments);
    const totalFee = calculateInstallmentFee(coursePrice, selectedInstallments);
    const totalAmount = coursePrice + totalFee;

    return (
      <div className="my-4">
        <button
          onClick={() => setShowPaymentDetails(!showPaymentDetails)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-white transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-600">Selected Plan</span>
              <span className="text-lg font-semibold text-gray-900">
                {selectedInstallments === 1 
                  ? formatCurrency(coursePrice, currency)
                  : `${formatCurrency(perInstallmentAmount, currency)} × ${selectedInstallments} months`
                }
              </span>
            </div>
            {selectedInstallments > 1 && (
              <span className="text-sm text-gray-500">
                (Total: {formatCurrency(totalAmount, currency)})
              </span>
            )}
          </div>
          <span className={`transform transition-transform duration-200 ${showPaymentDetails ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {showPaymentDetails && (
          <div className="mt-2 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Course Price:</span>
                <span className="font-medium">{formatCurrency(coursePrice, currency)}</span>
          </div>
              {selectedInstallments > 1 && (
                <>
          <div className="flex justify-between">
                    <span className="text-gray-600">Installment Fee ({formatFeePercentage(selectedInstallments)}%):</span>
                    <span className="font-medium">{formatCurrency(totalFee, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">{formatCurrency(totalAmount, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Per Installment:</span>
                    <span className="font-medium">{formatCurrency(perInstallmentAmount, currency)}</span>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAutomatic}
                onChange={(e) => setIsAutomatic(e.target.checked)}
                className="form-checkbox h-4 w-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
              />
                      <div className="flex flex-col">
              <span className="text-sm text-gray-700">
                Enable automatic monthly payments
              </span>
                        <span className="text-xs text-gray-500">
                          Your card will be automatically charged each month
                        </span>
                      </div>
            </label>
                  </div>
                </>
              )}
              {selectedInstallments === 1 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">{formatCurrency(coursePrice, currency)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-11/12 mt-12 p-6 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto">
      <div className='font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
          <h2 className='tracking-wider'>Training Time</h2>
          <h2 className='font-bold tracking-wide'>Explore Our Courses</h2>
        </div>
      <div className="bg-white rounded-xl my-8 shadow-lg overflow-hidden relative border-t-4 border-pink-500" data-aos="fade-up">
        {/* Sparkle New Button */}
        <div className="absolute -top-3 -right-3 z-10 ">
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 py-2.5 m-6 rounded-full font-bold text-sm shadow-lg transform transition-transform duration-100 animate-pulse">
            <span className="flex items-center gap-1">
              <span className="text-yellow-300">✨</span>
              New
              <span className="text-yellow-300">✨</span>
            </span>
          </button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="p-6 lg:p-8">
            {/* <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full font-medium">
                NEW COURSE
              </span>
              <span className="bg-pink-100 text-pink-600 text-sm px-4 py-1.5 rounded-full font-medium">
                LAUNCH AND DEPLOY GEN AI APPS
              </span>
            </div> */}

            <h2 className="text-3xl font-bold leading-tight mb-4">
              <span className="text-[#D62A91]">Advanced Generative AI</span>
              <br />
              <span className="text-gray-900">Certification Course</span>
            </h2>

            <p className="text-gray-600 text-sm my-2">
              Master the skills that shape the future of technology with the Advanced Certificate Program in Generative AI, a 5-month generative AI course by Ethiantech.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Type</p>
                <p className="text-[#D62A91] font-semibold">Advanced Certificate</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Admission Deadline</p>
                <p className="text-[#D62A91] font-semibold">31-May-2025</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Duration</p>
                <p className="text-[#D62A91] font-semibold">5 Months</p>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Plan
              </label>
              <div className="relative">
                <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide custom-scrollbar">
                  {INSTALLMENT_OPTIONS.map(option => {
                    const perInstallmentAmount = calculatePerInstallmentAmount(coursePrice, option.value);
                    const totalFee = calculateInstallmentFee(coursePrice, option.value);
                    const totalAmount = coursePrice + totalFee;

                    return (
                      <div
                        key={option.value}
                        onClick={() => setSelectedInstallments(option.value)}
                        className={`flex-none w-[240px] cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                          selectedInstallments === option.value
                            ? 'border-[#D62A91] bg-gradient-to-br from-pink-50 to-white shadow-lg'
                            : 'border-gray-200 hover:border-pink-200 hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col">
                          {option.highlight && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2 ${
                              option.value === 1 
                                ? 'bg-green-100 text-green-700'
                                : option.value === 3
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {option.highlight}
                            </span>
                          )}
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                    {option.label}
                            </h4>
                            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                              selectedInstallments === option.value
                                ? 'border-[#D62A91]'
                                : 'border-gray-300'
                            }`}>
                              {selectedInstallments === option.value && (
                                <div className="h-2 w-2 rounded-full bg-[#D62A91]" />
                              )}
                            </div>
                          </div>
                          <div className="text-sm space-y-1">
                            {option.value === 1 ? (
                              <>
                                <span className="text-[#D62A91] font-medium block text-lg">
                                  {formatCurrency(coursePrice, currency)}
                                </span>
                                <span className="text-gray-600 text-xs">{option.description}</span>
                              </>
                            ) : (
                              <>
                                <span className="text-gray-600 block">
                                  {formatCurrency(perInstallmentAmount, currency)}/mo
                                </span>
                                <span className="text-[#D62A91] font-medium block">
                                  Total: {formatCurrency(totalAmount, currency)}
                                </span>
                                <span className="text-gray-600 text-xs">
                                  {option.description} ({formatFeePercentage(option.value)}% processing fee)
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white pointer-events-none" />
              </div>
            </div>

            {renderInstallmentDetails()}

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button className="flex-1 bg-white border-2 border-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Download Brochure
              </button>
              <button 
                onClick={handleEnroll}
                className="flex-1 bg-[#D62A91] text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Enroll Now
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                Hurry! <b>862</b> people have already applied in last 1 month
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <span className="text-lg">📞</span>
                For enquiries call: <span className="font-semibold">91-79775-71286</span>
              </p>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative h-full min-h-[400px]">
            <img
              src="AI_Course_img.jpg"
              alt="Generative AI Course"
              className="w-full h-full object-cover rounded-r-xl"
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 px-6 py-3 rounded-lg shadow-lg">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-green-700 font-semibold">100% Online</span>
                <span className="text-[#D62A91] font-semibold">4 weeks</span>
                <span className="text-blue-900 font-semibold">Python Programming Refresher</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

const styles = `
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #D62A91;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #b3247a;
}
`;
