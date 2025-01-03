import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { WheelProvider } from "./context/WheelContext";
import WheelCount from "./components/WheelCount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WheelProvider>
        <body className="flex flex-col min-h-screen text-white">
          <header className="sticky top-0 z-50 shadow-md py-4 px-4 sm:px-10 bg-slate-800 min-h-70 tracking-wide flex justify-between">
            <Link href={"/gems"} className="text-2xl">
              Gems
            </Link>
            <Link href={"/the-wheel"} className="text-2xl">
              The Wheel (<WheelCount />)
            </Link>
            <Link href={"/currency"} className="text-2xl">
              Currency
            </Link>
          </header>
          <main className="flex-grow mx-5 my-5">{children}</main>
          <footer className="py-4 bg-gray-800 text-center text-sm text-gray-400">
            <p>© 2024 Path of Exile utility page</p>
            <p>Examensarbete</p>
          </footer>
        </body>
      </WheelProvider>
    </html>
  );
}
