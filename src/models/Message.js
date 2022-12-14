import mongoose from "mongoose";
import { MESSAGE_TYPE, MESSAGE_STATE } from "@/constant";

/**
 * types of media
 * attachment will not have media preview and will not be compressed while media ha spreview and is compressed
 */
const { Schema } = mongoose;
const messageSchema = new Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    type: {
      type: String,
      enum: MESSAGE_TYPE.keys(),
      default: MESSAGE_TYPE.TEXT,
    },

    state: {
      type: String,
      enum: MESSAGE_STATE.keys(),
      default: MESSAGE_STATE.DELIVERED,
    },
    content: {
      //   if type is AUDIO,MEDIA string will be media url
      type: String,
    },

    // might add reply to particular chat (reply to message)
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const model = mongoose.model("Messages", messageSchema);
export const schema = messageSchema.obj;
export default model;
