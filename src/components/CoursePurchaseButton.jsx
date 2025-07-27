import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCoursePurchases } from '../context/CoursePurchasesContext';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { buildPaymentPayload } from '../utils/installmentUtils';

const CoursePurchaseButton = ({ 
  courseId,
  price,
  currency,
  service,
  className = '',
  selectedInstallments = 1,
  isAutomatic = true,
  appliedCoupon = null,
  userCurrency = {},
}) => {
  const navigate = useNavigate();
  const { user, openLoginPopup } = useAuth();
  const { getPurchaseStatus, paymentSuccess, getCouponDetails } = useCoursePurchases();
  const purchaseStatus = getPurchaseStatus(courseId);

  // Get auto-applied coupon for in-progress installments
  const getAutoAppliedCoupon = () => {
    if (purchaseStatus === 'in_progress') {
      const existingCoupon = getCouponDetails(courseId);
      if (existingCoupon) {
        return {
          couponId: existingCoupon.couponId || null, // Use actual couponId if available
          couponCode: existingCoupon.couponCode,
          discountType: existingCoupon.discountType,
          discountValue: existingCoupon.discountValue,
          isReferral: existingCoupon.isReferral,
          message: 'Existing discount applied'
        };
      }
    }
    return appliedCoupon;
  };

  const handlePurchaseClick = async () => {
    // If not logged in, show login popup
    if (!user) {
      const paymentPayload = buildPaymentPayload({
        numberOfInstallments: selectedInstallments,
        userCurrency,
        appliedCoupon: getAutoAppliedCoupon(),
        service,
        courseId
      });
      paymentPayload.isAutomatic = isAutomatic;
      const redirectPath = selectedInstallments === 1 ? '/payment' : '/installment-payment';
      openLoginPopup(redirectPath, paymentPayload);
      return;
    }

    // Verify user session before proceeding
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
        withCredentials: true
      });

      const paymentPayload = buildPaymentPayload({
      numberOfInstallments: selectedInstallments,
        userCurrency,
        appliedCoupon: getAutoAppliedCoupon(),
      service,
      courseId
      });
      paymentPayload.isAutomatic = isAutomatic;

      // Pass the full payload to navigation or API
    if (selectedInstallments === 1) {
        navigate('/payment', { state: paymentPayload });
    } else {
        navigate('/installment-payment', { state: paymentPayload });
      }
    } catch (error) {
      // If session is invalid, show login popup
      if (error.response?.status === 401) {
        const paymentPayload = buildPaymentPayload({
          numberOfInstallments: selectedInstallments,
          userCurrency,
          appliedCoupon: getAutoAppliedCoupon(),
          service,
          courseId
        });
        paymentPayload.isAutomatic = isAutomatic;
        const redirectPath = selectedInstallments === 1 ? '/payment' : '/installment-payment';
        openLoginPopup(redirectPath, paymentPayload);
      }
    }
  };

  const getButtonText = () => {
    if (purchaseStatus === 'processing' || paymentSuccess) {
      return 'Processing...';
    }
    if (purchaseStatus === 'completed') {
      return 'Enrolled';
    }
    if (purchaseStatus === 'pending') {
      return 'Payment Pending';
    }
    if (purchaseStatus === 'in_progress') {
      return 'Continue Payment';
    }
    return 'Enroll Now';
  };

  const getButtonClass = () => {
    if (purchaseStatus === 'completed') {
      return 'bg-green-600 hover:bg-green-700';
    }
    if (purchaseStatus === 'processing' || paymentSuccess) {
      return 'bg-blue-600 hover:bg-blue-700';
    }
    if (purchaseStatus === 'pending') {
      return 'bg-yellow-600 hover:bg-yellow-700';
    }
    if (purchaseStatus === 'in_progress') {
      return 'bg-purple-600 hover:bg-purple-700';
    }
    return 'bg-[#D62A91] hover:bg-pink-600';
  };

  const getButtonIcon = () => {
    if (purchaseStatus === 'completed') {
      return <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />;
    }
    if (purchaseStatus === 'processing' || paymentSuccess) {
      return <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />;
    }
  };

  const isDisabled = purchaseStatus === 'completed' || purchaseStatus === 'processing' || paymentSuccess;

  return (
    <button
      onClick={handlePurchaseClick}
      disabled={isDisabled}
      className={`${getButtonClass()} text-white px-6 py-3 rounded-lg font-medium 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center ${className}`}
    >
      {getButtonIcon()}
      {getButtonText()}
    </button>
  );
};

CoursePurchaseButton.propTypes = {
  courseId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  className: PropTypes.string,
  selectedInstallments: PropTypes.number,
  isAutomatic: PropTypes.bool,
  appliedCoupon: PropTypes.object,
  userCurrency: PropTypes.object
};

export default CoursePurchaseButton; 