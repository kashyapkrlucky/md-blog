import CredentialsProvider from "next-auth/providers/credentials";
import User from "@md-blog/models/User";
import { connectDB } from "./db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        console.log(user);

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // First time `user` is available
      if (user) {
        token._id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?._id) {
        session.user._id = token._id;
      }
      return session;
    },
  },
};
