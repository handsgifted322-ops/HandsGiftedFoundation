import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { handsGiftedSkills } from "../../lib/handsGiftedSkills";

const model = [
  ["Learn", "Free public information, introductory guidance, scripture connections, and practical family learning."],
  ["Practice", "Children and families can build the skill through real projects, routines, and age-appropriate participation."],
  ["Book / Request", "When a direct service is ready, visitors can request it. Readiness is labeled honestly instead of treating every idea as bookable."],
  ["Shop", "Original Hands Gifted workbooks, guides, kits, books, planners, or other products can sit behind the free information layer when complete."],
] as const;

export default function SkillsPage() {
  return <main className="public-page">
    <SiteHeader />

    <section className="public-page-hero">
      <span>Hands Gifted Skills</span>
      <h1>Four practical skill worlds. One connected Hands Gifted system.</h1>
      <p>Cooking, gardening, braiding, and sewing are not random side projects. They are Hands Gifted skill worlds where children and families can learn, practice, connect faith to real work, request services when available, and discover original Hands Gifted products as they are developed.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/book">Book or request a service</a><a className="button" href="/resources/practical-life-skills">Explore life-skills resources</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        {handsGiftedSkills.map((skill)=><a className="hg-build-card" key={skill.slug} href={`/skills/${skill.slug}`}>
          <div className="hg-build-image"><img src={skill.image} alt={skill.title}/><span>{skill.serviceStatus}</span></div>
          <div className="hg-build-body"><small>{skill.tagline}</small><h2>{skill.title}</h2><p>{skill.summary}</p><strong>Enter this skill world →</strong></div>
        </a>)}
      </div>
    </section>

    <section className="hg-section hg-model">
      <div className="hg-model-intro">
        <span>One repeatable experience</span>
        <h2>Learn → Practice → Book / Request → Shop.</h2>
        <p>Every Hands Gifted skill world follows the same logic. Visitors can get something useful for free without receiving every complete Hands Gifted system or product. Direct services and paid products sit in their own clearly labeled layers.</p>
      </div>
      <div className="hg-proof-grid">
        {model.map(([title,body],index)=><article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section className="hg-section hg-future">
      <div>
        <span>Built around children and family</span>
        <h2>A practical skill can become knowledge, confidence, service, product, or opportunity.</h2>
        <p>The child-centered vision stays connected to the business. Cooking teaches planning and stewardship. Gardening teaches science and patience. Braiding teaches care and creativity. Sewing teaches measurement, design, repair, and craftsmanship. The adults can learn, provide services, create products, and build opportunity around the same skill worlds.</p>
      </div>
      <div className="hg-future-actions"><a className="button gold" href="/resources/kids-learning">Kids & learning</a><a className="button" href="/shop">Hands Gifted products</a></div>
    </section>

    <SiteFooter />
  </main>;
}
