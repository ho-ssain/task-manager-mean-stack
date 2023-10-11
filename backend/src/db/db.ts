import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const db_url = process.env.DB_URL as string;
const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("Database connection established successfully!🙂");
  } catch (error) {
    console.log("Error-connecting to Database", error);
  }
};

export default connectDB;
