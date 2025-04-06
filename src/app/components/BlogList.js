import React from "react";
import Link from "next/link";

export default function BlogList({ posts }) {
  return (
    <div className="my-4">
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id} className="border-b py-2">
              <h3 className="font-semibold">
                <Link
                  href={`/blog/${post._id}`}
                  className="hover:text-blue-500"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm">{post.content.substring(0, 100)}...</p>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
