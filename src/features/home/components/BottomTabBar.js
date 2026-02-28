import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const TABS = [
  { key: 'home', icon: '🏠', label: 'Home' },
  { key: 'trips', icon: '🧳', label: 'Trips' },
  { key: 'profile', icon: '👤', label: 'Profile' },
];

const BottomTabBar = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(tab.key)}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            {!isActive && <Text style={styles.label}>{tab.label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    backgroundColor: colors.dark,
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 24,
    flexDirection: 'row',
    gap: 6,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    color: colors.white,
    fontSize: 12,
  },
});

export default BottomTabBar;
