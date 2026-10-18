import mongoose from 'mongoose';

// `id` is the product code (e.g. "g1"), `cat` is the category id (slug).
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true },
  cat: { type: String, required: true, index: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 1 },
  img: { type: String, default: '' },
});

productSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Product', productSchema);
