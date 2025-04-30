import { Router } from 'express';
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from '../controllers/favorite.controller';

const router = Router();

router.post('/:id/favorite', addFavorite);
router.delete('/:id/favorite', removeFavorite);
router.get('/favorites', getFavorites);

export default router;
