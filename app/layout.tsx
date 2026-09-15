import type { Metadata } from "next";
import "./globals.css";
import "./visual-recovery.css";
import "./public-areas.css";
import "./catalog-redesign.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://handsgiftedfoundation.com"),
  title: "Hands Gifted | Practical Household Systems",
  description: "Hands Gifted is developing a practical Family Household Operating System for women and mothers managing busy or rebuilding households.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
