import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";

const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
});

export const metadata: Metadata = {
  title: "NepalSports Hub",
  description: "The ultimate platform for Nepali sports.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mukta.variable} font-sans antialiased bg-[#F8FBFF]`}
      >
        <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#F8FBFF] shadow-2xl relative">
          <Header />
          <div className="flex-1 pb-24">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
