import localFont from "next/font/local";
import "./globals.css";

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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${samsung.variable} antialiased`}>{children}</body>
    </html>
  );
}
