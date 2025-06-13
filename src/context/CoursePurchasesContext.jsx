import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';

const CoursePurchasesContext = createContext();
const POLLING_INTERVAL = 5000; // 5 seconds
const MAX_POLLING_ATTEMPTS = 4;

export const useCoursePurchases = () => {
  const context = useContext(CoursePurchasesContext);
  if (!context) {
    throw new Error('useCoursePurchases must be used within a CoursePurchasesProvider');
  }
  return context;
};

export const CoursePurchasesProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const pollingRefs = useRef({});
  const { user } = useAuth();
  const location = useLocation();

  const fetchPurchases = useCallback(async () => {
    if (!user) {
      setPurchases([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/course-purchases`,
        { withCredentials: true }
      );
      setPurchases(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch course purchases');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      Object.values(pollingRefs.current).forEach(interval => clearInterval(interval));
    };
  }, []);

  const startPaymentProcessing = useCallback(() => {
    // Clear any existing polling
    Object.values(pollingRefs.current).forEach(interval => clearInterval(interval));
    pollingRefs.current = {};

    setPaymentSuccess(true);
    let attempts = 0;

    const pollInterval = setInterval(async () => {
      attempts++;
      
      if (attempts >= MAX_POLLING_ATTEMPTS) {
        clearInterval(pollInterval);
        setPaymentSuccess(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/payments/course-purchases`,
          { withCredentials: true }
        );
        
        setPurchases(response.data);
        
        // Check if any purchase is still processing
        const hasProcessingPayments = response.data.some(
          purchase => purchase.purchaseStatus === 'processing' || purchase.purchaseStatus === 'pending'
        );

        if (!hasProcessingPayments) {
          clearInterval(pollInterval);
          setPaymentSuccess(false);
        }
      } catch (err) {
        console.error('Error polling payment status:', err);
      }
    }, POLLING_INTERVAL);

    pollingRefs.current.main = pollInterval;
  }, []);

  const stopPaymentProcessing = useCallback(() => {
    Object.values(pollingRefs.current).forEach(interval => clearInterval(interval));
    pollingRefs.current = {};
    setPaymentSuccess(false);
  }, []);

  const getPurchaseStatus = useCallback((courseId) => {
    if (paymentSuccess) {
      return 'processing';
    }

    const purchase = purchases.find(p => p.courseId === courseId);
    if (!purchase) return 'none';
    return purchase.purchaseStatus;
  }, [purchases, paymentSuccess]);

  const getInstallmentDetails = useCallback((courseId) => {
    const purchase = purchases.find(p => p.courseId === courseId);
    return purchase?.installmentDetails || null;
  }, [purchases]);

  const getNextPaymentInfo = useCallback((courseId) => {
    const purchase = purchases.find(p => p.courseId === courseId);
    if (!purchase || !purchase.isInstallment) return null;

    const { installmentDetails, remainingAmount } = purchase;
    if (!installmentDetails) return null;

    return {
      nextInstallmentNumber: installmentDetails.nextInstallmentNumber,
      nextPaymentDate: new Date(installmentDetails.nextPaymentDate),
      remainingAmount,
      isAutomatic: installmentDetails.isAutomatic,
      totalInstallments: installmentDetails.totalInstallments,
      nextPaymentAmount: installmentDetails.nextPaymentAmount
    };
  }, [purchases]);

  const value = {
    purchases,
    loading,
    error,
    getPurchaseStatus,
    getInstallmentDetails,
    getNextPaymentInfo,
    refreshPurchases: fetchPurchases,
    startPaymentProcessing,
    stopPaymentProcessing,
    paymentSuccess
  };

  return (
    <CoursePurchasesContext.Provider value={value}>
      {children}
    </CoursePurchasesContext.Provider>
  );
}; 