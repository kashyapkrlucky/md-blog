"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavHeader() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>
        {session && <Link href="/dashboard" className="text-lg"></Link>}
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-lg">
              {session.user?.name || session.user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white p-2 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/login" className="text-lg">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
