import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/mongo'; // 👈 Importar conexión

import eventRoutes from './routes/event.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);

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
