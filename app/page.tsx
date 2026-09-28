import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const gateways=[
  ["Children & Learning","Explore learning, creativity, school support, technology, and guided activities.","/resources/kids-learning"],
  ["Life Skills","Build useful skills through cooking, sewing, gardening, braiding, and hands-on work.","/skills"],
  ["Family & Home","Strengthen everyday family life with practical routines, preparation, and stewardship.","/resources/household-management"],
  ["Community Resources","Connect with useful programs, opportunities, and family support.","/resources/community-resources"],
] as const;

export default function Home(){return <main className="hg-home lovable-home"><SiteHeader/>
<section className="lovable-hero">
<img src="/catalog/family-learning.jpg" alt="Family learning together"/>
<div className="lovable-hero-overlay"/>
<div className="lovable-hero-content"><p className="lovable-kicker">Hands Gifted Foundation</p><h1>Discover the gift.<br/><em>Build the skill.</em></h1><p className="lovable-lead">Faith-centered learning, practical skills, and family development—built for real life.</p><a className="lovable-gold-button" href="/resources/kids-learning">Start exploring <span>→</span></a></div>
</section>
<section className="lovable-principles" aria-label="Hands Gifted pathways">{gateways.map(([title,,href],i)=><a href={href} key={title}><span>0{i+1}</span><strong>{title}</strong></a>)}</section>
<section className="lovable-story">
<div className="lovable-story-copy"><p className="lovable-kicker">Learn • Create • Grow</p><h2>Useful gifts become useful skills.</h2><p>Hands Gifted connects children and families with practical learning they can use at home, at school, in the community, and as they grow.</p><a className="lovable-text-link" href="/activities">Explore family activities →</a></div>
<div className="lovable-story-image"><img src="/catalog/cooking.jpg" alt="Hands-on family learning"/></div>
</section>
<section className="lovable-pathways">
<div className="lovable-pathway-intro"><p className="lovable-kicker">Explore Hands Gifted</p><h2>Choose where you want to grow.</h2></div>
<div className="lovable-pathway-list">{gateways.map(([title,body,href],i)=><a href={href} key={title}><span className="lovable-pathway-number">0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div><b>↗</b></a>)}</div>
</section>
<section className="lovable-closing"><div><p className="lovable-kicker">Faith throughout</p><h2>Learning with purpose.</h2><p>Biblical principles are woven through learning, work, stewardship, family responsibility, service, and developing useful gifts.</p></div><a className="lovable-gold-button" href="/resources">Explore resources <span>→</span></a></section>
<SiteFooter/></main>}