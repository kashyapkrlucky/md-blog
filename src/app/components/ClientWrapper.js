"use client"; // This ensures it's a client component

import { SessionProvider } from "next-auth/react";

export default function ClientWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
