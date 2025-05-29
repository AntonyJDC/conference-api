import { Router } from 'express';
import {
    getEventStats,
  getReviewStats
} from '../controllers/stats.controller';

const router = Router();

router.get('/reviews', getReviewStats);
router.get('/events', getEventStats);
  

export default router;
