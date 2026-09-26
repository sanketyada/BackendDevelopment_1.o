import mongoose from "mongoose";
import config from "./config.js";

export async function ConnectDB() {
  try {
    await mongoose.connect(`${config.MONGO_URI}/AccessRefreshToken`);
    console.log("Connected To DB.");
  } catch (error) {
    console.log(error.message);
  }
}
