import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import { ErrorScreen } from '../components/PaymentStatusComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

const Payment = () => {
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

    setLoading(true);
    setError(null);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-intent`,
        {
          amount: location.state.amount,
          currency: location.state.currency,
          metadata: {
            product_type: location.state.service,
            course_id: location.state.courseId
          },
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
        throw new Error('Invalid response from server');
      }

      if (isMountedRef.current) {
        setClientSecret(response.data.clientSecret);
        setRetryCount(0);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err.message || 'An error occurred while creating the payment intent.');
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
      setError('Maximum retry attempts reached. Please start over.');
      return;
    }
    setRetryCount((prev) => prev + 1);
    setError(null);
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
            <PaymentForm
              clientSecret={clientSecret}
              paymentDetails={location.state}
              onPaymentSuccess={handlePaymentSuccess}
              onClose={() => navigate('/training', { replace: true })}
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
      <div className="flex flex-col items-center justify-center my-16 p-4 space-y-8 w-full">
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
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Payment;