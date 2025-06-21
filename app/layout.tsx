import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { AppProvider } from "@/contextStore/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataInfo = {
  name: "Chatterly",
  title: "Chat app",
  description:
    "Chatterly is a modern, full-stack chat application built with Next.js and Supabase. It enables users to sign in using Google authentication and chat with other users in real-time.",
  url: process.env.NEXT_PUBLIC_URL,
  author: "Chijindu Okpalanweze",
  image: `${process.env.NEXT_PUBLIC_URL}/opengraph-image.png`,
  twitterHandle: "@MartinJindu",
  keywords: [
    "chatterly",
    "chat app",
    "Supabase",
    "real-time",
    "sql",
    "full stack developer",
    "next.js developer",
    "frontend developer",
    "backend developer",
    "Chijindu Okpalanweze",
  ],
};
export const metadata: Metadata = {
  title: {
    default: `${metadataInfo.name} | ${metadataInfo.title}`,
    template: `%s | ${metadataInfo.name}`,
  },
  description: metadataInfo.description,

  authors: [
    {
      name: metadataInfo.author,
      url: "https://okpalanweze-chijindu.vercel.app/",
    },
  ],
  creator: metadataInfo.author,

  keywords: metadataInfo.keywords,
  publisher: metadataInfo.author,
  applicationName: metadataInfo.name,

  // Canonical URL
  metadataBase: new URL(metadataInfo.url as string),
  alternates: {
    canonical: "/",
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: metadataInfo.url,
    title: `${metadataInfo.name} | ${metadataInfo.title}`,
    description: metadataInfo.description,
    siteName: `${metadataInfo.name} | ${metadataInfo.title}`,
    images: [
      {
        url: metadataInfo.image,
        width: 2508,
        height: 1792,
        alt: `${metadataInfo.name} - ${metadataInfo.title}`,
      },
    ],
  },

  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: `${metadataInfo.name} | ${metadataInfo.title}`,
    description: metadataInfo.description,
    creator: metadataInfo.twitterHandle,
    images: [metadataInfo.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 flex md:flex-row min-h-screen  text-white overflow-hidden `}
      >
        <AppProvider>
          <Sidebar />
          <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
            <Navbar />
            <main className="flex-1  overflow-y-auto md:rounded-lg md:p-2">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
