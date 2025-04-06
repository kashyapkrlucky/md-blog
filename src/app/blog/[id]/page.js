import { connectDB } from "@md-blog/lib/db";
import Post from "@md-blog/models/Post";
import User from "@md-blog/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@md-blog/lib/authOptions";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
// import { SummaryButton } from "@md-blog/app/components/SummaryButton";
import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

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
    <article className="max-w-7xl mx-auto py-6 mt-16 space-y-8">
      <header className="flex flex-row gap-4 items-center">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {isOwner && (
          <div className="flex flex-row">
            <Link
              href={`/blog/${post._id}/edit`}
              className="text-emerald-600 text-xs px-3 py-1 uppercase rounded-md cursor-pointer"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </Link>
            <form action={`/api/posts/${post._id}`} method="POST">
              <input type="hidden" name="_method" value="DELETE" />
              <button
                type="submit"
                className="text-red-600 text-xs px-3 py-1 uppercase rounded-md cursor-pointer"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>
      <p className="text-sm text-gray-500">by {post.author.name}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {/* <SummaryButton postId={post._id.toString()} /> */}
    </article>
  );
}
