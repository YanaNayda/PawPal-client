import axios from 'axios';
import { SERVER_CONFIG } from '../config/serverConfig.js';

class ChatApiService {
  constructor() {
    this.api = axios.create({
      baseURL: SERVER_CONFIG.API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: SERVER_CONFIG.TIMEOUT,
    });
  }

  // Create a new chat
  async createChat(userId1, userId2) {
    try {
      const response = await this.api.post('/chat/create', {
        userId1,
        userId2
      });
      return response.data;
    } catch (error) {
      console.error('Create chat error:', error);
      throw error;
    }
  }

  // Create a group chat
  async createGroupChat(userIds, chatName, adminId) {
    try {
      const response = await this.api.post('/chat/create-group', {
        userIds,
        chatName,
        adminId
      });
      return response.data;
    } catch (error) {
      console.error('Create group chat error:', error);
      throw error;
    }
  }

  // Get all chats for a user
  async getUserChats(userId) {
    try {
      console.log('chatApiService: Making API call to get chats for user:', userId);
      console.log('chatApiService: API URL:', `${SERVER_CONFIG.API_BASE_URL}/chat/user/${userId}`);
      
      const response = await this.api.get(`/chat/user/${userId}`);
      console.log('chatApiService: API response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('chatApiService: Get user chats error:', error);
      console.error('chatApiService: Error response:', error.response?.data);
      throw error;
    }
  }

  // Get messages for a specific chat
  async getChatMessages(chatId) {
    try {
      const response = await this.api.get(`/chat/messages/${chatId}`);
      return response.data;
    } catch (error) {
      console.error('Get chat messages error:', error);
      throw error;
    }
  }

  // Send a message via HTTP (fallback)
  async sendMessage(chatId, senderId, content, imageUrl = '') {
    try {
      const response = await this.api.post('/chat/send', {
        chatId,
        senderId,
        content,
        imageUrl
      });
      return response.data;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }

  // Mark messages as read
  async markMessagesAsRead(chatId, userId) {
    try {
      const response = await this.api.put('/chat/read', {
        chatId,
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Mark messages as read error:', error);
      throw error;
    }
  }

  // Add participant to chat
  async addParticipantToChat(chatId, userId) {
    try {
      const response = await this.api.post('/chat/add-participant', {
        chatId,
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Add participant error:', error);
      throw error;
    }
  }

  // Leave chat
  async leaveChat(chatId, userId) {
    try {
      const response = await this.api.post('/chat/leave', {
        chatId,
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Leave chat error:', error);
      throw error;
    }
  }
}

// Create a singleton instance
const chatApiService = new ChatApiService();
export default chatApiService; 