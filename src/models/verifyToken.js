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

const model = mongoose.model("verifyToken", verfiyTokenSchema);
export const schema = verfiyTokenSchema.obj;
export default model;
