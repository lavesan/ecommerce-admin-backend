import mongoose from "mongoose";

export const createConnection = () => {
  // return mongoose.connect(`mongodb://localhost:27017/digitro`);
  return mongoose.connect(`mongodb://mongodb:27017/digitro`);
};
