// src/features/chatbot/components/ChatBubble.js
// Renders a single message bubble — user (right) or bot (left) with avatar.

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MESSAGE_ROLE } from '../types/chatbotTypes';
import colors from '../../../theme/colors';

// Maya's bot avatar — replace with actual asset when available
const BOT_AVATAR = require('../../../assets/maya_avatar.png');

const ChatBubble = ({ message }) => {
  const isUser = message.role === MESSAGE_ROLE.USER;

  if (isUser) {
    return (
      <View style={styles.userRow}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{message.text}</Text>
        </View>
        {/* User avatar placeholder circle */}
        <View style={styles.userAvatar}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/40?img=3' }}
            style={styles.avatarImage}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.botRow}>
      <View style={styles.botAvatar}>
        <Image source={BOT_AVATAR} style={styles.avatarImage} />
      </View>
      <View style={styles.botBubble}>
        <Text style={styles.botText}>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ── User bubble (right-aligned) ──
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  userBubble: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderTopRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  userText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  // ── Bot bubble (left-aligned) ──
  botRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  botBubble: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  botText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  // ── Avatars ──
  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    marginTop: 2,
  },
  botAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    marginTop: 2,
    backgroundColor: colors.primaryLight,
  },
  avatarImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
});

export default ChatBubble;
