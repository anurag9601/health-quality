import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserProvider from "@/context/userContext";
import DynamicMeta from "./DynamicMeta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DynamicMeta />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh w-dvw`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
