import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Star, MapPin, Calendar, Users, Clock } from 'lucide-react-native';
import colors from '../../../theme/colors';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80';

const PackageCard = ({ item, onPress }) => {
  const title = item.toCity?.name || item.title || 'Unknown Destination';
  const fromCity = item.fromCity?.name || item.location || '';
  const nights = item.totalDays ? item.totalDays - 1 : item.nights || 0;
  const days = item.totalDays || (item.nights ? item.nights + 1 : 0);
  const imageUri = item.bannerImageUrl || item.image || item.bannerImage || PLACEHOLDER_IMAGE;
  const rating = item.rating ?? null;
  const category = item.category || null;
  const departureDate = item.departureDate || null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.9}
    >
      {/* Category Badge */}
      {category && (
        <View style={[
          styles.badge,
          category === 'INTERNATIONAL' ? styles.badgeInternational : styles.badgeDomestic,
        ]}>
          <Text style={styles.badgeText}>{category}</Text>
        </View>
      )}

      {/* Image */}
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={styles.info}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>

        {/* From → To */}
        {fromCity ? (
          <View style={styles.routeRow}>
            <MapPin size={12} color={colors.textSecondary} />
            <Text style={styles.subtitle} numberOfLines={1}>
              {fromCity} → {title}
            </Text>
          </View>
        ) : null}

        {/* Duration + Date row */}
        <View style={styles.metaRow}>
          {days > 0 && (
            <View style={styles.metaChip}>
              <Clock size={11} color={colors.textSecondary} />
              <Text style={styles.metaText}>{nights}N / {days}D</Text>
            </View>
          )}
          {departureDate && (
            <View style={styles.metaChip}>
              <Calendar size={11} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {new Date(departureDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </Text>
            </View>
          )}
          {item.totalRooms && item.guestsPerRoom ? (
            <View style={styles.metaChip}>
              <Users size={11} color={colors.textSecondary} />
              <Text style={styles.metaText}>
                {item.totalRooms * item.guestsPerRoom} guests
              </Text>
            </View>
          ) : null}
        </View>

        {/* Rating row — show only when available */}
        {rating !== null && rating !== undefined ? (
          <View style={styles.ratingRow}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        ) : null}

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.startingFrom}>Starting from</Text>
          <Text style={styles.price}>
            ₹{item.price?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={styles.perPerson}>per person</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 16,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeDomestic: {
    backgroundColor: colors.primary || '#2563EB',
  },
  badgeInternational: {
    backgroundColor: '#7C3AED',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.background || '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  metaText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  priceRow: {
    marginTop: 10,
  },
  startingFrom: {
    fontSize: 10,
    color: colors.textMuted,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  perPerson: {
    fontSize: 10,
    color: colors.textMuted,
  },
});

export default PackageCard;