import { connectDB } from "@md-blog/lib/db";
import Post from "@md-blog/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@md-blog/lib/authOptions";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
// import { SummaryButton } from "@md-blog/app/components/SummaryButton";
import { ChevronLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import CommentSection from "@md-blog/app/components/CommentSection";
import DeleteButton from "@md-blog/app/components/DeleteButton";

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
    <article className="max-w-7xl mx-auto p-6 lg:px-0 space-y-8">
      <header className="flex flex-row gap-4 items-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-black"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </Link>
        <h1 className="text-3xl font-bold">{post.title}</h1>{" "}
        {isOwner && (
          <div className="flex flex-row">
            <Link
              href={`/blog/${post._id}/edit`}
              className="text-emerald-600 text-xs px-3 py-1 uppercase rounded-md cursor-pointer"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </Link>
            <DeleteButton apiPath="/api/posts" id={post?._id} />
          </div>
        )}
      </header>
      <p className="text-sm text-gray-500">by {post.author.name}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {/* <SummaryButton postId={post._id.toString()} /> */}
      {/* ... Post content */}
      <CommentSection postId={post._id.toString()} />
    </article>
  );
}
