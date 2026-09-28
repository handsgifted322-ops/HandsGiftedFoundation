import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { getPublicResourceArea, publicResourceAreas } from "../../../lib/publicResources";

const topicId=(title:string)=>"topic-"+title.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

export function generateStaticParams(){return publicResourceAreas.map((area)=>({slug:area.slug}));}

export default async function ResourceAreaPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const area=getPublicResourceArea(slug); if(!area) notFound();
  return <main className="public-page"><SiteHeader/>
    <section className="public-page-hero"><span>{area.tag}</span><h1>{area.title}</h1><p>{area.summary}</p><div className="hg-hero-actions"><a className="button gold" href="#topics">Explore topics</a><a className="button" href="#scripture">Scripture study</a><a className="button" href="/activities">Family activities</a></div></section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Hands Gifted resource areas"><a href="/resources">All Resources</a>{publicResourceAreas.map(item=><a href={`/resources/${item.slug}`} key={item.slug}>{item.shortTitle}</a>)}</nav>
      <div className="public-page-grid"><article className="public-page-card"><span className="status-label">For children</span><h2>What this helps children build</h2><p>{area.childFocus}</p></article><article className="public-page-card"><span className="status-label">For parents & caregivers</span><h2>How the family supports the child</h2><p>{area.familyFocus}</p></article></div>

      <div id="topics" className="public-page-grid" style={{marginTop:32}}>
        {area.topics.map(([title,body])=><a className="public-page-card resource-pathway-link" href={`#${topicId(title)}`} key={title}><span className="status-label">Resource pathway</span><h3>{title}</h3><p>{body}</p><strong>Open this pathway →</strong></a>)}
      </div>

      <section className="resource-detail-stack" aria-label={`${area.title} pathway guides`}>
        {area.topics.map(([title,body],index)=><article className="resource-detail" id={topicId(title)} key={title}>
          <div className="resource-detail-number">{String(index+1).padStart(2,"0")}</div>
          <div><span className="status-label">Hands Gifted starter guide</span><h2>{title}</h2><p>{body}</p>
          <h3>Start here</h3><p>Choose one realistic goal for this week. Identify what the family already has, what is missing, who needs to participate, and the smallest useful action that can be completed today.</p>
          <h3>Practice it as a family</h3><p>Give children an age-appropriate role, demonstrate the task first, let them practice with supervision, and review what worked. Build consistency before adding more steps or responsibility.</p>
          <h3>Build the system</h3><p>Write down the repeatable steps, supplies, schedule, or contacts involved. Keep what works, correct what does not, and connect the pathway to relevant Hands Gifted activities and resources instead of relying on memory alone.</p>
          <div className="public-page-actions"><a className="button gold" href="/activities">Find an activity</a><a className="button" href="/programs">Related programs</a><a className="button" href="#topics">Back to pathways</a></div></div>
        </article>)}
      </section>

      <div id="scripture" className="public-page-grid" style={{marginTop:32}}><article className="public-page-card public-page-wide"><span className="status-label">Scripture study trail</span><h2>Connect the practical work to continuing study.</h2><p>Use these references as starting points for context, principle, reflection, and practical application rather than isolated decorative quotations.</p></article>{area.scriptureSeries.map(([theme,references,note])=><article className="public-page-card" key={theme}><h3>{theme}</h3><p><strong>{references.join(" • ")}</strong></p><p>{note}</p></article>)}</div>
      <div className="public-page-grid" style={{marginTop:32}}><article className="public-page-card"><span className="status-label">Free public layer</span><h2>Useful information now.</h2><p>Starter guidance, scripture pathways, approved outside resources, and selected activities can remain public.</p></article><article className="public-page-card"><span className="status-label">Deeper Hands Gifted layer</span><h2>Structured tools as they are completed.</h2><p>Full workbooks, courses, printable systems, lesson collections, specialized tools, products, and direct services can be released when genuinely ready.</p></article><article className="public-page-card public-page-wide"><span className="status-label">Verification standard</span><h2>Outside resources must be current and clearly identified.</h2><p>Hands Gifted distinguishes shared information from independently verified resources and formal partners. Private family records never become public evidence.</p></article></div>
    </section><SiteFooter/></main>;
}