import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  Clock,
  MapPin,
  Car,
  Zap,
  CheckCircle2,
  X,
  Users,
} from 'lucide-react-native';
import colors from '../../../theme/colors';
import useAddActivity from '../hooks/useAddActivity';

const SW = 2.5; // strokeWidth — matches SearchResultsScreen icon boldness

// ─── About Activity Modal ─────────────────────────────────────────────────────
// Tapping any activity card (whole card) opens this modal

const AboutActivityModal = ({ visible, activity, onClose, onSelect }) => {
  const { width } = useWindowDimensions();
  if (!activity) return null;
  const isTransport = activity.type === 'Transport';

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={modal.container}>
        {/* Header — just back arrow + title, matches design */}
        <View style={modal.header}>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <ArrowLeft size={22} color={colors.textPrimary} strokeWidth={SW} />
          </TouchableOpacity>
          <Text style={modal.title} numberOfLines={2}>{activity.title}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image grid — 1 large left, 2 stacked right (matches design) */}
          <View style={modal.imageGrid}>
            <View style={[modal.imageTile, { flex: 1.3 }]}>
              {isTransport
                ? <Car size={48} color="#94A3B8" strokeWidth={1.5} />
                : <Zap size={48} color="#94A3B8" strokeWidth={1.5} />}
            </View>
            <View style={modal.imageStack}>
              <View style={modal.imageTile}>
                <MapPin size={30} color="#94A3B8" strokeWidth={1.5} />
              </View>
              <View style={modal.imageTile}>
                <Users size={30} color="#94A3B8" strokeWidth={1.5} />
              </View>
            </View>
          </View>

          {/* About ACTIVITY card */}
          <View style={modal.sectionCard}>
            <Text style={modal.sectionTitle}>About ACTIVITY</Text>
            <Text style={modal.suitable}>Suitable for {activity.suitable}</Text>
            <Text style={modal.dayLabel}>Day 2 • Feb 2, 2026</Text>
            <Text style={modal.desc}>{activity.description}</Text>
          </View>

          {/* About Options card */}
          <View style={modal.sectionCard}>
            <Text style={modal.sectionTitle}>About Options</Text>
            <Text style={modal.optionMeta}>6 Adults • Day 2 • Feb 2, 2026</Text>
            <Text style={modal.optionName}>{activity.title}</Text>
            <Text style={modal.optionDetail}>Duration {activity.duration} | {activity.timing}</Text>
            <Text style={modal.optionDetail}>
              {activity.pickupIncluded ? 'Pick up and Drop is included' : 'No pickup included'}
            </Text>
            <View style={modal.priceRow}>
              <View>
                <Text style={modal.price}>+ ₹{activity.price?.toLocaleString('en-IN')}</Text>
                <Text style={modal.perPerson}>Price/Person</Text>
              </View>
              <TouchableOpacity
                style={modal.selectBtn}
                onPress={() => { onSelect(activity); onClose(); }}
                activeOpacity={0.85}
              >
                <Text style={modal.selectBtnText}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Inclusions & Exclusions card */}
          <View style={modal.sectionCard}>
            <Text style={modal.sectionTitle}>Inclusions & Exclusions</Text>
            {activity.inclusions?.map((inc, i) => (
              <View key={`inc-${i}`} style={modal.bulletRow}>
                <CheckCircle2 size={15} color="#22C55E" strokeWidth={SW} />
                <Text style={modal.bulletText}> {inc}</Text>
              </View>
            ))}
            {activity.exclusions?.map((exc, i) => (
              <View key={`exc-${i}`} style={modal.bulletRow}>
                <X size={15} color={colors.error} strokeWidth={SW} />
                <Text style={modal.bulletText}> {exc}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 48 }} />
        </ScrollView>
      </View>
    </Modal>
  );
};

// ─── Activity Card ─────────────────────────────────────────────────────────
// ENTIRE CARD is tappable → opens detail modal (matches design intent)
// Select button sits INSIDE but uses stopPropagation via its own onPress

const ActivityCard = ({ item, onViewDetails, onSelect }) => {
  const isTransport = item.type === 'Transport';
  return (
    // Whole card tappable → view details
    <TouchableOpacity
      style={card.container}
      onPress={() => onViewDetails(item)}
      activeOpacity={0.85}
    >
      {/* Left image block */}
      <View style={card.imageBox}>
        {isTransport
          ? <Car size={36} color="#64748B" strokeWidth={1.5} />
          : <Zap size={36} color="#64748B" strokeWidth={1.5} />}
      </View>

      {/* Right content */}
      <View style={card.info}>
        <Text style={card.title} numberOfLines={2}>{item.title}</Text>
        <Text style={card.desc} numberOfLines={4}>{item.description}</Text>
        <Text style={card.meta}>Duration {item.duration} • {item.timing}</Text>

        <View style={card.bottom}>
          <View>
            <Text style={card.price}>+ ₹{item.price?.toLocaleString('en-IN')}</Text>
            <Text style={card.perPerson}>Price/Person</Text>
          </View>
          {/* Select stops event from bubbling up to the card's onPress */}
          <TouchableOpacity
            style={card.selectBtn}
            onPress={(e) => { e.stopPropagation?.(); onSelect(item); }}
            activeOpacity={0.85}
          >
            <Text style={card.selectBtnText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

const AddActivityScreen = ({ navigation, route }) => {
  const {
    packageId,
    dayNumber,
    defaultTab = 'Activity',
    date = 'Feb 01',
    adults = 6,
  } = route.params || {};

  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    displayItems,
    isLoading,
    handleSelectActivity,
  } = useAddActivity(packageId, dayNumber);

  useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalActivity, setModalActivity] = useState(null);

  const handleConfirmSelect = (activity) => {
    handleSelectActivity(activity.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={22} color={colors.textPrimary} strokeWidth={SW} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Activity, Meal or Transfer</Text>
        <Text style={styles.headerSub}>{date}, {adults} Adults</Text>
      </View>

      {/* Category + Search */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Category</Text>
          <ChevronDown size={14} color={colors.textSecondary} strokeWidth={SW} />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Search size={14} color={colors.textMuted} strokeWidth={SW} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tab row — orange filled active tab (matches design) */}
      <View style={styles.tabRow}>
        {['Activity', 'Transport'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={colors.primary} />
      ) : (
        <FlatList
          data={displayItems}
          keyExtractor={(item, index) =>
            item.id != null ? String(item.id) : `item-${index}`
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ActivityCard
              item={item}
              onViewDetails={(act) => setModalActivity(act)}
              onSelect={handleConfirmSelect}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()}s available.</Text>
          }
        />
      )}

      <AboutActivityModal
        visible={!!modalActivity}
        activity={modalActivity}
        onClose={() => setModalActivity(null)}
        onSelect={handleConfirmSelect}
      />
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 4,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, marginTop: 8 },
  headerSub: { fontSize: 13, color: colors.textSecondary },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  categoryText: { fontSize: 13, color: colors.textSecondary },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 6,
    backgroundColor: colors.background,
  },
  searchInput: { flex: 1, fontSize: 13, color: colors.textPrimary, padding: 0 },
  tabRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingHorizontal: 28,
    paddingVertical: 9,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  tabActive: { backgroundColor: colors.badge, borderColor: colors.badge },
  tabText: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  tabTextActive: { color: colors.white },
  list: { padding: 16 },
  emptyText: { textAlign: 'center', color: colors.textMuted, marginTop: 48, fontSize: 14 },
});

const card = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageBox: {
    width: 110,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  info: { flex: 1, padding: 12 },
  title: { fontWeight: '700', fontSize: 13, color: colors.textPrimary, marginBottom: 4, lineHeight: 18 },
  desc: { fontSize: 11, color: colors.textSecondary, lineHeight: 16, marginBottom: 6 },
  meta: { fontSize: 11, color: colors.textMuted, marginBottom: 10 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  price: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  perPerson: { fontSize: 10, color: colors.textMuted },
  selectBtn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  selectBtnText: { color: colors.white, fontWeight: '700', fontSize: 13 },
});

const modal = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 22,
    paddingTop: 2,
  },
  imageGrid: {
    flexDirection: 'row',
    height: 200,
    margin: 16,
    gap: 8,
  },
  imageStack: { flex: 1, gap: 8 },
  imageTile: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Section cards — white bg, rounded, margin between (matches design)
  sectionCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  suitable: { fontSize: 12, color: colors.textSecondary },
  dayLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 2, marginBottom: 8 },
  desc: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  optionMeta: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  optionName: { fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  optionDetail: { fontSize: 12, color: colors.textSecondary, marginBottom: 2 },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  price: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  perPerson: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  selectBtn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingVertical: 11,
  },
  selectBtnText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 8 },
  bulletText: { fontSize: 12, color: colors.textSecondary, flex: 1, lineHeight: 18 },
});

export default AddActivityScreen;