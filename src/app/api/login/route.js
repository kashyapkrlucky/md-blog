import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  // For simplicity, assume a static check. Replace with database check.
  if (username === "testuser" && password === "testpassword") {
    const token = jwt.sign({ username }, "secret_key", { expiresIn: "1h" }); // Create JWT token
    return NextResponse.json({ message: "Login successful", token });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
