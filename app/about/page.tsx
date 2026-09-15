import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const nav = [["Home","/"],["Journey","/journey"],["Household System","/household-system"],["Explore","/programs"],["About","/about"],["Contact","/contact"]] as const;

export default function AboutPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>About Hands Gifted</span>
      <h1>A real rebuilding journey before a finished business story.</h1>
      <p>Hands Gifted is a faith-centered, family-first vision being developed through real household life. The work begins with practical skills, family responsibilities, learning, and honest progress—then asks what can responsibly grow into a system, resource, product, service, class, or future opportunity.</p>
    </section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Public website">{nav.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
      <div className="public-page-grid">
        <article className="public-page-card public-page-wide"><span className="status-label">The core idea</span><h2>Use your hands. Strengthen the household. Build from proof.</h2><p>Hands Gifted starts with what is actually being lived and learned: caring for family, cooking, budget shopping, organizing the home, braiding and natural hair care, learning to sew, developing practical skills, studying Scripture, creating, and building greater stability. The goal is not to present every idea as already accomplished. The goal is to document honest growth and let mature work earn its next stage.</p></article>
        <article className="public-page-card"><h3>Faith</h3><p>Biblical convictions guide the founder’s decisions about stewardship, modesty, household responsibility, character, family, service, and the pace of growth.</p></article>
        <article className="public-page-card"><h3>Family First</h3><p>The household is the first place a skill or system should create value. Business development should strengthen family life rather than require the family to perform as a business.</p></article>
        <article className="public-page-card"><h3>Hands-On Growth</h3><p>Cooking, braiding, organization, beginner sewing, creative work, and other practical skills are learned through use. Some skills are already practiced; others remain learning goals or future ideas.</p></article>
        <article className="public-page-card public-page-wide"><h2>How an idea earns its next stage</h2><div className="about-steps"><div className="about-step"><strong>1. Live it</strong>Start with a real need, responsibility, interest, or skill in everyday life.</div><div className="about-step"><strong>2. Learn and practice</strong>Study, repeat, make mistakes, correct them, and build competence.</div><div className="about-step"><strong>3. Document proof</strong>Record the work, process, result, cost, lesson, or system without exaggerating maturity.</div><div className="about-step"><strong>4. Test usefulness</strong>Decide whether the work should stay personal, become family content, become a prototype, or be tested with others.</div><div className="about-step"><strong>5. Build income responsibly</strong>Only work with enough skill, demand, quality, safety, capacity, and business readiness becomes a paid offer.</div></div></article>
        <article className="public-page-card public-page-wide"><span className="status-label">Current business focus</span><h2>The Household Operating System is one business test inside a larger vision.</h2><p>Household organization is already being practiced and systematized, so it is the current 90-day offer-development focus. That focus creates discipline without reducing Hands Gifted to a planner company or implying that cooking, braiding, sewing, modest apparel, family learning, and other future lanes no longer matter.</p></article>
        <article className="public-page-card public-page-wide"><span className="status-label">Long-term direction</span><h2>Teach from maturity, not aspiration.</h2><p>Future possibilities include modest apparel, headwraps, household goods, recipes, digital resources, classes, workshops, kits, events, and other family-centered products or learning experiences. They remain future work until they are genuinely developed and ready.</p></article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
