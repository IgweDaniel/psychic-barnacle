import mongoose from "mongoose";
import { CALL_TYPE } from "@/constants";
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
    verified: {
      type: Boolean,
      default: false,
    },
    username: {
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
    calls: [
      new Schema({
        // call history type: video or call
        type: {
          type: String,
          enum: Object.keys(CALL_TYPE),
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      }),
    ],
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const model = mongoose.model("Users", userSchema);
export const schema = userSchema.obj;
export default model;
