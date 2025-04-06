"use client";
import SearchBar from "@md-blog/app/components/SearchBar";
import BlogList from "@md-blog/app/components/BlogList";
import { useEffect, useState } from "react";

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
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Blog Posts</h1>

      <SearchBar />
      <BlogList posts={posts} />
    </div>
  );
}
