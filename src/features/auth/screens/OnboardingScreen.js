// src/features/auth/screens/OnboardingScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { MapPin, Compass, ArrowRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* IMAGE GRID — unchanged from original */}
      <View style={styles.imageWrapper}>
        <Image source={require('../../../assets/onb1.jpg')} style={styles.leftLarge} />
        <View style={styles.middleColumn}>
          <Image source={require('../../../assets/onb3.jpg')} style={styles.middleTop} />
          <Image source={require('../../../assets/onb34.jpg')} style={styles.middleBottom} />
        </View>
        <View style={styles.rightColumn}>
          <Image source={require('../../../assets/onb5.jpg')} style={styles.rightTop} />
          <Image source={require('../../../assets/onb3.jpg')} style={styles.rightBottom} />
        </View>
      </View>

      {/* BOTTOM CONTENT */}
      <View style={styles.bottomCard}>
        <View style={styles.logoRow}>
          <MapPin size={20} color="#C9A84C" fill="#C9A84C" strokeWidth={1} />
          <Text style={styles.logoText}>YariTrip</Text>
        </View>

        <Text style={styles.title}>Curated Journeys</Text>

        <Text style={styles.subtitle}>
          Handpicked destinations crafted to match your travel taste.{'\n'}
          Every trip designed for comfort, style, and ease.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Auth')}
          activeOpacity={0.85}
        >
          <Compass size={18} color="#0F172A" strokeWidth={2} />
          <Text style={styles.buttonText}>Start Exploring</Text>
          <ArrowRight size={18} color="#0F172A" strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={styles.indicatorRow}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
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
  middleTop: { width: width * 0.27, height: height * 0.18, borderRadius: 2 },
  middleBottom: { width: width * 0.27, height: height * 0.28, borderRadius: 2 },
  rightColumn: { justifyContent: 'space-between' },
  rightTop: { width: width * 0.37, height: height * 0.28, borderRadius: 2 },
  rightBottom: { width: width * 0.37, height: height * 0.18, borderRadius: 2 },
  bottomCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#C9A84C',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 78,
    height: 8,
    backgroundColor: '#C9A84C',
    borderRadius: 4,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
});

export default OnboardingScreen;
