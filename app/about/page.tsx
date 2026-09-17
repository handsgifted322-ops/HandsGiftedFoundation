import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const principles = [
  ["Children at the center", "Hands Gifted begins with the question: what does a child need to learn, practice, discover, understand, or access in order to grow well and prepare for life?"],
  ["Families equipped to guide them", "Parents and caregivers need practical information, household systems, trustworthy resources, and tools that make it easier to support children consistently."],
  ["Practical gifts developed", "Cooking, gardening, braiding, and sewing are Hands Gifted skill worlds where learning can become practice, confidence, creativity, service, product development, and opportunity."],
  ["Scripture throughout", "Biblical principles are woven into learning paths through study, context, reflection, and practical application rather than added as isolated decorative verses."],
  ["Useful information before a sale", "The public site should provide genuine value and trustworthy resources without publishing every complete Hands Gifted process, system, workbook, or product for free."],
  ["Privacy and integrity", "Hands Gifted can learn from real family experience without publishing private school records, health information, finances, legal matters, addresses, journals, or other protected family details."],
] as const;

export default function AboutPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>About Hands Gifted</span>
      <h1>Children at the center. Families equipped around them. Gifts developed through real life.</h1>
      <p>Hands Gifted is a faith-centered child and family development platform connecting learning, practical skills, scripture, family resources, original products, and direct services. The goal is not to separate education, family life, and business into unrelated pieces, but to show how useful gifts can be learned, practiced, developed, and used responsibly.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/skills">Explore Hands Gifted Skills</a><a className="button" href="/resources">Open the resource center</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        <article className="public-page-card public-page-wide">
          <span className="status-label">Our public purpose</span>
          <h2>Information should lead somewhere useful.</h2>
          <p>A visitor may arrive because a child needs school support, a family needs a trustworthy resource, someone wants to learn a practical skill, or a customer wants a Hands Gifted service. The website is designed so one need can lead into learning, scripture, skill development, family support, products, or services without exposing private family life.</p>
        </article>
        {principles.map(([title,body])=><article className="public-page-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
        <article className="public-page-card public-page-wide">
          <span className="status-label">Hands Gifted Skills</span>
          <h2>Cooking • Gardening • Braiding • Sewing</h2>
          <p>These four worlds give Hands Gifted a recognizable practical-skills identity. Each can contain a free learning layer, a child-and-family connection, a scripture trail, a clearly scoped service layer, and original products when they are complete. The exact offer inside each world can grow without turning Hands Gifted into four separate brands.</p>
          <div className="public-page-actions"><a className="button gold" href="/skills">Enter the skill worlds</a><a className="button" href="/book">Book / request service</a></div>
        </article>
        <article className="public-page-card public-page-wide">
          <span className="status-label">Free + deeper</span>
          <h2>Serve publicly while protecting the value of original Hands Gifted work.</h2>
          <p>Helpful information, community-resource navigation, scripture pathways, and selected starter guidance can remain free. Complete workbooks, books, planners, kits, courses, family systems, member libraries, products, and direct service processes belong in deeper paid layers when they are actually ready.</p>
        </article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
