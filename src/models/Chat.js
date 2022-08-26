import mongoose from "mongoose";
import { CHAT_TYPE } from "@/constant";

const { Schema } = mongoose;
const chatSchema = new Schema(
  {
    // state for archive:: prolly just a archived boolean field
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: CHAT_TYPE.keys(),
      default: CHAT_TYPE.DM,
    },
    // I want to be able to query messgaes of type media might remove and only refrence from messages
    messages: [
      [{ type: Schema.Types.ObjectId, required: true, ref: "Messages" }],
    ],
    // users in chat
    members: [{ type: Schema.Types.ObjectId, required: true, ref: "Users" }],
    admin: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const model = mongoose.model("Chats", chatSchema);
export const schema = chatSchema.obj;
export default model;
