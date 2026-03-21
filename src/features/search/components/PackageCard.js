import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Star, Plane, BedDouble, Bus, UtensilsCrossed, Sparkles } from 'lucide-react-native';
import colors from '../../../theme/colors';

const PackageCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.9}
    >
      {/* Badge */}
      <View style={styles.exclusiveBadge}>
        <Sparkles size={10} color={colors.white} />
        <Text style={styles.exclusiveText}> Exclusive</Text>
      </View>

      {/* Image */}
      <Image
        source={{ uri: item.image || item.bannerImage }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.location} • {item.nights}N/{item.nights + 1}D
        </Text>

        <View style={styles.ratingRow}>
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{item.rating?.toFixed(1)}</Text>
        </View>

        <View style={styles.amenityRow}>
          <Plane size={13} color={colors.textSecondary} />
          <BedDouble size={13} color={colors.textSecondary} />
          <Bus size={13} color={colors.textSecondary} />
          <UtensilsCrossed size={13} color={colors.textSecondary} />
          <Text style={styles.allInclusive}>All Inclusive</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.startingFrom}>Starting from</Text>
          <Text style={styles.price}>₹{item.price?.toLocaleString('en-IN')}</Text>
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
  exclusiveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    backgroundColor: colors.badge,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exclusiveText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  allInclusive: {
    fontSize: 10,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  priceRow: {
    marginTop: 8,
  },
  startingFrom: {
    fontSize: 9,
    color: colors.textMuted,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  perPerson: {
    fontSize: 9,
    color: colors.textMuted,
  },
});

export default PackageCard;