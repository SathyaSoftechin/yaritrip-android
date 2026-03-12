import { useState, useCallback, useRef } from 'react';
import { sendMessage } from '../services/chatbotService';
import { MESSAGE_ROLE, BOT_STATUS } from '../types/chatbotTypes';

const MAYA_GREETING = {
  id: '0',
  role: MESSAGE_ROLE.BOT,
  text: 'Hi...',
  timestamp: new Date(),
};

const useChatbot = () => {
  const [messages, setMessages] = useState([MAYA_GREETING]);
  const [inputText, setInputText] = useState('');
  const [botStatus, setBotStatus] = useState(BOT_STATUS.IDLE);
  const messageIdRef = useRef(1);

  const generateId = () => {
    messageIdRef.current += 1;
    return String(messageIdRef.current);
  };

  const appendMessage = useCallback((role, text) => {
    const msg = {
      id: generateId(),
      role,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || botStatus === BOT_STATUS.TYPING) return;

    setInputText('');
    appendMessage(MESSAGE_ROLE.USER, text);
    setBotStatus(BOT_STATUS.TYPING);

    try {
      const history = messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.text,
      }));

      const reply = await sendMessage(text, history);
      appendMessage(MESSAGE_ROLE.BOT, reply);
      setBotStatus(BOT_STATUS.IDLE);
    } catch (error) {
      setBotStatus(BOT_STATUS.ERROR);
      appendMessage(MESSAGE_ROLE.BOT, 'Sorry, something went wrong. Please try again.');
      setBotStatus(BOT_STATUS.IDLE);
    }
  }, [inputText, botStatus, messages, appendMessage]);

  const clearChat = useCallback(() => {
    setMessages([MAYA_GREETING]);
    setInputText('');
    setBotStatus(BOT_STATUS.IDLE);
    messageIdRef.current = 1;
  }, []);

  return {
    messages,
    inputText,
    setInputText,
    botStatus,
    handleSend,
    clearChat,
  };
};

export default useChatbot;
