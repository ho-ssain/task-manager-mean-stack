import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env") });

import mongoose, { ConnectOptions } from "mongoose";

const db_url = process.env.DB_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("MongoDB database connection established successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
