import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';

const HeroHeader = ({ userName, avatarUrl, onNotificationPress, onAvatarPress }) => {
  return (
    <ImageBackground
      source={{ uri: HERO_IMAGE }}
      style={styles.hero}
      imageStyle={styles.heroImage}
    >
      <View style={styles.overlay} />
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onNotificationPress} style={styles.notifBtn}>
          <Text style={styles.notifIcon}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAvatarPress}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {userName ? userName[0].toUpperCase() : 'U'}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.heading}>Where will your</Text>
        <Text style={styles.headingAccent}>next adventure take you?</Text>
      </View>
    </ImageBackground>
  );
};

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
    gap: 12,
  },
  notifBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  notifIcon: {
    fontSize: 18,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: colors.white,
  },
  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  avatarInitial: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
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

export default HeroHeader;
