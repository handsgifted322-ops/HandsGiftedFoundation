import type { Metadata } from "next";
import "./globals.css";
import "./visual-recovery.css";
import "./public-areas.css";
import "./catalog-redesign.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://handsgiftedfoundation.com"),
  title: "Hands Gifted | Children, Family, Faith & Practical Skills",
  description: "Hands Gifted is a faith-centered child and family development platform connecting learning, practical skills, scripture, family resources, original products, and services including Cooking, Gardening, Braiding, and Sewing.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
