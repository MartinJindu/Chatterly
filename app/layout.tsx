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

export const metadata: Metadata = {
  title: "Chatterly",
  description: "Connect. Communicate. Collaborate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 flex md:flex-row min-h-screen  text-white `}
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
