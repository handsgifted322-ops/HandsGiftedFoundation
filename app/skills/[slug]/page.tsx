import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { getHandsGiftedSkill, handsGiftedSkills } from "../../../lib/handsGiftedSkills";

export function generateStaticParams() {
  return handsGiftedSkills.map((skill) => ({ slug: skill.slug }));
}

export default async function SkillWorldPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getHandsGiftedSkill(slug);
  if (!skill) notFound();

  return <main className="public-page">
    <SiteHeader />

    <section className="public-page-hero">
      <span>Hands Gifted Skills · {skill.shortTitle}</span>
      <h1>{skill.title}</h1>
      <p>{skill.summary}</p>
      <div className="hg-hero-actions"><a className="button gold" href={`/book#${skill.slug}`}>Book / request service</a><a className="button" href={skill.resourceHref}>Free learning resources</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        <article className="public-page-card public-page-wide">
          <span className="status-label">{skill.serviceStatus}</span>
          <h2>What this Hands Gifted world is for</h2>
          <p>{skill.serviceNote}</p>
        </article>

        <article className="public-page-card">
          <span className="status-label">Learn</span>
          <h2>Free learning layer</h2>
          <ul>{skill.learn.map((item)=><li key={item}>{item}</li>)}</ul>
        </article>

        <article className="public-page-card">
          <span className="status-label">Book / Request</span>
          <h2>Service direction</h2>
          <ul>{skill.serviceDirection.map((item)=><li key={item}>{item}</li>)}</ul>
          <a className="button gold" href={`/book#${skill.slug}`}>Service inquiry</a>
        </article>

        <article className="public-page-card">
          <span className="status-label">Shop</span>
          <h2>Product direction</h2>
          <ul>{skill.productDirection.map((item)=><li key={item}>{item}</li>)}</ul>
          <a className="button" href="/shop">See product structure</a>
        </article>

        <article className="public-page-card">
          <span className="status-label">Children + Family</span>
          <h2>Why this belongs in the child-centered vision</h2>
          <p>{skill.childFamilyConnection}</p>
        </article>

        <article id="scripture" className="public-page-card public-page-wide">
          <span className="status-label">Biblical foundation</span>
          <h2>Scripture trail for {skill.shortTitle.toLowerCase()}</h2>
          <div className="about-steps">
            {skill.scriptures.map(([reference,principle])=><div className="about-step" key={reference}><strong>{reference}</strong>{principle}</div>)}
          </div>
          <p>These references are starting points for deeper study. Hands Gifted can connect scripture to practical application without turning a skill page into a single decorative verse or replacing qualified professional guidance where it is needed.</p>
        </article>

        <article className="public-page-card public-page-wide">
          <span className="status-label">Keep going deeper</span>
          <h2>One skill should connect to the rest of the ecosystem.</h2>
          <p>From here, a visitor can move into the free resource center, child and family learning, another Hands Gifted skill world, products, or a direct service inquiry. The website should feel connected rather than like separate businesses sitting next to each other.</p>
          <div className="public-page-actions"><a className="button gold" href="/skills">All Hands Gifted Skills</a><a className="button" href="/resources">Resource Center</a><a className="button" href="/shop">Products</a></div>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>;
}
