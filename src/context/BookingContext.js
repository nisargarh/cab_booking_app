import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({children}) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingStats, setBookingStats] = useState({
    totalRides: 0,
    totalAmount: 0,
    averageRating: 0,
  });

  useEffect(() => {
    loadBookingHistory();
  }, []);

  const loadBookingHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('bookingHistory');
      if (history) {
        const parsedHistory = JSON.parse(history);
        setBookingHistory(parsedHistory);
        calculateStats(parsedHistory);
      }
    } catch (error) {
      console.log('Error loading booking history:', error);
    }
  };

  const calculateStats = (history) => {
    const completed = history.filter(booking => booking.status === 'completed');
    const totalRides = completed.length;
    const totalAmount = completed.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const averageRating = completed.length > 0 
      ? completed.reduce((sum, booking) => sum + (booking.rating || 0), 0) / completed.length 
      : 0;

    setBookingStats({
      totalRides,
      totalAmount,
      averageRating: averageRating.toFixed(1),
    });
  };

  const createBooking = async (bookingData) => {
    setIsBookingLoading(true);
    try {
      const newBooking = {
        id: `booking_${Date.now()}`,
        ...bookingData,
        status: 'active',
        createdAt: new Date().toISOString(),
        otp: Math.floor(1000 + Math.random() * 9000).toString(),
      };

      setCurrentBooking(newBooking);
      
      // Add to history
      const updatedHistory = [newBooking, ...bookingHistory];
      setBookingHistory(updatedHistory);
      await AsyncStorage.setItem('bookingHistory', JSON.stringify(updatedHistory));
      
      setIsBookingLoading(false);
      return {success: true, booking: newBooking};
    } catch (error) {
      setIsBookingLoading(false);
      console.log('Error creating booking:', error);
      return {success: false, error: error.message};
    }
  };

  const updateBookingStatus = async (bookingId, status, additionalData = {}) => {
    try {
      const updatedHistory = bookingHistory.map(booking => 
        booking.id === bookingId 
          ? {...booking, status, ...additionalData, updatedAt: new Date().toISOString()}
          : booking
      );

      setBookingHistory(updatedHistory);
      await AsyncStorage.setItem('bookingHistory', JSON.stringify(updatedHistory));

      if (currentBooking && currentBooking.id === bookingId) {
        setCurrentBooking({...currentBooking, status, ...additionalData});
      }

      calculateStats(updatedHistory);
      return {success: true};
    } catch (error) {
      console.log('Error updating booking status:', error);
      return {success: false, error: error.message};
    }
  };

  const completeBooking = async (bookingId, rating, feedback) => {
    return await updateBookingStatus(bookingId, 'completed', {
      rating,
      feedback,
      completedAt: new Date().toISOString(),
    });
  };

  const cancelBooking = async (bookingId, reason) => {
    return await updateBookingStatus(bookingId, 'cancelled', {
      cancelReason: reason,
      cancelledAt: new Date().toISOString(),
    });
  };

  const clearCurrentBooking = () => {
    setCurrentBooking(null);
  };

  const getFilteredHistory = (filter, dateRange) => {
    let filtered = bookingHistory;

    // Filter by status
    if (filter && filter !== 'all') {
      filtered = filtered.filter(booking => booking.status === filter);
    }

    // Filter by date range
    if (dateRange) {
      const {startDate, endDate} = dateRange;
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.createdAt);
        return bookingDate >= startDate && bookingDate <= endDate;
      });
    }

    return filtered;
  };

  const value = {
    currentBooking,
    bookingHistory,
    isBookingLoading,
    bookingStats,
    createBooking,
    updateBookingStatus,
    completeBooking,
    cancelBooking,
    clearCurrentBooking,
    getFilteredHistory,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};