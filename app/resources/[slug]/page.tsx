import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { getPublicResourceArea, publicResourceAreas } from "../../../lib/publicResources";
const topicSlug=(title:string)=>title.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export function generateStaticParams(){return publicResourceAreas.map(a=>({slug:a.slug}));}
export default async function ResourceAreaPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const area=getPublicResourceArea(slug);if(!area)notFound();return <main className="public-page"><SiteHeader/>
<section className="public-page-hero"><span>{area.tag}</span><h1>{area.title}</h1><p>{area.summary}</p></section>
<section className="public-page-content"><div className="public-page-grid"><article className="public-page-card"><span className="status-label">For children</span><h2>What children can build</h2><p>{area.childFocus}</p></article><article className="public-page-card"><span className="status-label">For families</span><h2>How the family supports it</h2><p>{area.familyFocus}</p></article></div>
<div className="section-heading left resource-choice-heading"><span>Choose a subject</span><h2>Open one topic at a time.</h2><p>Each subject has its own focused page with basic information, family application, questions and answers, biblical principles, and next steps.</p></div>
<div className="compact-directory">{area.topics.map(([title,body])=><a className="directory-card" href={`/resources/${area.slug}/${topicSlug(title)}`} key={title}><h2>{title}</h2><p>{body}</p><strong>Open {title} →</strong></a>)}</div></section><SiteFooter/></main>}