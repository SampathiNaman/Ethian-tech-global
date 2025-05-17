import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  useStripe, 
  useElements,
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleNotch, 
  faCheckCircle, 
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const errorMap = {
  // Card errors
  'card_declined': 'Card declined. Please try another payment method.',
  'expired_card': 'Card expired. Please update your card details.',
  'incorrect_cvc': 'Incorrect CVC code. Please check your card details.',
  'invalid_number': 'Invalid card number. Please verify your card information.',
  'invalid_expiry_month': 'Invalid expiration month. Please check your card details.',
  
  // Payment processing errors
  'processing_error': 'Payment processor declined the transaction.',
  'currency_mismatch': 'Payment currency does not match required currency.',
  'amount_mismatch': 'Payment amount does not match requested amount.',
  
  // Authentication errors
  'authentication_required': '3D Secure authentication failed. Please complete verification.',
  '3ds_verification_failed': '3D Secure verification unsuccessful.',
  
  // Network/technical errors
  'network_failure': 'Network error occurred. Please check your connection.',
  'api_connection_error': 'Unable to connect to payment processor.',
  
  // Custom business logic errors
  'verification_failed': 'Payment verification failed with our system',
  'max_retries': 'Maximum payment attempts reached. Please contact support.',
};

const PaymentForm = ({ 
  clientSecret,
  paymentDetails,
  onPaymentSubmit,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [originalPaymentIntent, setOriginalPaymentIntent] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [requiresAction, setRequiresAction] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(-1);

  const fromLocation = location.state?.from || '/';

  const amountFormatted = useMemo(() => 
    new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: paymentDetails.currency,
    }).format(paymentDetails.amount)
  , [paymentDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || paymentStatus === 'processing') return;

    const { error: elementsError } = await elements.submit();
    if (elementsError) {
      return;
    }

    if (retryCount >= 5) {
      setError({
        code: 'max_retries_reached',
        message: 'Maximum retry attempts reached. Please start over.',
        type: 'card_error',
      });
      return;
    }
    
    try {
      setPaymentStatus('processing');
      setError(null);
      onPaymentSubmit();
      setRetryCount((prev) => prev + 1);

  
      // Confirm payment with Stripe
        const { error: confirmError, paymentIntent=originalPaymentIntent } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            receipt_email: email,
          },
          redirect: 'if_required'
        });
        setOriginalPaymentIntent(paymentIntent);
        if (confirmError?.code === 'payment_intent_unexpected_state') {
          throw {
            code: 'payment_intent_unexpected_state',
            message: 'Payment is already processed. To make a new payment, please go back and start over.',
          };
        }
      const successStatuses = ['succeeded', 'processing'];
      const requiresActionStatuses = ['requires_action', 'requires_confirmation'];
  
      if (successStatuses.includes(paymentIntent.status)) {
        setPaymentStatus('succeeded');
        setRetryCount(-1);
        setTimeout(() => {
          navigate(fromLocation, { replace: true });
        }, 5000);
      }
      else if (requiresActionStatuses.includes(paymentIntent.status)) {
        setRequiresAction(true);
        // 7. Handle 3D Secure authentication
        const { error: actionError } = await stripe.handleCardAction(clientSecret);
        if (actionError) throw actionError;
        
        // Re-check status after authentication
        const { paymentIntent: postAuthIntent } = await stripe.retrievePaymentIntent(clientSecret);
        if (postAuthIntent?.status !== 'succeeded') {
          throw {
            code: '3ds_verification_failed',
            message: '3D Secure authentication unsuccessful'
          };
        }
        setPaymentStatus('succeeded');
        setRetryCount(-1);
        setTimeout(() => {
          navigate(fromLocation, { replace: true });
        }, 5000);
      }
    } catch (err) {
      setPaymentStatus('failed');
      handlePaymentError(err);
    }
    finally { 
      setPaymentStatus('idle');
      // setRequiresAction(false);
    }
  };

  const handlePaymentError = (error) => {
  
    // Normalize error structure
    const normalizedError = {
      code: error.code || 
           error.type?.replace(/\s+/g, '_').toLowerCase() || // Handle Stripe error types
           'unknown_error',
      message: error.message || 'Payment processing failed',
      details: error.details
    };
  
    setError({
      code: normalizedError.code,
      message: errorMap[normalizedError.code] || normalizedError.message,
    });
  };

  useEffect(() => {
    return () => {
      if (paymentStatus !== 'succeeded' && elements) {
        elements.fetchUpdates();
      }
    };
  }, [paymentStatus, elements]);

  const renderPaymentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Information
        </label>
        <div className="border rounded-md p-2">
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
            className="w-full"
            aria-label="Email address"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Details
        </label>
        <div className="border rounded-md p-2">
          <PaymentElement
            options={{
              wallets: { applePay: 'auto', googlePay: 'auto' },
              layout: { type: 'tabs', defaultCollapsed: false },
            }}
            onChange={(e) => {
              if (e.error) {
                setError({
                  code: e.error.code,
                  message: e.error.message
                });
              }
              else if (e.complete) setError(null);
            }}
            className="[&_input]:p-2 [&_input]:border [&_input]:rounded-md"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4" role="alert">
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="text-red-400 mr-3"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm text-red-700">
                {error.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || paymentStatus === 'processing'}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                  flex items-center justify-center"
        aria-live="polite"
      >
        {paymentStatus === 'processing' ? (
          <>
            <FontAwesomeIcon 
              icon={faCircleNotch} 
              className="animate-spin mr-2"
              aria-hidden="true"
            />
            Processing...
          </>
        ) : (
          `Pay ${amountFormatted}`
        )}
      </button>
    </form>
  )

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">

      {paymentStatus!=='succeeded' && renderPaymentForm()}

        {requiresAction && (
          <div className="text-center p-6" role="alert">
            <FontAwesomeIcon 
              icon={faExclamationTriangle}
              className="text-yellow-500 text-4xl mb-4"
              aria-hidden="true"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please complete 3D Secure verification in the popup window
            </p>
          </div>
        )}

        {paymentStatus === 'succeeded' && (
          <div className="text-center p-6" role="status" aria-live="polite">
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-green-500 text-4xl mb-4"
              aria-hidden="true"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Payment Successful
            </h2>
            <p className="text-gray-600 mb-4">
              {amountFormatted} has been processed
            </p>
            {/* <p className="text-gray-600 mb-4">
              Thank you for your payment. You will receive a confirmation email shortly.
            </p> */}
            <p className="text-gray-500 text-sm mt-2">
              Redirecting to home page...
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

PaymentForm.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  paymentDetails: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired
  }).isRequired,
  onPaymentSubmit: PropTypes.func.isRequired,
};

export default PaymentForm;