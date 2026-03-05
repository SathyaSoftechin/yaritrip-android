import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ChevronLeft, CalendarDays, Plane } from 'lucide-react-native';
import BookingStatusBadge from '../components/BookingStatusBadge';
import { useBookings } from '../hooks/useProfile';
import colors from '../../../theme/colors';

const BookingCard = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
    <View style={styles.cardBody}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <BookingStatusBadge status={item.status} />
      </View>

      <View style={styles.metaRow}>
        <Plane size={13} color={colors.textMuted} />
        <Text style={styles.metaText}>{item.city} • 5N/6D</Text>
      </View>

      <View style={styles.metaRow}>
        <CalendarDays size={13} color={colors.textMuted} />
        <Text style={styles.metaText}>Travel: {item.travelDate}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.startingFrom}>Starting from</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>₹89,999</Text>
          <Text style={styles.strikePrice}>₹1,09,999</Text>
        </View>
        <Text style={styles.perPerson}>per person</Text>
      </View>
    </View>
  </View>
);

const MyBookingsScreen = ({ navigation }) => {
  const { data: bookings, isLoading, isError, refetch } = useBookings();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>My Booking's</Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : isError ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to load bookings.</Text>
          <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <BookingCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No bookings yet.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  loader: { marginTop: 60 },
  listContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 14,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardBody: {
    padding: 14,
    gap: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  priceRow: {
    marginTop: 6,
  },
  startingFrom: {
    fontSize: 10,
    color: colors.textMuted,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  strikePrice: {
    fontSize: 13,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  perPerson: {
    fontSize: 10,
    color: colors.textMuted,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 12,
  },
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
  },
});

export default MyBookingsScreen;
