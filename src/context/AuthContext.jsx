import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Constants for storage keys
const USER_STORAGE_KEY = 'user_data';
const TOKEN_STORAGE_KEY = 'auth_token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize axios defaults
  useEffect(() => {
    // Set withCredentials to true for all requests
    axios.defaults.withCredentials = true;
    
    // Add response interceptor to handle 401 errors
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Cleanup interceptor
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`);
        
        if (response.data.user) {
          setUser(response.data.user);
          // Store non-sensitive user data in localStorage
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            profilePicture: response.data.user.profilePicture
          }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear stored data on auth check failure
        localStorage.removeItem(USER_STORAGE_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store non-sensitive user data in localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        profilePicture: userData.profilePicture
      }));

      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Call logout endpoint to clear server-side session
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear client-side data regardless of server response
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
      setLoading(false);
    }
  };

  // Function to update user data
  const updateUser = async (updatedData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
        updatedData
      );

      if (response.data.user) {
        setUser(response.data.user);
        // Update stored user data
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          profilePicture: response.data.user.profilePicture
        }));
      }
    } catch (error) {
      console.error('Update user error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh user data
  const refreshUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`);
      
      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          profilePicture: response.data.user.profilePicture
        }));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
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