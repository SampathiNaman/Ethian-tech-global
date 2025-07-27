import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Create context
const CoursePurchasesContext = createContext(null);

// Cache keys
const CACHE_KEY = 'course_purchases';
const CACHE_TIMESTAMP_KEY = 'course_purchases_timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Provider component
export const CoursePurchasesProvider = ({ children }) => {

  const [purchases, setPurchases] = useState(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (cachedData && timestamp) {
      const isExpired = Date.now() - parseInt(timestamp) > CACHE_DURATION;
      if (!isExpired) {
        return JSON.parse(cachedData);
      }
    }
    return [];
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const pollingRefs = useRef({});
  const { user } = useAuth();

  const updateCache = useCallback((data) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  }, []);

  const clearCache = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  }, []);

  const fetchPurchases = useCallback(async (forceRefresh = false) => {
    if (!user) {
      setPurchases([]);
      setLoading(false);
      clearCache();
      return;
    }

    // Check cache first if not forcing refresh
    if (!forceRefresh) {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cachedData && timestamp) {
        const isExpired = Date.now() - parseInt(timestamp) > CACHE_DURATION;
        if (!isExpired) {
          setPurchases(JSON.parse(cachedData));
          setLoading(false);
          return JSON.parse(cachedData);
        }
      }
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/course-purchases`,
        { withCredentials: true }
      );
      setPurchases(response.data);
      updateCache(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch course purchases');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, updateCache, clearCache]);

  // Initial load and user change
  useEffect(() => {
    if (user) {
    fetchPurchases();
    } else {
      setPurchases([]);
      clearCache();
    }
  }, [user, fetchPurchases, clearCache]);

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
        updateCache(response.data);
        
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
  }, [updateCache]);

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

    // Handle different field names in the purchase object
    const nextPaymentDate = purchase.nextInstallmentDue || installmentDetails.nextPaymentDate;
    const completedInstallments = installmentDetails.completedInstallments || 0;
    const nextInstallmentNumber = completedInstallments + 1;
    
    // Calculate next payment amount if not provided
    const remainingInstallments = installmentDetails.totalInstallments - completedInstallments;
    const nextPaymentAmount = installmentDetails.nextPaymentAmount || Math.ceil(remainingAmount / remainingInstallments);

    return {
      nextInstallmentNumber,
      nextPaymentDate: new Date(nextPaymentDate),
      remainingAmount,
      isAutomatic: installmentDetails.isAutomatic,
      totalInstallments: installmentDetails.totalInstallments,
      nextPaymentAmount
    };
  }, [purchases]);



  const getCouponDetails = useCallback((courseId) => {
    const purchase = purchases.find(p => p.courseId === courseId);
    if (!purchase || !purchase.coupon) return null;
    return {
      couponId: purchase.coupon.couponId || null, // Handle null couponId for referrals
      couponCode: purchase.coupon.couponCode,
      discountType: purchase.coupon.discountType,
      discountValue: purchase.coupon.discountValue,
      isReferral: purchase.coupon.isReferral,
      discountAmount: purchase.discountAmount || null
    };
  }, [purchases]);

  const value = {
    purchases,
    loading,
    error,
    getPurchaseStatus,
    getInstallmentDetails,
    getNextPaymentInfo,
    getCouponDetails,
    refreshPurchases: () => fetchPurchases(true), // Force refresh
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

// Constants
const POLLING_INTERVAL = 5000; // 5 seconds
const MAX_POLLING_ATTEMPTS = 4;

// Custom hook
export const useCoursePurchases = () => {
  const context = useContext(CoursePurchasesContext);
  if (!context) {
    throw new Error('useCoursePurchases must be used within a CoursePurchasesProvider');
  }
  return context;
}; 