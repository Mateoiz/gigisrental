import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashScreen from "./components/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gigisrental.com"),
  title: {
    default: "Gigi's Rental",
    template: "%s | Gigi's Rental",
  },
  description: "Your premier destination for reliable and high-quality rentals. Browse our catalog and book today.",
  applicationName: "Gigi's Rental",
  authors: [{ name: "Ice Matthew Ramirez" }],
  keywords: ["rentals", "equipment", "booking", "services", "Gigi's Rental"],
  creator: "Ice Matthew Ramirez",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://gigisrental.com",
    title: "Gigi's Rental",
    description: "Your premier destination for reliable and high-quality rentals.",
    siteName: "Gigi's Rental",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add an image at public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Gigi's Rental Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gigi's Rental",
    description: "Your premier destination for reliable and high-quality rentals.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}