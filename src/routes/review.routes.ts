import { Router } from 'express';
import {
  createReview,
  getReviewsByEvent,
} from '../controllers/review.controller';

const router = Router();

router.post('/:id/create', createReview);
router.get('/:id/get', getReviewsByEvent);

export default router;
