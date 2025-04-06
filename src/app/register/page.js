"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { useSession } from "next-auth/react";

export default function Register() {
  const { status } = useSession();
  const router = useRouter();
  const AppName = "WriterBase";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/"); // or your preferred page
    }
  }, [status, router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) router.push("/login");
    else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="w-full h-[54rem] flex items-center justify-center bg-gray-50">
      <div className="lg:w-1/3 w-full px-10 bg-white rounded-md shadow-xl border border-gray-200">
        <section className="flex-1 flex flex-col gap-1 py-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Sign up</h2>
            <p className="text-sm leading-6 tracking-wide">
              Already have an account at {AppName}?{" "}
              <Link href={"/login"} className={"px-1 text-gray-800"}>
                Login
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-10">
            <AppInput
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <AppInput
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <AppInput
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <AppButton
              type="submit"
              className="bg-blue-600 text-white p-2 rounded"
            >
              Sign Up
            </AppButton>
          </form>
          <div className="flex flex-col lg:flex-row gap-4">
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </section>

        <footer className="flex flex-row justify-center py-8 text-xs">
          <span>{AppName} &copy; 2024</span>
        </footer>
      </div>
    </div>
  );
}
