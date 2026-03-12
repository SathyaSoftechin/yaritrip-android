// All API calls for the chatbot live here.
// Currently returns a mock response — swap sendMessage() body for real API call.

import apiClient from '../../../services/apiClient';

/**
 * Send a message to the Maya AI backend.
 * @param {string} message - The user's message text.
 * @param {Array}  history - Previous messages for context: [{ role, content }]
 * @returns {Promise<string>} The bot's reply text.
 */
export const sendMessage = async (message, history = []) => {
  // ── TODO: replace mock with real endpoint ──────────────────────────────
  // const response = await apiClient.post('/api/chatbot/message', {
  //   message,
  //   history,
  // });
  // return response.data.reply;
  // ──────────────────────────────────────────────────────────────────────

  // Mock delay to simulate network
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const mockReplies = [
    "Hi there! What exciting plan's do you have ?",
    "I'd love to help you plan your next adventure! Where are you thinking of going?",
    "Great choice! Let me find the best packages for you.",
    "I can suggest some amazing destinations based on your preferences!",
    "Would you like to explore our exclusive deals for this season?",
  ];

  return mockReplies[Math.floor(Math.random() * mockReplies.length)];
};
