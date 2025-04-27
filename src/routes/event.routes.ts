import { Router } from 'express';
import {
  getAllEvents,
  createEvent,
  getEventById,
  subscribeToEvent,
  unsubscribeFromEvent,
} from '../controllers/event.controller';

const router = Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.get('/:id', getEventById);
router.post('/:id/subscribe', subscribeToEvent);
router.post('/:id/unsubscribe', unsubscribeFromEvent);

export default router;
