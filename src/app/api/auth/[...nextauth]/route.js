import NextAuth from "next-auth";
import { authOptions } from "@md-blog/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
