import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THESA Volleyball — Dallas Angels Classic",
  description: "Follow THESA volleyball teams live at the Dallas Angels Classic 2026 (HSAA Texas homeschool state tournament)",
  openGraph: {
    title: "THESA Volleyball — Dallas Angels Classic",
    description: "Follow THESA volleyball teams live at the Dallas Angels Classic 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THESA Volleyball — Dallas Angels Classic",
    description: "Follow THESA volleyball teams live at the Dallas Angels Classic 2026",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        {children}
      </body>
    </html>
  );
}
