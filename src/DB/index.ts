import mongoose from "mongoose";
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.log("error while connecting to the database", error);
  }
}

export default connectDB;
