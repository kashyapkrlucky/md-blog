"use client";
import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <div className="border border-gray-300 p-4 rounded shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        <Link href={`/posts/${post._id}`}>{post.title}</Link>
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(post.createdAt).toLocaleDateString()} · {post.tag}
      </p>
      <p className="text-gray-700 line-clamp-3">{post.content}</p>

      <div className="mt-4 flex justify-between items-center">
        <Link
          href={`/blog/${post._id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Read more →
        </Link>
        <span className="text-xs text-gray-400">
          by {post.author?.name || "Unknown"}
        </span>
      </div>
    </div>
  );
}
