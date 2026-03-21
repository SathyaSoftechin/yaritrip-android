import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import colors from '../../../theme/colors';
import usePackageDetail from '../hooks/usePackageDetail';
import DayCard from '../components/DayCard';

const PackageDetailScreen = ({ navigation, route }) => {
  const { packageId } = route.params || {};
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const {
    packageData,
    bannerImages,
    days,
    overview,
    isLoading,
    isError,
    travellersCount,
    incrementTravellers,
    decrementTravellers,
    displayPrice,
    originalPrice,
  } = usePackageDetail(packageId);

  const handleChangeHotel = (dayNumber) => {
    navigation.navigate('ChangeHotel', {
      dayNumber,
      packageId,
      region: packageData?.location || 'GOA',
    });
  };

  const handleChangeTransport = (dayNumber) => {
    navigation.navigate('AddActivity', {
      dayNumber,
      packageId,
      defaultTab: 'Transport',
    });
  };

  const handleAddActivity = (dayNumber) => {
    navigation.navigate('AddActivity', {
      dayNumber,
      packageId,
      defaultTab: 'Activity',
    });
  };

  const handleRemove = () => {
    // TODO: implement remove day item logic
  };

  const handleBookNow = () => {
    navigation.navigate('ReviewPackage', {
      packageId,
      basePrice: displayPrice,
      travellersCount,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading package...</Text>
      </View>
    );
  }

  if (isError || !packageData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>Failed to load package.</Text>
        <Text style={styles.errorSub}>Please check your connection and try again.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const nights = packageData.nights || 3;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconText}>♡</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconText}>↗</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{packageData.title}</Text>
          <View style={styles.tagRow}>
            <View style={styles.tag}><Text style={styles.tagText}>Customizable</Text></View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{nights}N/{nights + 1}D</Text>
            </View>
            <Text style={styles.tagInline}>{nights}N {packageData.location}</Text>
          </View>
        </View>

        {/* Image carousel */}
        <View style={styles.carouselWrapper}>
          {bannerImages.length > 0 ? (
            <>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const index = Math.round(
                    e.nativeEvent.contentOffset.x /
                    e.nativeEvent.layoutMeasurement.width
                  );
                  setActiveImageIndex(index);
                }}
              >
                {bannerImages.map((uri, idx) => (
                  <Image
                    key={idx}
                    source={{ uri }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
              {/* Dot indicators */}
              <View style={styles.dotRow}>
                {bannerImages.map((_, idx) => (
                  <View
                    key={idx}
                    style={[styles.dot, idx === activeImageIndex && styles.dotActive]}
                  />
                ))}
              </View>
            </>
          ) : (
            <View style={styles.bannerPlaceholder}>
              <Text style={styles.bannerPlaceholderText}>🏙️</Text>
            </View>
          )}
        </View>

        {/* Price card */}
        <View style={styles.priceCard}>
          <Text style={styles.packageName}>{packageData.title} :</Text>
          <Text style={styles.startingFrom}>Starting from</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{Math.round(displayPrice).toLocaleString('en-IN')}
            </Text>
            {originalPrice > 0 && (
              <Text style={styles.originalPrice}>
                ₹{Math.round(originalPrice).toLocaleString('en-IN')}
              </Text>
            )}
            <Text style={styles.perPerson}>/Per Person</Text>
          </View>
          <Text style={styles.overview}>{overview}</Text>
        </View>

        {/* Day cards */}
        {days.map((day) => (
          <DayCard
            key={`day-${day.dayNumber}`}
            day={day}
            onChangeHotel={handleChangeHotel}
            onRemoveHotel={handleRemove}
            onChangeTransport={handleChangeTransport}
            onRemoveTransport={handleRemove}
            onAddActivity={handleAddActivity}
          />
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bookBtn} onPress={handleBookNow}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
        <View style={styles.travellersControl}>
          <TouchableOpacity onPress={decrementTravellers} style={styles.countBtn}>
            <Text style={styles.countBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.travellersText}>{travellersCount}</Text>
          <TouchableOpacity onPress={incrementTravellers} style={styles.countBtn}>
            <Text style={styles.countBtnText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.personIcon}>👤</Text>
          <Text style={styles.chevron}>∨</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: colors.textSecondary,
  },
  errorEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  errorSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  retryText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  backBtn: { padding: 4 },
  backArrow: { fontSize: 22, color: colors.textPrimary },
  headerActions: { flexDirection: 'row', gap: 12 },
  iconBtn: { padding: 4 },
  iconText: { fontSize: 20, color: colors.textPrimary },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagText: { fontSize: 12, color: colors.textSecondary },
  tagInline: { fontSize: 12, color: colors.textSecondary },
  carouselWrapper: {
    backgroundColor: colors.white,
    paddingBottom: 12,
  },
  bannerImage: {
    width: 393,  // will be overridden by onLayout in real device — fine for now
    height: 210,
  },
  bannerPlaceholder: {
    height: 210,
    backgroundColor: '#D1E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerPlaceholderText: { fontSize: 48 },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: { backgroundColor: colors.textPrimary },
  priceCard: {
    margin: 16,
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  packageName: {
    fontWeight: '700',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  startingFrom: { fontSize: 11, color: colors.textSecondary },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4,
  },
  price: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  originalPrice: {
    fontSize: 13,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  perPerson: { fontSize: 11, color: colors.textSecondary },
  overview: {
    marginTop: 8,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  bottomSpacer: { height: 90 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 28,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 12,
  },
  bookBtnText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  travellersControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  countBtn: { padding: 2 },
  countBtnText: { fontSize: 16, color: colors.textPrimary, fontWeight: '700' },
  travellersText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    minWidth: 18,
    textAlign: 'center',
  },
  personIcon: { fontSize: 14 },
  chevron: { fontSize: 12, color: colors.textSecondary },
});

export default PackageDetailScreen;