import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const GOOGLE_LOGO = 'https://www.google.com/favicon.ico';
const FACEBOOK_LOGO = 'https://www.facebook.com/images/fb_icon_325x325.png';

const SocialButtons = ({ label = 'or continue with' }) => (
  <View style={styles.container}>
    <View style={styles.orRow}>
      <View style={styles.line} />
      <Text style={styles.orText}>{label}</Text>
      <View style={styles.line} />
    </View>

    <View style={styles.socialRow}>
      <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
        <Image source={{ uri: GOOGLE_LOGO }} style={styles.socialLogo} />
        <Text style={styles.socialLabel}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
        <Image source={{ uri: FACEBOOK_LOGO }} style={styles.socialLogo} />
        <Text style={styles.socialLabel}>Facebook</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  orText: {
    marginHorizontal: 14,
    color: '#4A5568',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  socialLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  socialLabel: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SocialButtons;
