// Static config (no hardcoded prices)
export const PAYMENT_CONFIG = {
  currency: 'USD',
  service: 'advanced_generative_ai_course',
  courseId: 'advanced_generative_ai_course',
  installments: {
    1: {
      label: 'Pay Full Amount',
      highlight: 'Best Value',
      description: 'One-time payment'
    },
    2: {
      label: '2 Monthly Installments',
      highlight: 'Most Popular',
      description: 'Flexible payment plan'
    },
    3: {
      label: '3 Monthly Installments',
      highlight: 'Maximum Flexibility',
      description: 'Extended payment period'
    }
  }
};

// Dynamic price mapping by currency and installment
const DYNAMIC_PRICE_MAP = {
  INR: {
    1: 25000,
    2: 15000,
    3: 12000
  },
  USD: {
    1: 750,
    2: 450,
    3: 350
  }
  // Add more currencies/countries here
};

export const getPriceForCurrencyOrCountry = ({ currency, countryCode }, numberOfInstallments = 1) => {
  if (currency && DYNAMIC_PRICE_MAP[currency] && DYNAMIC_PRICE_MAP[currency][numberOfInstallments]) {
    return DYNAMIC_PRICE_MAP[currency][numberOfInstallments];
  }
  // Default to USD pricing if not found
  return DYNAMIC_PRICE_MAP.USD[numberOfInstallments];
};

// Calculate payment details for a given number of installments
export const calculatePaymentDetails = (numberOfInstallments, userCurrencyInfo = {}) => {
  const installmentConfig = PAYMENT_CONFIG.installments[numberOfInstallments];
  if (!installmentConfig) {
    throw new Error(`Invalid number of installments: ${numberOfInstallments}`);
  }
  const price = getPriceForCurrencyOrCountry(userCurrencyInfo, numberOfInstallments);
  const perInstallmentAmount = price;
  const totalAmount = perInstallmentAmount * numberOfInstallments;
  return {
    perInstallmentAmount,
    totalAmount,
    currency: userCurrencyInfo.currency || PAYMENT_CONFIG.currency,
    service: PAYMENT_CONFIG.service,
    courseId: PAYMENT_CONFIG.courseId,
    numberOfInstallments
  };
};

// Format currency helper
export const formatCurrency = (amount, currency = PAYMENT_CONFIG.currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Get installment options for UI
export const getInstallmentOptions = () => {
  return Object.entries(PAYMENT_CONFIG.installments).map(([value, config]) => ({
    value: parseInt(value),
    label: config.label,
    highlight: config.highlight,
    description: config.description
  }));
};


// Available installment options
export const INSTALLMENT_OPTIONS = [
  { 
    value: 1, 
    label: 'Pay Full Amount',
    highlight: 'Best Value',
    description: 'Enroll now!'
  },
  { 
    value: 2, 
    label: '2 Monthly Installments',
    highlight: 'Most Popular',
    description: 'Flexible payment plan'
  },
  { 
    value: 3, 
    label: '3 Monthly Installments',
    highlight: 'Maximum Flexibility',
    description: 'Extended payment period'
  }
]; 

// Utility to build payment payload for backend
export function buildPaymentPayload({
  numberOfInstallments,
  userCurrency,
  appliedCoupon,
  service,
  courseId
}) {
  const paymentDetails = calculatePaymentDetails(numberOfInstallments, userCurrency);
  const originalAmount = paymentDetails.perInstallmentAmount * numberOfInstallments;
  let discountedAmount = originalAmount;

  let couponMeta = undefined;
  if (appliedCoupon) {
    couponMeta = {
      code: appliedCoupon.promoCode || appliedCoupon.code,
      type: appliedCoupon.discountType || appliedCoupon.type,
      value: appliedCoupon.discountValue || appliedCoupon.value,
      couponId: appliedCoupon.couponId,
      promoCode: appliedCoupon.promoCode,
    };
    if (couponMeta.type === 'percent') {
      discountedAmount = Math.round(originalAmount * (1 - couponMeta.value / 100));
    } else if (couponMeta.type === 'amount') {
      discountedAmount = originalAmount - couponMeta.value;
    }
  }

  return {
    amount: discountedAmount,
    originalAmount,
    currency: paymentDetails.currency,
    numberOfInstallments,
    service,
    courseId,
    metadata: {
      product_type: service,
      ...(couponMeta && { coupon: couponMeta })
    }
  };
} 