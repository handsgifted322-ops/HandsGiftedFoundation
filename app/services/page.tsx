import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const nav = [["Home","/"],["Household System","/household-system"],["R&D","/programs"],["About","/about"],["Contact","/contact"]] as const;

export default function ServicesPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Current Focus</span>
      <h1>One flagship first.</h1>
      <p>The current business-development focus is the Hands Gifted Family Household Operating System. Other skills and concepts remain internal research and development unless validation supports a later launch.</p>
    </section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Public website">{nav.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
      <div className="public-page-grid">
        <article className="public-page-card"><span className="status-label">90-day flagship</span><h2>Family Household Operating System</h2><p>A practical system in development for women and mothers managing busy or rebuilding households, bringing recurring planning, meals, inventory, resets, responsibilities, schedules, and simple SOPs into one clearer operating approach.</p><a className="button gold" href="/household-system">See the flagship</a></article>
        <article className="public-page-card"><span className="status-label">Validation</span><h2>Pilot & Customer Feedback</h2><p>Hands Gifted is validating whether the target customer understands the household-overload problem, wants the system, uses it, and finds it valuable enough to pay for.</p><a className="button" href="/contact">Ask about participating</a></article>
        <article className="public-page-card"><span className="status-label">Internal R&amp;D</span><h2>Skills & Development Lanes</h2><p>Cooking, gardening, sewing, hair/self-care, Family Academy, creative work, and related concepts continue as research, household practice, and content evidence rather than separate active business launches.</p><a className="button" href="/programs">See R&amp;D lanes</a></article>
      </div>
      <div className="public-page-note"><strong>Proof before expansion:</strong> Hands Gifted will not treat every useful skill or idea as a separate launched business. New public offers move forward only when the flagship focus and evidence support them.</div>
    </section>
    <SiteFooter />
  </main>;
}
