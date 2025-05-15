import { Router } from 'express';
import {
  bookEvent,
  unbookEvent,
  getBookedEvents,
} from '../controllers/booked_event.controller';

const router = Router();

router.post('/:id/book', bookEvent);     
router.delete('/:id/book', unbookEvent);
router.get('/booked', getBookedEvents);

export default router;
