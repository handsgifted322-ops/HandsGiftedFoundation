import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const serviceLanes = [
  ["Resource Navigation", "Public resource pages can help families find verified outside programs, youth opportunities, and practical support. Basic access information should remain free."],
  ["Learning & Life-Skills Resources", "Hands Gifted can develop structured lessons, activity packs, workbooks, family learning paths, and practical skill resources for children and caregivers."],
  ["Household Systems", "Deeper planning systems, routines, checklists, SOP collections, meal/inventory tools, and implementation resources can be offered as products or guided services."],
  ["Workshops & Classes", "Future workshops may cover practical life skills, family organization, children's learning, technology, cooking, sewing, or other developed areas only after the material and delivery model are ready."],
  ["Membership / Resource Library", "A future subscription can provide organized access to deeper lessons, downloads, updated resource collections, family tools, and member-only learning pathways."],
  ["Collaboration & Community Work", "Hands Gifted may work with verified organizations, educators, youth programs, vendors, or community groups when a real relationship and clear scope exist."],
] as const;

export default function ServicesPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Services & Deeper Support</span>
      <h1>Free information first. Deeper support when it is ready.</h1>
      <p>The public resource center is designed to be genuinely useful on its own. Products, memberships, classes, workshops, and direct services are separate deeper layers and should only be offered when Hands Gifted has developed the content, process, pricing, safety standards, and delivery needed to support them well.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/resources">Use public resources</a><a className="button" href="/contact">Ask about availability</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        {serviceLanes.map(([title,body])=><article className="public-page-card" key={title}><span className="status-label">Service pathway</span><h2>{title}</h2><p>{body}</p></article>)}
        <article className="public-page-card public-page-wide">
          <span className="status-label">Current availability standard</span>
          <h2>Do not confuse a future service lane with a service that can be purchased today.</h2>
          <p>Hands Gifted will clearly label what is available now, what is accepting interest, what is being piloted, and what remains in development. Public resource information does not create a professional-client relationship and does not replace licensed medical, legal, financial, mental-health, educational, or social-service professionals.</p>
        </article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
