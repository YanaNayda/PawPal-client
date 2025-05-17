const chatSchema = new Schema({
  chatId: { type: String, required: true, unique: true }, // уникальный идентификатор чата
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }], // участники чата
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' }, // последний отправленный сообщение
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);