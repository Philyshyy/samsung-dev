import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/shared/header";

const samsung = localFont({
  src: [
    {
      path: "../public/fonts/samsungsharpsans.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/samsungsharpsans-medium.otf",
      weight: "600",
      style: "medium",
    },
    {
      path: "../public/fonts/samsungsharpsans-bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-samsung",
});

export const metadata: Metadata = {
  title: "Samsung | Главная",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${samsung.variable} antialiased`}>
        <main className="min-h-screen">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
