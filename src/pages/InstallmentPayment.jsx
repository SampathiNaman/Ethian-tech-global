import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import InstallmentPaymentForm from '../components/InstallmentPaymentForm';
import { ErrorScreen } from '../components/PaymentStatusComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { errorMap } from '../utils/errorMap';
import { useCoursePurchases } from '../context/CoursePurchasesContext';

const RETRY_LIMIT = 5;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Spinner = () => (
  <div className="flex justify-center items-center h-96 w-full">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg" />
      <span className="mt-6 text-blue-700 text-lg font-medium animate-pulse">Loading payment form…</span>
    </div>
  </div>
);

const InstallmentPayment = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4());
  const location = useLocation();
  const navigate = useNavigate();
  const abortControllerRef = useRef();
  const isMountedRef = useRef(true);
  const { refreshPurchases } = useCoursePurchases();

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const elementsOptions = useMemo(() => ({
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#4f46e5',
        colorBackground: '#f8fafc',
        spacingUnit: '4px',
      },
    },
  }), [clientSecret]);

  const createPaymentIntent = useCallback(async () => {
    if (!location.state) {
      setError('Missing payment details');
      setLoading(false);
      return;
    }

    const { amount, currency, service, courseId, numberOfInstallments, isAutomatic } = location.state;

    if (!amount || !currency || !service || !courseId || !numberOfInstallments) {
      setError('Invalid payment details');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-installment`,
        {
          amount,
          currency,
          numberOfInstallments,
          isAutomatic,
          metadata: {
            product_type: service,
            course_id: courseId,
            is_installment: true,
            installment_details: {
              total_installments: numberOfInstallments,
              current_installment: 1,
              is_automatic: isAutomatic
            }
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
          },
          withCredentials: true,
          timeout: 10 * 60 * 1000,
          signal: controller.signal,
        }
      );

      if (!response.data?.clientSecret) {
        throw new Error('Invalid response from server: Missing client secret');
      }

      if (isMountedRef.current) {
        setClientSecret(response.data.clientSecret);
        setRetryCount(0);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorCode = err.response?.status?.toString() || 'unknown_error';
        setError({
          code: errorCode,
          message: errorMap[errorCode] || err.message || 'An error occurred while creating the payment intent.'
        });
        setClientSecret('');
      }
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, [location.state, idempotencyKey]);

  useEffect(() => {
    if (!location.state) {
      setError('Invalid payment details. Go back and try again.');
      setLoading(false);
      return;
    }
    createPaymentIntent();
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [createPaymentIntent, location.state]);

  const handleRetry = () => {
    if (retryCount >= RETRY_LIMIT) {
      setError({
        code: 'max_retries',
        message: errorMap['max_retries']
      });
      return;
    }
    setRetryCount((prev) => prev + 1);
    setError(null);
    setIdempotencyKey(uuidv4());
    createPaymentIntent();
  };

  const handlePaymentSuccess = async () => {
    await refreshPurchases();
  };

  const renderContent = () => {
    if (loading) return <Spinner />;
    if (error) return <ErrorScreen error={error} onRetry={handleRetry} onClose={() => navigate(-1)} />;
    if (!location.state) return <ErrorScreen error="Missing payment details. Please start over." onRetry={() => navigate(-1)} onClose={() => navigate(-1)} />;
    if (!clientSecret) return <ErrorScreen error="Failed to initialize payment. Please try again." onRetry={handleRetry} onClose={() => navigate(-1)} />;

    return (
      <div className="payment-section w-full max-w-xl px-2 sm:px-0">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Elements
            stripe={stripePromise}
            options={elementsOptions}
          >
            <InstallmentPaymentForm
              clientSecret={clientSecret}
              paymentDetails={location.state}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="flex flex-col items-center justify-center my-6 p-4 space-y-8 w-full">
          <div className="text-center max-w-2xl mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4" aria-live="polite">
              Installment Payment
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Your payment will be split into {location.state?.numberOfInstallments || 'multiple'} equal installments.
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
            {location.state?.isAutomatic ? (
              <p className="text-xs text-gray-500 mt-2">
                Your card will be automatically charged each month
              </p>
            ) : (
              <p className="text-xs text-gray-500 mt-2">
                You will receive a reminder before each payment is due
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default InstallmentPayment; 