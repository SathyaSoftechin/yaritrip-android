// src/features/chatbot/components/ChatInput.js
// The bottom input bar with text field and send button.

import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Send } from 'lucide-react-native';
import colors from '../../../theme/colors';
import { BOT_STATUS } from '../types/chatbotTypes';

const ChatInput = ({ value, onChangeText, onSend, botStatus }) => {
  const isSending = botStatus === BOT_STATUS.TYPING;
  const canSend = value.trim().length > 0 && !isSending;

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="What's your Plan today"
          placeholderTextColor={colors.textMuted}
          multiline
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={canSend ? onSend : undefined}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
          onPress={onSend}
          activeOpacity={0.8}
          disabled={!canSend}
        >
          <Send size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    maxHeight: 100,
    paddingVertical: 6,
    lineHeight: 20,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  sendBtnDisabled: {
    backgroundColor: colors.textMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default ChatInput;
