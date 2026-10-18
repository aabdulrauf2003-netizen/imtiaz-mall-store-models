import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    id: String, // product id at the time of the order
    name: String,
    price: Number,
    qty: Number,
    img: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, index: true }, // who placed it (so history works even if delivery email differs)
    email: { type: String, required: true, index: true },
    fullName: String,
    phone: String,
    paymentMethod: String,
    bankName: String,
    accountNumber: String,
    homeAddress: String,
    country: String,
    city: String,
    location: String,
    postalCode: String,
    address: String,
    items: [itemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

// Same JSON shape the old PHP API returned (id, createdAt, ...)
orderSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret.orderId;
    delete ret._id;
    delete ret.__v;
    delete ret.orderId;
    return ret;
  },
});

export default mongoose.model('Order', orderSchema);
