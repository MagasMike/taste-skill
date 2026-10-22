import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import "./globals.css";

const sans = Commissioner({
  variable: "--font-sans-family",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ISIMIKE – Authentic Thessaloniki Style",
  description: "ISIMIKE Foodtruck in Winnenden – Gyros, Souvlaki und Pitas im Authentic Thessaloniki Style. Speisekarte, Öffnungszeiten und Bestellung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${sans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
