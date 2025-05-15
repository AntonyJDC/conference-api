import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  id: string;
  eventId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  eventId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

export default mongoose.model<IReview>('Review', ReviewSchema);
