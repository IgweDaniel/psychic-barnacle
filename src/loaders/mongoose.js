import mongoose from "mongoose";
import config from "@/config";
import { MongoMemoryServer } from "mongodb-memory-server";
export default async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  config.databaseURL = uri;
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};
