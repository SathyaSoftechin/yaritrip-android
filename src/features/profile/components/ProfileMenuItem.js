import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import colors from '../../../theme/colors';

const ProfileMenuItem = ({ icon, label, onPress, iconBg = colors.primaryLight, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[styles.item, isActive && styles.itemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        {icon}
      </View>
      <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
      <ChevronRight size={18} color={isActive ? colors.primary : colors.textMuted} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    borderRadius: 14,
    marginBottom: 10,
    gap: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  itemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default ProfileMenuItem;
