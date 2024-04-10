import mongoose from "mongoose";
import configs from "../configs";

const { mongodb, isDEV } = configs;

export const connectMongoDB = () => {
  const connectStr = `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.name}`;

  if (isDEV) {
    mongoose.set("debug", { color: true });
  }

  mongoose
    .connect(connectStr, { maxPoolSize: 50 })
    .then(() => console.log("✅[MongoDB] - Connected to MongoDB successfully"))
    .catch((error) =>
      console.log(
        "❌[MongoDB] - Failed to connect to MongoDB with error: ",
        error
      )
    );
};
