import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { handsGiftedSkills } from "../../lib/handsGiftedSkills";

export default function ServicesPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Services</span>
      <h1>Practical skills turned into clearly scoped service worlds.</h1>
      <p>Hands Gifted Cooking, Gardening, Braiding, and Sewing form the core service system. Each one connects free learning, children and family skill development, a direct-service layer, and original Hands Gifted products. The exact service offer is labeled according to what is genuinely ready.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/book">Book / request service</a><a className="button" href="/skills">Explore Hands Gifted Skills</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        {handsGiftedSkills.map((skill)=><article className="public-page-card" key={skill.slug}>
          <span className="status-label">{skill.serviceStatus}</span>
          <h2>{skill.title}</h2>
          <p>{skill.serviceNote}</p>
          <div className="public-page-actions"><a className="button gold" href={`/book#${skill.slug}`}>Service inquiry</a><a className="button" href={`/skills/${skill.slug}`}>Explore skill world</a></div>
        </article>)}
        <article className="public-page-card public-page-wide">
          <span className="status-label">Hands Gifted standard</span>
          <h2>Service world does not mean every possible service is available today.</h2>
          <p>Each skill belongs in the Hands Gifted service system, but individual offers still have to match demonstrated skill, capacity, safety, pricing, legal requirements, and actual availability. That lets the business grow without overstating what can be delivered.</p>
        </article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
