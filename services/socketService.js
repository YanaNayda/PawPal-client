import { io } from "socket.io-client";
import { SERVER_CONFIG } from '../config/serverConfig.js';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  // Connect to the server
  connect(userId) {
    if (this.socket && this.isConnected) {
      return;
    }

    this.socket = io(SERVER_CONFIG.SOCKET_URL, {
      transports: ['websocket'],
      query: { userId },
      forceNew: true,
      timeout: SERVER_CONFIG.TIMEOUT,
      reconnection: true,
      reconnectionAttempts: SERVER_CONFIG.RECONNECTION_ATTEMPTS,
      reconnectionDelay: SERVER_CONFIG.RECONNECTION_DELAY,
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
      
      // Notify server that user is online
      this.socket.emit('user_online', userId);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
      
      // Notify server that user is offline
      if (userId) {
        this.socket.emit('user_offline', userId);
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('Reconnected to server after', attemptNumber, 'attempts');
      this.isConnected = true;
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('Reconnection error:', error);
    });
  }

  // Disconnect from the server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Join a chat room
  joinChat(chatId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join_chat', chatId);
    }
  }

  // Leave a chat room
  leaveChat(chatId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave_chat', chatId);
    }
  }

  // Send a message
  sendMessage(chatId, senderId, content, imageUrl = '') {
    if (this.socket && this.isConnected) {
      this.socket.emit('send_message', {
        chatId,
        senderId,
        content,
        imageUrl
      });
    }
  }

  // Start typing indicator
  startTyping(chatId, userId, userName) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing_start', {
        chatId,
        userId,
        userName
      });
    }
  }

  // Stop typing indicator
  stopTyping(chatId, userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing_stop', {
        chatId,
        userId
      });
    }
  }

  // Listen for received messages
  onReceiveMessage(callback) {
    if (this.socket) {
      this.socket.on('receive_message', callback);
    }
  }

  // Listen for typing indicators
  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on('user_typing', callback);
    }
  }

  // Listen for stop typing indicators
  onUserStopTyping(callback) {
    if (this.socket) {
      this.socket.on('user_stop_typing', callback);
    }
  }

  // Listen for user status changes
  onUserStatusChange(callback) {
    if (this.socket) {
      this.socket.on('user_status_change', callback);
    }
  }

  // Listen for message errors
  onMessageError(callback) {
    if (this.socket) {
      this.socket.on('message_error', callback);
    }
  }

  // Remove all listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  // Get socket instance
  getSocket() {
    return this.socket;
  }

  // Check if connected
  getIsConnected() {
    return this.isConnected;
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService; 