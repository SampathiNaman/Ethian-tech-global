import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCoursePurchases } from '../context/CoursePurchasesContext';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CoursePurchaseButton = ({ 
  courseId,
  price,
  currency,
  service,
  className = '',
  selectedInstallments = 1,
  isAutomatic = true,
}) => {
  const navigate = useNavigate();
  const { user, openLoginPopup } = useAuth();
  const { getPurchaseStatus, paymentSuccess } = useCoursePurchases();
  const purchaseStatus = getPurchaseStatus(courseId);

  const handlePurchaseClick = () => {
    if (!user) {
      const paymentDetails = {
        amount: price,
        currency,
        numberOfInstallments: selectedInstallments,
        isAutomatic,
        service,
        courseId
      };
      const redirectPath = selectedInstallments === 1 ? '/payment' : '/installment-payment';
      openLoginPopup(redirectPath, paymentDetails);
      return;
    }

    const paymentDetails = {
      amount: price,
      currency,
      numberOfInstallments: selectedInstallments,
      isAutomatic,
      service,
      courseId
    };

    if (selectedInstallments === 1) {
      navigate('/payment', { state: paymentDetails });
    } else {
      navigate('/installment-payment', { state: paymentDetails });
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
  isAutomatic: PropTypes.bool
};

export default CoursePurchaseButton; 