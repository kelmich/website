import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";

const mono = IBM_Plex_Mono({
  weight: "400",
});
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Keller",
  description: "Personal Webpage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.className} antialiased`}>{children}</body>
    </html>
  );
}
