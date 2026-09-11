import type { Metadata } from "next";
import "./globals.css";
import "./visual-recovery.css";
import "./public-areas.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://handsgiftedfoundation.com"),
  title: "Hands Gifted Foundation | Build the Household. Serve the Community.",
  description: "Hands Gifted strengthens women, children, families, and households through faith, practical skills, stability, learning, creativity, and service.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
