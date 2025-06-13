// filepath: src/components/PaymentStatusComponents.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faArrowLeft, faRedo } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { errorMap } from '../utils/errorMap';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export const SuccessScreen = ({ onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    toast.success('Payment successful! Thank you for your purchase.', { icon: '🎉' });
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRedirecting(true);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (isRedirecting) {
        onClose();
      }
    };
  }, [onClose, isRedirecting]);

  return (
    <>
      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl mb-4 animate-fade-in" />
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Payment Successful</h2>
      <p className="text-gray-600 mb-4">Thank you! Your payment was processed successfully.</p>
      <p className="text-sm text-gray-500 mb-4">
        {isRedirecting ? 'Redirecting...' : `Redirecting to training page in ${countdown} seconds...`}
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => {
          setIsRedirecting(true);
          onClose();
        }}
        disabled={isRedirecting}
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
  const errorMessage = error?.message || 'An error occurred during payment processing.';
  const errorCode = error?.code || 'unknown_error';
  const mappedError = errorMap[errorCode] || errorMessage;

  return (
    <>
      <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-4xl mb-4 animate-shake" />
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Payment Failed</h2>
      <p className="text-gray-600 mb-4">{mappedError}</p>
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
          Go Back
        </button>
      </div>
    </>
  );
};

ErrorScreen.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string
  }),
  onRetry: PropTypes.func,
  onClose: PropTypes.func.isRequired
};
