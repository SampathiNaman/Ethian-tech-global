// Frontend error codes (Stripe and UI errors)
export const errorMap = {
  // Stripe payment errors
  "card_declined": "Card declined. Please try another payment method.",
  "expired_card": "Card expired. Please update your card details.",
  "incorrect_cvc": "Incorrect CVC code. Please check your card details.",
  "invalid_number": "Invalid card number. Please verify your card information.",
  "invalid_expiry_month": "Invalid expiration month. Please check your card details.",
  "processing_error": "Payment processor declined the transaction.",
  "currency_mismatch": "Payment currency does not match required currency.",
  "amount_mismatch": "Payment amount does not match requested amount.",
  "authentication_required": "3D Secure authentication failed. Please complete verification.",
  "3ds_verification_failed": "3D Secure verification unsuccessful.",
  "network_failure": "Network error occurred. Please check your connection.",
  "api_connection_error": "Unable to connect to payment processor.",
  "verification_failed": "Payment verification failed with our system",
  "max_retries": "Maximum payment attempts reached. Please contact support.",
  
  // Backend error codes
  "COUPON_CODE_REQUIRED": "Coupon code is required.",
  "INVALID_COUPON": "Invalid or expired coupon.",
  "COUPON_EXPIRED": "Coupon has expired.",
  "COUPON_REDEMPTION_LIMIT": "Coupon has reached its redemption limit.",
  "INVALID_DISCOUNT_TYPE": "Coupon is not a valid discount type.",
  "COUPON_VALIDATION_FAILED": "Failed to validate coupon. Please try again.",
  "STRIPE_API_ERROR": "Payment service error. Please try again.",
  "STRIPE_CARD_ERROR": "Card error. Please check your payment details.",
  "STRIPE_VALIDATION_ERROR": "Invalid payment information. Please check your details.",
  "STRIPE_RATE_LIMIT_ERROR": "Too many requests. Please wait a moment and try again.",
  "COUPON_REFERRAL_SERVICE_ERROR": "Coupon/referral processing failed. Please try again.",
  "PAYMENT_SERVICE_ERROR": "Payment processing failed. Please try again.",
  "USER_NOT_FOUND": "User not found. Please log in again.",
  "INSTALLMENT_ALREADY_PAID": "This installment has already been paid.",
  "INSTALLMENT_COMPLETED": "All installments have been completed.",
  "INSTALLMENT_FAILED": "Installment payment failed. Please try again.",
  
  // HTTP status codes
  "400": "Invalid request. Please check your payment details.",
  "401": "Authentication required. Please log in again.",
  "403": "Access denied. Please contact support.",
  "404": "Resource not found. Please try again.",
  "429": "Too many requests. Please wait a moment and try again.",
  "500": "Server error. Please try again later.",
  "502": "Service temporarily unavailable. Please try again.",
  "503": "Service temporarily unavailable. Please try again.",
  "504": "Request timeout. Please try again.",
  
  // Generic errors
  "unknown_error": "An unexpected error occurred. Please try again.",
  "network_error": "Network error. Please check your connection and try again.",
  "timeout_error": "Request timeout. Please try again.",
  "validation_error": "Invalid data provided. Please check your information.",
  "missing_payment_details": "Missing payment details. Please start over.",
  "invalid_payment_details": "Invalid payment details. Please check your information.",
  "payment_initialization_failed": "Failed to initialize payment. Please try again.",
  "stripe_load_failed": "Payment service failed to load. Please refresh the page.",
  "payment_status_retrieval_failed": "Failed to retrieve payment status. Please try again.",
  "missing_client_secret": "Missing payment information. Please start over.",
};

// Error normalization utility
export const normalizeError = (error) => {
  // If error is already normalized (has code and message)
  if (error && typeof error === 'object' && error.code && error.message) {
    return error;
  }
  
  // If error is a string, convert to object
  if (typeof error === 'string') {
    return {
      code: 'unknown_error',
      message: error
    };
  }
  
  // If error is an axios error response
  if (error?.response) {
    const statusCode = error.response.status?.toString();
    const backendError = error.response.data?.error || error.response.data;
    
    return {
      code: backendError?.code || statusCode || 'unknown_error',
      message: backendError?.message || errorMap[statusCode] || error.message || 'An error occurred',
      statusCode: statusCode,
      details: backendError?.details
    };
  }
  
  // If error is a Stripe error
  if (error?.type && error?.code) {
    return {
      code: error.code,
      message: error.message || errorMap[error.code] || 'Payment error occurred',
      type: error.type,
      declineCode: error.decline_code
    };
  }
  
  // Default fallback
  return {
    code: 'unknown_error',
    message: error?.message || 'An unexpected error occurred'
  };
};

// Error handling utility for payment pages
export const handlePaymentError = (error, context = 'payment') => {
  const normalizedError = normalizeError(error);
  return normalizedError;
};

// Get user-friendly error message
export const getErrorMessage = (error) => {
  const normalizedError = normalizeError(error);
  return errorMap[normalizedError.code] || normalizedError.message || 'An error occurred';
};