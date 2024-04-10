import { connectMongoDB } from "./mongodb.database";

const CONNECT = {
  mongodb: connectMongoDB,
};

export const connectDatabase = (type: keyof typeof CONNECT = "mongodb") => {
  CONNECT[type]();
};
