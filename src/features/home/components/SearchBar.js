import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
        <View style={styles.swapIcon}>
          <Text style={styles.swapText}>⇄</Text>
        </View>
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
          <Text style={styles.fieldIcon}>📅</Text>
        </View>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.halfInput}
            placeholder="Members"
            placeholderTextColor={colors.textMuted}
            value={form.members}
            onChangeText={val => onChange('members', val)}
          />
          <Text style={styles.fieldIcon}>👤</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
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
  swapText: {
    fontSize: 16,
    color: colors.primary,
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
  fieldIcon: {
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchBar;
