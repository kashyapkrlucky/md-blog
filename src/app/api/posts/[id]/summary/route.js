import { NextResponse } from "next/server";

import Post from "@md-blog/models/Post";

export async function GET(req, { params }) {
  const { id } = await params;
  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: `Summarize the following blog post:\n\n${post.content}`,
        stream: false,
      }),
    });

    const data = await res.json();

    return NextResponse.json({ summary: data.response });
  } catch (err) {
    console.error("Ollama error:", err);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
