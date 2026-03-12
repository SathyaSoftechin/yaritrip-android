// src/features/chatbot/components/ChatHeader.js
// Top bar for the chat screen with back button, Maya's name and avatar.

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import colors from '../../../theme/colors';

const BOT_AVATAR = require('../../../assets/maya_avatar.png');

const ChatHeader = ({ onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
      <ChevronLeft size={24} color={colors.textPrimary} />
    </TouchableOpacity>

    <Text style={styles.title}>Chat With Maya</Text>

    {/* Right avatar to mirror the screenshot */}
    <View style={styles.avatarWrapper}>
      <Image source={BOT_AVATAR} style={styles.avatar} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  avatarWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.primaryLight,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});

export default ChatHeader;
