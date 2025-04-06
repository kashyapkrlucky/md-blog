import { getServerSession } from "next-auth";
import { authOptions } from "@md-blog/lib/authOptions";
import { connectDB } from "@md-blog/lib/db";
import Post from "@md-blog/models/Post";
import User from "@md-blog/models/User";

export async function GET(req) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q") || ""; // Search query
  const tag = url.searchParams.get("tag"); // Optional: Filter by tag

  let filter = {};
  if (tag) {
    filter = { tags: tag }; // Filter by tags
  }

  const posts = await Post.find({}).sort({ createdAt: -1 });

  return Response.json({ posts });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();
  if (!title || !content) {
    return Response.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  const newPost = new Post({
    title,
    content,
    author: user._id,
  });

  await newPost.save();

  return Response.json(newPost, { status: 201 });
}
