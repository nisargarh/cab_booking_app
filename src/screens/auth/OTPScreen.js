import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';

const OTPScreen = ({navigation, route}) => {
  const {theme} = useTheme();
  const {login, register} = useAuth();
  
  const {phone, type, userData} = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      left: 20,
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.shadows.small,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    phoneNumber: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
      marginTop: 5,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 40,
      paddingHorizontal: 20,
    },
    otpInput: {
      width: 60,
      height: 60,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.border,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      ...theme.shadows.small,
    },
    otpInputFocused: {
      borderColor: theme.colors.primary,
    },
    otpInputFilled: {
      backgroundColor: theme.colors.primary + '20',
      borderColor: theme.colors.primary,
    },
    resendContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    resendText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 10,
    },
    resendButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    resendButtonText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    resendButtonDisabled: {
      opacity: 0.5,
    },
    timer: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    helpText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      marginTop: 20,
    },
  });

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // Mock OTP verification (in real app, verify with backend)
      if (otpCode === '1234') {
        if (type === 'register') {
          const result = await register({
            ...userData,
            phone: `+91 ${phone}`,
          });
          
          if (!result.success) {
            Alert.alert('Registration Failed', result.error);
          }
        } else {
          const result = await login({
            phone: `+91 ${phone}`,
            name: 'User',
            email: 'user@example.com',
          });
          
          if (!result.success) {
            Alert.alert('Login Failed', result.error);
          }
        }
      } else {
        Alert.alert('Invalid OTP', 'Please enter the correct OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during verification');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    
    setResendTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    
    // Mock resend OTP
    Alert.alert('OTP Sent', 'A new OTP has been sent to your phone');
    
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Verify Phone
        </Animatable.Text>
        <Text style={styles.subtitle}>
          We've sent a 4-digit code to
        </Text>
        <Text style={styles.phoneNumber}>+91 {phone}</Text>
      </View>

      <Animatable.View animation="fadeInUp" style={styles.content}>
        <Card>
          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <Button
            title="Verify OTP"
            onPress={handleVerifyOtp}
            loading={loading}
            disabled={otp.join('').length !== 4}
          />

          {/* Resend OTP */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Didn't receive the code?
            </Text>
            
            {canResend ? (
              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResendOtp}>
                <Text style={styles.resendButtonText}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timer}>
                Resend in {resendTimer}s
              </Text>
            )}
          </View>

          <Text style={styles.helpText}>
            Enter the 4-digit code sent to your phone number. 
            For demo purposes, use "1234" as the OTP.
          </Text>
        </Card>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default OTPScreen;