import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divinity Crafting Companion",
  description: "All ingredients and recipes in one easy lookup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"dark:bg-gray-900 dark:text-white"}
      >
        <nav className="dark:bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-lg font-bold">
              Divinity Original Sin 2 Crafting Companion ***WIP***
            </Link>
            <div className="space-x-4">
              <Link href="/items" className="text-white hover:text-gray-300">
                Items
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
