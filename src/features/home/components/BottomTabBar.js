import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../theme/colors';

const TABS = [
  { key: 'home', icon: 'home' },
  { key: 'trips', icon: 'briefcase-outline' },
  { key: 'profile', icon: 'account-circle-outline' },
];

const BottomTabBar = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            onPress={() => onTabPress(tab.key)}
            style={[
              styles.iconWrapper,
              isActive ? styles.activeCircle : styles.inactiveCircle,
            ]}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={26}
              color={isActive ? '#fff' : '#6e6e6e'}
            />
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
    left: 30,
    right: 30,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.dark || '#1a1a2e',
    borderRadius: 40,
    // iOS shadow
    shadowColor: '#1e6bff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    // Android shadow
    elevation: 20,
  },

  iconWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeCircle: {
    backgroundColor: colors.primary || '#1e6bff',
  },

  inactiveCircle: {
    backgroundColor: colors.inactive || '#e5e5e5',
  },
});

export default BottomTabBar;