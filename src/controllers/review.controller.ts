import { Request, Response, NextFunction } from 'express';
import Review from '../models/review.model';

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: eventId } = req.params;
    const { rating, comment } = req.body;

    const newReview = new Review({
      id: `${eventId}-${Date.now()}`,
      eventId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });

    await newReview.save();
    res.status(201).json({ message: 'Review saved', review: newReview });
  } catch (error) {
    next(error);
  }
};

export const getReviewsByEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: eventId } = req.params;
    const reviews = await Review.find({ eventId });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
