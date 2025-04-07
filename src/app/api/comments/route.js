import { getServerSession } from "next-auth";
import { authOptions } from "@md-blog/lib/authOptions";
import { connectDB } from "@md-blog/lib/db";
import Comment from "@md-blog/models/Comment";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { postId, content } = await req.json();

  const comment = await Comment.create({
    postId,
    userId: session.user._id,
    username: session.user.name || session.user.email,
    content,
  });

  return Response.json({ comment }, { status: 201 });
}

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

  return Response.json({ comments });
}
