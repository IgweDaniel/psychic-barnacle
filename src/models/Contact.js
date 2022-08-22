import mongoose from "mongoose";

const { Schema } = mongoose;
const contactSchema = new Schema(
  {
    // Contact Name
    name: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Contacts", contactSchema);
export const schema = contactSchema.obj;
export default model;
