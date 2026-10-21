import type { Metadata } from "next";
import { Commissioner, Noto_Serif_Display } from "next/font/google";
import "./globals.css";

// Both families ship Greek glyphs, which the component's default Geist does not.
const sans = Commissioner({
  variable: "--font-sans-greek",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600"],
});

const serif = Noto_Serif_Display({
  variable: "--font-serif-greek",
  subsets: ["latin", "greek"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ISIMIKE",
  description: "ISIMIKE — το μαγαζί μας. Προϊόντα, ωράριο και επικοινωνία.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
