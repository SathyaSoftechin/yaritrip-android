// src/features/chatbot/components/TypingIndicator.js
// Animated three-dot typing indicator shown while Maya is thinking.

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const DOT_COUNT = 3;
const ANIMATION_DELAY = 200; // ms between each dot

const TypingIndicator = () => {
  const dots = useRef(
    Array.from({ length: DOT_COUNT }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * ANIMATION_DELAY),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay((DOT_COUNT - i) * ANIMATION_DELAY),
        ])
      )
    );

    Animated.parallel(animations).start();
    return () => animations.forEach((a) => a.stop());
  }, []);

  return (
    <View style={styles.row}>
      <View style={styles.bubble}>
        {dots.map((dot, i) => {
          const translateY = dot.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -5],
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { transform: [{ translateY }] }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingLeft: 58, // align with bot bubbles (avatar width + gap)
    marginBottom: 16,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.textMuted,
  },
});

export default TypingIndicator;
