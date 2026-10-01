import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

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
          <a className="button gold" href="/resources">Start with real life</a>
          <a className="button glass" href="/resources">Explore resources</a>
        </div>
      </div>
    </section>

    <SiteFooter />
  </main>;
}
