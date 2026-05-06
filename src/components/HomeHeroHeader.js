import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Bell } from 'lucide-react-native';
import colors from '../theme/colors';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';

const HeroHeader = ({ onNotificationPress }) => {
  return (
    <ImageBackground
      source={{ uri: HERO_IMAGE }}
      style={styles.hero}
      imageStyle={styles.heroImage}
    >
      <View style={styles.overlay} />

      {/* 🔥 Only notification now */}
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.notifBtn}
        >
          <Bell size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.heading}>Where will your</Text>
        <Text style={styles.headingAccent}>
          next adventure take you?
        </Text>
      </View>
    </ImageBackground>
  );
};

export default HeroHeader;

const styles = StyleSheet.create({
  hero: {
    height: 220,
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
  heroImage: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.30)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  notifBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  titleBlock: {
    marginBottom: 8,
  },
  heading: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '600',
  },
  headingAccent: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '800',
  },
});