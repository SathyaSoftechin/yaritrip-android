import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

const GOOGLE_LOGO = 'https://www.google.com/favicon.ico';
const FACEBOOK_LOGO = 'https://www.facebook.com/images/fb_icon_325x325.png';

const SocialButtons = () => (
  <View style={styles.socialRow}>
    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
      <Image source={{ uri: GOOGLE_LOGO }} style={styles.socialLogo} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
      <Image source={{ uri: FACEBOOK_LOGO }} style={styles.socialLogo} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
      <Image source={require('../../../assets/apple_logo.png')} style={styles.socialLogo} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 18,
  },
  socialBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  socialLogo: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});

export default SocialButtons;
