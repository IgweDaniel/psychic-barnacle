import config from "@/config";
import mongoose from "mongoose";

const { Schema } = mongoose;
const verfiyTokenSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
verfiyTokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: config.api.verifyTokenDuration }
);

const model = mongoose.model("verifyToken", verfiyTokenSchema);
export const schema = verfiyTokenSchema.obj;
export default model;
