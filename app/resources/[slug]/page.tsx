import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { getPublicResourceArea, publicResourceAreas } from "../../../lib/publicResources";

export function generateStaticParams(){
  return publicResourceAreas.map((area)=>({slug:area.slug}));
}

export default async function ResourceAreaPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const area=getPublicResourceArea(slug);
  if(!area) notFound();

  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>{area.tag}</span>
      <h1>{area.title}</h1>
      <p>{area.summary}</p>
      <div className="hg-hero-actions"><a className="button gold" href="#topics">Explore topics</a><a className="button" href="#scripture">Study the scriptures behind it</a></div>
    </section>

    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Hands Gifted resource areas">
        <a href="/resources">All Resources</a>
        {publicResourceAreas.map((item)=><a href={`/resources/${item.slug}`} key={item.slug}>{item.shortTitle}</a>)}
      </nav>

      <div className="public-page-grid">
        <article className="public-page-card">
          <span className="status-label">For children</span>
          <h2>What this helps children build</h2>
          <p>{area.childFocus}</p>
        </article>
        <article className="public-page-card">
          <span className="status-label">For parents & caregivers</span>
          <h2>How the family supports the child</h2>
          <p>{area.familyFocus}</p>
        </article>
      </div>

      <div id="topics" className="public-page-grid" style={{marginTop:32}}>
        {area.topics.map(([title,body])=><article className="public-page-card" key={title}>
          <span className="status-label">Resource pathway</span>
          <h3>{title}</h3>
          <p>{body}</p>
          <small>Articles, verified links, activities, downloads, and deeper Hands Gifted tools can be added here as they are approved.</small>
        </article>)}
      </div>

      <div id="scripture" className="public-page-grid" style={{marginTop:32}}>
        <article className="public-page-card public-page-wide">
          <span className="status-label">Scripture study trail</span>
          <h2>Go deeper than a verse on a card.</h2>
          <p>Each resource area is designed to connect practical learning with a continuing Bible-study pathway. The references below are starting points for context, principle, reflection, and practical application—not decorative quotations.</p>
        </article>
        {area.scriptureSeries.map(([theme,references,note])=><article className="public-page-card" key={theme}>
          <h3>{theme}</h3>
          <p><strong>{references.join(" • ")}</strong></p>
          <p>{note}</p>
        </article>)}
      </div>

      <div className="public-page-grid" style={{marginTop:32}}>
        <article className="public-page-card">
          <span className="status-label">Free public layer</span>
          <h2>Useful information should be available now.</h2>
          <p>Public articles, credible outside resources, scripture pathways, starter guidance, and selected tools can remain free so families can find real help without first buying something.</p>
        </article>
        <article className="public-page-card">
          <span className="status-label">Deeper Hands Gifted layer</span>
          <h2>Structured tools can become products or membership content.</h2>
          <p>Full workbooks, courses, printable systems, lesson collections, member libraries, specialized planning tools, and direct services can be offered as paid resources when they are genuinely developed and ready.</p>
        </article>
        <article className="public-page-card public-page-wide">
          <span className="status-label">Verification standard</span>
          <h2>Outside resources should be current, useful, and clearly identified.</h2>
          <p>Community programs and external information should be checked before publication. Hands Gifted should distinguish between a resource we are simply sharing, one our family has used, one we have independently verified, and a true formal partner. Private family records never become public evidence.</p>
        </article>
      </div>
    </section>

    <SiteFooter />
  </main>;
}
