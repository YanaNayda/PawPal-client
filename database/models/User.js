import mongoose, { Schema, model } from 'mongoose';


const userSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  photoURL: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  createdAt: { type: Date, default: Date.now , required: false },

  bio: { type: String, default: '' , required: false },

  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendRequestsSent: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendRequestsReceived: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  savedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],

  notifications: [
    {
      type: { type: String, required: true }, // 'friendRequest', 'message', etc.
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false,
    },
  },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date },
  isDeleted: { type: Boolean, default: false },
});

export const User = model('User', userSchema);