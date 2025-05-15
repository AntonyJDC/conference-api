import { Request, Response, NextFunction } from 'express';
import BookedEvent from '../models/booked_event.model';

export const bookEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await BookedEvent.updateOne({ id }, { id }, { upsert: true });
    res.status(200).json({ message: 'Event booked' });
  } catch (error) {
    next(error);
  }
};

export const unbookEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await BookedEvent.deleteOne({ id });
    res.status(200).json({ message: 'Event unbooked' });
  } catch (error) {
    next(error);
  }
};

export const getBookedEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booked = await BookedEvent.find();
    const ids = booked.map((item) => item.id);
    res.json(ids);
  } catch (error) {
    next(error);
  }
};
