import { Request, Response, NextFunction } from "express";
import Review from '../models/review.model';
import Event from '../models/event.model';

export const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
}

export const getReviewStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await Review.aggregate([
            {
                $group: {
                    _id: '$eventId',
                    averageRating: { $avg: '$rating' },
                    totalComments: { $sum: { $cond: [{ $ifNull: ['$comment', false] }, 1, 0] } },
                    totalPositiveReviews: { $sum: { $cond: [{ $gte: ['$rating', 4] }, 1, 0] } },
                    totalNegativeReviews: { $sum: { $cond: [{ $lt: ['$rating', 4] }, 1, 0] } },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
}

export const getEventStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await Event.aggregate([
            // 1. Unir eventos con sus reseñas
            {
                $lookup: {
                    from: 'reviews',
                    localField: 'id',       // campo en Event
                    foreignField: 'eventId', // campo en Review
                    as: 'reviews'
                }
            },
            // 2. Agregar estadísticas por evento
            {
                $addFields: {
                    subscriptions: { $subtract: ['$capacity', '$spotsLeft'] },
                    averageRating: { $avg: '$reviews.rating' },
                    totalPositiveReviews: {
                        $size: {
                            $filter: {
                                input: '$reviews',
                                as: 'review',
                                cond: { $gte: ['$$review.rating', 4] }
                            }
                        }
                    },
                    totalNegativeReviews: {
                        $size: {
                            $filter: {
                                input: '$reviews',
                                as: 'review',
                                cond: { $lte: ['$$review.rating', 2] }
                            }
                        }
                    },
                    totalReviews: { $size: '$reviews' }
                }
            },
            // 3. Proyectar solo los datos que necesitamos
            {
                $project: {
                    _id: 0,
                    id: 1,
                    title: 1,
                    subscriptions: 1,
                    capacity: 1,
                    spotsLeft: 1,
                    averageRating: { $ifNull: ['$averageRating', 0] },
                    totalPositiveReviews: 1,
                    totalNegativeReviews: 1,
                    totalReviews: 1
                }
            }
        ]);

        // 4. Estadísticas globales
        const globalStats = {
            totalEvents: stats.length,
            totalCapacity: stats.reduce((acc, e) => acc + e.capacity, 0),
            totalSpotsLeft: stats.reduce((acc, e) => acc + e.spotsLeft, 0),
            totalSubscriptions: stats.reduce((acc, e) => acc + e.subscriptions, 0),
            totalPositiveReviews: stats.reduce((acc, e) => acc + e.totalPositiveReviews, 0),
            totalNegativeReviews: stats.reduce((acc, e) => acc + e.totalNegativeReviews, 0),
            mostSubscribedEvent: stats.sort((a, b) => b.subscriptions - a.subscriptions)[0] ?? null,
            leastSubscribedEvent: stats.sort((a, b) => a.subscriptions - b.subscriptions)[0] ?? null,
            bestRatedEvent: stats.sort((a, b) => b.averageRating - a.averageRating)[0] ?? null,
            worstRatedEvent: stats
                .filter(e => e.totalReviews > 0)
                .sort((a, b) => a.averageRating - b.averageRating)[0] ?? null,

            events: stats
        };

        res.status(200).json(globalStats);
    } catch (error) {
        next(error);
    }
};
