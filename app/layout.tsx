import type { Metadata } from "next";
import "./globals.css";
import "./visual-recovery.css";
import "./catalog-redesign.css";

export const metadata: Metadata = {
  title: "Hands Gifted | Faith, Family, Skills, Opportunity & Service",
  description: "Hands Gifted is a faith-centered family-development venture connecting practical skills, creativity, learning, opportunity, and service.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
