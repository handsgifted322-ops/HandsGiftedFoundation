import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const productFamilies = [
  ["Children & Family Learning", "Workbooks, activity packs, scripture-study resources, life-skills lessons, family learning tools, and age-appropriate practical education."],
  ["Hands Gifted Cooking", "Recipe books, family cookbooks, meal-planning tools, children's kitchen resources, and future cooking learning products."],
  ["Hands Gifted Gardening", "Garden journals, beginner family-garden guides, children's plant-science activities, and future starter resources."],
  ["Hands Gifted Braiding", "Hair-care guides, children's maintenance resources, routine trackers, and future hair-related products developed safely and honestly."],
  ["Hands Gifted Sewing", "The Hands Gifted Sewing Book, beginner project resources, modest-design tools, and future patterns, kits, or apparel only when ready."],
  ["Household & Family Systems", "Planners, checklists, meal/inventory tools, family routines, responsibility systems, SOP resources, and deeper household operating tools."],
] as const;

export default function ShopPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Products</span>
      <h1>Original creations belong in the product layer—not buried inside free information.</h1>
      <p>The public website can teach useful concepts and point families toward trustworthy resources. When Hands Gifted turns that work into a complete book, workbook, planner, guide, kit, lesson collection, system, or other original product, that creation can be sold separately instead of being given away in full.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/skills">Explore Hands Gifted Skills</a><a className="button" href="/resources">Use free resources</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        {productFamilies.map(([title,body])=><article className="public-page-card" key={title}><span className="status-label">Product family</span><h2>{title}</h2><p>{body}</p></article>)}
        <article className="public-page-card public-page-wide">
          <span className="status-label">Purchase standard</span>
          <h2>Do not label a concept as available until it can actually be delivered.</h2>
          <p>Pricing, checkout, delivery, access, refund terms, customer support, and any safety or legal requirements should be ready before an item is presented as available to purchase. Until then, the site can show the product family without exposing the complete proprietary material.</p>
        </article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
