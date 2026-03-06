import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const TabToggle = ({ activeTab, onTabChange, leftLabel = 'Sign Up', rightLabel = 'Log In' }) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
        onPress={() => onTabChange('signup')}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>
          {leftLabel}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'login' && styles.activeTab]}
        onPress={() => onTabChange('login')}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
          {rightLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 30,
    padding: 5,
    marginHorizontal: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: colors.white,
    fontWeight: '700',
  },
});

export default TabToggle;
