import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { PublicAreaNav } from "../components/PublicAreaNav";
import { exploreItems } from "../lib/explore";

const nowMap = [
  ["Braiding & natural hair", "LIVED / DOING", "A real household skill already being practiced, photographed, improved, and considered for future portfolio or service use."],
  ["Cooking & grocery planning", "LIVED / DOING", "Real family meals, budget shopping, recipe development, food planning, and healthier-eating changes being practiced now."],
  ["Household organization", "LIVED / PROTOTYPE", "Routines, planning, inventory, family responsibilities, and household procedures are being tested through real family life."],
  ["Sewing & modest apparel", "LEARNING", "Early proof includes fringe and blue-border work and beginner alteration practice. Full garment construction is a future skill goal."],
  ["Gardening", "EXPLORATORY", "A possible family learning and practical-skill lane that can stay parked until the household has capacity to develop it well."],
  ["Daughters of Sarah / family learning", "FRAMEWORK IN DEVELOPMENT", "Faith-centered learning, womanhood, household stewardship, practical skills, and family development are being organized before any larger public program is claimed."],
] as const;

const developmentPath = [
  ["01", "Live it", "Start with something actually happening in the household or a skill already being practiced."],
  ["02", "Learn & practice", "Study, repeat, correct mistakes, build competence, and decide whether the work belongs in this season."],
  ["03", "Document proof", "Capture recipes, photos, videos, costs, procedures, lessons, outcomes, and other honest evidence."],
  ["04", "Test the idea", "Turn useful work into a prototype, resource, content series, product concept, or small customer test."],
  ["05", "Promote only when ready", "A future product, class, service, or program earns expansion from evidence—not from the existence of a ChatGPT draft."],
] as const;

const systemParts = [
  ["Weekly household planning", "Bring schedules, priorities, preparation, and family follow-through into one weekly view."],
  ["Meals & inventory", "Plan meals, track what is on hand, and reduce last-minute grocery and dinner decisions."],
  ["Cleaning & resets", "Use repeatable room resets and simple standards instead of rebuilding the routine from memory."],
  ["Children’s responsibilities", "Make age-appropriate responsibilities visible, consistent, and easier to verify."],
  ["Family scheduling", "Coordinate school, work, appointments, preparation, and recurring household rhythms."],
  ["Simple household SOPs", "Turn recurring tasks into clear procedures that can be followed, improved, and reused."],
] as const;

export default function Home(){
  const rAndD = exploreItems.slice(0, 6);

  return <main className="hg-home">
    <SiteHeader />

    <section className="hg-hero">
      <div className="hg-hero-copy">
        <div className="hg-kicker">Faith-centered • Family-first • Learning through real life</div>
        <h1>Use your hands.<br/><span>Build from what is real.</span></h1>
        <p className="hg-hero-lead">Hands Gifted is an evolving family-first journey and business vision. We begin with real household life—cooking, braiding, organizing, learning, creating, caring for family, and developing practical skills—then document what works and decide what may responsibly grow into content, systems, products, services, or future teaching.</p>
        <div className="hg-hero-actions">
          <a className="button gold" href="/journey">See where the work stands</a>
          <a className="button glass" href="/about">Why Hands Gifted exists</a>
        </div>
        <div className="hg-hero-note"><strong>Journey first. Business grows from proof.</strong><span>A ChatGPT-generated idea or document is not treated as a launched program. We separate what is lived, learned, drafted, tested, and ready.</span></div>
      </div>
      <div className="hg-hero-visual" aria-label="Hands Gifted family-first development journey">
        <div className="hg-visual-main"><img src="/catalog/family-learning.jpg" alt="Family learning and household development" /></div>
        <div className="hg-visual-stack">
          <img src="/catalog/cooking.jpg" alt="Cooking and family meal development" />
          <img src="/catalog/braiding.jpg" alt="Braiding and practical skill development" />
        </div>
        <div className="hg-visual-badge"><span>HANDS GIFTED</span><strong>Learn • practice • document.</strong><small>Then decide what grows</small></div>
      </div>
    </section>

    <section className="hg-value-strip" aria-label="Hands Gifted development principles">
      <article><span>01</span><strong>Faith</strong><small>Seek direction before expansion</small></article>
      <article><span>02</span><strong>Family</strong><small>Start with the household first</small></article>
      <article><span>03</span><strong>Practice</strong><small>Build competence through real use</small></article>
      <article><span>04</span><strong>Proof</strong><small>Let evidence guide what grows</small></article>
    </section>

    <section className="hg-section hg-builds">
      <div className="hg-section-heading">
        <span>Where the work stands now</span>
        <h2>Not every idea is at the same stage.</h2>
        <p>Hands Gifted uses truth-status labels so a lived skill, a beginner learning goal, a ChatGPT-developed concept, and a future business idea are not presented as if they are the same thing.</p>
      </div>
      <div className="hg-build-grid">
        {nowMap.map(([title,status,body])=><article className="hg-build-card" key={title}>
          <div className="hg-build-body"><small>{status}</small><h3>{title}</h3><p>{body}</p></div>
        </article>)}
      </div>
      <div className="hg-hero-actions" style={{marginTop:32}}><a className="button gold" href="/journey">Open the journey map</a><a className="button" href="/programs">Explore development lanes</a></div>
    </section>

    <section className="hg-section hg-model">
      <div className="hg-model-intro">
        <span>How Hands Gifted develops</span>
        <h2>Real life → skill → proof → opportunity.</h2>
        <p>The work does not become a business line just because an idea sounds good. Skills and systems move forward only as they are practiced, documented, tested, and proven useful.</p>
      </div>
      <div className="hg-proof-grid">
        {developmentPath.map(([number,title,body])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section id="builds" className="hg-section hg-builds">
      <div className="hg-section-heading">
        <span>Current business focus</span>
        <h2>The Household Operating System is one active offer—not the whole identity of Hands Gifted.</h2>
        <p>Household organization is one area already being practiced and systematized in real life. For the current 90-day business focus, it is being developed as the first testable digital offer while the broader Hands Gifted vision remains phased.</p>
      </div>
      <div className="hg-build-grid">
        {systemParts.map(([title,body])=><article className="hg-build-card" key={title}>
          <div className="hg-build-body"><small>Current offer prototype</small><h3>{title}</h3><p>{body}</p></div>
        </article>)}
      </div>
      <div className="hg-hero-actions" style={{marginTop:32}}><a className="button gold" href="/household-system">See the household system</a><a className="button" href="/contact">Ask about the pilot</a></div>
    </section>

    <section className="hg-section hg-now">
      <div className="hg-now-copy">
        <span>Skills, learning & future possibilities</span>
        <h2>The broader vision stays visible without pretending everything has launched.</h2>
        <p>Cooking, natural hair, sewing, modest apparel, gardening, family learning, creative work, and future resources can develop at different speeds. Some are lived now, some are learning goals, and some may remain future ideas until the right season.</p>
      </div>
      <div className="hg-build-grid">
        {rAndD.map((item)=><a className="hg-build-card" key={item.slug} href={`/explore/${item.slug}`}>
          <div className="hg-build-image"><img src={item.image} alt={item.title}/><span>{item.status}</span></div>
          <div className="hg-build-body"><small>{item.tag}</small><h3>{item.title}</h3><p>{item.summary}</p><strong>See this lane →</strong></div>
        </a>)}
      </div>
    </section>

    <PublicAreaNav />

    <section className="hg-section hg-future">
      <div>
        <span>Long-term direction</span>
        <h2>Products, classes, a shop, workshops, and wider service come from mature work.</h2>
        <p>Hands Gifted may eventually offer modest apparel, headwraps, household goods, sewing projects, recipe resources, classes, family kits, digital products, workshops, events, and other carefully developed work. Those remain future possibilities until skill, capacity, demand, safety, quality, and business readiness support them.</p>
      </div>
      <div className="hg-future-actions"><a className="button gold" href="/journey">See the roadmap</a><a className="button" href="/about">Read the story</a></div>
    </section>

    <section className="hg-private-note"><strong>The journey can be public without making private life public.</strong><span>Lessons, approved work, skills, and progress can be shared. Children’s records, household administration, finances, health information, journals, and sensitive family history remain protected.</span></section>

    <section className="hg-final-cta">
      <div><span>Hands Gifted</span><h2>Start with what is already in your hands.</h2><p>Follow a real process of learning, rebuilding, practicing useful skills, strengthening the household, and allowing proven work to grow at the right pace.</p></div>
      <div><a className="button gold" href="/journey">Follow the journey</a><a className="button glass" href="/contact">Contact Hands Gifted</a></div>
    </section>

    <SiteFooter />
  </main>;
}
