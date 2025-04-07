"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();
  const AppName = "WriterBase";
  const [form, setForm] = useState({ email: "", password: "" });
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
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.ok && !res.error) {
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="w-full h-[48rem] lg:h-[54rem] flex items-center justify-center bg-gray-50 p-6">
      <div className="lg:w-1/3 w-full px-6 lg:px-10 bg-white rounded-md shadow-xl border border-gray-200">
        <section className="flex-1 flex flex-col gap-1 py-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="text-sm leading-6 tracking-wide">
              New to {AppName}?{" "}
              <Link href={"/register"} className={"px-1 text-gray-800"}>
                Join Now
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 my-10"
            method="POST"
          >
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
              className="mt-8 bg-gray-600 hover:bg-gray-800 focus-visible:outline-gray-600"
            >
              Sign In
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
