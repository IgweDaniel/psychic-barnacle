import mongoose from "mongoose";

export default async (dbUri) => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(`MongoDB connection error ${err}`);
    process.exit(-1);
  }
};
