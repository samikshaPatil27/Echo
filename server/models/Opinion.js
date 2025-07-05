import mongoose from 'mongoose';

const OpinionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  yes:  { type: Number, default: 0 },
  no:   { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Opinion', OpinionSchema);
