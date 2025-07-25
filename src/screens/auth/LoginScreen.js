import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const {theme} = useTheme();
  const {login} = useAuth();
  
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone', 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    methodSelector: {
      flexDirection: 'row',
      marginBottom: 30,
      borderRadius: 12,
      backgroundColor: theme.colors.card,
      padding: 4,
      ...theme.shadows.small,
    },
    methodButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    methodButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    methodText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    methodTextActive: {
      color: '#FFFFFF',
    },
    form: {
      marginBottom: 30,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 10,
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 30,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      marginHorizontal: 20,
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    socialButtons: {
      marginBottom: 30,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      paddingVertical: 15,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.small,
    },
    socialButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      marginLeft: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
    footerText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    footerLink: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
  });

  const validateForm = () => {
    const newErrors = {};

    if (loginMethod === 'phone') {
      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (phone.length < 10) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    } else {
      if (!email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (!password.trim()) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (loginMethod === 'phone') {
        // Navigate to OTP screen for phone login
        navigation.navigate('OTP', {phone, type: 'login'});
      } else {
        // Direct login for email
        const result = await login({
          email,
          password,
          name: 'User',
          phone: '+91 9876543210',
        });
        
        if (!result.success) {
          Alert.alert('Login Failed', result.error);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    Alert.alert('Google Login', 'Google login functionality would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <Animatable.Text animation="fadeInDown" style={styles.title}>
            Welcome Back
          </Animatable.Text>
          <Text style={styles.subtitle}>
            Sign in to continue to SDM Cab Booking
          </Text>
        </View>

        <Animatable.View animation="fadeInUp" style={styles.content}>
          {/* Method Selector */}
          <View style={styles.methodSelector}>
            <TouchableOpacity
              style={[
                styles.methodButton,
                loginMethod === 'phone' && styles.methodButtonActive,
              ]}
              onPress={() => setLoginMethod('phone')}>
              <Text
                style={[
                  styles.methodText,
                  loginMethod === 'phone' && styles.methodTextActive,
                ]}>
                Phone
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.methodButton,
                loginMethod === 'email' && styles.methodButtonActive,
              ]}
              onPress={() => setLoginMethod('email')}>
              <Text
                style={[
                  styles.methodText,
                  loginMethod === 'email' && styles.methodTextActive,
                ]}>
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <Card style={styles.form}>
            {loginMethod === 'phone' ? (
              <Input
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                leftIcon="phone"
                error={errors.phone}
              />
            ) : (
              <>
                <Input
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  leftIcon="email"
                  error={errors.email}
                />
                
                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  leftIcon="lock"
                  error={errors.password}
                />
                
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <Button
              title={loginMethod === 'phone' ? 'Send OTP' : 'Sign In'}
              onPress={handleLogin}
              loading={loading}
            />
          </Card>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleLogin}>
              <Icon name="google" size={20} color="#DB4437" />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;