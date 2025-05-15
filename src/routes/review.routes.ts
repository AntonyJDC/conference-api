import { Router } from 'express';
import {
  createReview,
  getReviewsByEvent,
} from '../controllers/review.controller';

const router = Router();

router.post('/:id/reviews', createReview);
router.get('/:id/reviews', getReviewsByEvent);

export default router;
