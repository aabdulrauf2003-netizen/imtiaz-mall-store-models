import mongoose from 'mongoose';

// One pending reset code per email. MongoDB deletes the document by itself once expiresAt passes.
const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    codeHash: { type: String, required: true }, // the code is stored hashed, never in plain text
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('PasswordReset', schema);
