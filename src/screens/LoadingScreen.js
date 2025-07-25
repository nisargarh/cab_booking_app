import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';

const {width, height} = Dimensions.get('window');

const LoadingScreen = () => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    logoIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      ...theme.shadows.large,
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 8,
    },
    tagline: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.9,
      textAlign: 'center',
    },
    loadingContainer: {
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: '#FFFFFF',
      marginTop: 20,
      opacity: 0.8,
    },
  });

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      
      <Animatable.View
        animation="bounceIn"
        duration={1500}
        style={styles.logoContainer}>
        
        <View style={styles.logoIcon}>
          <Icon
            name="local-taxi"
            size={50}
            color={theme.colors.primary}
          />
        </View>
        
        <Text style={styles.appName}>SDM Cab Booking</Text>
        <Text style={styles.tagline}>Your Ride, Your Way</Text>
      </Animatable.View>

      <Animatable.View
        animation="fadeIn"
        delay={1000}
        style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </Animatable.View>
    </LinearGradient>
  );
};

export default LoadingScreen;