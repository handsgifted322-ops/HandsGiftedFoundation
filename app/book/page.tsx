import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { handsGiftedSkills } from "../../lib/handsGiftedSkills";

const email = "handsgifted322@gmail.com";

export default function BookPage() {
  return <main className="public-page">
    <SiteHeader />

    <section className="public-page-hero">
      <span>Book Hands Gifted</span>
      <h1>Request a service from a Hands Gifted skill world.</h1>
      <p>Hands Gifted Cooking, Gardening, Braiding, and Sewing are organized as service worlds. Each world has its own readiness level, so the site should make a clear difference between a service that can accept appointment inquiries now and one whose exact public offer is still being developed.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/skills">Explore the skill worlds</a><a className="button" href="/contact">General contact</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        {handsGiftedSkills.map((skill) => {
          const subject = encodeURIComponent(`${skill.title} service inquiry`);
          return <article className="public-page-card" id={skill.slug} key={skill.slug}>
            <span className="status-label">{skill.serviceStatus}</span>
            <h2>{skill.title}</h2>
            <p>{skill.serviceNote}</p>
            <div className="public-page-actions"><a className="button gold" href={`mailto:${email}?subject=${subject}`}>Send service inquiry</a><a className="button" href={`/skills/${skill.slug}`}>See this skill world</a></div>
          </article>;
        })}

        <article className="public-page-card public-page-wide">
          <span className="status-label">Booking standard</span>
          <h2>Inquiry first, confirmation second.</h2>
          <p>A service request is not a confirmed appointment until Hands Gifted confirms the exact service, scope, date and time, pricing, preparation requirements, deposit terms if applicable, and any safety or legal requirements connected to that service.</p>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>;
}
