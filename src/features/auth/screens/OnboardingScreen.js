import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../../../theme/colors';

const { width, height } = Dimensions.get('window');

// ── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: '1',
    title: 'Curated Journeys',
    subtitle:
      'Handpicked destinations crafted to match your travel taste.\nEvery trip designed for comfort, style, and ease.',
    images: {
      leftLarge: require('../../../assets/onb1.jpg'),
      middleTop: require('../../../assets/onb3.jpg'),
      middleBottom: require('../../../assets/onb34.jpg'),
      rightTop: require('../../../assets/onb5.jpg'),
      rightBottom: require('../../../assets/onb3.jpg'),
    },
  },
  {
    id: '2',
    title: 'Effortless Travel',
    subtitle:
      'Bookings, updates, and support in one refined experience.\nTravel confidently from start to finish.',
    images: {
      leftLarge: require('../../../assets/onb5.jpg'),
      middleTop: require('../../../assets/onb1.jpg'),
      middleBottom: require('../../../assets/onb3.jpg'),
      rightTop: require('../../../assets/onb34.jpg'),
      rightBottom: require('../../../assets/onb1.jpg'),
    },
  },
];

// ── Image mosaic ──────────────────────────────────────────────────────────────
const ImageMosaic = ({ images }) => (
  <View style={styles.imageWrapper}>
    <Image source={images.leftLarge} style={styles.leftLarge} />
    <View style={styles.middleColumn}>
      <Image source={images.middleTop} style={styles.middleTop} />
      <Image source={images.middleBottom} style={styles.middleBottom} />
    </View>
    <View style={styles.rightColumn}>
      <Image source={images.rightTop} style={styles.rightTop} />
      <Image source={images.rightBottom} style={styles.rightBottom} />
    </View>
  </View>
);

// ── Dots indicator ────────────────────────────────────────────────────────────
const Dots = ({ current, total }) => (
  <View style={styles.indicatorRow}>
    {Array.from({ length: total }).map((_, i) => (
      <View key={i} style={i === current ? styles.activeDot : styles.inactiveDot} />
    ))}
  </View>
);

// ── Main component ────────────────────────────────────────────────────────────
const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Auth');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderSlide = ({ item, index }) => (
    <View style={styles.slide}>
      <ImageMosaic images={item.images} />
      <View style={styles.bottomCard}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <PrimaryButton label="Next" onPress={handleNext} style={styles.button} />
        <Dots current={currentIndex} total={SLIDES.length} />
        <Image
          source={require('../../../assets/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slide: {
    width,
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  // ── Image mosaic ──
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  },
  leftLarge: {
    width: width * 0.34,
    height: height * 0.47,
    borderRadius: 1,
  },
  middleColumn: { justifyContent: 'space-between' },
  middleTop: {
    width: width * 0.27,
    height: height * 0.18,
    borderRadius: 2,
  },
  middleBottom: {
    width: width * 0.27,
    height: height * 0.28,
    borderRadius: 2,
  },
  rightColumn: { justifyContent: 'space-between' },
  rightTop: {
    width: width * 0.37,
    height: height * 0.28,
    borderRadius: 2,
  },
  rightBottom: {
    width: width * 0.37,
    height: height * 0.18,
    borderRadius: 2,
  },
  // ── Bottom card ──
  bottomCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 10,
    color: colors.dark,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    marginTop: 0,
  },
  // ── Dots ──
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    gap: 6,
  },
  activeDot: {
    width: 78,
    height: 9,
    backgroundColor: colors.accent,
    borderRadius: 5,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 5,
  },
  logo: {
    width: 130,
    height: 60,
  },
});

export default OnboardingScreen;
