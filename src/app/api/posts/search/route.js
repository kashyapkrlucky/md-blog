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
    ...filter,
    $text: { $search: query }, // Text search on title and content
  }).sort({ createdAt: -1 });

  return Response.json({ posts });
}
