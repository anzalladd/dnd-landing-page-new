import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const signifier = localFont({
  src: [
    {
      path: "../../public/signifier-font-family/TestSignifier-Regular-BF663d8462c4c0b.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/signifier-font-family/TestSignifier-Medium-BF663d8462c7c04.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/signifier-font-family/TestSignifier-Bold-BF663d84626293d.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-signifier-local",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D&D Website",
  description: "D&D Website landing page layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${signifier.variable} font-sans antialiased min-h-screen bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
