import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  id: string; // igual al id del evento
}

const FavoriteSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true }
});

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
