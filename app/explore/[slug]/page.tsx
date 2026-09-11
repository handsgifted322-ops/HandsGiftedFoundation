import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { exploreItems, getExploreItem } from "../../../lib/explore";

export function generateStaticParams(){return exploreItems.map((item)=>({slug:item.slug}));}

export default async function ExploreDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const item=getExploreItem(slug);
  if(!item) notFound();
  return <main className="explore-page">
    <SiteHeader />
    <section className="explore-hero">
      <div className="explore-hero-copy"><span>{item.status}</span><h1>{item.title}</h1><p>{item.intro}</p></div>
      <div className="explore-hero-media"><img src={item.image} alt={item.title}/></div>
    </section>
    <section className="explore-content">
      <a className="explore-back" href="/#explore">← Back to catalog</a>
      <div className="explore-content-grid">
        <article className="explore-panel"><h2>What belongs here</h2><div className="explore-list">{item.highlights.map((x)=><div key={x}><strong>{x}</strong><span>Built from real learning, practice, approved documentation, and founder review.</span></div>)}</div></article>
        <aside className="explore-panel"><h2>Current status</h2><p><strong>{item.status}</strong></p><p>{item.summary}</p><p>Hands Gifted uses truth labels so visitors can see what is active, what is being developed, and what is still coming soon.</p></aside>
      </div>
    </section>
    <SiteFooter />
  </main>;
}