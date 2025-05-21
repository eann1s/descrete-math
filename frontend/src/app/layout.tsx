import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discrete Math",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 p-4`}
      >
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">
            Discrete Mathematics Explorer
          </h1>
          <Navigation />
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="mt-12 pt-4 border-t border-gray-200 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Discrete Mathematics Explorer</p>
        </footer>
      </body>
    </html>
  );
}
