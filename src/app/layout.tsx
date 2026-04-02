// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tap2Menu - Smart Restaurant QR Ordering Platform",
  description: "Multi-tenant restaurant QR code ordering SaaS platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <main className="pt-16"> {/* Add padding-top to prevent content from hiding under fixed navbar */}
            {children}
          </main>
                  <AppProvider>
      </body>
    </html>
  );
}
