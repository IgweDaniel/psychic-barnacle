import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
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
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    // aboutme text
    infoText: {
      type: String,
    },
    location: {
      type: String,
    },
    // users need to have notifications
    // UIpref=>themeColor
    // privacyPref
    // last seen: type Date
  },
  { timestamps: true }
);

const model = mongoose.model("Users", userSchema);
export const schema = userSchema.obj;
export default model;
