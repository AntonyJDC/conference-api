import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/mongo';
import eventRoutes from './routes/event.routes';
import reviewRoutes from './routes/review.routes';
import versionRoutes from './routes/version.routes';
import stat from './routes/stats.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api', versionRoutes);
app.use('/api/stats', stat)

app.get('/stats', (req, res) => {
  res.status(200).json({ test: 'ok' });
});

// Middleware de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
