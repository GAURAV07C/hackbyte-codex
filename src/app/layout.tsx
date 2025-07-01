import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { AdminProvider } from "@/lib/admin-context";
import { WebinarProvider } from "@/lib/webinar-context";
import { Toaster } from "@/components/ui/toaster";
import { NotificationProvider } from "@/components/dashboard/notification-provider";

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
    icon: "/fav.jpg", // ✅ correct path
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AdminProvider>
            <WebinarProvider>
              <NotificationProvider>
                {children}

                <Toaster />
              </NotificationProvider>
            </WebinarProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
