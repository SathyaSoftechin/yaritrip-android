import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Heart, Star, Plane, BedDouble, Bus, UtensilsCrossed, Sparkles } from 'lucide-react-native';
import { useLikedIds, useToggleLike } from '../../profile/hooks/useProfile';
import colors from '../../../theme/colors';

const AttractionCard = ({ item, onPress }) => {
  const { data: likedIds } = useLikedIds();
  const { mutate: toggleLike } = useToggleLike();

  const isLiked = likedIds instanceof Set ? likedIds.has(String(item.id)) : false;
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleLikePress = () => {
    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1.4,
        useNativeDriver: true,
        speed: 50,
        bounciness: 8,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 4,
      }),
    ]).start();
    toggleLike(item);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress && onPress(item)} activeOpacity={0.9}>
      {/* Badge */}
      <View style={styles.exclusiveBadge}>
        <Sparkles size={10} color={colors.white} />
        <Text style={styles.exclusiveText}> Exclusive</Text>
      </View>

      {/* Wishlist */}
      <TouchableOpacity style={styles.wishlistBtn} onPress={handleLikePress} activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
          <Heart
            size={20}
            color={isLiked ? '#EF4444' : colors.white}
            fill={isLiked ? '#EF4444' : 'transparent'}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Image */}
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.city} • 5N/6D
        </Text>

        <View style={styles.ratingRow}>
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{item.rating?.toFixed(1)}</Text>
          <Text style={styles.reviews}>({item.reviews?.toLocaleString()} reviews)</Text>
        </View>

        <View style={styles.amenityRow}>
          <Plane size={13} color={colors.textSecondary} />
          <BedDouble size={13} color={colors.textSecondary} />
          <Bus size={13} color={colors.textSecondary} />
          <UtensilsCrossed size={13} color={colors.textSecondary} />
          <Text style={styles.allInclusive}>All Inclusive</Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.startingFrom}>Starting from</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>₹89,999</Text>
              <Text style={styles.strikePrice}>₹1,09,999</Text>
            </View>
            <Text style={styles.perPerson}>per person</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 20,
    padding: 6,
  },
  image: {
    width: '100%',
    height: 120,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 3,
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
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  strikePrice: {
    fontSize: 11,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  perPerson: {
    fontSize: 9,
    color: colors.textMuted,
  },
});

export default AttractionCard;
