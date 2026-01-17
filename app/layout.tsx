// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vireya Weather- By Dream",
  description: "Professional Weather Dashboard",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning yahan hona zaroori hai
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}
        suppressHydrationWarning // Extensions ke attributes ko ignore karne ke liye
      >
        {children}
      </body>
    </html>
  );
}