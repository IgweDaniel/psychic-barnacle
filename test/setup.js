const mongoose = require("mongoose");
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const testDBUri = mongod.getUri();

  globalThis.testDBUri = testDBUri;

  try {
    await mongoose.connect(testDBUri);
  } catch (error) {
    console.error(error);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  const { collections } = mongoose.connection;
  const promises = [];
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].deleteMany({}));
  });
  await Promise.all(promises);
});
