import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { 
  PAYMENT_CONFIG,
  calculatePaymentDetails, 
  formatCurrency, 
  getInstallmentOptions,
} from "../utils/installmentUtils";
import { useCoursePurchases } from '../context/CoursePurchasesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faArrowUpRightDots, faBriefcase, faChalkboard, faChalkboardUser, faMagnifyingGlass, faMoneyCheck, faPencil, faUserGroup, faXmark, faTag, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import CoursePurchaseButton from './CoursePurchaseButton';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Added axios import

const services = [
  {
    title: "Comprehensive Curriculum",
    desc: "Designed to build industry-valued skills and most-widely used tools and techniques.",
    icon: faBriefcase,
  },
  {
    title: "Interactive Mentored Learning",
    desc: "Collaborative yet personalised live online mentored learning in small groups.",
    icon: faChalkboardUser,
  },
  {
    title: "Hands-on learning",
    desc: "Become an AI & ML expert with 8+ hands-on projects under the guidance of industry experts.",
    icon: faMagnifyingGlass,
  },
  {
    title: "Dedicated career support",
    desc: "Personalised 1:1 career guidance and interview prep with Resume & LinkedIn review by experts.",
    icon: faChalkboard,
  },
  {
    title: "Program Support & Networking",
    desc: "Dedicated Program Manager to ensure you stay on track. Interact with peers during sessions.",
    icon: faArrowUpRightDots,
  },
];


const fetchCurrencyInfo = async (isLoggedIn) => {
  if (isLoggedIn) {
    // Fetch from backend for logged-in user
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/currency`, { credentials: 'include' });
    if (res.ok) return await res.json();
    return null;
  } else {
    // Guest: check cookie first
    const cookie = Cookies.get('guestCurrencyInfo');
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie);
        if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return parsed;
        }
      } catch {}
    }
    // Fetch from backend guest endpoint
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/guest/currency`);
    if (res.ok) {
      const data = await res.json();
      const info = { ...data, timestamp: Date.now() };
      Cookies.set('guestCurrencyInfo', JSON.stringify(info), { expires: 1 });
      return info;
    }
    return { country: undefined, countryCode: 'US', currency: 'USD', timestamp: Date.now() };
  }
};

const CourseCard = () => {
  const { user } = useAuth();
  const { getPurchaseStatus, getCouponDetails, purchases, getNextPaymentInfo } = useCoursePurchases();
  const [selectedInstallments, setSelectedInstallments] = useState(1);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userCurrency, setUserCurrency] = useState({ country: undefined, countryCode: 'US', currency: 'USD' });
  const [appliedCoupon, setAppliedCoupon] = useState(null); // Store full coupon object
  const [couponInput, setCouponInput] = useState(''); // Coupon input field
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [autoAppliedCoupon, setAutoAppliedCoupon] = useState(false); // Track if coupon is auto-applied

  // Calculate purchase status and nextPaymentInfo for this specific course
  const purchaseStatus = getPurchaseStatus(PAYMENT_CONFIG.courseId);
  const nextPaymentInfo = getNextPaymentInfo(PAYMENT_CONFIG.courseId);

  // Coupon apply handler
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) {
      toast.error('Please enter a coupon or referral code');
      return;
    }
    setApplyingCoupon(true);
    try {
      // Check if it's a referral code (starts with ETHIAN-)
      if (couponInput.trim().toUpperCase().startsWith("ETHIAN-")) {
        // Referral code logic
        const code = couponInput.trim();
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payments/validate-referral`, { 
          code,
          courseId: PAYMENT_CONFIG.courseId 
        }, {withCredentials: true});
        setAppliedCoupon({
          couponId: null, 
          couponCode: response.data.couponCode, 
          discountType: response.data.discountType,
          discountValue: response.data.discountValue,
          isReferral: true, // Flag to differentiate
          message: response.data.message
        });
        toast.success(response.data.message || 'Referral code applied!');
      } else {
        // Stripe coupon logic
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payments/validate-coupon`, { code: couponInput.trim() });
        setAppliedCoupon({
          couponId: response.data.couponId,
          couponCode: response.data.couponCode,
          discountType: response.data.discountType,
          discountValue: response.data.discountValue,
          isReferral: false, // Flag to differentiate
          message: response.data.message
        });
        toast.success(response.data.message || 'Coupon applied!');
      }
    } catch (error) {
      setAppliedCoupon(null);
      toast.error(error.response?.data?.message || 'Invalid code');
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Remove coupon handler
  const handleRemoveCoupon = () => {
    if (!autoAppliedCoupon) {
      setAppliedCoupon(null);
      setCouponInput('');
      toast.success('Coupon removed');
    }
  };

  /* Brochure Form */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_BROCHURE_SERVICE_ID, 
        import.meta.env.VITE_BROCHURE_TEMPLATE_ID, 
        e.target,
        import.meta.env.VITE_BROCHURE_PUBLIC_KEY
      );

      // Log success
      toast.success('Form submitted successfully!');
      setIsSubmitted(true);
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Agentic-AI-and-GenAI-Course-Brochure.pdf';
    link.download = 'Agentic-AI-and-GenAI-Course-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close the popup after download starts
    setShowPopup(false);
    setIsSubmitted(false);
    setFormData({ name: '', email: '' });
  };

  useEffect(() => {
    AOS.init({ duration: 1300 });
  }, []);

  // Add new useEffect for scrollbar styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Set default installment based on current plan
  useEffect(() => {
    if (purchaseStatus === 'in_progress' && nextPaymentInfo) {
      setSelectedInstallments(nextPaymentInfo.totalInstallments);
    }
  }, [purchaseStatus, nextPaymentInfo]);

  // Auto-apply existing coupon for in-progress installments
  useEffect(() => {
    if (purchaseStatus === 'in_progress') {
      const existingCoupon = getCouponDetails(PAYMENT_CONFIG.courseId);
      
      if (existingCoupon) {
        setAppliedCoupon({
          couponId: existingCoupon.couponId || null, // Use actual couponId if available
          couponCode: existingCoupon.couponCode,
          discountType: existingCoupon.discountType,
          discountValue: existingCoupon.discountValue,
          isReferral: existingCoupon.isReferral,
          message: 'Existing discount applied'
        });
        setAutoAppliedCoupon(true);
      }
    }
  }, [purchaseStatus, getCouponDetails]);

  useEffect(() => {
    let isMounted = true;
    fetchCurrencyInfo(!!user).then(info => {
      if (isMounted && info) setUserCurrency(info);
      if (user) Cookies.remove('guestCurrencyInfo'); 
    });
    return () => { isMounted = false; };
  }, [user]);

  const renderCouponInput = () => {
    // Hide coupon input for completed, in progress, pending, or processing payments
    if (purchaseStatus === 'completed' || 
        purchaseStatus === 'in_progress' || 
        purchaseStatus === 'pending' || 
        purchaseStatus === 'processing') {
      return null;
    }
    
    return (
      <div className="mb-4 w-full">
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={couponInput}
            onChange={e => setCouponInput(e.target.value)}
            placeholder="Enter coupon or referral code"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 flex-grow min-w-0"
            disabled={applyingCoupon || !!appliedCoupon}
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={applyingCoupon || !couponInput.trim() || !!appliedCoupon}
            className="bg-[#D62A91] text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex-shrink-0"
          >
            {applyingCoupon ? (
              <span className="flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Applying...
              </span>
            ) : 'Apply'}
          </button>
        </div>
        {appliedCoupon && (
          <div className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
            appliedCoupon.isReferral 
              ? 'bg-blue-50 border border-blue-300 text-blue-800' 
              : 'bg-green-50 border border-green-300 text-green-800'
          }`}>
            <FontAwesomeIcon icon={faTag} className={`mr-1 ${
              appliedCoupon.isReferral ? 'text-blue-500' : 'text-green-500'
            }`} />
            <span className="font-bold">{appliedCoupon.couponCode}</span>
            <span>
              {appliedCoupon.discountType === 'percent'
                ? `${appliedCoupon.discountValue}% off`
                : `₹${appliedCoupon.discountValue} off`}
            </span>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className={`ml-1 hover:text-red-500 focus:outline-none ${
                autoAppliedCoupon 
                  ? 'opacity-50 cursor-not-allowed' 
                  : appliedCoupon.isReferral ? 'text-blue-600' : 'text-green-600'
              }`}
              aria-label="Remove coupon"
              disabled={autoAppliedCoupon}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </div>
        )}
      </div>
    );
  } 

  const renderAutoAppliedCoupon = () => {
    if (purchaseStatus === 'in_progress' && appliedCoupon) {
      // Determine styling based on coupon type
      const isReferral = appliedCoupon.isReferral;
      const bgColor = isReferral ? 'bg-blue-50' : 'bg-green-50';
      const borderColor = isReferral ? 'border-blue-300' : 'border-green-300';
      const textColor = isReferral ? 'text-blue-800' : 'text-green-800';
      const iconColor = isReferral ? 'text-blue-500' : 'text-green-500';
      const labelColor = isReferral ? 'text-blue-600' : 'text-green-600';
      const labelText = isReferral ? '(Auto-applied Referral)' : '(Auto-applied Coupon)';
      
      return (
        <div className="mb-4 w-full">
          <div className={`inline-flex items-center gap-2 ${bgColor} border ${borderColor} ${textColor} rounded-full px-3 py-1 text-xs font-semibold shadow-sm`}>
            <FontAwesomeIcon icon={faTag} className={`mr-1 ${iconColor}`} />
            <span className="font-bold">{appliedCoupon.couponCode}</span>
            <span>
              {appliedCoupon.discountType === 'percent'
                ? `${appliedCoupon.discountValue}% off`
                : `₹${appliedCoupon.discountValue} off`}
            </span>
            <span className={`${labelColor} text-xs`}>{labelText}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderPaymentOptions = () => {
    if (purchaseStatus === 'completed') {
      return null; // Don't show payment options for completed purchases
    }

    // For in-progress installments, only show the current plan
    const isInProgress = purchaseStatus === 'in_progress' && nextPaymentInfo;
    const currentInstallments = isInProgress ? nextPaymentInfo.totalInstallments : selectedInstallments;

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Payment Plan
        </label>
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 gap-2 sm:gap-3 custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e055a9 #f1f1f1' }}>
            {getInstallmentOptions().map(option => {
              const paymentDetails = calculatePaymentDetails(option.value, userCurrency);
              let discounted = paymentDetails.perInstallmentAmount;
              let totalDiscounted = paymentDetails.totalAmount;
              if (appliedCoupon && appliedCoupon.discountType === 'percent') {
                discounted = Math.round(paymentDetails.perInstallmentAmount * (1 - appliedCoupon.discountValue / 100));
                totalDiscounted = discounted * option.value;
              } else if (appliedCoupon && appliedCoupon.discountType === 'amount') {
                discounted = paymentDetails.perInstallmentAmount - appliedCoupon.discountValue;
                totalDiscounted = discounted * option.value;
              }
              
              // For in-progress installments, only allow the current plan
              const isCurrentPlan = isInProgress && option.value === currentInstallments;
              const isDisabled = isInProgress && !isCurrentPlan;

              return (
                <div
                  key={option.value}
                  onClick={() => !isDisabled && setSelectedInstallments(option.value)}
                  className={`flex-none w-[200px] sm:w-[220px] md:w-[240px] rounded-xl border-2 p-3 sm:p-4 transition-all duration-200 ${
                    isDisabled 
                      ? 'opacity-50 cursor-not-allowed border-gray-200'
                      : selectedInstallments === option.value
                      ? 'border-[#D62A91] bg-gradient-to-br from-pink-50 to-white shadow-lg cursor-pointer'
                      : 'border-gray-200 hover:border-pink-200 hover:shadow-md cursor-pointer'
                  }`}
                >
                  <div className="flex flex-col">
                    {option.highlight && (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2 ${
                        option.value === 1 
                          ? 'bg-green-100 text-green-700'
                          : option.value === 2
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {isCurrentPlan ? 'Current Plan' : option.highlight}
                      </span>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {option.label}
                      </h4>
                      <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedInstallments === option.value
                          ? 'border-[#D62A91]'
                          : 'border-gray-300'
                      }`}>
                        {selectedInstallments === option.value && (
                          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#D62A91]" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm space-y-1">
                      <p className="text-gray-600">{option.description}</p>
                        {appliedCoupon && discounted < paymentDetails.perInstallmentAmount ? (
                          <div>
                            <span className="line-through text-gray-400 mr-2">{formatCurrency(paymentDetails.perInstallmentAmount, userCurrency.currency)}</span>
                            <span className={`text-[#D62A91] ${option.value===1 && "text-sm sm:text-lg"} font-bold`}>{formatCurrency(discounted, userCurrency.currency)}{option.value>1 && ` /mo`}</span>
                          </div>
                        ) : (
                          <p className={`text-[#D62A91] ${option.value===1 && "text-sm sm:text-lg"} font-bold`}>{formatCurrency(paymentDetails.perInstallmentAmount, userCurrency.currency)}{option.value>1 && ` /mo`}</p>
                        )}
                      {option.value > 1 && (
                        <div>
                          <span className="text-gray-600">Total: </span>
                          {appliedCoupon && totalDiscounted < paymentDetails.totalAmount ? (
                            <span>
                              <span className="line-through text-gray-400 mx-2">{formatCurrency(paymentDetails.totalAmount, userCurrency.currency)}</span>
                              <span className="text-[#D62A91] text-sm sm:text-lg font-bold">{formatCurrency(totalDiscounted, userCurrency.currency)}</span>
                          </span>
                          ) : (
                            <span className="text-[#D62A91] text-sm sm:text-lg font-bold">{formatCurrency(paymentDetails.totalAmount, userCurrency.currency)}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute right-0 top-0 bottom-4 w-8 sm:w-12 bg-gradient-to-l from-white pointer-events-none" />
        </div>
      </div>
    );
  };

  const renderInstallmentDetails = () => {
    if (purchaseStatus === 'completed') {
      return null; // Don't show installment details for completed purchases
    }

    const isInProgress = purchaseStatus === 'in_progress' && nextPaymentInfo;
    const currentInstallments = isInProgress ? nextPaymentInfo.totalInstallments : selectedInstallments;
    const paymentDetails = calculatePaymentDetails(currentInstallments, userCurrency);
    let discounted = paymentDetails.perInstallmentAmount;
    let totalDiscounted = paymentDetails.totalAmount;
    if (appliedCoupon && appliedCoupon.discountType === 'percent') {
      discounted = Math.round(paymentDetails.perInstallmentAmount * (1 - appliedCoupon.discountValue / 100));
      totalDiscounted = discounted * currentInstallments;
    } else if (appliedCoupon && appliedCoupon.discountType === 'amount') {
      discounted = paymentDetails.perInstallmentAmount - appliedCoupon.discountValue;
      totalDiscounted = discounted * currentInstallments;
    }
    const discountAmount = paymentDetails.totalAmount - totalDiscounted;

    return (
      <div className="my-4">
        <button
          onClick={() => setShowPaymentDetails(!showPaymentDetails)}
          className="w-full flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-white transition-all duration-200"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-xs sm:text-sm text-gray-600">Selected Plan</span>
              <span className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                {/* Only show discounted price if coupon is applied */}
                {appliedCoupon && discounted < paymentDetails.perInstallmentAmount
                  ? (currentInstallments === 1
                      ? formatCurrency(discounted, userCurrency.currency)
                      : `${formatCurrency(discounted, userCurrency.currency)} × ${currentInstallments} months`
                    )
                  : (currentInstallments === 1
                      ? formatCurrency(paymentDetails.perInstallmentAmount, userCurrency.currency)
                      : `${formatCurrency(paymentDetails.perInstallmentAmount, userCurrency.currency)} × ${currentInstallments} months`
                    )
                }
              </span>
            </div>
            {currentInstallments > 1 && (
              <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                (Total: {appliedCoupon && totalDiscounted < paymentDetails.totalAmount
                  ? formatCurrency(totalDiscounted, userCurrency.currency)
                  : formatCurrency(paymentDetails.totalAmount, userCurrency.currency)
                })
              </span>
            )}
          </div>
          <span className={`transform transition-transform duration-200 flex-shrink-0 ml-2 ${showPaymentDetails ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {showPaymentDetails && (
          <div className="mt-2 p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
            <div className="space-y-2 text-xs sm:text-sm">
              {currentInstallments === 1 ? (
              <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">
                    {appliedCoupon && discounted < paymentDetails.perInstallmentAmount
                      ? formatCurrency(discounted, userCurrency.currency)
                      : formatCurrency(paymentDetails.perInstallmentAmount, userCurrency.currency)
                    }
                  </span>
              </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per Installment:</span>
                    <span className="font-medium">
                      {formatCurrency(paymentDetails.perInstallmentAmount, userCurrency.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(paymentDetails.totalAmount, userCurrency.currency)}
                    </span>
                  </div>
                </>
              )}
              {appliedCoupon && discountAmount > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-700 font-semibold">- {formatCurrency(discountAmount, userCurrency.currency)}</span>
                  </div>
                        <div className="flex justify-between">
                    <span className="font-bold text-gray-600">Final Price:</span>
                    <span className="font-bold text-[#D62A91]">{formatCurrency(totalDiscounted, userCurrency.currency)}</span>
                      </div>
                    </>
                  )}
              {!isInProgress && currentInstallments > 1 && (
                    <div className="pt-2 border-t border-gray-200">
                  <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAutomatic}
                          onChange={(e) => setIsAutomatic(e.target.checked)}
                      className="form-checkbox h-3 w-3 sm:h-4 sm:w-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500 mt-0.5 flex-shrink-0"
                        />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm text-gray-700">
                            Enable automatic monthly payments
                          </span>
                          <span className="text-xs text-gray-500">
                            Your card will be automatically charged each month
                          </span>
                        </div>
                      </label>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPaymentButtons = () => {
    if (purchaseStatus === 'completed') {
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => setShowPopup(true)}
            className="flex-1 bg-white border-2 border-gray-300 text-gray-800 px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Download Brochure
          </button>
          <button
            className="flex-1 bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium pointer-events-none text-sm sm:text-base"
            disabled
          >
            Enrolled
          </button>
        </div>
      );
    }

    const paymentDetails = calculatePaymentDetails(selectedInstallments, userCurrency);

    return (
      <div className="flex flex-col gap-4 mb-6">
          <CoursePurchaseButton
          courseId={paymentDetails.courseId}
          price={selectedInstallments === 1 ? paymentDetails.perInstallmentAmount : paymentDetails.totalAmount}
          currency={paymentDetails.currency}
          service={paymentDetails.service}
          className="w-full bg-[#D62A91] text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors text-sm sm:text-base"
            selectedInstallments={selectedInstallments}
            isAutomatic={isAutomatic}
          appliedCoupon={appliedCoupon}
          userCurrency={userCurrency}
          />
        {purchaseStatus === 'in_progress' && nextPaymentInfo && (
          <div className="text-xs sm:text-sm text-gray-600 text-center">
            Next payment due in {Math.ceil((nextPaymentInfo.nextPaymentDate - new Date()) / (1000 * 60 * 60 * 24))} days
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-11/12 mt-12 p-4 sm:p-6 lg:w-4/5 max-w-screen-lg mx-auto">
      <div className='font-sans text-blue-900 text-xl sm:text-2xl space-y-1' data-aos="fade-up">
        <h2 className='tracking-wider text-center sm:text-left'>Master Tomorrow's skills Today - Learn to Create and Build 
        </h2>
        <h2 className='font-bold tracking-wide text-center sm:text-left'>Explore Our Courses</h2>
      </div>
      <div className="bg-white rounded-xl my-6 sm:my-8 shadow-lg overflow-hidden border-t-4 border-pink-500" data-aos="fade-up">
        {/* Sparkle New Button */}
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 sm:p-3 py-1 sm:py-2 m-4 sm:m-6 rounded-full font-bold text-sm sm:text-md shadow-lg transform transition-transform duration-100 animate-pulse">
            <span className="flex items-center gap-1">
              <span className="text-yellow-300">✨</span>
              New
              <span className="text-yellow-300">✨</span>
            </span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-8">
          <div className="relative h-64 sm:h-80 lg:h-[500px] order-1 lg:order-2">
            <img
              src="AI_Course_img.jpg"
              alt="Generative AI Course"
              className="w-full h-full object-cover rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none"
            />
            <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 mx-auto bg-white bg-opacity-95 px-3 sm:px-4 py-2 rounded-lg shadow-lg max-w-[calc(100%-1.5rem)]">
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center text-xs sm:text-sm justify-center w-full text-center">
                <span className="text-green-700 font-semibold whitespace-nowrap">100% Online</span>
                <span className="text-[#D62A91] font-semibold whitespace-nowrap">4 weeks</span>
                <span className="text-blue-900 font-semibold">Python Programming Refresher</span>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 mt-4 sm:mt-0">
              <span className="text-[#D62A91]">Advanced Generative AI</span>
              <br />
              <span className="text-gray-900">Certification Course</span>
            </h2>

            {!showEnrollment ? (
              <>
                <p className="text-gray-600 text-sm sm:text-base my-2 leading-relaxed">
              Master the skills that shape the future of technology with the Advanced Certificate Program in Generative AI, a 5-month generative AI course by Ethiantech.
            </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-2 mb-6 sm:mb-8">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-gray-500 text-xs sm:text-sm mb-1">Type</p>
                    <p className="text-[#D62A91] font-semibold text-sm sm:text-base">Advanced Certificate</p>
              </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-gray-500 text-xs sm:text-sm mb-1">Admission Deadline</p>
                    <p className="text-[#D62A91] font-semibold text-sm sm:text-base">19-July-2025</p>
              </div>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                    <p className="text-gray-500 text-xs sm:text-sm mb-1">Duration</p>
                    <p className="text-[#D62A91] font-semibold text-sm sm:text-base">5 Months</p>
              </div>
            </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button 
                    onClick={() => setShowPopup(true)}
                    className="flex-1 bg-white border-2 border-gray-300 text-gray-800 px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base min-w-0"
                  >
                    Download Brochure
                  </button>
                  <button
                    onClick={() => setShowEnrollment(true)}
                    className="flex-1 bg-[#D62A91] text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors text-sm sm:text-base min-w-0"
                  >
                    Enroll Now
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
            {renderPaymentOptions()}
                {renderCouponInput()}
                {renderAutoAppliedCoupon()}
            {renderInstallmentDetails()}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-gray-600">
                      <p className="text-gray-800 font-medium mb-1">Need to Cancel or Defer?</p>
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 leading-relaxed">Our policy: We offer a 10 day window for a Full Refund, no questions asked. Flexible deferral options available too.</p>
                      <NavLink 
                        to="/refund-deferral-policies" 
                        className="text-[#D62A91] hover:underline inline-flex items-center gap-1 text-sm"
                      >
                        View our policy
                        <FontAwesomeIcon icon={faAnglesRight} className="text-xs" />
                      </NavLink>
                    </div>
            </div>
          </div>
                {renderPaymentButtons()}
              </div>
            )}

            <div className="space-y-2 mt-4">
              {purchaseStatus === 'completed' && (
                <p className="text-gray-600 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <span className="text-base sm:text-lg">📱</span>
                  <span>You will be added to the course WhatsApp group shortly. Please keep your phone number updated.</span>
                </p>
              )}
              <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-2">
                <span className="text-base sm:text-lg">📞</span>
                <span>For enquiries: <span className="font-semibold break-all">+1-443-675-8888</span> or <span className="font-semibold break-all">info@ethiantech.com</span></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setShowPopup(false);
                setIsSubmitted(false);
                setFormData({ name: '', email: '' });
              }}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-gray-700 p-1"
            >
              <FontAwesomeIcon icon={faXmark} className="text-lg sm:text-xl" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6 pr-8">Fill the form to download the Brochure</h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D62A91] text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-center text-sm sm:text-base">
                    Thank you for your interest! Your details have been submitted successfully.
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full bg-[#D62A91] text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors text-sm sm:text-base"
                >
                  Download Brochure Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-6 sm:mt-8 relative z-0" data-aos="fade-up">
        {/* Who Is This Program For Section */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-blue-900 text-center">Who Is This Program For?</h3>
        <ul className="list-none space-y-3 sm:space-y-4 text-gray-800 max-w-4xl mx-auto">
          <li className="flex items-start gap-3 sm:gap-4">
            <FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1.5 flex-shrink-0" />
            <p className="text-sm sm:text-base leading-relaxed"><b>Program</b> is designed for <b>forward-thinking individuals </b>and organizations seeking to harness the power of artificial intelligence to drive innovation, efficiency, and impact in their fields.</p>
          </li>
          <li className="flex items-start gap-3 sm:gap-4">
            <FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1.5 flex-shrink-0" />
            <p className="text-sm sm:text-base leading-relaxed"><b>Industry professionals and domain experts</b> who are looking to gain practical knowledge of how AI technologies can be integrated into their workflows to enhance decision-making, automate tasks, and optimize processes.</p>
          </li>
          <li className="flex items-start gap-3 sm:gap-4">
            <FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1.5 flex-shrink-0" />
            <p className="text-sm sm:text-base leading-relaxed"><b>Business leaders, managers, and executives</b> who want a strategic understanding of AI implementation to drive transformation, improve performance, foster innovation, and gain a competitive edge in today's fast-evolving digital landscape.</p>
          </li>
          <li className="flex items-start gap-3 sm:gap-4">
            <FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1.5 flex-shrink-0" />
            <p className="text-sm sm:text-base leading-relaxed"><b>Technology and innovation enthusiasts</b> who recognize AI's potential to revolutionize industries and aspire to lead cutting-edge projects that meet the evolving needs of organizations and consumers alike.</p>
          </li>
          <li className="flex items-start gap-3 sm:gap-4">
            <FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1.5 flex-shrink-0" />
            <p className="text-sm sm:text-base leading-relaxed"><b>Consultants, regulators, and policymakers</b> who are guiding organizations through digital transformation or shaping.</p>
          </li>
        </ul>

        <div className="bg-white rounded-xl p-4 sm:p-6 mt-6 sm:mt-8 relative z-0" data-aos="fade-up">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-10 text-blue-900 text-center">Learning Experience</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="space-y-2 sm:space-y-3">
              <FontAwesomeIcon icon={faMoneyCheck} className="text-blue-900 text-3xl sm:text-4xl md:text-5xl mx-auto py-3 sm:py-6" />
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Completion Certificate</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <FontAwesomeIcon icon={faBriefcase} className="text-blue-900 text-3xl sm:text-4xl md:text-5xl mx-auto py-3 sm:py-6" />
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Capstone Project</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <FontAwesomeIcon icon={faUserGroup} className="text-blue-900 text-3xl sm:text-4xl md:text-5xl mx-auto py-3 sm:py-6" />
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Immersive Discussion</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <FontAwesomeIcon icon={faChalkboardUser} className="text-blue-900 text-3xl sm:text-4xl md:text-5xl mx-auto py-3 sm:py-6" />
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Weekly live office hours with the course facilitator</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <FontAwesomeIcon icon={faPencil} className="text-blue-900 text-3xl sm:text-4xl md:text-5xl mx-auto py-3 sm:py-6" />
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Practical, scenario-based assignments</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-blue-900 text-3xl sm:text-4xl md:text-5xl mx-auto py-3 sm:py-6" />
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Real-world examples and case studies</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 mt-6 sm:mt-8 relative z-0" data-aos="fade-up">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-10 text-blue-900 text-center">Designed for working Professionals</h2>
          <div className="relative mt-6 sm:mt-8">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.1}
              breakpoints={{
                640: { slidesPerView: 1.3, spaceBetween: 20 },
                768: { slidesPerView: 1.8, spaceBetween: 20 },
                1024: { slidesPerView: 2.2, spaceBetween: 20 },
                1280: { slidesPerView: 3, spaceBetween: 20 },
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: true }}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              className="mt-6 sm:mt-8"
            >
              {services.map((service, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className="bg-white p-3 sm:p-4 mb-8 sm:mb-12 rounded-lg shadow-lg max-w-xs min-h-[200px] sm:min-h-[275px] md:min-h-[300px] flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-[1.02] sm:hover:scale-[1.03]" data-aos="fade-up">
                    <div className="text-center">
                      <FontAwesomeIcon icon={service.icon} className="text-[#D62A91] text-3xl sm:text-4xl md:text-5xl mx-auto py-3 sm:py-4 md:py-6" />
                      <h3 className="text-sm sm:text-base md:text-xl font-semibold text-gray-800 mt-3 sm:mt-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="flex justify-center items-center w-full mt-6 sm:mt-8">
          <NavLink to="/contact" className="mx-auto text-center bg-[#D62A91] text-white text-sm sm:text-base rounded-md hover:bg-pink-600 active:scale-95 px-4 sm:px-6 py-2 sm:py-3 my-6 sm:my-8 md:mb-8 font-medium transition-all duration-200">
            For more details, talk to our experts
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;

const styles = `
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e055a9;
  border-radius: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #b3247a;
}

/* Firefox scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #e055a9 #f1f1f1;
}

/* Mobile-specific scrollbar */
@media (max-width: 768px) {
  .custom-scrollbar {
    -webkit-overflow-scrolling: touch;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e055a9;
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
}

/* Ensure scrollbar is always visible */
.custom-scrollbar {
  overflow-x: auto;
  overflow-y: hidden;
}

/* Hide default scroll buttons */
.custom-scrollbar::-webkit-scrollbar-button {
  display: none;
}
`;
