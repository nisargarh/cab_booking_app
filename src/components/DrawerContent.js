import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../context/ThemeContext';
import {useAuth} from '../context/AuthContext';

const DrawerContent = (props) => {
  const {theme, isDark, toggleTheme} = useTheme();
  const {user, logout} = useAuth();

  const drawerItems = [
    {
      label: 'Home',
      icon: 'home',
      onPress: () => props.navigation.navigate('HomeTab'),
    },
    {
      label: 'Your Rides',
      icon: 'directions-car',
      onPress: () => props.navigation.navigate('HistoryTab'),
    },
    {
      label: 'Wallet',
      icon: 'account-balance-wallet',
      onPress: () => props.navigation.navigate('Wallet'),
    },
    {
      label: 'Offers',
      icon: 'local-offer',
      onPress: () => props.navigation.navigate('Offers'),
    },
    {
      label: 'Support',
      icon: 'support-agent',
      onPress: () => props.navigation.navigate('Support'),
    },
    {
      label: 'Refer & Earn',
      icon: 'card-giftcard',
      onPress: () => props.navigation.navigate('ReferEarn'),
    },
    {
      label: 'Profile & Settings',
      icon: 'settings',
      onPress: () => props.navigation.navigate('Settings'),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    headerContent: {
      alignItems: 'center',
      zIndex: 1,
    },
    themeToggle: {
      position: 'absolute',
      top: 50,
      right: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.shadows.small,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      ...theme.shadows.medium,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 5,
    },
    userPhone: {
      fontSize: 14,
      color: '#FFFFFF',
      opacity: 0.9,
    },
    menuContainer: {
      flex: 1,
      paddingTop: 20,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuIcon: {
      marginRight: 20,
      width: 24,
    },
    menuText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      marginTop: 20,
      marginHorizontal: 20,
      backgroundColor: theme.colors.error + '20',
      borderRadius: 10,
      ...theme.shadows.small,
    },
    logoutText: {
      fontSize: 16,
      color: theme.colors.error,
      fontWeight: '600',
      marginLeft: 15,
    },
  });

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'U';
  };

  return (
    <View style={styles.container}>
      {/* Header with gradient background */}
      <LinearGradient
        colors={theme.colors.gradient}
        style={styles.header}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        
        {/* Theme toggle button */}
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <Icon
            name={isDark ? 'light-mode' : 'dark-mode'}
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>

        {/* User info */}
        <View style={styles.headerContent}>
          <View style={styles.avatar}>
            {user?.avatar ? (
              <Image source={{uri: user.avatar}} style={styles.avatar} />
            ) : (
              <Text style={styles.avatarText}>
                {getInitials(user?.name || 'User')}
              </Text>
            )}
          </View>
          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userPhone}>{user?.phone || '+91 9876543210'}</Text>
        </View>
      </LinearGradient>

      {/* Menu items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.menuContainer}
        showsVerticalScrollIndicator={false}>
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}>
            <Icon
              name={item.icon}
              size={24}
              color={theme.colors.text}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" size={24} color={theme.colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;