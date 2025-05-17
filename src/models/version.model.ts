import mongoose, { Schema, Document } from 'mongoose';

export interface IVersion extends Document {
  key: string;
  value: number;
}

const VersionSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Number, required: true }
});

export default mongoose.model<IVersion>('Version', VersionSchema);
