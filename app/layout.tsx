import type { Metadata } from "next";
import "./globals.css";
import "./visual-recovery.css";
import "./public-areas.css";
import "./catalog-redesign.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://handsgiftedfoundation.com"),
  title: "Hands Gifted | Built at Home. Made with Purpose.",
  description: "Hands Gifted is a faith-led, family-owned business in development, building practical skills, products, services, learning systems, and income opportunities from real family life.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
