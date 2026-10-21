import type { Metadata } from "next";
import { Commissioner, Noto_Serif_Display } from "next/font/google";
import "./globals.css";

const sans = Commissioner({
  variable: "--font-sans-family",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const serif = Noto_Serif_Display({
  variable: "--font-serif-family",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ISIMIKE",
  description: "ISIMIKE – Ihr Laden in der Nachbarschaft. Sortiment, Öffnungszeiten und Kontakt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
