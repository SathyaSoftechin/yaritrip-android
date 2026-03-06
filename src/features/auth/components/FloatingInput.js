import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const FloatingInput = ({
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  isFocused,
  keyboardType = 'default',
  secureTextEntry = false,
  IconComponent,
  rightElement,
}) => {
  const isActive = isFocused || value.length > 0;

  return (
    <View style={styles.inputWrapper}>
      <Text style={[styles.floatingLabel, isActive && styles.floatingLabelActive]}>
        {label}
      </Text>
      <View style={[styles.inputBox, isFocused && styles.inputBoxFocused]}>
        {IconComponent && (
          <IconComponent
            size={18}
            color={isFocused ? colors.primary : colors.textMuted}
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {rightElement}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  floatingLabel: {
    position: 'absolute',
    left: 48,
    top: 17,
    fontSize: 14,
    color: colors.textMuted,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  floatingLabelActive: {
    top: -9,
    left: 12,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    backgroundColor: colors.white,
    paddingHorizontal: 4,
    zIndex: 2,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 14,
    height: 54,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  inputBoxFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
});

export default FloatingInput;
