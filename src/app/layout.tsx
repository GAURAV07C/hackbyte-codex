import type { Metadata } from "next";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import Loading from "./loading";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hackbyte Codex",
  description:
    "Join live interactive webinars with industry experts. Learn cutting-edge skills and network with professionals worldwide.",

  icons: {
  icon: "/globe.svg",
}

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Force browser to load this favicon */}
        <link rel="icon" href="/fav.png?v=1" type="image/png" />
      </Head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ReactQueryProvider>
            <Loading />
            {children}

            <Toaster />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
