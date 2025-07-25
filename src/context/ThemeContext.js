import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = {
  mode: 'light',
  colors: {
    primary: '#00BFA5', // Teal
    primaryDark: '#00897B',
    secondary: '#26A69A',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    card: '#F8F9FA',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.2)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    gradient: ['#00BFA5', '#26A69A'],
    gradientDark: ['#00897B', '#00695C'],
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};

const darkTheme = {
  mode: 'dark',
  colors: {
    primary: '#00BFA5',
    primaryDark: '#00897B',
    secondary: '#26A69A',
    background: '#121212',
    surface: '#1E1E1E',
    card: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#404040',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
    shadow: 'rgba(255, 255, 255, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.4)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    gradient: ['#00BFA5', '#26A69A'],
    gradientDark: ['#00897B', '#00695C'],
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};

export const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    setTheme(isDark ? darkTheme : lightTheme);
  }, [isDark]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const value = {
    theme,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};