import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Skeleton = () => (
  <div className="flex justify-center items-center h-64">
    <div className="payment-skeleton">
      <div className="skeleton-header animate-pulse"></div>
      <div className="skeleton-form">
        <div className="skeleton-row animate-pulse"></div>
        <div className="skeleton-row animate-pulse"></div>
        <div className="skeleton-row animate-pulse"></div>
        <div className="skeleton-button animate-pulse"></div>
      </div>
    </div>
  </div>
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4());
  const location = useLocation();
  const navigate = useNavigate();
  const timeoutRef = useRef();

  const createPaymentIntent = useCallback(async () => {
    setLoading(true);
    setError(null);
    setClientSecret('');
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-intent`,
        {
          amount: location.state.amount,
          currency: location.state.currency,
          service: location.state.service,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
          },
          withCredentials: true,
          timeout: 10000, // Timeout for the request
        }
      );

      if (!response.data.clientSecret) {
        throw new Error('Invalid response from server');
      }

      setClientSecret(response.data.clientSecret);
      setRetryCount(0);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Payment initialization failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [location.state, idempotencyKey, retryCount]);

  useEffect(() => {

    if (!location.state) {
      setError('Invalid payment details. Please try again.');
      setLoading(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setError('Payment session expired. Please start over.');
      setLoading(false);
    }, 300000);

    createPaymentIntent();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [createPaymentIntent, location.state]);

  const handleRetry = () => {
    if (retryCount >= 5) {
      setError('Maximum retry attempts reached. Please start over.');
      return;
    }

    setRetryCount((prev) => prev + 1);
    createPaymentIntent();
  };

  const ErrorScreen = ({ error, onRetry }) => {
    const isNetworkError = error.includes('Network Error') || error.includes('timeout');
    const isServerError = error.includes('server');

    return (
      <div
        className="text-center p-6 rounded-lg border max-w-md mx-auto mt-8 bg-white shadow-lg"
        role="alert"
        aria-live="assertive"
      >
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-red-500 mx-auto animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {isNetworkError ? 'Connection Issue' : 'Payment Failed'}
        </h2>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            {isNetworkError
              ? navigator.onLine
                ? 'Connection to payment service failed. Please check your network.'
                : 'No internet connection detected. Please check your network settings.'
              : 'We encountered an issue processing your payment. Please try again.'}
          </p>

          <details className="text-sm text-gray-500">
            <summary className="cursor-pointer mb-2">Technical Details</summary>
            <code className="block p-2 bg-gray-50 rounded mt-2 break-all">{error}</code>
          </details>
        </div>

        <div className="flex flex-col gap-3">
          {!isServerError && retryCount < 2 && (
            <button
              onClick={onRetry}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                              disabled:opacity-50 transition-colors flex items-center justify-center"
              aria-label="Retry payment"
            >
              Try Again
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-700 text-sm"
          >
            Return to Previous Page
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) return <Skeleton />;
    if (error) return <ErrorScreen error={error} onRetry={handleRetry} />;

    return (
      <div className="payment-section w-full max-w-xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#4f46e5',
                  colorBackground: '#f8fafc',
                  spacingUnit: '4px',
                },
              },
              loader: 'always'
            }}
          >
            <PaymentForm
              clientSecret={clientSecret}
              paymentDetails={location.state}
              onPaymentSubmit={() => toast.success('Payment successful!')}
            />
          </Elements>
        </div>
      </div>
    );
  };

  return (
    <main className="main-content">
      <div className="flex flex-col items-center justify-center my-16 p-4 space-y-8">
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" aria-live="polite">
            Secure Payment Portal
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Your transaction is protected with bank-grade security and 3D Secure authentication.
          </p>
        </div>

        {renderContent()}

        <div className="mt-8 text-center text-sm text-gray-600 max-w-md mx-auto">
          <p className="mb-4">
            PCI DSS compliant payments processed through
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Stripe
            </a>
          </p>
          <p className="text-xs text-gray-500">
            [SECURITY-ID: {idempotencyKey.slice(0, 8)}]
          </p>
        </div>
      </div>
    </main>
  );
};

export default Payment;