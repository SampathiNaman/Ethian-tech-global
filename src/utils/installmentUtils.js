// Payment configuration
export const PAYMENT_CONFIG = {
  // Base price for the course
  basePrice: 750,
  
  // Currency configuration
  currency: 'USD',
  
  // Installment configurations
  installments: {
    1: {
      amount: 750,
      label: 'Pay Full Amount',
      highlight: 'Best Value',
      description: 'One-time payment'
    },
    2: {
      amount: 450,
      label: '2 Monthly Installments',
      highlight: 'Most Popular',
      description: 'Flexible payment plan'
    },
    3: {
      amount: 350,
      label: '3 Monthly Installments',
      highlight: 'Maximum Flexibility',
      description: 'Extended payment period'
    }
  },

  // Service identifier for the course
  service: 'advanced_generative_ai_course',
  
  // Course identifier
  courseId: 'advanced_generative_ai_course'
};

// Calculate payment details for a given number of installments
export const calculatePaymentDetails = (numberOfInstallments) => {
  const installmentConfig = PAYMENT_CONFIG.installments[numberOfInstallments];
  if (!installmentConfig) {
    throw new Error(`Invalid number of installments: ${numberOfInstallments}`);
  }

  const perInstallmentAmount = installmentConfig.amount;
  const totalAmount = perInstallmentAmount * numberOfInstallments;

  return {
    perInstallmentAmount,
    totalAmount,
    currency: PAYMENT_CONFIG.currency,
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