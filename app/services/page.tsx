import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const nav = [["Home","/"],["Shop","/shop"],["Services","/services"],["About","/about"],["Contact","/contact"]] as const;

export default function ServicesPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Services</span>
      <h1>Offer what is ready. Keep building what is not.</h1>
      <p>Hands Gifted is a family-owned business in development. Current services stay clearly separated from skills and offers that are still being practiced, tested, priced, or organized.</p>
    </section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Public website">{nav.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
      <div className="public-page-grid">
        <article className="public-page-card"><span className="status-label">Available by inquiry</span><h2>Braiding</h2><p>Braiding is a skill that can be discussed now while the full style portfolio, pricing menu, booking process, and service policies continue to be organized.</p><a className="button gold" href="mailto:handsgifted322@gmail.com?subject=Hands%20Gifted%20Braiding%20Inquiry">Send a braiding inquiry</a></article>
        <article className="public-page-card"><span className="status-label">Building from family use</span><h2>Household & Learning Resources</h2><p>Organization tools, cooking and meal systems, gardening logs, learning resources, family routines, and practical-life materials are being developed through real use before public release.</p><a className="button" href="/programs">See development lanes</a></article>
        <article className="public-page-card"><span className="status-label">Future earning lanes</span><h2>Creative & Product Work</h2><p>Sewing, modest apparel, digital products, design, media, food-related concepts, and other skill-based services may become paid offers as capacity, compliance, quality, pricing, and delivery standards are established.</p><a className="button" href="/contact">Ask a question</a></article>
      </div>
      <div className="public-page-note"><strong>Proof before promises:</strong> Hands Gifted does not present an idea as a launched service until it can be delivered responsibly and consistently.</div>
    </section>
    <SiteFooter />
  </main>;
}
