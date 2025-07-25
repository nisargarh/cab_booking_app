import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

import Button from '../../components/common/Button';
import {useTheme} from '../../context/ThemeContext';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  const {theme} = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  const slides = [
    {
      icon: 'location-on',
      title: 'Book Rides Instantly',
      description: 'Find and book rides with nearby drivers in just a few taps. Quick, easy, and reliable.',
      color: theme.colors.primary,
    },
    {
      icon: 'payment',
      title: 'Secure Payments',
      description: 'Pay 25% upfront online and complete payment after your ride. No cash needed, completely digital.',
      color: theme.colors.secondary,
    },
    {
      icon: 'star',
      title: 'Rate Your Experience',
      description: 'Help us maintain quality by rating your drivers and sharing feedback after every ride.',
      color: theme.colors.warning,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    slideContainer: {
      width,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      ...theme.shadows.large,
    },
    slideTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 20,
    },
    slideDescription: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.9,
      textAlign: 'center',
      lineHeight: 24,
    },
    bottomSection: {
      paddingHorizontal: 30,
      paddingBottom: 30,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    paginationDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    paginationDotActive: {
      backgroundColor: '#FFFFFF',
      width: 20,
    },
    buttonContainer: {
      marginVertical: 8,
    },
    skipButton: {
      alignSelf: 'center',
      marginTop: 15,
    },
    skipText: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.8,
    },
  });

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentSlide(index);
  };

  const goToSlide = (index) => {
    scrollRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
    setCurrentSlide(index);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      navigation.navigate('Register');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <SafeAreaView style={styles.content}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          
          {slides.map((slide, index) => (
            <Animatable.View
              key={index}
              animation="fadeIn"
              duration={800}
              style={styles.slideContainer}>
              
              <View style={styles.iconContainer}>
                <Icon
                  name={slide.icon}
                  size={60}
                  color="#FFFFFF"
                />
              </View>
              
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideDescription}>{slide.description}</Text>
            </Animatable.View>
          ))}
        </ScrollView>

        <View style={styles.bottomSection}>
          {/* Pagination */}
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => goToSlide(index)}
                style={[
                  styles.paginationDot,
                  currentSlide === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          {/* Buttons */}
          <Button
            title={currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            style={styles.buttonContainer}
          />

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>
              {currentSlide === slides.length - 1 ? 'Sign In Instead' : 'Skip'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingScreen;