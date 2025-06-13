import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const LoginPopup = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, authPopupState, closeAuthPopup } = useAuth();

  if (authPopupState !== 'login') return null;

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, 
        formData,
        { withCredentials: true }
      );

      if (response.data.message === 'Login successful') {
        login(response.data.user);
        toast.success('Welcome back!');
        resetForm();
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (error.response.data.errors) {
              const validationErrors = {};
              error.response.data.errors.forEach(err => {
                validationErrors[err.param] = err.msg;
              });
              setErrors(validationErrors);
            }
            break;
          case 401:
            if (error.response.data.message === 'Please use Google Sign-In for this account') {
              toast.error('This account is linked to Google. Please use Google Sign-In.', {
                duration: 5000,
                icon: '🔐'
              });
              resetForm();
            } else {
              toast.error('Invalid email or password');
              setFormData(prev => ({ ...prev, password: '' }));
            }
            break;
          case 403:
            toast.error('Your account has been deactivated');
            break;
          case 500:
            toast.error('Something went wrong. Please try again later');
            break;
          default:
            toast.error(error.response.data.message || 'Login failed');
        }
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Network error. Please check your connection');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google`, {
        credential: credentialResponse.credential
      }, {
        withCredentials: true
      });

      if (response.data.message === 'Login successful') {
        login(response.data.user);
        toast.success('Welcome back!');
        resetForm();
      }
    } catch (error) {
      console.error('Google login error:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error('Google authentication failed');
            break;
          case 403:
            toast.error('Your account has been deactivated');
            break;
          case 500:
            toast.error('Something went wrong. Please try again later');
            break;
          default:
            toast.error(error.response.data.message || 'Google login failed');
        }
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Network error. Please check your connection');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google login failed. Please try again.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={closeAuthPopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          disabled={loading}
          aria-label="Close login popup"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        
        <div className="space-y-4">
          <div className="flex justify-center">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              width="100%"
              size="large"
              theme="outline"
              shape="rectangular"
              text="continue_with"
            />
          </GoogleOAuthProvider>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter your email"
                disabled={loading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter your password"
                disabled={loading}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-500" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                  flex items-center justify-center"
              disabled={loading}
              aria-live="polite"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-800 font-medium"
              disabled={loading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup; 