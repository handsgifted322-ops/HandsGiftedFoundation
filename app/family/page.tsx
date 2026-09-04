import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { getSurface } from "../../lib/surface-map";

export default function FamilyPage() {
  const surface = getSurface("family_dashboard");
  return (
    <main>
      <SiteHeader />
      <section className="secure-hero family-access">
        <div>
          <span>{surface.audienceLabel}</span>
          <h1>Family Dashboard</h1>
          <p>{surface.description}</p>
          <div className="secure-badge">Private household records are rendered only after authentication and household-member authorization.</div>
          <div className="hero-actions"><a className="button gold" href="/family/dashboard">Open My Family Dashboard</a></div>
        </div>
        <div className="secure-card">
          <strong>Family-facing tools</strong>
          <ul>{surface.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          <a className="button" href="/academy">Explore public Academy overview</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
