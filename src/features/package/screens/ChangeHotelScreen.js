import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  Star,
  MapPin,
  BedDouble,
  Coffee,
  CheckCircle2,
} from 'lucide-react-native';
import colors from '../../../theme/colors';
import useChangeHotel from '../hooks/useChangeHotel';

const SW = 2.5;

// ─── Star Rating ──────────────────────────────────────────────────────────────

const StarRating = ({ rating, max = 5 }) => (
  <View style={styles.starsRow}>
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={`s-${i}`}
        size={13}
        strokeWidth={SW}
        color="#FACC15"
        fill={i < Math.round(rating) ? '#FACC15' : 'transparent'}
      />
    ))}
    <Text style={styles.ratingText}>{rating}/5</Text>
  </View>
);

// ─── Hotel Card ───────────────────────────────────────────────────────────────

const HotelCard = ({ hotel, isSelected, onSelect, onViewDetails }) => (
  <View style={[styles.hotelCard, isSelected && styles.hotelCardSelected]}>
    {isSelected && (
      <View style={styles.selectedBadge}>
        <CheckCircle2 size={13} color={colors.white} strokeWidth={SW} />
        <Text style={styles.selectedBadgeText}>  Selected Hotel</Text>
      </View>
    )}

    <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => onViewDetails(hotel)}>
      <Text style={styles.viewDetailsText}>View Details</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.hotelRow}
      onPress={() => onSelect(hotel.id)}
      activeOpacity={0.8}
    >
      {/* Image placeholder box */}
      <View style={styles.hotelImageBox}>
        <BedDouble size={34} color="#94A3B8" strokeWidth={1.5} />
      </View>

      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.hotelLocation}>{hotel.location}</Text>
        <View style={styles.sublocationRow}>
          <MapPin size={11} color={colors.textMuted} strokeWidth={SW} />
          <Text style={styles.hotelSublocation}> {hotel.sublocation}</Text>
        </View>

        {/* Blue date chip */}
        <View style={styles.dateChip}>
          <Text style={styles.dateChipText}>
            {hotel.checkIn} – {hotel.checkOut}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Coffee size={11} color={colors.textMuted} strokeWidth={SW} />
          <Text style={styles.metaLabel}>  Includes</Text>
          <Text style={styles.metaValue}>  {hotel.includes}</Text>
        </View>
        <View style={styles.metaRow}>
          <BedDouble size={11} color={colors.textMuted} strokeWidth={SW} />
          <Text style={styles.metaLabel}>  Room Type</Text>
          <Text style={styles.metaValue}>  {hotel.roomType}</Text>
        </View>

        <StarRating rating={hotel.rating} />
      </View>
    </TouchableOpacity>
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

const ChangeHotelScreen = ({ navigation, route }) => {
  const { region = 'Goa', dayNumber, packageId } = route.params || {};

  const {
    hotels,
    isLoading,
    selectedHotelId,
    searchQuery,
    setSearchQuery,
    handleSelectHotel,
  } = useChangeHotel(region);

  return (
    <View style={styles.container}>
      {/* Header — title + inline search matching design */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={22} color={colors.textPrimary} strokeWidth={SW} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Hotel</Text>
          <View style={styles.headerSearch}>
            <Search size={14} color={colors.textMuted} strokeWidth={SW} />
            <TextInput
              style={styles.headerSearchInput}
              placeholder="Search"
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {['Star rating', 'Location', 'User rating', 'Hotel Type'].map((f) => (
          <TouchableOpacity key={f} style={styles.filterChip}>
            <Text style={styles.filterChipText}>{f}</Text>
            <ChevronDown size={11} color={colors.textSecondary} strokeWidth={SW} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.countText}>
        Showing {hotels.length} Stays in {region} | Sort by Popularity
      </Text>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={colors.primary} />
      ) : (
        <FlatList
          data={hotels}
          keyExtractor={(item, index) =>
            item.id != null ? String(item.id) : `hotel-${index}`
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <HotelCard
              hotel={item}
              isSelected={item.id === selectedHotelId}
              onSelect={handleSelectHotel}
              onViewDetails={() => {}}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hotels available.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.white,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  headerSearch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: colors.background,
    gap: 6,
  },
  headerSearchInput: { flex: 1, fontSize: 13, color: colors.textPrimary, padding: 0 },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterChipText: { fontSize: 12, color: colors.textSecondary },
  countText: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  loader: { marginTop: 40 },
  list: { padding: 16 },
  emptyText: { textAlign: 'center', color: colors.textMuted, marginTop: 48, fontSize: 14 },
  hotelCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 14,
  },
  hotelCardSelected: { borderColor: colors.primary, borderWidth: 1.5 },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  selectedBadgeText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  viewDetailsBtn: { alignSelf: 'flex-end', marginBottom: 8 },
  viewDetailsText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  hotelRow: { flexDirection: 'row', gap: 12 },
  hotelImageBox: {
    width: 100,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  hotelInfo: { flex: 1, gap: 4 },
  hotelName: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  hotelLocation: { fontSize: 12, color: colors.textSecondary },
  sublocationRow: { flexDirection: 'row', alignItems: 'center' },
  hotelSublocation: { fontSize: 11, color: colors.textMuted },
  dateChip: {
    backgroundColor: colors.primaryLight,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 5,
  },
  dateChipText: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaLabel: { fontSize: 11, color: colors.textSecondary },
  metaValue: { fontSize: 11, color: colors.textPrimary, fontWeight: '500' },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 4 },
  ratingText: { fontSize: 11, color: colors.textMuted, marginLeft: 4 },
});

export default ChangeHotelScreen;