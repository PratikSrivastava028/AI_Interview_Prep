import mongoose from "mongoose";

export const connectDB = async (retries = 5) => {
  if (!process.env.MONGODB_URI) {
    console.error("[Error] MONGODB_URI is not set. Check your environment variables.");
    return;
  }

  for (let i = 0; i < retries; i++) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`[Success] MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`[Error] MongoDB Connection Failed (attempt ${i + 1}/${retries}): ${error.message}`);
      if (i < retries - 1) {
        const delay = Math.min(1000 * Math.pow(2, i), 10000);
        console.log(`[Info] Retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  console.error("[Error] All MongoDB connection attempts failed. Server will continue without DB.");
};
