import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SiteDataProvider } from "@/lib/SiteDataContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LACA: Los Angeles Concierge Association",
  description:
    "The Los Angeles Concierge Association fosters the education and development of its members while maintaining the highest professional and ethical standards, shaping how the world experiences LA.",
  keywords: [
    "Los Angeles",
    "concierge",
    "hospitality",
    "LACA",
    "hotel",
    "luxury",
    "trade show",
    "expo",
  ],
  openGraph: {
    title: "LACA: Los Angeles Concierge Association",
    description:
      "In Service Through Friendship, uniting LA's finest hospitality professionals.",
    url: "https://thelaca.com",
    siteName: "LACA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <SiteDataProvider>{children}</SiteDataProvider>
      </body>
    </html>
  );
}