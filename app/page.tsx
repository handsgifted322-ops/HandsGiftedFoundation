import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const audiences=[
 ["For Women","Grow in faith, wisdom, and practical capability.","/resources/bible-faith","women"],
 ["For Children","Learn, create, and discover their gifts.","/resources/kids-learning","children"],
 ["Family & Home","Build stronger household rhythms and practical stability.","/resources/household-management","family"],
 ["Bible & Faith","A biblical foundation for everyday life.","/resources/bible-faith","faith"],
] as const;

const skills=[
 ["Sewing & Mending","sewing"],["Cooking & Food Preparation","cooking"],["Hair & Braiding","braiding"],
 ["Gardening & Growing Food","gardening"],["Clothing Care","clothing"],["Home Care","homecare"],
 ["Crafts & Making","crafts"],["Creative & Other Skills","creative"],
] as const;

export default function Home(){
 return <main className="hg-home"><SiteHeader/>
  <section className="hg-new-hero" id="start-here">
   <div className="hg-new-hero-copy"><div className="hg-kicker">Hands Gifted</div><h1>Discover the Gift.<br/><span>Build the Skill.</span></h1>
   <blockquote>“She seeketh wool, and flax, and worketh willingly with her hands.” <cite>— Proverbs 31:13 KJV</cite></blockquote>
   <a className="hg-pill" href="#begin">Start Here →</a></div>
   <div className="hg-photo hg-photo-hero" aria-hidden="true"><span>Hands • Faith • Skill</span></div>
  </section>

  <section className="hg-audience-grid" id="begin">
   {audiences.map(([title,copy,href,kind])=><a href={href} className={"hg-audience "+kind} key={title}><div><h2>{title}</h2><p>{copy}</p><strong>Explore →</strong></div></a>)}
  </section>

  <section className="hg-skills-section">
   <div className="hg-section-title"><div><h2>Skills of the Hands</h2><p>Practical skills for everyday life.</p></div><a href="/skills">Explore All Skills →</a></div>
   <div className="hg-skills-strip">{skills.map(([title,kind])=><a href="/skills" className="hg-skill" key={title}><div className={"hg-skill-photo "+kind}></div><span>{title}</span></a>)}</div>
  </section>

  <section className="hg-feature-band">
   <div className="hg-feature-resources"><div className="hg-feature-heading"><h2>Featured Resources</h2><p>Practical help for real life.</p><a className="hg-pill" href="/resources">View All Resources →</a></div>
    <div className="hg-mini-grid">
     <a href="/resources/kids-learning"><span>Children</span><strong>Learning & Activities</strong></a>
     <a href="/resources/household-management"><span>Family</span><strong>Home & Household</strong></a>
     <a href="/skills"><span>Skills</span><strong>Skills of the Hands</strong></a>
     <a href="/resources/bible-faith"><span>Bible & Faith</span><strong>Biblical Living</strong></a>
    </div>
   </div>
   <a className="hg-children-feature" href="/resources/kids-learning"><div><h2>Children & Learning</h2><p>Supporting them today for a stronger tomorrow.</p><strong>Explore Kids & Learning →</strong></div><div className="hg-child-choices"><span>Learn</span><span>Create</span><span>Discover Their Gifts</span></div></a>
  </section>

  <section className="hg-biblical-close"><div><small>Hands Gifted</small><h2>A Biblical Foundation<br/>for Everyday Life</h2></div><blockquote>“She seeketh wool, and flax, and worketh willingly with her hands.”<cite>Proverbs 31:13</cite></blockquote><a className="hg-pill" href="/resources/bible-faith">Explore Bible & Faith →</a></section>
  <SiteFooter/>
 </main>;
}