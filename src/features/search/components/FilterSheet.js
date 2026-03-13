import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import { X } from 'lucide-react-native';
import colors from '../../../theme/colors';

const BUDGET_OPTIONS = [
  { label: '< ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
  { label: '₹15,000 - ₹20,000', min: 15000, max: 20000 },
];

const HOTEL_STARS = [2, 3, 4, 5];
const THEMES = ['Culture', 'Adventure', 'Beach', 'Heritage', 'Wildlife'];
const PACKAGE_TYPES = ['Customization', 'Group Packages'];

const FilterSheet = ({ visible, filters, onFilterChange, onClose }) => {
  const toggleHotelStar = (star) => {
    const current = filters.hotelCategory;
    const updated = current.includes(star)
      ? current.filter(s => s !== star)
      : [...current, star];
    onFilterChange('hotelCategory', updated);
  };

  const toggleTheme = (theme) => {
    const current = filters.themes;
    const updated = current.includes(theme)
      ? current.filter(t => t !== theme)
      : [...current, theme];
    onFilterChange('themes', updated);
  };

  const selectBudget = (option) => {
    const isSame =
      filters.budgetRange?.min === option.min &&
      filters.budgetRange?.max === option.max;
    onFilterChange('budgetRange', isSame ? null : option);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Budget (Per Person)</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <X size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Budget */}
            {BUDGET_OPTIONS.map(option => {
              const isSelected =
                filters.budgetRange?.min === option.min &&
                filters.budgetRange?.max === option.max;
              return (
                <TouchableOpacity
                  key={option.label}
                  style={styles.checkRow}
                  onPress={() => selectBudget(option)}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <View style={styles.checkboxDot} />}
                  </View>
                  <Text style={styles.checkLabel}>{option.label}</Text>
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />

            {/* Hotel Category */}
            <Text style={styles.sectionTitle}>Hotel Category</Text>
            {HOTEL_STARS.map(star => {
              const isSelected = filters.hotelCategory.includes(star);
              return (
                <TouchableOpacity
                  key={star}
                  style={styles.checkRow}
                  onPress={() => toggleHotelStar(star)}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <View style={styles.checkboxDot} />}
                  </View>
                  <Text style={styles.checkLabel}>{'★'.repeat(star)}</Text>
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />

            {/* Cities */}
            <Text style={styles.sectionTitle}>Cities</Text>
            <TextInput
              style={styles.citySearch}
              placeholder="Search City"
              placeholderTextColor={colors.textMuted}
            />

            <View style={styles.divider} />

            {/* Themes */}
            <Text style={styles.sectionTitle}>Themes</Text>
            {THEMES.map(theme => {
              const isSelected = filters.themes.includes(theme);
              return (
                <TouchableOpacity
                  key={theme}
                  style={styles.checkRow}
                  onPress={() => toggleTheme(theme)}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <View style={styles.checkboxDot} />}
                  </View>
                  <Text style={styles.checkLabel}>{theme}</Text>
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />

            {/* Package Type */}
            <Text style={styles.sectionTitle}>Package Type</Text>
            <View style={styles.chipRow}>
              {PACKAGE_TYPES.map(type => {
                const isSelected = filters.packageType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() =>
                      onFilterChange('packageType', isSelected ? null : type)
                    }
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.divider} />

            {/* Premium Packages */}
            <Text style={styles.sectionTitle}>Premium Packages</Text>
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() =>
                onFilterChange('premiumPackages', !filters.premiumPackages)
              }
            >
              <View
                style={[
                  styles.checkbox,
                  filters.premiumPackages && styles.checkboxSelected,
                ]}
              >
                {filters.premiumPackages && <View style={styles.checkboxDot} />}
              </View>
              <Text style={styles.checkLabel}>Premium Packages</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Buy Now Pay Later */}
            <Text style={styles.sectionTitle}>Buy Now, Pay Later</Text>
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() =>
                onFilterChange('buyNowPayLater', !filters.buyNowPayLater)
              }
            >
              <View
                style={[
                  styles.checkbox,
                  filters.buyNowPayLater && styles.checkboxSelected,
                ]}
              >
                {filters.buyNowPayLater && <View style={styles.checkboxDot} />}
              </View>
              <Text style={styles.checkLabel}>Book @ ₹2,000</Text>
            </TouchableOpacity>

            <View style={{ height: 32 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  checkboxDot: {
    width: 9,
    height: 9,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  checkLabel: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  citySearch: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: colors.white,
  },
});

export default FilterSheet;
