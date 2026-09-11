import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { PublicAreaNav } from "../components/PublicAreaNav";
import { exploreItems } from "../lib/explore";

const creatingNow = [
  ["Family Meals", "/building-strong-families.png", "/explore/cooking-food"],
  ["Garden Growth", "/hands-gifted-coming-soon.png", "/explore/gardening"],
  ["Braiding", "/modest-fashion-purpose.png", "/explore/braiding"],
  ["Sewing Projects", "/modest-fashion-purpose.png", "/explore/sewing-making"],
  ["Family Learning", "/building-strong-families.png", "/explore/family-learning"],
  ["Creative Projects", "/building-strong-families.png", "/explore/art-creativity"],
] as const;

export default function Home(){
  return <main className="catalog-home">
    <SiteHeader />

    <section className="catalog-hero">
      <div className="catalog-hero-copy">
        <div className="eyebrow">Faith • Family • Skills • Opportunity • Service</div>
        <h1>Stronger families. Brighter possibilities.</h1>
        <p>Hands Gifted is a faith-centered family-development venture built around practical learning, creativity, connection, and opportunities that grow from real skills.</p>
        <div className="hero-actions"><a className="button gold" href="#explore">Explore Hands Gifted</a><a className="button glass" href="#creating">See what we’re creating</a></div>
      </div>
      <div className="catalog-hero-art" role="img" aria-label="Hands Gifted family development"></div>
    </section>

    <PublicAreaNav />

    <section id="explore" className="catalog-section">
      <div className="catalog-heading"><span>Explore Hands Gifted</span><h2>Choose an area and look inside.</h2><p>Short, visual, and easy to browse. Each card opens its own page instead of putting the entire vision on one long screen.</p></div>
      <div className="catalog-grid">
        {exploreItems.map((item)=><a className="catalog-card" key={item.slug} href={`/explore/${item.slug}`}>
          <div className="catalog-card-media"><img src={item.image} alt={item.title}/></div>
          <div className="catalog-card-body"><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.summary}</p><span className="arrow">Explore →</span></div>
        </a>)}
      </div>
    </section>

    <section id="creating" className="catalog-section compact">
      <div className="catalog-heading"><span>What We’re Creating Now</span><h2>Real work. Real learning. Real progress.</h2></div>
      <div className="catalog-gallery">{creatingNow.map(([label,image,href])=><a key={label} href={href}><img src={image} alt={label}/><span>{label}</span></a>)}</div>
    </section>

    <section id="story" className="catalog-section compact">
      <div className="catalog-story-strip">
        <div><span className="eyebrow">Our Story</span><h2>Build the household first. Share what proves useful.</h2><p>Hands Gifted develops through family connection, practical skills, documented learning, creativity, stewardship, opportunity, and service. The public site shows the parts that are ready to share while private family records stay protected.</p></div>
        <div className="catalog-actions"><a className="button" href="/programs">View development lanes</a><a className="button gold" href="/#connect">Connect</a></div>
      </div>
    </section>

    <section className="catalog-section compact">
      <div className="catalog-private"><div><strong>Private family spaces stay separate.</strong><p>School records, routines, child progress, household administration, and parent notes do not belong in the public catalog.</p></div><a className="button gold" href="/family">Family access</a></div>
    </section>

    <section id="connect" className="connect-section"><div><span className="eyebrow light">Hands Gifted</span><h2>Faith. Family. Skills. Opportunity. Service.</h2><p>Follow the journey, explore what is being created, or contact Hands Gifted for current availability and future updates.</p></div><div className="connect-actions"><a className="button gold" href="mailto:handsgifted322@gmail.com">Contact Hands Gifted</a><a className="button glass" href="/explore/braiding">Braiding by inquiry</a></div></section>

    <SiteFooter />
  </main>;
}
