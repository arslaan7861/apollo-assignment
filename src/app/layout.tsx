import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
// import { seedDoctors } from "@/actions/populate";

import Filters from "@/components/Filters";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "General Physicians Near You | Apollo 24|7",
  description:
    "Book online consultations with top General Physicians. View profiles, ratings, and availability on Apollo 24|7.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // await seedDoctors();
  return (
    <html lang="en">
      <Head>
        <title>Best General Physicians Near You | Apollo 24|7</title>
        <meta
          name="description"
          content="Book online consultations with top General Physicians. View profiles, ratings, and availability on Apollo 24|7."
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-svw h-svh max-h-svh max-w-svw flex flex-col overflow-hidden`}
      >
        <Navbar />
        <Toaster />
        <main className="relative w-full min-h-full flex-grow overflow-y-auto overflow-x-hidden md:scrollbar-none">
          <article className="w-full h-full max-h-full flex flex-col items-center md:flex-row overflow-hidden">
            <Suspense fallback={<></>}>
              <Filters />
            </Suspense>
            {children}
          </article>
        </main>
      </body>
    </html>
  );
}
