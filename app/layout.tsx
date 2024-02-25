import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tamhattan",
  description: "Everything you need to about the city of Tampere. Tamhattan",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/public/vaakuna.svg',
        href: '/public/vaakuna.svg',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
