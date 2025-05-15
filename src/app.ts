import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/mongo';

import eventRoutes from './routes/event.routes';
import favoriteRoutes from './routes/favorite.routes';
import bookedEventRoutes from './routes/booked_event.routes';
import reviewRoutes from './routes/review.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/bookeds', bookedEventRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Conference API running with MongoDB 🚀');
});

// Middleware de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
