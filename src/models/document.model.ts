import { Schema, model } from "mongoose";

const DocumentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    content: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

const Document = model("Document", DocumentSchema);
export default Document;
