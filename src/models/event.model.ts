import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: string;
  capacity: number;
  spotsLeft: number;
  categories: string[];
}

const EventSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String },
  imageUrl: { type: String },
  capacity: { type: Number, required: true },
  spotsLeft: { type: Number, required: true },
  categories: { type: [String], default: [] },
});

export default mongoose.model<IEvent>('Event', EventSchema);
