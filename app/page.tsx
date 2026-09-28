import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
const pillars=[
["Learn","Children & Learning","Guided activities, school support, creativity, technology, money skills, and opportunities.","/resources/kids-learning","01"],
["Create","Life Skills","Cooking, sewing, gardening, braiding, and useful hands-on projects.","/skills","02"],
["Family","Family & Home","Practical resources for routines, meals, organization, stability, and everyday family life.","/resources/household-management","03"],
["Connect","Community","Find useful programs, family support, resources, and opportunities.","/resources/community-resources","04"],
] as const;
export default function Home(){return <main className="hg-home platform-home"><SiteHeader/>
<section className="platform-hero"><img src="/catalog/family-learning.jpg" alt="Family learning together"/><div className="platform-hero-shade"/><div className="platform-hero-copy"><span>Hands Gifted Foundation</span><h1>Discover the gift.<br/><em>Build the skill.</em></h1><p>Faith-centered learning and practical development for children and families.</p><div><a className="platform-primary" href="/activities">Explore activities</a></div></div></section>
<nav className="platform-pillars" aria-label="Explore Hands Gifted">{pillars.map(([k,t,,h])=><a href={h} key={k}><small>{k}</small><strong>{t}</strong></a>)}</nav>
<section className="platform-feature"><div className="platform-section-heading"><span>Start here</span><h2>Learn by doing.</h2><p>Choose a real activity, build a useful skill, and keep growing together.</p></div><a className="platform-feature-card" href="/activities"><div className="platform-feature-image"><img src="/catalog/cooking.jpg" alt="Hands Gifted family activity"/></div><div><small>Featured activities</small><h3>Something useful to do together</h3><p>Simple guided activities with supplies, steps, conversation, and practical learning.</p><strong>Choose an activity →</strong></div></a></section>
<section className="platform-worlds"><div className="platform-section-heading"><span>Explore</span><h2>Four connected worlds.</h2></div><div className="platform-world-grid">{pillars.map(([k,t,b,h,n])=><a href={h} key={k}><span>{n}</span><small>{k}</small><h3>{t}</h3><p>{b}</p><strong>Open →</strong></a>)}</div></section>
<section className="platform-faith"><span>Faith throughout</span><h2>Biblical principles belong in real life.</h2><p>Learning, work, stewardship, family responsibility, service, and developing useful gifts are connected throughout Hands Gifted.</p></section>
<SiteFooter/></main>}