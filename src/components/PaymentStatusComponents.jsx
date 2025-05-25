// filepath: src/components/PaymentStatusComponents.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faArrowLeft, faRedo } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { errorMap } from '../utils/errorMap';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export const SuccessScreen = ({ onClose }) => {
  // Show a toast on mount
  useEffect(() => {
    toast.success('Payment successful! Thank you for your purchase.', { icon: '🎉' });
  }, []);
  return (
    <>
      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl mb-4 animate-fade-in" />
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Payment Successful</h2>
      <p className="text-gray-600 mb-4">Thank you! Your payment was processed successfully.</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={onClose}
      >
        Continue
      </button>
    </>
  );
};
SuccessScreen.propTypes = {
  onClose: PropTypes.func.isRequired
};

export const ErrorScreen = ({ error, onRetry, onClose }) => {
  useEffect(() => {
    if (error) toast.error('Payment failed. Please try again.', { icon: '❌' });
  }, [error]);
  let message = '';
  // If error is an object, try to extract a user-friendly message
  if (typeof error === 'object' && error !== null) {
    if (error.code && errorMap[error.code]) {
      message = errorMap[error.code];
    } else if (error.message) {
      message = error.message;
    } else {
      // Fallback: show stringified error for debugging
      message = JSON.stringify(error);
    }
  } else if (typeof error === 'string') {
    if (error.includes('The provided PaymentMethod has failed authentication')) {
      message = 'Your payment was not completed. Please try again or use a different payment method.';
    } else {
      message = error;
    }
  } else {
    message = 'There was a problem processing your payment.';
  }
  return (
    <>
      <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-4xl mb-4 animate-shake" />
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Payment Failed</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <div className="flex flex-col gap-2 items-center">
        {onRetry && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
            onClick={onRetry}
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2 animate-spin-slow" />
            Try Again
          </button>
        )}
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 transition-colors font-semibold text-base flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Cancel
        </button>
      </div>
    </>
  );
};

ErrorScreen.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onRetry: PropTypes.func,
  onClose: PropTypes.func.isRequired
};
