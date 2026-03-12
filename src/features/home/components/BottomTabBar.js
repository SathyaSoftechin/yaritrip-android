import React, { useRef, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Home, Briefcase, CircleUserRound } from 'lucide-react-native';
import colors from '../../../theme/colors';

const TABS = [
  { key: 'home', Icon: Home, screen: 'Home' },
  { key: 'trips', Icon: Briefcase, screen: 'Home' },
  { key: 'profile', Icon: CircleUserRound, screen: 'ProfileTab' },
];

const TabItem = ({ tabKey, Icon, isActive, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.82,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
    ]).start();
    onPress(tabKey);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={styles.tabItem}
      accessibilityRole="button"
      accessibilityLabel={tabKey}
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View
        style={[
          styles.iconWrapper,
          isActive && styles.activeCircle,
          { transform: [{ scale }] },
        ]}
      >
        <Icon
          size={22}
          color={isActive ? colors.white : 'rgba(255,255,255,0.35)'}
          strokeWidth={isActive ? 2.5 : 1.8}
        />
      </Animated.View>
      {isActive && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
};

const BottomTabBar = ({ activeTab, navigation }) => {
  const handleTabPress = useCallback((tabKey) => {
    const tab = TABS.find(t => t.key === tabKey);
    if (!tab) return;

    // Don't navigate if already on this tab
    if (tabKey === activeTab) return;

    navigation.navigate(tab.screen);
  }, [activeTab, navigation]);

  return (
    <View style={styles.container}>
      {TABS.map(({ key, Icon }) => (
        <TabItem
          key={key}
          tabKey={key}
          Icon={Icon}
          isActive={key === activeTab}
          onPress={handleTabPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    width: 300,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 38, 0.95)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 20,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 10,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});

export default BottomTabBar;