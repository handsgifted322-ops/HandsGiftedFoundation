import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const nav = [["Home","/"],["Shop","/shop"],["Services","/services"],["About","/about"],["Contact","/contact"]] as const;

export default function AboutPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>About Hands Gifted</span>
      <h1>Our family is where the business starts.</h1>
      <p>Hands Gifted is a faith-led, family-owned business in development. The immediate work is to strengthen our own household, build useful skills, create lawful income opportunities, and turn proven family learning into products, services, systems, and creative work.</p>
    </section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Public website">{nav.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
      <div className="public-page-grid">
        <article className="public-page-card public-page-wide"><span className="status-label">Family-first business model</span><h2>Build it at home before we scale it outside.</h2><p>We begin with actual family needs. We learn the skill, use it in real life, document the result, improve the process, and only then decide whether it is ready to become a product, service, learning resource, or public offer.</p></article>
        <article className="public-page-card"><h3>Faith</h3><p>Faith shapes character, stewardship, responsibility, family order, modesty, discipline, learning, and how we decide what is worth building.</p></article>
        <article className="public-page-card"><h3>Family First</h3><p>Our household is the first place Hands Gifted must create value. The business should support family stability, skill development, ownership, and long-term opportunity.</p></article>
        <article className="public-page-card"><h3>Skills into Opportunity</h3><p>Cooking, gardening, sewing, braiding, creative work, technology, education, organization, and entrepreneurship become meaningful when they can solve real problems and create useful results.</p></article>
        <article className="public-page-card public-page-wide"><h2>How Hands Gifted develops</h2><div className="about-steps"><div className="about-step"><strong>1. Start with the need</strong>Use the real household as the first source of problems worth solving.</div><div className="about-step"><strong>2. Learn and practice</strong>Study, repeat, test, and improve the skill through actual use.</div><div className="about-step"><strong>3. Create proof</strong>Build meals, projects, systems, portfolios, products, lessons, and other evidence of useful work.</div><div className="about-step"><strong>4. Build income responsibly</strong>Only mature work becomes a paid service, product, resource, or larger business lane.</div></div></article>
        <article className="public-page-card public-page-wide"><span className="status-label">Long-term direction</span><h2>Serving other families is a future expansion phase.</h2><p>Hands Gifted may eventually adapt proven systems and resources for other households. That remains part of the broader vision, but it does not replace the current priority: building a sustainable family business that strengthens our own household first.</p></article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
