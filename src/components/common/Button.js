import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const {theme} = useTheme();

  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.gradient;
      case 'secondary':
        return [theme.colors.card, theme.colors.card];
      case 'outline':
        return ['transparent', 'transparent'];
      case 'danger':
        return [theme.colors.error, theme.colors.error];
      default:
        return theme.colors.gradient;
    }
  };

  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 50;
      case 'large':
        return 60;
      default:
        return 50;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const styles = StyleSheet.create({
    button: {
      height: getButtonHeight(),
      borderRadius: getButtonHeight() / 2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.6 : 1,
      ...theme.shadows.medium,
      ...(variant === 'outline' && {
        borderWidth: 2,
        borderColor: theme.colors.primary,
      }),
    },
    text: {
      fontSize: getTextSize(),
      fontWeight: '600',
      color: variant === 'outline' || variant === 'secondary' 
        ? theme.colors.primary 
        : '#FFFFFF',
      marginLeft: icon ? 8 : 0,
    },
    loading: {
      marginRight: 8,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}>
      <LinearGradient
        colors={getButtonColors()}
        style={[styles.button]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' ? theme.colors.primary : '#FFFFFF'}
            style={styles.loading}
          />
        )}
        {icon && !loading && icon}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;