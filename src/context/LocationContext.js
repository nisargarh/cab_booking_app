import React, {createContext, useContext, useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Platform, PermissionsAndroid} from 'react-native';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({children}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyVehicles, setNearbyVehicles] = useState([]);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationPermission(true);
          getCurrentLocation();
        }
      } else {
        setLocationPermission(true);
        getCurrentLocation();
      }
    } catch (error) {
      console.log('Location permission error:', error);
    }
  };

  const getCurrentLocation = () => {
    setIsLocationLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        generateNearbyVehicles(latitude, longitude);
        setIsLocationLoading(false);
      },
      error => {
        console.log('Location error:', error);
        setIsLocationLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const generateNearbyVehicles = (lat, lng) => {
    // Generate mock nearby vehicles for demo
    const vehicles = [];
    const vehicleTypes = ['car', 'bike', 'auto'];
    
    for (let i = 0; i < 15; i++) {
      const randomLat = lat + (Math.random() - 0.5) * 0.01;
      const randomLng = lng + (Math.random() - 0.5) * 0.01;
      const randomType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
      
      vehicles.push({
        id: `vehicle_${i}`,
        type: randomType,
        latitude: randomLat,
        longitude: randomLng,
        heading: Math.random() * 360,
        driver: {
          name: `Driver ${i + 1}`,
          rating: (4 + Math.random()).toFixed(1),
          phone: `+91 9876543${String(i).padStart(3, '0')}`,
        },
        vehicle: {
          model: randomType === 'car' ? 'Swift Dzire' : randomType === 'bike' ? 'Honda Activa' : 'Auto Rickshaw',
          number: `KA01AB${String(1000 + i)}`,
          color: ['White', 'Silver', 'Black', 'Blue'][Math.floor(Math.random() * 4)],
        },
      });
    }
    
    setNearbyVehicles(vehicles);
  };

  const updateLocation = (latitude, longitude) => {
    setCurrentLocation({latitude, longitude});
    generateNearbyVehicles(latitude, longitude);
  };

  const value = {
    currentLocation,
    nearbyVehicles,
    isLocationLoading,
    locationPermission,
    getCurrentLocation,
    updateLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};