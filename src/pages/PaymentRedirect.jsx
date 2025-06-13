import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { SuccessScreen, ErrorScreen } from '../components/PaymentStatusComponents';
import { useCoursePurchases } from '../context/CoursePurchasesContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentRedirect = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { startPaymentProcessing } = useCoursePurchases();

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret');
    if (!clientSecret) {
      setStatus('failed');
      setError('Missing payment intent client secret.');
      return;
    }

    let isMounted = true;
    stripePromise.then(async (stripe) => {
      if (!stripe) {
        if (isMounted) {
          setStatus('failed');
          setError('Stripe failed to load.');
        }
        return;
      }
      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
        
        if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'processing') {
          setStatus('succeeded');
          startPaymentProcessing();
        } else {
          setStatus('failed');
          setError(paymentIntent?.last_payment_error || paymentIntent?.last_payment_error?.message || 'Payment failed after redirect.');
        }
      } catch {
        setStatus('failed');
        setError('Failed to retrieve payment status.');
      }
    });
    return () => { isMounted = false; };
  }, [searchParams, startPaymentProcessing]);

  const handleClose = () => navigate('/training', { replace: true });
  const handleRetry = () => navigate('/training', { replace: true });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-blue-100 animate-fade-in-up">
        {status === 'processing' && (
          <>
            <div className="mb-6 text-blue-500">
              <FontAwesomeIcon icon={faCheckCircle} size="3x" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-700 animate-pulse">Processing Payment...</h2>
            <p className="text-gray-700 mb-6">Please wait while we confirm your payment. Do not close this window.</p>
          </>
        )}
        {status === 'succeeded' && <SuccessScreen onClose={handleClose} />}
        {status === 'failed' && <ErrorScreen error={error} onRetry={handleRetry} onClose={handleClose} />}
      </div>
    </main>
  );
};

export default PaymentRedirect;
