import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, Boldonse } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const boldonse = Boldonse({
  variable: "--font-boldonse",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Success Algorithm Studios",
  description:
    "A dark room. One lamp. Everything that matters happens inside the light.",
};

export const viewport: Viewport = {
  themeColor: "#070503",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${boldonse.variable} h-full antialiased`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
