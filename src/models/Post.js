import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
// Create a text index on title and content fields for search
postSchema.index({ title: "text", content: "text" });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
