import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

import Button from '../../components/common/Button';
import {useTheme} from '../../context/ThemeContext';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingVertical: 50,
    },
    topSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    illustrationContainer: {
      width: width * 0.7,
      height: width * 0.7,
      borderRadius: (width * 0.7) / 2,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      ...theme.shadows.large,
    },
    cityIllustration: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: 20,
    },
    building: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      marginHorizontal: 2,
      borderRadius: 4,
    },
    building1: {
      width: 15,
      height: 40,
    },
    building2: {
      width: 20,
      height: 60,
    },
    building3: {
      width: 18,
      height: 35,
    },
    building4: {
      width: 22,
      height: 50,
    },
    cabContainer: {
      position: 'relative',
    },
    cab: {
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      padding: 8,
    },
    appName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 10,
    },
    tagline: {
      fontSize: 18,
      color: '#FFFFFF',
      opacity: 0.9,
      textAlign: 'center',
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.8,
      textAlign: 'center',
      lineHeight: 24,
    },
    bottomSection: {
      paddingBottom: 20,
    },
    buttonContainer: {
      marginVertical: 10,
    },
    skipButton: {
      alignSelf: 'center',
      marginTop: 20,
    },
    skipText: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.8,
      textDecorationLine: 'underline',
    },
  });

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <SafeAreaView style={styles.content}>
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          style={styles.topSection}>
          
          <View style={styles.illustrationContainer}>
            {/* City skyline illustration */}
            <View style={styles.cityIllustration}>
              <View style={[styles.building, styles.building1]} />
              <View style={[styles.building, styles.building2]} />
              <View style={[styles.building, styles.building3]} />
              <View style={[styles.building, styles.building4]} />
              <View style={[styles.building, styles.building1]} />
            </View>
            
            {/* Cab illustration */}
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={2000}
              style={styles.cabContainer}>
              <View style={styles.cab}>
                <Icon
                  name="local-taxi"
                  size={40}
                  color={theme.colors.primary}
                />
              </View>
            </Animatable.View>
          </View>

          <Text style={styles.appName}>SDM Cab Booking</Text>
          <Text style={styles.tagline}>Your Ride, Your Way</Text>
          <Text style={styles.description}>
            Book rides instantly with our professional drivers. 
            Safe, reliable, and affordable transportation at your fingertips.
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={500}
          style={styles.bottomSection}>
          
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Onboarding')}
            style={styles.buttonContainer}
          />
          
          <Button
            title="I Already Have an Account"
            variant="outline"
            onPress={() => navigation.navigate('Login')}
            style={styles.buttonContainer}
          />
          
        </Animatable.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;