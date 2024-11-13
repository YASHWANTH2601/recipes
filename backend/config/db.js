import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI =
  process.env.MONGO_URI ||
  `mongodb+srv://${process.env.MongoUserName}:${process.env.MongoPassword}@${process.env.MongoHost}/?retryWrites=true&w=majority&appName=${process.env.MongoDb}`;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit with failure
  }
};
export default connectDB;