import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

const Card = ({
  children,
  style,
  onPress,
  elevation = 'medium',
  padding = 20,
  margin = 10,
  borderRadius = 15,
}) => {
  const {theme} = useTheme();

  const getShadow = () => {
    switch (elevation) {
      case 'small':
        return theme.shadows.small;
      case 'medium':
        return theme.shadows.medium;
      case 'large':
        return theme.shadows.large;
      default:
        return theme.shadows.medium;
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius,
      padding,
      margin,
      ...getShadow(),
    },
  });

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={[styles.card, style]}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;