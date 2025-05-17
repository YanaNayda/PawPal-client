const messageSchema = new Schema({

  messageId: { type: String, required: true, unique: true }, // уникальный идентификатор сообщения
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
  isRead: { type: Boolean, default: false },

});

module.exports = mongoose.model('Message', messageSchema);