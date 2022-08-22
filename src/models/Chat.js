import mongoose from "mongoose";
import { CHAT_TYPE } from "@/constant";

const { Schema } = mongoose;
const chatSchema = new Schema({
  type: {
    type: String,
    enum: CHAT_TYPE.keys(),
    default: CHAT_TYPE.DM,
  },
  messages: [
    [{ type: Schema.Types.ObjectId, required: true, ref: "Messages" }],
  ],
  members: [{ type: Schema.Types.ObjectId, required: true, ref: "Users" }],
  admin: { type: Schema.Types.ObjectId, ref: "Users" },
});

const model = mongoose.model("Chats", chatSchema);
export const schema = chatSchema.obj;
export default model;
