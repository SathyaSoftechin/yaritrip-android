import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';
import { CITY_IMAGES } from '../services/cityService';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200';

const CityChip = ({ city, isSelected, onPress }) => {
  const imageUri = CITY_IMAGES[city] || FALLBACK_IMAGE;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(city)}>
      <View style={[styles.imageWrapper, isSelected && styles.selectedImageWrapper]}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <Text style={[styles.label, isSelected && styles.selectedLabel]}>{city}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 12,
    width: 64,
  },
  imageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedImageWrapper: {
    borderColor: colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    marginTop: 6,
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  selectedLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default CityChip;
