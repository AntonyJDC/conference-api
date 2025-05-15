import mongoose, { Schema, Document } from 'mongoose';

export interface IBookedEvent extends Document {
  id: string; // igual al id del evento
}

const BookedEventSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true }
});

export default mongoose.model<IBookedEvent>('BookedEvent', BookedEventSchema);
