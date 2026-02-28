import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const PROMO_IMAGE = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600';

const PromoBanner = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{ uri: PROMO_IMAGE }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.partnerBadge}>
          <Text style={styles.partnerText}>Partner</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Unlock Dubai Magic</Text>
          <Text style={styles.subtitle}>5-star stays with complimentary desert safari</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 16,
  },
  partnerBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  partnerText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 4,
  },
});

export default PromoBanner;
