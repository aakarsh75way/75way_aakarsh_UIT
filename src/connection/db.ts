import mongoose from "mongoose";

export const checkDatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log("CONNECTED WITH DB");
    return true;
  } catch (err) {
    return false;
  }
};
