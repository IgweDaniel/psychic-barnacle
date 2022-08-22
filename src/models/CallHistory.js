import mongoose from "mongoose";
import { CALL_TYPE } from "@/constant";

const { Schema } = mongoose;
const callHistorySchema = new Schema(
  {
    // call history type: video or call
    type: {
      type: String,
      enum: CALL_TYPE.keys(),
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("CallHistory", callHistorySchema);
export const schema = callHistorySchema.obj;
export default model;
