import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import { X } from 'lucide-react-native';
import colors from '../../../theme/colors';

// Budget ranges aligned to real package prices in the data
const BUDGET_OPTIONS = [
  { label: 'Under ₹20,000', min: 0, max: 20000 },
  { label: '₹20,000 – ₹30,000', min: 20000, max: 30000 },
  { label: '₹30,000 – ₹40,000', min: 30000, max: 40000 },
  { label: 'Above ₹40,000', min: 40000, max: Infinity },
];

const DURATION_OPTIONS = [
  { label: '1–3 Days', min: 1, max: 3 },
  { label: '4–7 Days', min: 4, max: 7 },
  { label: '8–14 Days', min: 8, max: 14 },
  { label: '15+ Days', min: 15, max: Infinity },
];

const CATEGORY_OPTIONS = ['DOMESTIC', 'INTERNATIONAL'];

// ─── Reusable row ─────────────────────────────────────────────────────────────
const CheckRow = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.checkRow} onPress={onPress}>
    <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
      {selected && <View style={styles.checkboxDot} />}
    </View>
    <Text style={styles.checkLabel}>{label}</Text>
  </TouchableOpacity>
);

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const Divider = () => <View style={styles.divider} />;

// ─── Main component ───────────────────────────────────────────────────────────
const FilterSheet = ({ visible, filters, onFilterChange, onClose }) => {

  // Budget
  const selectBudget = (option) => {
    const isSame =
      filters.budgetRange?.min === option.min &&
      filters.budgetRange?.max === option.max;
    onFilterChange('budgetRange', isSame ? null : option);
  };

  // Duration
  const selectDuration = (option) => {
    const isSame =
      filters.durationRange?.min === option.min &&
      filters.durationRange?.max === option.max;
    onFilterChange('durationRange', isSame ? null : option);
  };

  // Category chips
  const selectCategory = (cat) => {
    onFilterChange('category', filters.category === cat ? null : cat);
  };

  // Active filter count badge
  const activeCount = [
    filters.budgetRange,
    filters.durationRange,
    filters.category,
  ].filter(Boolean).length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>

          {/* ── Header ── */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Filters</Text>
              {activeCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{activeCount}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* ── Budget ── */}
            <SectionTitle title="Budget (Per Person)" />
            {BUDGET_OPTIONS.map(option => {
              const isSelected =
                filters.budgetRange?.min === option.min &&
                filters.budgetRange?.max === option.max;
              return (
                <CheckRow
                  key={option.label}
                  label={option.label}
                  selected={isSelected}
                  onPress={() => selectBudget(option)}
                />
              );
            })}

            <Divider />

            {/* ── Duration ── */}
            <SectionTitle title="Trip Duration" />
            {DURATION_OPTIONS.map(option => {
              const isSelected =
                filters.durationRange?.min === option.min &&
                filters.durationRange?.max === option.max;
              return (
                <CheckRow
                  key={option.label}
                  label={option.label}
                  selected={isSelected}
                  onPress={() => selectDuration(option)}
                />
              );
            })}

            <Divider />

            {/* ── Category ── */}
            <SectionTitle title="Package Category" />
            <View style={styles.chipRow}>
              {CATEGORY_OPTIONS.map(cat => {
                const isSelected = filters.category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => selectCategory(cat)}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Divider />

            {/* ── Clear all ── */}
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => {
                onFilterChange('budgetRange', null);
                onFilterChange('durationRange', null);
                onFilterChange('category', null);
              }}
            >
              <Text style={styles.clearBtnText}>Clear All Filters</Text>
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
    maxHeight: '80%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 18,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
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
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  checkLabel: {
    fontSize: 14,
    color: colors.textPrimary,
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
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.white,
  },
  clearBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});

export default FilterSheet;