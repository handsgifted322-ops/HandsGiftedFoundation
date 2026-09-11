import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const nav = [["Home","/"],["Shop","/shop"],["Services","/services"],["About","/about"],["Contact","/contact"]] as const;

export default function ServicesPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Services</span>
      <h1>Start with what is actually available.</h1>
      <p>Hands Gifted is still developing its broader service portfolio. This page separates what can be requested now from what is still being practiced, tested, or planned.</p>
    </section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Public website">{nav.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
      <div className="public-page-grid">
        <article className="public-page-card"><span className="status-label">Available by inquiry</span><h2>Braiding</h2><p>Current braiding inquiries can be discussed directly while the full style portfolio, pricing menu, booking process, and service policies are being organized.</p><a className="button gold" href="mailto:handsgifted322@gmail.com?subject=Hands%20Gifted%20Braiding%20Inquiry">Send a braiding inquiry</a></article>
        <article className="public-page-card"><span className="status-label">In development</span><h2>Family Skill Resources</h2><p>Cooking, gardening, sewing, organization, practical learning, and family-development resources are being tested through real household use before becoming formal services.</p><a className="button" href="/programs">See development lanes</a></article>
        <article className="public-page-card"><span className="status-label">Future service lane</span><h2>Creative & Product Support</h2><p>Design, modest apparel, digital resources, family learning tools, and related creative work may become additional public offerings as capacity and quality standards are established.</p><a className="button" href="/contact">Ask a question</a></article>
      </div>
      <div className="public-page-note"><strong>Clear availability matters:</strong> A service is not presented as launched until Hands Gifted can reliably deliver it. Current inquiries are handled case by case.</div>
    </section>
    <SiteFooter />
  </main>;
}
