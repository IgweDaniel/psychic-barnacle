import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const model = mongoose.model("Users", userSchema);
export const schema = userSchema.obj;
export default model;
