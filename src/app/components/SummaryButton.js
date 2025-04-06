"use client";
import { useState, useRef } from "react";

export function SummaryButton({ postId }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);

  const getSummary = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Delay API call by 1 second
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/posts/${postId}/summary`);
        const json = await res.json();

        if (res.ok) {
          setSummary(json.summary);
        } else {
          setError(json.error || "Something went wrong");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div>
      <button
        onClick={getSummary}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Summarizing..." : "Get AI Summary"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-1">AI Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
