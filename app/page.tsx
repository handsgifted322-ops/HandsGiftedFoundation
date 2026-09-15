import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { PublicAreaNav } from "../components/PublicAreaNav";
import { exploreItems } from "../lib/explore";

const systemParts = [
  ["Weekly household planning", "Bring schedules, priorities, preparation, and family follow-through into one weekly view."],
  ["Meals & inventory", "Plan meals, track what is on hand, and reduce last-minute grocery and dinner decisions."],
  ["Cleaning & resets", "Use repeatable room resets and simple standards instead of rebuilding the routine from memory."],
  ["Children’s responsibilities", "Make age-appropriate responsibilities visible, consistent, and easier to verify."],
  ["Family scheduling", "Coordinate school, work, appointments, preparation, and recurring household rhythms."],
  ["Simple household SOPs", "Turn recurring tasks into clear procedures that can be followed, improved, and reused."],
] as const;

const validationPath = [
  ["01", "Build from real household use", "We test the systems internally before translating the useful parts into customer-facing tools."],
  ["02", "Keep the offer focused", "The current business focus is one household operating system—not many unrelated launches at once."],
  ["03", "Learn from target users", "We are validating whether women and mothers managing busy or rebuilding households understand, want, and use the system."],
  ["04", "Expand only from evidence", "Cooking, gardening, sewing, hair, Family Academy, and other work remain research and development unless evidence supports promotion."],
] as const;

export default function Home(){
  const rAndD = exploreItems.slice(0, 6);

  return <main className="hg-home">
    <SiteHeader />

    <section className="hg-hero">
      <div className="hg-hero-copy">
        <div className="hg-kicker">Practical household systems • Family-tested • Built for real life</div>
        <h1>Less scattered.<br/><span>More organized at home.</span></h1>
        <p className="hg-hero-lead">Hands Gifted is developing one practical Family Household Operating System for women and mothers managing busy or rebuilding households—bringing meals, schedules, routines, responsibilities, inventory, and household procedures into a clearer system.</p>
        <div className="hg-hero-actions">
          <a className="button gold" href="/household-system">See the household system</a>
          <a className="button glass" href="/about">Why we&apos;re building it</a>
        </div>
        <div className="hg-hero-note"><strong>One 90-day business focus.</strong><span>Build the system, validate it with the right customer, and expand only from evidence.</span></div>
      </div>
      <div className="hg-hero-visual" aria-label="Hands Gifted Family Household Operating System">
        <div className="hg-visual-main"><img src="/catalog/family-learning.jpg" alt="Family household planning and learning" /></div>
        <div className="hg-visual-stack">
          <img src="/catalog/cooking.jpg" alt="Meal and kitchen planning" />
          <img src="/catalog/gardening.jpg" alt="Household practical-life development" />
        </div>
        <div className="hg-visual-badge"><span>HANDS GIFTED</span><strong>Household system.</strong><small>Plan • operate • review</small></div>
      </div>
    </section>

    <section className="hg-value-strip" aria-label="Hands Gifted household system values">
      <article><span>01</span><strong>Clarity</strong><small>Know what needs attention</small></article>
      <article><span>02</span><strong>Consistency</strong><small>Use repeatable household rhythms</small></article>
      <article><span>03</span><strong>Practicality</strong><small>Tools designed for real family use</small></article>
      <article><span>04</span><strong>Stability</strong><small>Build order before expansion</small></article>
    </section>

    <section id="builds" className="hg-section hg-builds">
      <div className="hg-section-heading">
        <span>The flagship we are building</span>
        <h2>One household operating system, built around recurring family work.</h2>
        <p>The first version is intentionally practical: planning pages, routines, trackers, preparation systems, and simple SOPs that reduce how much a household has to hold in memory.</p>
      </div>
      <div className="hg-build-grid">
        {systemParts.map(([title,body])=><article className="hg-build-card" key={title}>
          <div className="hg-build-body"><small>Family Household Operating System</small><h3>{title}</h3><p>{body}</p></div>
        </article>)}
      </div>
      <div className="hg-hero-actions" style={{marginTop:32}}><a className="button gold" href="/household-system">Open the flagship overview</a><a className="button" href="/contact">Ask about the pilot</a></div>
    </section>

    <section className="hg-section hg-model">
      <div className="hg-model-intro">
        <span>How we are validating it</span>
        <h2>Test → document → simplify → validate.</h2>
        <p>Our household is an internal testing environment, not the public product. Public resources are created from privacy-safe lessons and repeatable systems.</p>
      </div>
      <div className="hg-proof-grid">
        {validationPath.map(([number,title,body])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section className="hg-section hg-now">
      <div className="hg-now-copy">
        <span>Internal research & development</span>
        <h2>Other skills still matter—but they are not competing businesses right now.</h2>
        <p>Cooking, gardening, sewing, hair/self-care, Family Academy, and creative work continue as household-tested R&D. They can generate evidence, content, skills, and useful components without distracting from the current flagship.</p>
      </div>
      <div className="hg-build-grid">
        {rAndD.map((item)=><a className="hg-build-card" key={item.slug} href={`/explore/${item.slug}`}>
          <div className="hg-build-image"><img src={item.image} alt={item.title}/><span>Internal R&amp;D</span></div>
          <div className="hg-build-body"><small>{item.tag}</small><h3>{item.title}</h3><p>{item.summary}</p><strong>See the work →</strong></div>
        </a>)}
      </div>
    </section>

    <PublicAreaNav />

    <section className="hg-section hg-future">
      <div>
        <span>90-day decision point</span>
        <h2>We expand only after the flagship proves useful.</h2>
        <p>The current test is straightforward: does the target customer understand the household problem, want the system, use it, and consider it worth paying for? Broader programs and additional business lines come later.</p>
      </div>
      <div className="hg-future-actions"><a className="button gold" href="/household-system">See the system</a><a className="button" href="/contact">Share feedback</a></div>
    </section>

    <section className="hg-private-note"><strong>Private family systems stay private.</strong><span>School records, child progress, household operations, parent notes, finances, journals, and other protected information remain inside authenticated family and Command Center spaces.</span></section>

    <section className="hg-final-cta">
      <div><span>Hands Gifted</span><h2>A practical household system is the focus now.</h2><p>If managing the home feels scattered across too many places, follow the development of the Family Household Operating System or contact Hands Gifted about the pilot.</p></div>
      <div><a className="button gold" href="/household-system">Explore the system</a><a className="button glass" href="/contact">Contact Hands Gifted</a></div>
    </section>

    <SiteFooter />
  </main>;
}
