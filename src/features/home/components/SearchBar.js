// src/features/home/components/SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ArrowLeftRight, CalendarDays, Users, Search } from 'lucide-react-native';
import colors from '../../../theme/colors';

const SearchBar = ({ form, onChange, onSearch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="From City"
          placeholderTextColor={colors.textMuted}
          value={form.fromCity}
          onChangeText={val => onChange('fromCity', val)}
        />
        <TouchableOpacity style={styles.swapIcon}>
          <ArrowLeftRight size={16} color={colors.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="To Destination"
          placeholderTextColor={colors.textMuted}
          value={form.toDestination}
          onChangeText={val => onChange('toDestination', val)}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.halfInput}
            placeholder="When"
            placeholderTextColor={colors.textMuted}
            value={form.when}
            onChangeText={val => onChange('when', val)}
          />
          <CalendarDays size={16} color={colors.textMuted} />
        </View>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.halfInput}
            placeholder="Members"
            placeholderTextColor={colors.textMuted}
            value={form.members}
            onChangeText={val => onChange('members', val)}
          />
          <Users size={16} color={colors.textMuted} />
        </View>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <Search size={18} color={colors.white} />
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: -32,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },
  swapIcon: {
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWithIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  halfInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchBar;