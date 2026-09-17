import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { handsGiftedSkills } from "../../lib/handsGiftedSkills";

export default function ProgramsPage() {
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Development</span>
      <h1>The public website is organized around learning, skill worlds, family resources, products, and services.</h1>
      <p>This route previously presented Cooking, Gardening, Braiding, and Sewing mainly as internal research-and-development lanes. The current Hands Gifted model now treats them as connected skill and service worlds while still labeling the readiness of each specific offer honestly.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/skills">Explore Hands Gifted Skills</a><a className="button" href="/resources">Open family resources</a></div>
    </section>
    <section className="public-page-content">
      <div className="public-page-grid">
        {handsGiftedSkills.map((skill)=><article className="public-page-card" key={skill.slug}><span className="status-label">{skill.serviceStatus}</span><h2>{skill.title}</h2><p>{skill.summary}</p><div className="public-page-actions"><a className="button gold" href={`/skills/${skill.slug}`}>Open skill world</a><a className="button" href={`/book#${skill.slug}`}>Service inquiry</a></div></article>)}
        <article className="public-page-card public-page-wide"><span className="status-label">Protected development</span><h2>Not every internal family project becomes a public service.</h2><p>Family Academy, private household systems, children's records, internal testing, and other protected work remain separate from public offers. Only founder-approved, public-ready resources, products, and services belong on the public business surface.</p></article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
