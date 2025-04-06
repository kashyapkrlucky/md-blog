import { getServerSession } from "next-auth";
import { authOptions } from "@md-blog/lib/authOptions";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl">Access Denied</h1>
        <Link href="/login" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {session.user.name}!</h1>
      <p className="text-gray-600">You are signed in as {session.user.email}</p>

      <form action="/api/auth/signout" method="POST">
        <button type="submit" className="bg-red-600 text-white p-2 rounded">
          Logout
        </button>
      </form>
    </div>
  );
}
