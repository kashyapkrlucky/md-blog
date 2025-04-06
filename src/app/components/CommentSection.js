"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CommentSection({ postId }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data.comments);
  };

  const submitComment = async () => {
    if (!content.trim()) return;

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ postId, content }),
    });

    setContent("");
    fetchComments(); // refresh
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-2">Comments</h3>

      {session ? (
        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={submitComment}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Login to add a comment.</p>
      )}

      <ul className="space-y-4 mt-4">
        {comments.map((comment) => (
          <li key={comment._id} className="bg-gray-100 p-3 rounded">
            <div className="text-sm font-semibold">{comment.username}</div>
            <div className="text-sm text-gray-600">{comment.content}</div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
