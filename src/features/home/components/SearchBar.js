import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  ArrowLeftRight,
  CalendarDays,
  Users,
  Search,
  MapPin,
  ChevronDown,
} from 'lucide-react-native';
import colors from '../../../theme/colors';

const SearchBar = ({ form, onChange, onSearch, onFromCityPress, onToCityPress }) => {
  return (
    <View style={styles.container}>
      {/* From / To row */}
      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.citySelector,
            pressed && styles.citySelectorPressed,
          ]}
          onPress={onFromCityPress}
        >
          <MapPin size={14} color={colors.primary} />
          <Text
            style={[
              styles.citySelectorText,
              !form.fromCity && styles.citySelectorPlaceholder,
            ]}
            numberOfLines={1}
          >
            {form.fromCity || 'From City'}
          </Text>
          <ChevronDown size={14} color={colors.textMuted} />
        </Pressable>

        <Pressable
          style={styles.swapIcon}
          onPress={() => onChange('_swap')}
        >
          <ArrowLeftRight size={16} color={colors.primary} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.citySelector,
            pressed && styles.citySelectorPressed,
          ]}
          onPress={onToCityPress}
        >
          <MapPin size={14} color={colors.badge} />
          <Text
            style={[
              styles.citySelectorText,
              !form.toDestination && styles.citySelectorPlaceholder,
            ]}
            numberOfLines={1}
          >
            {form.toDestination || 'To Destination'}
          </Text>
          <ChevronDown size={14} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* When / Members row */}
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
            keyboardType="numeric"
          />
          <Users size={16} color={colors.textMuted} />
        </View>
      </View>

      {/* Search Button */}
      <Pressable
        style={({ pressed }) => [
          styles.searchButton,
          pressed && { opacity: 0.85 },
        ]}
        onPress={onSearch}
      >
        <Search size={18} color={colors.white} />
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
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
  citySelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 11,
    gap: 6,
  },
  citySelectorPressed: {
    backgroundColor: colors.primaryLight,
  },
  citySelectorText: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  citySelectorPlaceholder: {
    color: colors.textMuted,
    fontWeight: '400',
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