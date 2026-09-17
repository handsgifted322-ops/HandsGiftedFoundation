import type { Metadata } from "next";
import "./globals.css";
import "./visual-recovery.css";
import "./public-areas.css";
import "./catalog-redesign.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://handsgiftedfoundation.com"),
  title: "Hands Gifted | Children, Family, Faith & Life Skills",
  description: "Hands Gifted is a faith-centered child and family development resource platform providing practical learning, life-skills guidance, scripture study pathways, family resources, and deeper tools.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
