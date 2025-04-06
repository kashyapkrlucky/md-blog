import { connectDB } from "@md-blog/lib/db";
import Post from "@md-blog/models/Post";
import User from "@md-blog/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@md-blog/lib/authOptions";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { SummaryButton } from "@md-blog/app/components/SummaryButton";

export default async function BlogPost({ params }) {
  const session = await getServerSession(authOptions);
  await connectDB();
  const { id } = await params;
  const post = await Post.findById(id).populate("author");

  if (!post) {
    return <p className="p-6 text-red-500">Post not found.</p>;
  }

  const isOwner = session?.user?.email === post.author.email;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">by {post.author.name}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>

      {isOwner && (
        <div className="flex gap-4 mt-4">
          <Link
            href={`/blog/${post._id}/edit`}
            className="text-blue-600 underline"
          >
            Edit
          </Link>
          <form action={`/api/posts/${post._id}`} method="POST">
            <input type="hidden" name="_method" value="DELETE" />
            <button type="submit" className="text-red-600 underline">
              Delete
            </button>
          </form>
          <SummaryButton postId={post._id.toString()} />
        </div>
      )}
    </div>
  );
}
