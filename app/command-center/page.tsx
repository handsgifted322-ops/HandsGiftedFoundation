import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { getSurface } from "../../lib/surface-map";

const modules = [
  ["Overview", "/command-center/overview", "Live counts across the operating system and a single starting point for parent/operator work."],
  ["Household", "/command-center/household", "Chores, weekly rotation, parent review, reminders, zones, routines and household verification."],
  ["Family Academy", "/command-center/academy", "Tracks, learning items, assignments, progress, help requests and parent feedback."],
  ["Website & Academy Content", "/command-center/content", "Create and organize Foundation and Academy content with durable Supabase readback."],
  ["Operations & Stability", "/command-center/operations", "Tasks, programs, projects, events, grants, needs, school administration and family-support work."],
  ["Products, Documents & Media", "/command-center/resources", "Products, brand assets, documents, creative resources and managed media inventory."],
  ["System Health", "/command-center/system-health", "Reality C.H.E.X. verification for integrations, sync, module state, requests and deployment readiness."],
] as const;

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
          <div className="secure-badge">This is the parent/operator control plane for both the public Foundation and the private Family Dashboard. It is organized around real persisted systems rather than placeholder cards.</div>
          <div className="hero-actions"><a className="button gold" href="/command-center/overview">Open Command Center Overview</a><a className="button" href="/family">Open Family Dashboard entry</a></div>
        </div>
        <div className="secure-card"><strong>Control standard</strong><ul><li>Create and organize</li><li>Assign and approve</li><li>Publish and verify</li><li>Protect private family records</li><li>Keep parent authority in the loop</li></ul></div>
      </section>
      <section className="section"><div className="section-heading left no-margin"><span>Command Center modules</span><h2>One operating system, separated by responsibility.</h2><p>Each module is connected to an existing data area or a verified management surface. A page that only reads data remains PARTIAL until its full write/readback workflow is tested.</p></div><div className="detail-grid" style={{marginTop:32}}>{modules.map(([title,href,description])=><article key={href}><span>PRIVATE CONTROL</span><h3>{title}</h3><p>{description}</p><a className="button" href={href}>Open {title}</a></article>)}</div></section>
      <section className="section"><div className="section-heading left no-margin"><span>Canonical scope</span><h2>Everything the Command Center is responsible for</h2></div><div className="detail-grid" style={{marginTop:32}}>{surface.includes.map(item=><article key={item}><h3>{item}</h3></article>)}</div></section>
      <SiteFooter />
    </main>
  );
}
