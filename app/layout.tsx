import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hands Gifted Foundation | Build the Household. Serve the Community.",
  description: "Hands Gifted strengthens women, children, families, and households through faith, practical skills, stability, learning, creativity, and service.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
