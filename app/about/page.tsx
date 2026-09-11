import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const nav = [["Home","/"],["Shop","/shop"],["Services","/services"],["About","/about"],["Contact","/contact"]] as const;

export default function AboutPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>About Hands Gifted</span>
      <h1>Build the household first. Share what proves useful.</h1>
      <p>Hands Gifted is a faith-centered family-development venture being built from practical household needs, skills, learning, creativity, stewardship, opportunity, and service.</p>
    </section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Public website">{nav.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
      <div className="public-page-grid">
        <article className="public-page-card public-page-wide"><span className="status-label">Family-first model</span><h2>Hands Gifted starts at home.</h2><p>The model is intentionally practical: identify a real family need, learn or strengthen the skill, practice it in the household, document what works, improve the process, and only then decide whether it should become a public resource, product, service, or program.</p></article>
        <article className="public-page-card"><h3>Faith</h3><p>Faith shapes the values behind the work, including stewardship, character, family responsibility, modesty, learning, and service.</p></article>
        <article className="public-page-card"><h3>Family</h3><p>The household is the first place where systems, skills, routines, learning, and creative ideas are practiced and strengthened.</p></article>
        <article className="public-page-card"><h3>Skills & Opportunity</h3><p>Cooking, gardening, sewing, hair care, creative work, education, technology, entrepreneurship, and practical life skills can become pathways to stability and opportunity.</p></article>
        <article className="public-page-card public-page-wide"><h2>How the model develops</h2><div className="about-steps"><div className="about-step"><strong>1. Identify the need</strong>Start with an actual household or family-development need.</div><div className="about-step"><strong>2. Learn and practice</strong>Build the skill through real use, repetition, study, and responsible experimentation.</div><div className="about-step"><strong>3. Document and improve</strong>Keep evidence, lessons, recipes, projects, systems, and observations while protecting private family information.</div><div className="about-step"><strong>4. Share when ready</strong>Only mature ideas become public products, services, resources, or programs.</div></div></article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
