import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { publicResourceAreas } from "../../lib/publicResources";

export default function ResourcesPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Resource Center</span>
      <h1>Start with the need. Keep learning from there.</h1>
      <p>Hands Gifted is organized as a faith-centered child and family resource ecosystem. Each area opens into practical topics, scripture study trails, trustworthy outside resources, free information, and deeper tools as they are developed.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/resources/kids-learning">Start with children & learning</a><a className="button" href="/resources/community-resources">Find community resources</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        {publicResourceAreas.map((area)=><a className="public-page-card" href={`/resources/${area.slug}`} key={area.slug}>
          <span className="status-label">{area.tag}</span>
          <h2>{area.title}</h2>
          <p>{area.summary}</p>
          <strong>Explore this resource area →</strong>
        </a>)}

        <article className="public-page-card public-page-wide">
          <span className="status-label">How the resource ecosystem works</span>
          <h2>Free information first. Deeper structure when you want more.</h2>
          <p>Basic educational information, community-resource navigation, scripture pathways, and selected starter tools should remain publicly useful. More developed workbooks, templates, lesson collections, household systems, courses, member libraries, products, and direct services can become paid only when they are genuinely ready.</p>
        </article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
