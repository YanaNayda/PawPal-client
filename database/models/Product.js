
const productSchema = new Schema({
  productId: { type: String, required: true, unique: true }, // уникальный идентификатор продукта
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: String,
  price: Number,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
    location: {
        type: {
        type: String,
        enum: ['Point'],
        required: true,
        },
        coordinates: {
        type: [Number],
        },
    },

    category: {
        type: String,
        enum: ['Dog', 'Cat', 'Parrot', 'Fish', 'Reptile', 'Other'],
        required: true,
    },
    condition: {
        type: String,
        enum: ['New', 'Used'],
        required: true,
    },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
     
});

module.exports = mongoose.model('Product', productSchema);