import mongoose from "mongoose";
import "dotenv/config";

export const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to database", error.message);
    process.exit(1);
  }
};
