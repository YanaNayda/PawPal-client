const postSchema = new Schema({
  postId: { type: String, required: true, unique: true }, // уникальный идентификатор поста
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    
  isDeleted: { type: Boolean, default: false },
  isReported: { type: Boolean, default: false },
  reportReason: { type: String, default: '' },
  reportDetails: { type: String, default: '' },
  isEdited: { type: Boolean, default: false },
});

module.exports = mongoose.model('Post', postSchema);