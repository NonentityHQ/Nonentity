import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--sans" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--serif", style: ["normal", "italic"] });

export const metadata = {
  title: "Nonentity — Independent Software Studio",
  description: "We design, build and scale modern software products, AI systems and automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
