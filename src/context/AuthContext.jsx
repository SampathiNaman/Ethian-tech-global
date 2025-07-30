import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [authPopupState, setAuthPopupState] = useState('closed');
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const navigate = useNavigate();

  // Used to clear user when jwt expires so that login popup is visible
  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
          withCredentials: true
        });
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (error) {
        logout('Session expired. Please log in again.');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);


  const logout = async (message = null) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {}, {
        withCredentials: true
      });

      // If user logged in with Google, also sign out from Google
      const googleAuth = window.google?.accounts?.oauth2;
      if (googleAuth) {
        try {
          await googleAuth.revoke(user?.email);
        } catch (err) {
        }
      }
    } catch (error) {
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      Cookies.remove('guestCurrencyInfo'); 
      
      if (message) {
        toast.info(message);
      }

      // Only navigate if we're not already on the home page
      if (window.location.pathname !== '/') {
        navigate('/');
      }
    }
  };

  const login = useCallback(async (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthPopupState('closed');

    // If there's a pending redirect with payment details, check purchase status
    if (pendingRedirect?.state?.courseId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/payments/course-purchases`,
          { withCredentials: true }
        );
        
        const purchases = response.data;
        const existingPurchase = purchases.find(p => p.courseId === pendingRedirect.state.courseId);
        
        if (!existingPurchase) {
          // Only redirect if no existing purchase
          navigate(pendingRedirect.path, { state: pendingRedirect.state });
        }
      } catch (error) {
        // On error, proceed with redirect to ensure user can attempt purchase
        navigate(pendingRedirect.path, { state: pendingRedirect.state });
      }
    } else if (pendingRedirect?.path) {
      // Handle non-payment redirects
      navigate(pendingRedirect.path, { state: pendingRedirect.state });
    }
    setPendingRedirect(null);
  }, [navigate, pendingRedirect]);

  const openLoginPopup = useCallback((redirectPath = null, redirectState = null) => {
    setAuthPopupState('login');
    if (redirectPath) {
      setPendingRedirect({ path: redirectPath, state: redirectState });
    } else {
      setPendingRedirect(null);
    }
  }, []);

  const openSignupPopup = useCallback((redirectPath = null, redirectState = null) => {
    setAuthPopupState('signup');
    if (redirectPath) {
      setPendingRedirect({ path: redirectPath, state: redirectState });
    } else {
      setPendingRedirect(null);
    }
  }, []);

  const openForgotPasswordPopup = useCallback(() => {
    setAuthPopupState('forgot-password');
  }, []);

  const switchToLoginForm = useCallback(() => {
    setAuthPopupState('login');
  }, []);

  const switchToSignupForm = useCallback(() => {
    setAuthPopupState('signup');
  }, []);

  const closeAuthPopup = useCallback(() => {
    setAuthPopupState('closed');
    setPendingRedirect(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, login, logout, loading,
      authPopupState, openLoginPopup, openSignupPopup, switchToLoginForm, switchToSignupForm, openForgotPasswordPopup, closeAuthPopup,
      pendingRedirect
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 