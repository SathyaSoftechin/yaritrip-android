import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Gift, Plane, Car, BedDouble } from 'lucide-react-native';
import colors from '../../../theme/colors';

const TAB_ICONS = {
  Packages: Gift,
  Flights: Plane,
  Cars: Car,
  Hotels: BedDouble,
};

const CategoryTabs = ({ tabs, activeTab, onTabPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {tabs.map(tab => {
        const isActive = tab === activeTab;
        const IconComponent = TAB_ICONS[tab];
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(tab)}
          >
            {IconComponent && (
              <IconComponent
                size={16}
                color={isActive ? colors.primary : colors.textSecondary}
              />
            )}
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    gap: 6,
  },
  activeTab: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default CategoryTabs;