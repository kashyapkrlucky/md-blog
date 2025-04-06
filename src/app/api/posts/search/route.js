import Post from "@md-blog/models/Post";
import { connectDB } from "@md-blog/lib/db";

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const query = url.searchParams.get("q") || ""; // Search query

  const tag = url.searchParams.get("tag"); // Optional: Filter by tag

  let filter = {};
  if (tag) {
    filter = { tags: tag }; // Filter by tags
  }

  const posts = await Post.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
      { tags: { $regex: tag, $options: "i" } },
    ],
  })
    .populate("author", { name: 1 })
    .sort({ createdAt: -1 });

  return Response.json({ posts });
}
