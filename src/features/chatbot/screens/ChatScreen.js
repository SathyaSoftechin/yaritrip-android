import React, { useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from '../components/ChatHeader';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import useChatbot from '../hooks/useChatbot';
import { BOT_STATUS } from '../types/chatbotTypes';
import colors from '../../../theme/colors';

const ChatScreen = ({ navigation }) => {
  const { messages, inputText, setInputText, botStatus, handleSend } = useChatbot();
  const flatListRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, botStatus]);

  const renderItem = ({ item }) => <ChatBubble message={item} />;

  const renderFooter = () => {
    if (botStatus === BOT_STATUS.TYPING) {
      return <TypingIndicator />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ChatHeader onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSend}
          botStatus={botStatus}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  messageList: {
    paddingTop: 20,
    paddingBottom: 8,
  },
});

export default ChatScreen;
