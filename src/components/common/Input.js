import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  leftIcon,
  rightIcon,
  error,
  style,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  onFocus,
  onBlur,
}) => {
  const {theme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
  };

  const styles = StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: error
        ? theme.colors.error
        : isFocused
        ? theme.colors.primary
        : theme.colors.border,
      paddingHorizontal: 15,
      minHeight: 50,
      ...theme.shadows.small,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      paddingVertical: 12,
      textAlignVertical: multiline ? 'top' : 'center',
    },
    leftIcon: {
      marginRight: 12,
    },
    rightIcon: {
      marginLeft: 12,
    },
    passwordToggle: {
      marginLeft: 12,
      padding: 4,
    },
    errorText: {
      fontSize: 12,
      color: theme.colors.error,
      marginTop: 4,
      marginLeft: 4,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={theme.colors.textSecondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}>
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={20}
            color={theme.colors.textSecondary}
            style={styles.rightIcon}
          />
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;