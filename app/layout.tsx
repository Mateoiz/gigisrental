import type { Metadata } from "next";
import { Geist, Geist_Mono, Parisienne } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";

const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-parisienne",
});

const kapakana = localFont({
  src: "../public/fonts/Kapakana-VariableFont_wght.ttf",
  variable: "--font-kapakana",
  display: "swap",
});

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
    default: "Gigi's Rental | Dress Rentals in the Philippines",
    template: "%s | Gigi's Rental",
  },
  description:
    "Gigi's Rental offers beautiful dresses for rent for weddings, debuts, proms, and special occasions in the Philippines. Browse our catalog and book today.",
  applicationName: "Gigi's Rental",
  authors: [{ name: "Ice Matthew Ramirez" }],
  keywords: [
    "Gigi's Rental",
    "Gigis Rental",
    "dress rental Philippines",
    "gown rental",
    "wedding dress rental",
    "debut dress rental",
    "prom dress rental",
    "formal wear rental",
  ],
  creator: "Ice Matthew Ramirez",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://gigisrental.com",
    title: "Gigi's Rental | Dress Rentals in the Philippines",
    description: "Beautiful dresses for rent for weddings, debuts, proms, and special occasions.",
    siteName: "Gigi's Rental",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gigi's Rental Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gigi's Rental | Dress Rentals in the Philippines",
    description: "Beautiful dresses for rent for weddings, debuts, proms, and special occasions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Paste the value Google Search Console gives you when you verify
    // google: "your-verification-code-here",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Gigi's Rental",
  alternateName: "Gigis Rental",
  url: "https://gigisrental.com",
  image: "https://gigisrental.com/og-image.jpg",
  description:
    "Gigi's Rental offers dress rentals for special occasions — browse our catalog and book your gown today.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PH",
  },
  priceRange: "₱₱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${parisienne.variable} ${kapakana.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SplashScreen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}