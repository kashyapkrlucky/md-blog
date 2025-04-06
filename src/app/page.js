"use client";
import SearchBar from "@md-blog/app/components/SearchBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "./components/BlogCard";
import NoResults from "./components/NoResults";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts"); // Fetch all posts if no query
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex flex-row gap-4 justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Blogs</h1>
        <Link
          href={`/blog/new`}
          className="bg-emerald-600 text-white text-sm px-4 py-2 uppercase rounded-md cursor-pointer"
        >
          Create
        </Link>
      </div>
      <SearchBar setPosts={setPosts} />
      <div className="my-4">
        {posts && posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <BlogCard post={post} key={post._id} />
            ))}
          </div>
        ) : (
          <NoResults content="No posts found"></NoResults>
        )}
      </div>
    </div>
  );
}
