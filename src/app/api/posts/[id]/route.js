import { connectDB } from "@md-blog/lib/db";
import Post from "@md-blog/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@md-blog/lib/authOptions";

export async function GET(req, { params }) {
  await connectDB();
  const post = await Post.findById(params.id).populate("author");
  if (!post)
    return Response.json({ message: "Post not found" }, { status: 404 });
  return Response.json(post);
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { title, content } = await req.json();
  await connectDB();
  const post = await Post.findById(params.id).populate("author");

  if (post.author.email !== session.user.email)
    return Response.json({ message: "Forbidden" }, { status: 403 });

  post.title = title;
  post.content = content;
  await post.save();

  return Response.json(post);
}

export async function POST(req, { params }) {
  const body = await req.formData();
  if (body.get("_method") === "DELETE") {
    return DELETE(req, { params });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const post = await Post.findById(params.id).populate("author");

  if (post.author.email !== session.user.email)
    return Response.json({ message: "Forbidden" }, { status: 403 });

  await post.deleteOne();
  return Response.json({ message: "Deleted" });
}
