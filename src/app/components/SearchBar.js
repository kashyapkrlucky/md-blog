"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ setPosts }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/posts/search?q=${query}&tag=${tag}`);
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };

    fetchPosts();
  }, [query, tag, setPosts]);

  return (
    <div className="my-4 p-4 border rounded bg-gray-100">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 rounded border mb-4 w-full"
      />
      <select
        onChange={(e) => setTag(e.target.value)}
        className="p-2 rounded border mb-4 w-full"
      >
        <option value="">All Tags</option>
        <option value="react">React</option>
        <option value="nextjs">Next.js</option>
        <option value="ai">AI</option>
        <option value="nodejs">Node.js</option>
      </select>

      <div className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p className="text-sm text-gray-500">{`Showing results for "${query}"`}</p>
        )}
      </div>
    </div>
  );
}
