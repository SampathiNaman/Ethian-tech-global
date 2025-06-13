// Calculate installment fee based on number of installments
export const calculateInstallmentFee = (amount, numberOfInstallments) => {
  let feePercentage = 0.0;
  
  // Increase fee for longer terms
  if (numberOfInstallments === 3) feePercentage = 0.015;
  if (numberOfInstallments === 6) feePercentage = 0.02;
  if (numberOfInstallments === 12) feePercentage = 0.025;
  
  return Math.ceil(amount * feePercentage);
};

// Format fee percentage with 1 decimal point
export const formatFeePercentage = (numberOfInstallments) => {
  let feePercentage = 0.0;
  
  if (numberOfInstallments === 3) feePercentage = 0.015;
  if (numberOfInstallments === 6) feePercentage = 0.02;
  if (numberOfInstallments === 12) feePercentage = 0.025;
  
  return (feePercentage * 100).toFixed(1);
};

// Calculate per installment amount including fee
export const calculatePerInstallmentAmount = (amount, numberOfInstallments) => {
  const fee = calculateInstallmentFee(amount, numberOfInstallments);
  const totalAmount = amount + fee;
  return Math.ceil(totalAmount / numberOfInstallments);
};

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Available installment options
export const INSTALLMENT_OPTIONS = [
  { 
    value: 1, 
    label: 'Pay Full Amount',
    highlight: 'Best Value',
    description: 'Save on processing fees'
  },
  { 
    value: 3, 
    label: '3 Monthly Installments',
    highlight: 'Most Popular',
    description: 'Lowest processing fee'
  },
  { 
    value: 6, 
    label: '6 Monthly Installments',
    highlight: 'Flexible',
    description: 'Extended payment period'
  },
  { 
    value: 12, 
    label: '12 Monthly Installments',
    highlight: 'Maximum Flexibility',
    description: 'Longest payment period'
  },
]; 