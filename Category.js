import mongoose from 'mongoose';

// `id` is the slug used in URLs (e.g. "cold-drinks"), same as the old SQL table.
const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  tagline: { type: String, default: '' },
  image: { type: String, default: '' },
});

categorySchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Category', categorySchema);
