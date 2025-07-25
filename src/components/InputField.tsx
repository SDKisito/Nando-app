import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import { theme } from '@config/theme';

export default function InputField({ value, onChangeText, placeholder, keyboardType, maxLength, style }) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={theme.colors.gray}
      maxLength={maxLength}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    ...(Platform.OS === 'web' && { outline: 'none' }),
  },
});
