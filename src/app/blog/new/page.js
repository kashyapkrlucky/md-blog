"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPost() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/blog/${data._id}`);
    } else {
      const err = await res.json();
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Post title"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="content"
          rows={10}
          value={form.content}
          onChange={handleChange}
          placeholder="Write your markdown content here..."
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
