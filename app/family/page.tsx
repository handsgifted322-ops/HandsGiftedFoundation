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
          <div className="secure-badge">
            No child or household records are exposed on this public preview. Authentication and role-aware authorization must be verified before personal family data is rendered here.
          </div>
        </div>
        <div className="secure-card">
          <strong>Family-facing tools</strong>
          <ul>
            {surface.includes.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a className="button" href="/academy">Explore public Academy overview</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
