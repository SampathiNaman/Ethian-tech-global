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

export const FX_RATES = {
  USD: 1,
  AED: 3.672500,
  AFN: 69.940000, // Updated from ~86.35
  ALL: 83.180000, // Updated from ~104.5
  AMD: 383.900000, // Updated from ~386.00
  ANG: 1.800000, // Updated from 1.79
  AOA: 917.000000, // Updated from ~833.00
  ARS: 1258.580000, // Significantly updated from ~240.00
  AUD: 1.520000, // Slightly updated from 1.525443
  AWG: 1.800000, // Updated from 1.79 (same as ANG, pegged to USD)
  AZN: 1.700000,
  BAM: 1.670000, // Updated from 1.955830
  BBD: 2.020000, // Slightly updated from 2.00
  BDT: 121.880000, // Updated from ~106.00
  BGN: 1.670000, // Updated from 1.955830 (Euro peg)
  BIF: 2980.380000, // Updated from ~2089.00
  BMD: 1.000000, // USD pegged
  BND: 1.280000, // Slightly updated from 1.278191
  BOB: 6.910000, // Slightly updated from ~6.90
  BRL: 5.560000, // Updated from ~4.95
  BSD: 1.000000, // USD pegged
  BWP: 13.340000, // Updated from ~13.00
  BYN: 3.270000, // Updated from ~2.60 (latest info found)
  BZD: 2.000000, // USD pegged
  CAD: 1.360000, // Close to old value (1.361711) - using a rounded value.
  CDF: 2800.000000, // Updated from ~2345.00
  CHF: 0.890000, // Updated from 0.792691
  CLP: 950.000000, // Updated from ~900.00
  CNY: 7.260000, // Updated from 7.195700
  COP: 4100.000000, // Updated from ~3900.00
  CRC: 520.000000, // Updated from ~540.00
  CVE: 103.000000, // Updated from 110.265000 (Euro peg)
  CZK: 23.500000, // Updated from ~23.00
  DJF: 177.721000, // USD peg (no change expected)
  DKK: 6.950000, // Updated from ~6.90
  DOP: 58.000000, // Updated from ~56.00
  DZD: 135.000000, // Updated from ~140.00
  EGP: 48.000000, // Significantly updated from ~30.90
  ETB: 57.000000, // Updated from ~55.00
  EUR: 0.930000, // Updated from 0.851179
  FJD: 2.250000, // Updated from ~2.30
  FKP: 0.790000, // Pegged to GBP, so updated based on GBP change
  GBP: 0.790000, // Updated from 0.739701
  GEL: 2.800000, // Updated from ~2.70
  GIP: 0.790000, // Pegged to GBP, so updated based on GBP change
  GMD: 65.000000, // Updated from ~59.50
  GNF: 8600.000000, // Slightly updated from ~8547.00
  GTQ: 7.750000, // Slightly updated from ~7.80
  GYD: 209.000000, // Slightly updated from ~208.00
  HKD: 7.810000, // Slightly updated from 7.849900
  HNL: 24.500000, // Slightly updated from 24.30
  HTG: 135.000000, // Updated from 155.00
  HUF: 370.000000, // Updated from 345.00
  IDR: 16500.000000, // Updated from 15000.00
  ILS: 3.700000, // Updated from 3.50
  INR: 83.500000, // Updated from 86.346933 (current value is closer to 83.5)
  ISK: 140.000000, // Slightly updated from 139.00
  JMD: 157.000000, // Slightly updated from 155.00
  JPY: 157.500000, // Updated from 146.836000
  KES: 130.000000, // Updated from 151.00
  KGS: 87.000000, // Updated from 86.00
  KHR: 4100.000000, // Updated from 4080.00
  KMF: 460.000000, // Updated from 448.00
  KRW: 1380.000000, // Updated from 1363.438000
  KYD: 0.833333, // USD peg (no change expected)
  KZT: 470.000000, // Updated from 452.00
  LAK: 21000.000000, // Updated from 18000.00
  LBP: 89500.000000, // Significantly updated from 1507.50 (due to recent changes in official rates)
  LKR: 305.000000, // Updated from 295.00
  LRD: 190.000000, // Updated from 160.00
  LSL: 18.000000, // Updated from 19.00 (pegged to ZAR, which is updated)
  MAD: 10.050000, // Slightly updated from 10.00
  MDL: 17.800000, // Updated from 18.50
  MGA: 4500.000000, // Updated from 4100.00
  MKD: 57.000000, // Updated from 52.00
  MMK: 2100.000000, // No significant change
  MNT: 3400.000000, // Updated from 3450.00
  MOP: 8.050000, // Slightly updated from 8.00
  MUR: 47.000000, // Updated from 45.00
  MVR: 15.400000, // No significant change
  MWK: 1700.000000, // Updated from 1025.00
  MXN: 18.000000, // Updated from 18.306200
  MYR: 4.700000, // Updated from 4.60
  MZN: 64.000000, // Updated from 63.00
  NAD: 18.000000, // Updated from 19.00 (pegged to ZAR, which is updated)
  NGN: 1450.000000, // Significantly updated from 775.00
  NIO: 36.600000, // Slightly updated from 36.00
  NOK: 10.700000, // Updated from 10.00
  NPR: 133.000000, // Updated from 139.00 (pegged to INR, which is updated)
  NZD: 1.630000, // Updated from 1.60
  PAB: 1.000000, // USD pegged (no change expected)
  PEN: 3.800000, // Updated from 3.70
  PGK: 3.900000, // Updated from 3.60
  PHP: 58.500000, // Updated from 56.00
  PKR: 279.000000, // Slightly updated from 278.390000
  PLN: 4.000000, // Updated from 3.80
  PYG: 7500.000000, // Updated from 7100.00
  QAR: 3.640000, // Pegged (no change expected)
  RON: 4.600000, // Updated from 4.20
  RSD: 109.000000, // Updated from 103.00
  RUB: 88.000000, // Updated from 92.656700
  RWF: 1250.000000, // Updated from 1085.00
  SAR: 3.750000, // Pegged (no change expected)
  SBD: 8.500000, // Updated from 8.20
  SCR: 14.000000, // Updated from 13.50
  SEK: 10.800000, // Updated from 10.40
  SGD: 1.350000, // Updated from 1.278191
  SHP: 0.790000, // Pegged to GBP, so updated based on GBP change
  SLE: 22.000000, // Updated from 23.00
  SOS: 575.000000, // Updated from 565.00
  SRD: 38.000000, // No significant change
  SZL: 18.000000, // Updated from 19.00 (pegged to ZAR, which is updated)
  THB: 36.500000, // Updated from 35.00
  TJS: 10.900000, // Updated from 10.50
  TOP: 2.300000, // Updated from 2.40
  TRY: 32.500000, // Updated from 30.00
  TTD: 6.800000, // No significant change
  TWD: 32.000000, // Updated from 30.00
  TZS: 2500.000000, // Updated from 2450.00
  UAH: 40.000000, // Updated from 36.50
  UGX: 3750.000000, // Updated from 3800.00
  UYU: 39.500000, // Updated from 38.50
  UZS: 12600.000000, // Updated from 13500.00
  VND: 25500.000000, // Updated from 24000.00
  VUV: 120.000000, // Updated from 119.00
  WST: 2.700000, // Updated from 2.60
  XAF: 615.000000, // Updated from 655.957000 (pegged to EUR, which is updated)
  XCD: 2.700000, // Pegged (no change expected)
  XOF: 615.000000, // Updated from 655.957000 (pegged to EUR, which is updated)
  XPF: 109.000000, // Updated from 119.331740 (pegged to EUR, which is updated)
  YER: 250.000000, // No significant change
  ZAR: 18.000000, // Updated from 18.50
  ZMW: 26.000000 // Updated from 18.00
};


const BASE_USD = {1: 750, 2: 450, 3: 350};

const DYNAMIC_PRICE_MAP = {};
for (const [cur, rate] of Object.entries(FX_RATES)) {
  DYNAMIC_PRICE_MAP[cur] = {};
  for (const i of [1,2,3]) {
    DYNAMIC_PRICE_MAP[cur][i] = Math.round(BASE_USD[i] * rate);
  }
}


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
  let originalAmount = paymentDetails.totalAmount;
  let discountedAmount = originalAmount;
  
  let couponMeta = undefined;
  
  if (appliedCoupon) {
    // Both referral and regular coupons use the same coupon structure
    couponMeta = {
      couponId: appliedCoupon.couponId, // null for referrals, actual ID for coupons
      couponCode: appliedCoupon.couponCode, // referral code for referrals, coupon code for coupons
      discountType: appliedCoupon.discountType,
      discountValue: appliedCoupon.discountValue,
      isReferral: appliedCoupon.isReferral // Flag to distinguish between referral and coupon
    };
    
    // Calculate discount
    if (appliedCoupon.discountType === 'percent') {
      discountedAmount = Math.round(originalAmount * (1 - appliedCoupon.discountValue / 100));
    } else if (appliedCoupon.discountType === 'amount') {
      discountedAmount = originalAmount - appliedCoupon.discountValue;
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
      ...(couponMeta && { coupon: couponMeta }) // Send unified coupon structure
    }
  };
} 