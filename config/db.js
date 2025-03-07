import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URL); // Debugging line
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
