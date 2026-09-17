import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const productLayers = [
  ["One-Time Products", "Workbooks, planners, activity packs, scripture-study resources, family organization tools, recipe resources, and other downloadable products can be sold individually when complete."],
  ["Membership Library", "A future Hands Gifted membership can provide deeper access to organized learning paths, printable tools, updated family resources, member lessons, and growing resource collections."],
  ["Courses & Workshops", "Structured learning experiences can be released when the lesson content, safety guidance, delivery, and support expectations are ready."],
  ["Family Systems", "More complete household planning, routines, meal/inventory, responsibility, and family-organization systems can sit behind the free educational layer."],
] as const;

const concepts = [
  ["Prayer & Scripture Journal", "Faith-centered reflection, study, prayer, and practical application."],
  ["Biblical Womanhood Study Resources", "Structured studies around scripture, character, family responsibility, stewardship, learning, and practical growth."],
  ["Children's Learning & Life-Skills Packs", "Age-appropriate activities and workbooks connecting knowledge, gifts, practical skills, faith, creativity, and responsibility."],
  ["Household Planning Tools", "Planners, checklists, family routines, responsibility systems, meal planning, inventory, and household SOP resources."],
] as const;

export default function ShopPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Products & Membership</span>
      <h1>Go deeper when a free resource is not enough.</h1>
      <p>Hands Gifted can provide substantial public information for free while reserving complete systems, workbooks, lesson collections, courses, and member resources for paid access. Only finished and deliverable offers should be presented as available for purchase.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/resources">Browse free resources</a><a className="button" href="/contact">Ask about product updates</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        {productLayers.map(([title,body])=><article className="public-page-card" key={title}><span className="status-label">Paid depth layer</span><h2>{title}</h2><p>{body}</p></article>)}
        <article className="public-page-card public-page-wide"><span className="status-label">Product concepts in development</span><h2>Potential Hands Gifted resource families</h2><p>These categories show where developed content may eventually become paid products. They are not a claim that every item is currently for sale.</p></article>
        {concepts.map(([title,body])=><article className="public-page-card" key={title}><span className="status-label">In development</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
      <div className="public-page-note"><strong>Purchase standard:</strong> Pricing, checkout, file delivery, membership access, refund terms, and customer support should be connected before an item is labeled as available to buy or subscribe to.</div>
    </section>
    <SiteFooter />
  </main>;
}
