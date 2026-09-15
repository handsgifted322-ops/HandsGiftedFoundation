import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { PublicAreaNav } from "../components/PublicAreaNav";
import { exploreItems } from "../lib/explore";

const proofPath = [
  ["01", "Start with a real need", "Our household comes first. We begin with what our family actually needs to improve, learn, organize, make, or earn."],
  ["02", "Build the skill", "We study, practice, repeat, and improve through real family use instead of presenting unfinished ideas as finished offers."],
  ["03", "Create proof", "Meals, projects, systems, designs, lessons, portfolios, and routines become evidence of what works and what still needs work."],
  ["04", "Turn proof into opportunity", "When the work is useful and repeatable, it can become a product, service, resource, learning experience, or income stream."],
] as const;

const currentFocus = [
  ["Family systems", "Household organization, routines, meals, learning, Sabbath preparation, practical life, and the private tools that help our family operate better."],
  ["Skills into income", "Cooking, braiding, sewing, gardening, technology, design, media, and entrepreneurship are being developed into useful family skills and future earning lanes."],
  ["Products & services", "Digital resources, apparel concepts, recipes, learning tools, creative work, and selected services are released only when they are genuinely ready."],
] as const;

export default function Home(){
  const featured = exploreItems.slice(0, 6);

  return <main className="hg-home">
    <SiteHeader />

    <section className="hg-hero">
      <div className="hg-hero-copy">
        <div className="hg-kicker">Family-owned • Faith-led • Built from real life</div>
        <h1>Built at home.<br/><span>Made with purpose.</span></h1>
        <p className="hg-hero-lead">Hands Gifted is a family-owned business in development, starting with our own household first. We are building practical skills, stronger systems, creative work, products, services, and income opportunities from what we are actually learning and proving at home.</p>
        <div className="hg-hero-actions">
          <a className="button gold" href="#builds">See what we&apos;re building</a>
          <a className="button glass" href="/about">Read our story</a>
        </div>
        <div className="hg-hero-note"><strong>Our family is the first proving ground.</strong><span>What works here can grow responsibly from here.</span></div>
      </div>
      <div className="hg-hero-visual" aria-label="Hands Gifted family-owned business in development">
        <div className="hg-visual-main"><img src="/catalog/family-learning.jpg" alt="Family learning and building together" /></div>
        <div className="hg-visual-stack">
          <img src="/catalog/cooking.jpg" alt="Cooking and family food development" />
          <img src="/catalog/sewing.jpg" alt="Sewing and practical skill development" />
        </div>
        <div className="hg-visual-badge"><span>HANDS GIFTED</span><strong>Family first.</strong><small>Build • prove • grow</small></div>
      </div>
    </section>

    <section className="hg-value-strip" aria-label="Hands Gifted operating values">
      <article><span>01</span><strong>Faith</strong><small>Character and stewardship first</small></article>
      <article><span>02</span><strong>Family First</strong><small>Our household is the starting point</small></article>
      <article><span>03</span><strong>Skill to Opportunity</strong><small>Practice becomes proof, then income</small></article>
      <article><span>04</span><strong>Grow Responsibly</strong><small>Public claims follow demonstrated work</small></article>
    </section>

    <section id="builds" className="hg-section hg-builds">
      <div className="hg-section-heading">
        <span>What we&apos;re building now</span>
        <h2>One family business. Multiple skills growing together.</h2>
        <p>These are development lanes inside Hands Gifted—not separate companies. Each one grows from real family needs, practice, documentation, and proof.</p>
      </div>
      <div className="hg-build-grid">
        {featured.map((item)=><a className="hg-build-card" key={item.slug} href={`/explore/${item.slug}`}>
          <div className="hg-build-image"><img src={item.image} alt={item.title}/><span>{item.status}</span></div>
          <div className="hg-build-body"><small>{item.tag}</small><h3>{item.title}</h3><p>{item.summary}</p><strong>Open lane →</strong></div>
        </a>)}
      </div>
    </section>

    <section className="hg-section hg-model">
      <div className="hg-model-intro">
        <span>How Hands Gifted grows</span>
        <h2>Need → skill → proof → opportunity.</h2>
        <p>We are not building a business by pretending everything is already finished. The business grows from work we can actually demonstrate.</p>
      </div>
      <div className="hg-proof-grid">
        {proofPath.map(([number,title,body])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section className="hg-section hg-now">
      <div className="hg-now-copy">
        <span>Current priority</span>
        <h2>Build our household and the business together.</h2>
        <p>The immediate goal is lawful earned income, stronger family systems, practical skill development, completed products and services, and long-term opportunity for our household.</p>
        <p>Serving other families remains part of the long-term vision, but it is a later expansion phase. We first need to prove the systems, skills, products, and business model in our own family.</p>
      </div>
      <div className="hg-focus-grid">
        {currentFocus.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <PublicAreaNav />

    <section className="hg-section hg-future">
      <div>
        <span>Future direction</span>
        <h2>Share from strength, not from pressure.</h2>
        <p>As Hands Gifted becomes stable, repeatable, and sustainable, selected resources may be adapted for other households. That future mission grows from demonstrated capacity—not ahead of it.</p>
      </div>
      <div className="hg-future-actions"><a className="button gold" href="/services">See current availability</a><a className="button" href="/shop">View products in development</a></div>
    </section>

    <section className="hg-private-note"><strong>Private family systems stay private.</strong><span>School records, child progress, household operations, parent notes, finances, and other protected information remain inside authenticated family and Command Center spaces.</span></section>

    <section className="hg-final-cta">
      <div><span>Hands Gifted</span><h2>We&apos;re building the work before we scale the story.</h2><p>Follow what is being developed, ask about current services, or connect about future products and collaborations.</p></div>
      <div><a className="button gold" href="/contact">Contact Hands Gifted</a><a className="button glass" href="/about">Learn how we&apos;re building</a></div>
    </section>

    <SiteFooter />
  </main>;
}
