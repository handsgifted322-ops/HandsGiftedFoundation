import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const doors = [
  ["My Faith & Life","Biblical direction for everyday decisions, growth, recovery, and purpose.","/resources"],
  ["My Family","Support for marriage, children, communication, learning, and family connection.","/resources/kids-learning"],
  ["My Home","Practical help with routines, meals, cleaning, organization, and household stewardship.","/resources/household-management"],
  ["My Stability","Resources for money, work, transportation, community support, and rebuilding stability.","/resources/community-resources"],
  ["My Skills & Purpose","Explore practical gifts through cooking, sewing, gardening, braiding, creativity, and work.","/skills"],
] as const;

export default function Home(){
  return <main className="hg-home">
    <SiteHeader />

    <section className="hg-hero">
      <div className="hg-hero-copy">
        <div className="hg-kicker">Hands Gifted</div>
        <h1>Discover the Gift.<br/><span>Build the Skill.</span></h1>
        <blockquote className="hg-scripture">“She seeketh wool, and flax, and worketh willingly with her hands.” <cite>— Proverbs 31:13 KJV</cite></blockquote>
        <p className="hg-hero-lead">Biblical direction and practical resources for women and families navigating everyday life, building useful skills, and strengthening their households.</p>
        <div className="hg-hero-actions">
          <a className="button gold" href="#start-here">Start Here</a>
          <a className="button glass" href="/resources">Explore Resources</a>
        </div>
      </div>
      <div className="hg-hero-visual" aria-label="Hands Gifted family and practical skills">
        <div className="hg-visual-main"><img src="/catalog/family-learning.jpg" alt="Family learning practical skills together" /></div>
        <div className="hg-visual-stack">
          <img src="/catalog/cooking.jpg" alt="Practical cooking skills" />
          <img src="/catalog/sewing.jpg" alt="Sewing skills" />
        </div>
      </div>
    </section>

    <section id="start-here" className="hg-section hg-builds">
      <div className="hg-section-heading">
        <span>Start Here</span>
        <h2>What do you need today?</h2>
        <p>Choose one area. You do not have to sort through the whole website to find a place to begin.</p>
      </div>
      <div className="hg-build-grid">
        {doors.map(([title,body,href])=><a className="hg-build-card" key={title} href={href}><div className="hg-build-body"><h3>{title}</h3><p>{body}</p><strong>Open →</strong></div></a>)}
      </div>
    </section>

    <section className="hg-value-strip" aria-label="How Hands Gifted helps">
      <article><span>01</span><strong>Learn</strong><small>Find useful biblical and practical information</small></article>
      <article><span>02</span><strong>Practice</strong><small>Use it in everyday life</small></article>
      <article><span>03</span><strong>Build</strong><small>Develop skills and household stability</small></article>
      <article><span>04</span><strong>Serve</strong><small>Use what grows to help others</small></article>
    </section>

    <section className="hg-section hg-future">
      <div>
        <span>Need more support?</span>
        <h2>Choose the level of help that fits.</h2>
        <p>Start with information, explore a structured program, or see available Hands Gifted services as they are developed.</p>
      </div>
      <div className="hg-future-actions">
        <a className="button gold" href="/resources">Resources</a>
        <a className="button" href="/programs">Programs & Services</a>
      </div>
    </section>

    <SiteFooter />
  </main>;
}
