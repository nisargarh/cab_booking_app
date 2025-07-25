import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return {success: true};
    } catch (error) {
      console.log('Error logging in:', error);
      return {success: false, error: error.message};
    }
  };

  const register = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return {success: true};
    } catch (error) {
      console.log('Error registering:', error);
      return {success: false, error: error.message};
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = {...user, ...updatedData};
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return {success: true};
    } catch (error) {
      console.log('Error updating profile:', error);
      return {success: false, error: error.message};
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};