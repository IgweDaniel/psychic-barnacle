import mongoose from "mongoose";
import { MESSAGE_TYPE } from "@/constant";

const { Schema } = mongoose;
const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: CHAT_TYPE.keys(),
    default: CHAT_TYPE.DM,
  },

  // might add reply to particular chat (reply to message)
});

const model = mongoose.model("Messages", messageSchema);
export const schema = messageSchema.obj;
export default model;
