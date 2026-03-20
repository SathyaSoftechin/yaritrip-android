import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import {
  ArrowLeftRight,
  CalendarDays,
  Users,
  Search,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from 'lucide-react-native';
import colors from '../../../theme/colors';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDisplay(dateStr) {
  if (!dateStr) return null;
  const d = parseLocal(dateStr);
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Parses "YYYY-MM-DD" in LOCAL time — avoids UTC midnight shifting the date back
function parseLocal(isoStr) {
  const [y, m, d] = isoStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// ─── Quick-select options ─────────────────────────────────────────────────────

function buildQuickOptions() {
  const today = getToday();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayOfWeek = today.getDay();
  const daysUntilSat = dayOfWeek <= 6 ? 6 - dayOfWeek : 0;
  const thisWeekend = new Date(today);
  thisWeekend.setDate(today.getDate() + (daysUntilSat === 0 ? 0 : daysUntilSat));

  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + ((8 - dayOfWeek) % 7 || 7));

  return [
    { label: 'Today', date: today },
    { label: 'Tomorrow', date: tomorrow },
    { label: 'Weekend', date: thisWeekend },
    { label: 'Next week', date: nextMonday },
  ];
}

// ─── CustomCalendar ───────────────────────────────────────────────────────────

const CustomCalendar = ({ visible, currentValue, onConfirm, onDismiss }) => {
  const today = useMemo(getToday, []);
  const initialDate = currentValue ? parseLocal(currentValue) : today;

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [picked, setPicked] = useState(currentValue || null); // ISO string or null

  const quickOptions = useMemo(buildQuickOptions, []);

  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const prevMonth = useCallback(() => {
    if (isCurrentMonth) return;
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }, [viewMonth, isCurrentMonth]);

  const nextMonth = useCallback(() => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }, [viewMonth]);

  // Build calendar grid cells
  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const result = [];
    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(d);
    return result;
  }, [viewYear, viewMonth]);

  const isPast = useCallback((day) => {
    if (!day) return true;
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }, [viewYear, viewMonth, today]);

  const isSelected = (day) => {
    if (!day || !picked) return false;
    return isSameDay(new Date(viewYear, viewMonth, day), parseLocal(picked));
  };

  const isTodayCell = useCallback((day) => {
    if (!day) return false;
    return isSameDay(new Date(viewYear, viewMonth, day), today);
  }, [viewYear, viewMonth, today]);

  const handleDayPress = (day) => {
    if (!day || isPast(day)) return;
    const d = new Date(viewYear, viewMonth, day);
    setPicked(toISO(d));
  };

  const handleQuickSelect = (date) => {
    setPicked(toISO(date));
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  };

  const handleConfirm = () => {
    if (picked) onConfirm(picked);
  };

  const handleClear = () => {
    setPicked(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <Pressable style={cal.backdrop} onPress={onDismiss}>
        <Pressable style={cal.card} onPress={e => e.stopPropagation()}>

          {/* ── Title bar ── */}
          <View style={cal.titleBar}>
            <Text style={cal.titleText}>Select date</Text>
            <Pressable onPress={onDismiss} style={cal.closeBtn} hitSlop={8}>
              <X size={16} color={colors.textMuted} />
            </Pressable>
          </View>

          {/* ── Quick select pills ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={cal.quickRow}
          >
            {quickOptions.map((opt) => {
              const active = picked && isSameDay(parseLocal(picked), opt.date);
              return (
                <Pressable
                  key={opt.label}
                  onPress={() => handleQuickSelect(opt.date)}
                  style={[cal.quickPill, active && cal.quickPillActive]}
                >
                  <Text style={[cal.quickText, active && cal.quickTextActive]}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* ── Month nav ── */}
          <View style={cal.monthNav}>
            <Pressable
              onPress={prevMonth}
              disabled={isCurrentMonth}
              style={[cal.navBtn, isCurrentMonth && cal.navBtnDisabled]}
              hitSlop={8}
            >
              <ChevronLeft size={16} color={isCurrentMonth ? colors.border : colors.primary} />
            </Pressable>

            <Text style={cal.monthLabel}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </Text>

            <Pressable onPress={nextMonth} style={cal.navBtn} hitSlop={8}>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>

          {/* ── Weekday headers ── */}
          <View style={cal.weekRow}>
            {DAY_LABELS.map(d => (
              <Text key={d} style={cal.weekLabel}>{d}</Text>
            ))}
          </View>

          {/* ── Date grid ── */}
          <View style={cal.grid}>
            {cells.map((day, i) => {
              const past = isPast(day);
              const sel = isSelected(day);
              const tod = isTodayCell(day);
              return (
                <Pressable
                  key={i}
                  onPress={() => handleDayPress(day)}
                  disabled={!day || past}
                  style={({ pressed }) => [
                    cal.cell,
                    sel && cal.cellSelected,
                    tod && !sel && cal.cellToday,
                    (!day || past) && cal.cellDisabled,
                    pressed && day && !past && !sel && cal.cellPressed,
                  ]}
                >
                  {tod && !sel && <View style={cal.todayDot} />}
                  <Text
                    style={[
                      cal.cellText,
                      sel && cal.cellTextSelected,
                      tod && !sel && cal.cellTextToday,
                      (!day || past) && cal.cellTextDisabled,
                    ]}
                  >
                    {day || ''}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* ── Selected summary ── */}
          <View style={cal.summaryRow}>
            {picked ? (
              <>
                <CalendarDays size={13} color={colors.primary} />
                <Text style={cal.summaryText} numberOfLines={1}>
                  {formatDisplay(picked)}
                </Text>
                <Pressable onPress={handleClear} hitSlop={8}>
                  <Text style={cal.clearText}>Clear</Text>
                </Pressable>
              </>
            ) : (
              <Text style={cal.summaryPlaceholder}>No date selected</Text>
            )}
          </View>

          {/* ── Actions ── */}
          <View style={cal.actions}>
            <Pressable onPress={onDismiss} style={cal.cancelBtn}>
              <Text style={cal.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleConfirm}
              style={[cal.confirmBtn, !picked && cal.confirmBtnDisabled]}
              disabled={!picked}
            >
              <Check size={14} color="#fff" />
              <Text style={cal.confirmText}>Confirm</Text>
            </Pressable>
          </View>

        </Pressable>
      </Pressable>
    </Modal>
  );
};

const CELL_SIZE = 38;

const cal = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 16,
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
  },

  // Title bar
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 14,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Quick pills
  quickRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
  },
  quickPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
  },
  quickPillActive: {
    backgroundColor: colors.primaryLight || '#EBF3FF',
    borderColor: colors.primary,
  },
  quickText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  quickTextActive: {
    color: colors.primary,
  },

  // Month nav
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnDisabled: {
    opacity: 0.35,
  },
  monthLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  // Weekday row
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: '#aaa',
    letterSpacing: 0.5,
    paddingVertical: 4,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  cell: {
    width: `${100 / 7}%`,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CELL_SIZE / 2,
    position: 'relative',
  },
  cellPressed: {
    backgroundColor: '#f0f0f0',
  },
  cellSelected: {
    backgroundColor: colors.primary,
  },
  cellToday: {
    // highlighted via dot + text color, no fill
  },
  cellDisabled: {
    opacity: 0.25,
  },
  todayDot: {
    position: 'absolute',
    bottom: 5,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  cellText: {
    fontSize: 13,
    color: '#1a1a1a',
  },
  cellTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  cellTextToday: {
    color: colors.primary,
    fontWeight: '700',
  },
  cellTextDisabled: {
    color: '#ccc',
  },

  // Summary row
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 14,
    minHeight: 38,
  },
  summaryText: {
    flex: 1,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  summaryPlaceholder: {
    flex: 1,
    fontSize: 12,
    color: '#aaa',
  },
  clearText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },

  // Actions
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  confirmBtn: {
    flex: 2,
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnDisabled: {
    opacity: 0.35,
  },
  confirmText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
});

// ─── Member options ───────────────────────────────────────────────────────────

const MEMBER_OPTIONS = [
  { label: '1 Room · 2 Members', rooms: 1, guests: 2 },
  { label: '2 Rooms · 4 Members', rooms: 2, guests: 4 },
  { label: '3 Rooms · 6 Members', rooms: 3, guests: 6 },
];

// ─── SearchBar ────────────────────────────────────────────────────────────────

const SearchBar = ({
  form,
  onChange,
  onSearch,
  onFromCityPress,
  onToCityPress,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMemberSelector, setShowMemberSelector] = useState(false);

  return (
    <View style={styles.container}>

      {/* From / To row */}
      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [styles.citySelector, pressed && styles.citySelectorPressed]}
          onPress={onFromCityPress}
        >
          <MapPin size={14} color={colors.primary} />
          <Text style={[styles.citySelectorText, !form.fromCity && styles.placeholder]} numberOfLines={1}>
            {form.fromCity || 'From City'}
          </Text>
          <ChevronDown size={14} color={colors.textMuted} />
        </Pressable>

        <Pressable style={styles.swapIcon} onPress={() => onChange('_swap')}>
          <ArrowLeftRight size={16} color={colors.primary} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.citySelector, pressed && styles.citySelectorPressed]}
          onPress={onToCityPress}
        >
          <MapPin size={14} color={colors.badge} />
          <Text style={[styles.citySelectorText, !form.toDestination && styles.placeholder]} numberOfLines={1}>
            {form.toDestination || 'To Destination'}
          </Text>
          <ChevronDown size={14} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* When / Members row */}
      <View style={[styles.row, styles.rowElevated]}>

        {/* Date trigger */}
        <Pressable
          style={[styles.inputWithIcon, !!form.when && styles.inputFilled]}
          onPress={() => setShowDatePicker(true)}
        >
          <CalendarDays size={15} color={form.when ? colors.primary : colors.textMuted} />
          <Text style={[styles.halfInput, !form.when && styles.placeholder]} numberOfLines={1}>
            {form.when
              ? parseLocal(form.when).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
              : 'When'}
          </Text>
        </Pressable>

        {/* Members trigger */}
        <View style={styles.memberWrapper}>
          <Pressable
            style={[
              styles.inputWithIcon,
              showMemberSelector && styles.inputWithIconActive,
              !!form.members && styles.inputFilled,
            ]}
            onPress={() => setShowMemberSelector(prev => !prev)}
          >
            <Users size={15} color={form.members ? colors.primary : colors.textMuted} />
            <Text style={[styles.halfInput, !form.members && styles.placeholder]} numberOfLines={1}>
              {form.members || 'Members'}
            </Text>
            <ChevronDown
              size={14}
              color={showMemberSelector ? colors.primary : colors.textMuted}
              style={{ transform: [{ rotate: showMemberSelector ? '180deg' : '0deg' }] }}
            />
          </Pressable>

          {showMemberSelector && (
            <View style={styles.memberDropdown}>
              {MEMBER_OPTIONS.map((option, index) => {
                const isActive = form.members === option.label;
                return (
                  <Pressable
                    key={index}
                    style={({ pressed }) => [
                      styles.memberOption,
                      index < MEMBER_OPTIONS.length - 1 && styles.memberOptionBorder,
                      pressed && styles.memberOptionPressed,
                      isActive && styles.memberOptionActive,
                    ]}
                    onPress={() => {
                      onChange('rooms', option.rooms);
                      onChange('guests', option.guests);
                      onChange('members', option.label);
                      setShowMemberSelector(false);
                    }}
                  >
                    <Users size={13} color={isActive ? colors.primary : colors.textMuted} />
                    <Text style={[styles.memberOptionText, isActive && styles.memberOptionTextActive]}>
                      {option.label}
                    </Text>
                    {isActive && <Check size={13} color={colors.primary} />}
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </View>

      {/* Search Button */}
      <Pressable
        style={({ pressed }) => [styles.searchButton, pressed && styles.searchButtonPressed]}
        onPress={onSearch}
      >
        <Search size={17} color="#fff" />
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>

      {/* Custom Calendar */}
      <CustomCalendar
        visible={showDatePicker}
        currentValue={form.when}
        onConfirm={(date) => {
          onChange('when', date);
          setShowDatePicker(false);
        }}
        onDismiss={() => setShowDatePicker(false)}
      />

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
    overflow: 'visible',
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  rowElevated: { zIndex: 10 },

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
  citySelectorPressed: { backgroundColor: colors.primaryLight },
  citySelectorText: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
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
    paddingHorizontal: 10,
    gap: 6,
  },
  inputWithIconActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  inputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  halfInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.textMuted,
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
  searchButtonPressed: { opacity: 0.88 },
  searchButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Members dropdown
  memberWrapper: {
    flex: 1,
    zIndex: 20,
  },
  memberDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    zIndex: 20,
  },
  memberOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 8,
  },
  memberOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  memberOptionPressed: { backgroundColor: colors.primaryLight },
  memberOptionActive: { backgroundColor: colors.primaryLight },
  memberOptionText: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  memberOptionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SearchBar;