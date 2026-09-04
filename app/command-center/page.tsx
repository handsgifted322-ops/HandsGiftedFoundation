import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { getSurface } from "../../lib/surface-map";

export default function CommandCenterPage() {
  const surface = getSurface("command_center");

  return (
    <main>
      <SiteHeader />
      <section className="secure-hero">
        <div>
          <span>{surface.audienceLabel}</span>
          <h1>Hands Gifted Command Center</h1>
          <p>{surface.description}</p>
          <div className="secure-badge">
            The Command Center is the control plane for the Foundation and Family Dashboard. The first real management slice is now Website & Academy Content.
          </div>
          <div className="hero-actions">
            <a className="button gold" href="/command-center/content">Open content management</a>
          </div>
        </div>
        <div className="secure-card">
          <strong>Command Center modules</strong>
          <ul>
            {surface.includes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
