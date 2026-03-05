import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

const AuthInput = ({
  label,
  value,
  onChangeText,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconPress,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const labelAnim = useRef(new Animated.Value(value?.length > 0 ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(labelAnim, {
      toValue: 1,
      useNativeDriver: false,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value?.length) {
      Animated.spring(labelAnim, {
        toValue: 0,
        useNativeDriver: false,
        speed: 20,
        bounciness: 0,
      }).start();
    }
  };

  const labelTop = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [17, -9] });
  const labelSize = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [14, 11] });
  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#6b7280', isFocused ? '#C9A84C' : '#8899AA'],
  });

  return (
    <View style={styles.wrapper}>
      <Animated.Text
        style={[
          styles.label,
          { top: labelTop, fontSize: labelSize, color: labelColor },
          (isFocused || value?.length > 0) && styles.labelActive,
        ]}
      >
        {label}
      </Animated.Text>

      <View style={[styles.inputBox, isFocused && styles.inputBoxFocused]}>
        {Icon && (
          <Icon
            size={18}
            color={isFocused ? '#C9A84C' : '#4A5568'}
            style={styles.leftIcon}
            strokeWidth={1.8}
          />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          placeholderTextColor="transparent"
        />
        {RightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconBtn}>
            <RightIcon size={18} color="#4A5568" strokeWidth={1.8} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 48,
    zIndex: 1,
    backgroundColor: 'transparent',
    color: '#6b7280',
  },
  labelActive: {
    left: 14,
    backgroundColor: '#111827',
    paddingHorizontal: 5,
    zIndex: 2,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    height: 56,
  },
  inputBoxFocused: {
    borderColor: '#C9A84C',
    backgroundColor: 'rgba(201,168,76,0.05)',
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#F1F5F9',
    paddingVertical: 0,
  },
  rightIconBtn: {
    padding: 4,
  },
});

export default AuthInput;
