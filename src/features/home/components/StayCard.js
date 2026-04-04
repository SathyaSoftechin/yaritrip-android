import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Star, MapPin, Clock, BedDouble } from 'lucide-react-native';
import colors from '../../../theme/colors';

const StayCard = ({ item, onPress }) => {
  const isPremium = item?.isPremium;

  return (
    <TouchableOpacity
      style={[styles.card, isPremium && styles.premiumCard]}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.88}
    >
      {/* Premium Badge */}
      {isPremium && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>✦ Premium</Text>
        </View>
      )}

      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        {/* Name */}
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        {/* Location */}
        <View style={styles.row}>
          <MapPin size={11} color={colors.primary} />
          <Text style={styles.location} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        {/* Duration */}
        <View style={styles.row}>
          <Clock size={11} color={colors.textSecondary} />
          <Text style={styles.duration}>{item.duration}</Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Star size={11} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{item.rating?.toFixed(1)}</Text>
          <Text style={styles.reviews}>
            ({item.reviews?.toLocaleString()})
          </Text>
        </View>

        {/* Price */}
        <View style={styles.priceBlock}>
          <BedDouble size={12} color={colors.textSecondary} />
          <View style={styles.priceRight}>
            <Text style={styles.fromText}>From</Text>
            <Text style={styles.price}>
              ₹{Number(item.startingPrice).toLocaleString('en-IN')}
            </Text>
            <Text style={styles.perNight}>/ night</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: '#F0F7FF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#0057A8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#D6E8FF',
  },
  premiumCard: {
    backgroundColor: '#FFF8EC',
    borderColor: '#F5C97A',
    shadowColor: '#C07A00',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
    backgroundColor: '#C07A00',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  premiumBadgeText: {
    color: '#FFF8EC',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  image: {
    width: '100%',
    height: 110,
  },
  info: {
    padding: 10,
    gap: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 11,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  duration: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  rating: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  reviews: {
    fontSize: 10,
    color: colors.textMuted,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
    backgroundColor: '#FFFFFF55',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  priceRight: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  fromText: {
    fontSize: 9,
    color: colors.textMuted,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  perNight: {
    fontSize: 9,
    color: colors.textMuted,
  },
});

export default StayCard;