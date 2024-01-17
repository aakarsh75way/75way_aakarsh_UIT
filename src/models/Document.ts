import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
  allowedRoles: [{ type: String, required: true }],
  allowedUsers: [{ type: String }],
  permission: {type: String,enum: ["public", "private"], default: "private"},
});

const Document =
  mongoose.models.Document || mongoose.model("Documents", documentSchema);
export default Document;
