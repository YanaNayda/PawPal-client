const commentSchema = new Schema({
  commentId: { type: String, required: true, unique: true }, // уникальный идентификатор комментария
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);