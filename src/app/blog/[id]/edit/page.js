"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppInput from "@md-blog/app/components/AppInput";

export default function EditPost({ params }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const { id } = params;
  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setForm({ title: data.title, content: data.content }));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push(`/blog/${id}`);
    } else {
      const err = await res.json();
      setError(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <AppInput
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={10}
          className="w-full h-96 p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg focus:outline-none transition-all duration-300"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
