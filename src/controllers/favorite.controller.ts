import { Request, Response, NextFunction } from 'express';
import Favorite from '../models/favorite.model';

export const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Favorite.updateOne({ id }, { id }, { upsert: true });
    res.status(200).json({ message: 'Event added to favorites' });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Favorite.deleteOne({ id });
    res.status(200).json({ message: 'Event removed from favorites' });
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favorites = await Favorite.find();
    const ids = favorites.map((fav) => fav.id);
    res.json(ids); // Devuelve solo los IDs
  } catch (error) {
    next(error);
  }
};
