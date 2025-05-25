import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  {/* children refers to whatever part of your app.jsx is wrapped by the provider */}
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authPopupState, setAuthPopupState] = useState('closed');
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthPopupState('closed');
    if (pendingRedirect) {
      navigate(pendingRedirect.path, { state: pendingRedirect.state });
      setPendingRedirect(null);
    } else {
      navigate('/products');
    }
  }, [navigate, pendingRedirect]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  }, [navigate]);

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
      authPopupState, openLoginPopup, openSignupPopup, switchToLoginForm, switchToSignupForm, closeAuthPopup,
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