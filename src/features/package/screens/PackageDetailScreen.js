import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import colors from '../../../theme/colors';
import usePackageDetail from '../hooks/usePackageDetail';
import DayCard from '../components/DayCard';

const { width } = Dimensions.get('window');

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
    initiateBooking,
    isBookingInitiating,
  } = usePackageDetail(packageId);

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
        <Text style={styles.errorText}>Failed to load package.</Text>
      </View>
    );
  }

  const nights = packageData.nights || 3;

  const handleBookNow = () => {
    initiateBooking(undefined, {
      onSuccess: (booking) => {
        navigation.navigate('ReviewPackage', {
          bookingId: booking.id,
          packageId,
          basePrice: packageData.price,
          travellersCount,
        });
      },
      onError: () => {
        Alert.alert('Error', 'Could not start booking. Please try again.');
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{packageData.title}</Text>
          <Text style={styles.subtitle}>
            {nights}N / {nights + 1}D • {packageData.location}
          </Text>
        </View>

        <View style={styles.carouselWrapper}>
          <FlatList
            data={bannerImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => `img-${i}`}
            snapToInterval={width}
            decelerationRate="fast"
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / width
              );
              setActiveImageIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={{ width }}>
                <Image
                  source={{ uri: item }}
                  style={styles.bannerImage}
                />
                <View style={styles.overlay} />
              </View>
            )}
          />

          {/* Dots */}
          <View style={styles.dotRow}>
            {bannerImages.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  idx === activeImageIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Price */}
        <View style={styles.priceCard}>
          <Text style={styles.price}>
            ₹{Math.round(displayPrice).toLocaleString('en-IN')}
          </Text>
          <Text style={styles.overview}>{overview}</Text>
        </View>

        {/* Days */}
        {days.map((day) => (
          <DayCard key={day.dayNumber} day={day} />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.bookBtn, isBookingInitiating && { opacity: 0.6 }]}
          disabled={isBookingInitiating}
          onPress={handleBookNow}
        >
          {isBookingInitiating
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.bookText}>Book Now</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PackageDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: colors.textSecondary,
  },

  errorText: {
    color: colors.textPrimary,
  },

  header: {
    padding: 16,
  },

  backArrow: {
    fontSize: 22,
  },

  titleSection: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // 🔥 Carousel styles
  carouselWrapper: {
    position: 'relative',
  },

  bannerImage: {
    width: '100%',
    height: 260,
  },

  overlay: {
    display: 'none',
  },

  dotRow: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  dotActive: {
    width: 16,
    backgroundColor: '#fff',
  },

  priceCard: {
    margin: 16,
  },

  price: {
    fontSize: 20,
    fontWeight: '800',
  },

  overview: {
    marginTop: 6,
    fontSize: 12,
    color: colors.textSecondary,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: colors.white,
  },

  bookBtn: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
  },

  bookText: {
    color: '#fff',
    fontWeight: '700',
  },
});