import { Geist, Geist_Mono } from "next/font/google";
import NavHeader from "@md-blog/app/components/NavHeader";
import "./globals.css";
import ClientWrapper from "@md-blog/app/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          <NavHeader />
          <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        </ClientWrapper>
      </body>
    </html>
  );
}
