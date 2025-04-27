import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error("MongoDB URI is not defined in .env file");
  }
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
    process.exit(1);
  }
};
