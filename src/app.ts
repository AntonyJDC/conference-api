import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import eventRoutes from "./routes/event.routes"; // ✅

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas correctamente
app.use("/api/events", eventRoutes); // ✅

app.get("/", (req, res) => {
  res.send("Conference API running 🚀");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
