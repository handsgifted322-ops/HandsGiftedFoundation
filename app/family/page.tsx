import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { getSurface } from "../../lib/surface-map";

const children = [
  { slug: "isayah", name: "Isayah" },
  { slug: "caleb", name: "Caleb" },
  { slug: "amiyah", name: "Amiyah" },
  { slug: "kaliyah", name: "Kaliyah" },
  { slug: "ayahnna", name: "Ayahnna" },
];

export default function FamilyPage() {
  const surface = getSurface("family_dashboard");
  return (
    <main>
      <SiteHeader />
      <section className="secure-hero family-access">
        <div>
          <span>{surface.audienceLabel}</span>
          <h1>Family Dashboard</h1>
          <p>Choose your name to open your family workspace. No child sign-up is required for this first navigation step.</p>
          <div className="secure-badge">Only the child name and safe dashboard shell are available without sign-in. Private assignments and household records stay protected until account access is connected later.</div>
        </div>
        <div className="secure-card">
          <strong>Who are you?</strong>
          <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
            {children.map((child) => (
              <a className="button" key={child.slug} href={`/family/dashboard?child=${child.slug}`}>{child.name}</a>
            ))}
          </div>
          <a className="button gold" style={{ marginTop: 14 }} href="/academy">Explore public Academy</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
