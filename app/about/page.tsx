import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const principles = [
  ["Children at the center", "Hands Gifted begins with the question: what does a child need to learn, practice, discover, understand, or access in order to grow well and prepare for life?"],
  ["Families equipped to guide them", "Parents and caregivers need practical information, household systems, trustworthy resources, and tools that make it easier to support children consistently."],
  ["Scripture throughout", "Biblical principles are woven into learning paths through study, context, reflection, and practical application rather than added as isolated decorative verses."],
  ["Practical skills for real life", "Education should include school learning alongside cooking, money, technology, creativity, home care, communication, entrepreneurship, responsibility, and other life skills."],
  ["Useful information before a sale", "The public site should provide genuine information, scripture pathways, and verified resources. More developed workbooks, systems, memberships, products, and services can offer deeper structure."],
  ["Privacy and integrity", "Hands Gifted can learn from real family experience without publishing private school records, health information, finances, legal matters, addresses, journals, or other protected family details."],
] as const;

export default function AboutPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>About Hands Gifted</span>
      <h1>Children at the center. Families equipped around them.</h1>
      <p>Hands Gifted is a faith-centered child and family development resource platform. The public mission is to connect children, women, parents, caregivers, and families with practical learning, life-skills guidance, scripture study, trustworthy resources, and deeper tools that support stronger futures.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/resources/kids-learning">Explore children & learning</a><a className="button" href="/resources">Open the resource center</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        <article className="public-page-card public-page-wide">
          <span className="status-label">Our public purpose</span>
          <h2>Information should lead somewhere useful.</h2>
          <p>A visitor may arrive because a child needs school support, a family needs food or transportation resources, a parent wants to teach a life skill, or someone wants to understand the scriptures behind a practical principle. Hands Gifted is designed so that one question can open into deeper information, related topics, biblical study, outside resources, and structured tools.</p>
        </article>
        {principles.map(([title,body])=><article className="public-page-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
        <article className="public-page-card public-page-wide">
          <span className="status-label">Who the resources are for</span>
          <h2>Children are the center of the development model, not the only people served.</h2>
          <p>Children and youth need learning, skills, opportunity, protection, guidance, and preparation for a rapidly changing world. Parents, mothers, caregivers, and families need resources that help them provide that support. Hands Gifted therefore builds child-facing learning pathways and adult-facing family-resource pathways that connect rather than compete.</p>
        </article>
        <article className="public-page-card public-page-wide">
          <span className="status-label">Faith + practical application</span>
          <h2>Scripture is a framework for study, not a label added afterward.</h2>
          <p>Each major resource area can include a continuing scripture trail: relevant passages, the principle being studied, context, reflection questions, and ways families can apply the lesson responsibly in daily life. Practical information and qualified outside resources remain clearly distinguished from biblical study and from professional legal, medical, financial, or clinical services.</p>
        </article>
        <article className="public-page-card public-page-wide">
          <span className="status-label">Free + deeper</span>
          <h2>Serve publicly while building sustainable products and services.</h2>
          <p>Helpful public information, community-resource navigation, scripture pathways, and selected starter materials can remain free. Full workbooks, planners, lesson collections, courses, family systems, member libraries, products, and direct services can become paid offerings when Hands Gifted has actually developed and prepared them.</p>
        </article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
