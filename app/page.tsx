import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
const paths=[
["Children & Learning","Explore learning and activities.","/resources/kids-learning"],
["Family & Home","Practical support for everyday family life.","/resources/household-management"],
["Life Skills","Cook, sew, garden, braid, create, and build.","/skills"],
["Community","Find useful family resources and opportunities.","/resources/community-resources"],
] as const;
export default function Home(){return <main className="hg-home"><SiteHeader/>
<section className="hg-hero simplified-hero landing-hero"><div className="hg-hero-copy"><div className="hg-kicker">Children • Family • Faith • Skills</div><h1>Discover the gift.<br/><span>Build the skill.</span></h1><p className="hg-hero-lead">Practical learning for children and families—rooted in faith and built for real life.</p><div className="hg-hero-actions"><a className="button gold" href="/resources/kids-learning">Start exploring</a><a className="button glass" href="/activities">Try an activity</a></div></div><div className="hg-hero-visual"><div className="hg-visual-main"><img src="/catalog/family-learning.jpg" alt="Family learning together"/></div></div></section>
<section className="landing-paths"><div className="landing-path-heading"><span>Explore Hands Gifted</span><h2>Where do you want to go?</h2></div><div className="landing-path-grid">{paths.map(([t,b,h])=><a href={h} key={t}><h3>{t}</h3><p>{b}</p><strong>Explore →</strong></a>)}</div></section>
<section className="landing-faith"><p><strong>Faith throughout.</strong> Biblical principles are woven naturally into learning, family life, practical skills, stewardship, and service.</p></section>
<SiteFooter/></main>}