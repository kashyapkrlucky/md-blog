"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ setPosts }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 900); // 500ms delay

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    // if (!query) return;

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/posts/search?q=${debouncedQuery}&tag=${tag}`
      );
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };

    fetchPosts();
  }, [debouncedQuery, tag, setPosts]);

  return (
    <div className="my-4 py-4">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded border border-gray-300 mb-4 w-2/3"
        />
        <select
          onChange={(e) => setTag(e.target.value)}
          className="p-2 rounded border border-gray-300 mb-4 w-1/3"
        >
          <option value="">All Tags</option>
          <option value="react">React</option>
          <option value="nextjs">Next.js</option>
          <option value="ai">AI</option>
          <option value="nodejs">Node.js</option>
        </select>
      </div>

      {query && (
        <div className="mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="text-sm text-gray-500">{`Showing results for "${query}"`}</p>
          )}
        </div>
      )}
    </div>
  );
}
