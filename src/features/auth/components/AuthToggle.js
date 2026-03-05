import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const AuthToggle = ({ activeMode, onToggle }) => {
  const slideAnim = useRef(new Animated.Value(activeMode === 'login' ? 1 : 0)).current;
  const slideAnimRef = useRef(slideAnim);

  useEffect(() => {
    Animated.spring(slideAnimRef.current, {
      toValue: activeMode === 'login' ? 1 : 0,
      useNativeDriver: true,
      speed: 16,
      bounciness: 6,
    }).start();
  }, [activeMode]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { transform: [{ translateX }] }]} />
      <TouchableOpacity style={styles.tab} onPress={() => onToggle('signup')} activeOpacity={0.8}>
        <Text style={[styles.tabText, activeMode === 'signup' && styles.tabTextActive]}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => onToggle('login')} activeOpacity={0.8}>
        <Text style={[styles.tabText, activeMode === 'login' && styles.tabTextActive]}>
          Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 30,
    padding: 4,
    marginBottom: 32,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  slider: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: '50%',
    bottom: 4,
    backgroundColor: '#C9A84C',
    borderRadius: 26,
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  tabTextActive: {
    color: '#0F172A',
  },
});

export default AuthToggle;