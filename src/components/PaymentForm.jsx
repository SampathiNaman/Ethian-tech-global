import { useMemo, useState } from 'react';
import { 
  useStripe, 
  useElements,
  PaymentElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleNotch, 
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { errorMap } from '../utils/errorMap';
import { ErrorScreen, SuccessScreen } from './PaymentStatusComponents';

const PaymentForm = ({ 
  clientSecret,
  paymentDetails,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [requiresAction, setRequiresAction] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(-1);

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
      setRetryCount((prev) => prev + 1);

      // Always use /payment-redirect as return_url for all payment methods
      // Use 'always' for redirect-based methods, 'if_required' for card
      // Stripe will handle the redirect for Amazon Pay, Klarna, etc.
      const { paymentIntent, error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          receipt_email: email,
          return_url: `${window.location.origin}/payment-redirect`,
        },
        redirect: 'if_required' // Stripe will redirect if needed (Amazon Pay, 3DS, etc.)
      });
      if (confirmError) {
        throw {
          code: confirmError.code,
          message: confirmError.message,
          type: confirmError.type,
        };
      }
      const requiresActionStatuses = ['requires_action', 'requires_confirmation'];
      if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'processing') {
        setPaymentStatus(paymentIntent.status);
        setRetryCount(-1);
      }
      else if (requiresActionStatuses.includes(paymentIntent?.status)) {
        setRequiresAction(true);
        // 3D Secure authentication
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
      }
    } catch (err) {
      setPaymentStatus('failed');
      handlePaymentError(err);
    }
  };

  const handlePaymentError = (error) => {
    let code = error.code || (error.type ? error.type.replace(/\s+/g, '_').toLowerCase() : undefined);
    let message = error.message || 'Payment processing failed';
    if (!code || !errorMap[code]) {
      code = 'unknown_error';
    }
    setError({
      code,
      message: errorMap[code] || message,
    });
  };

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

      <div aria-live="polite" style={{ minHeight: 40 }}>
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
      </div>

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
        {paymentStatus !== 'succeeded' && !requiresAction && (
          renderPaymentForm()
        )}
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
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <SuccessScreen onClose={() => window.location.replace('/training')} />
          </div>
        )}
        {/* Show error screen below the form if payment failed (not field errors) */}
        {paymentStatus === 'failed' && error && (
          <div className="flex flex-col items-center justify-center min-h-[200px] mt-4">
            <ErrorScreen error={error} onRetry={() => setPaymentStatus('idle')} onClose={() => window.location.replace('/')} />
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
  }).isRequired
};

export default PaymentForm;