import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const paths=[
 ["Faith & Womanhood","Build wisdom, character, stewardship, and everyday faith.","Explore Bible & Faith","/bible-faith"],
 ["Skills of the Hands","Learn useful skills including sewing, cooking, hair care, gardening, clothing care, home care, crafts, and making.","Explore practical skills","/#skills"],
 ["Home & Family","Strengthen routines, meals, organization, family care, and the everyday work of the home.","Strengthen home life","/family-home"],
 ["Develop My Gifts","Recognize your interests and abilities, choose something to strengthen, and take a practical next step.","Start developing","/women#develop"],
 ["Learn Something New","Find beginner-friendly guides, learning materials, tutorials, and practical resources.","Browse resources","/#resources"],
 ["Start Where I Am","Not sure where to begin? Choose the part of life that needs attention now and take one manageable step.","Choose where to start","/women#start"]
] as const;
const starts=[
 ["My Faith","/bible-faith"],["My Home","/family-home"],["My Family","/family-home"],
 ["My Skills","/#skills"],["My Personal Growth","#develop"]
] as const;

export default function WomenPage(){
 return <main className="hg-clean-home"><SiteHeader/>
  <section className="hg-women-hero">
   <div><span className="hg-kicker">Hands Gifted for Women</span><h1>Grow in faith. Build practical skills. Strengthen everyday life.</h1><p>Choose what you want to work on today. You do not have to change everything at once.</p><a className="hg-women-primary" href="#choose">Choose a starting point</a></div>
   <div className="hg-women-hero-image" role="img" aria-label="Women learning and developing practical skills"/>
  </section>

  <section id="choose" className="hg-clean-section hg-women-page">
   <div className="hg-clean-heading"><h2>What would you like to work on today?</h2><span>Choose one path.</span></div>
   <div className="hg-women-grid">{paths.map(([title,description,label,href])=><a className="hg-women-card hg-women-link-card" href={href} key={title}><h3>{title}</h3><p>{description}</p><strong>{label} →</strong></a>)}</div>
  </section>

  <section id="start" className="hg-women-start">
   <div className="hg-clean-heading"><h2>Start Where I Am</h2><span>One manageable step.</span></div>
   <p className="hg-women-intro">What needs attention right now?</p>
   <div className="hg-start-options">{starts.map(([label,href])=><a href={href} key={label}>{label}</a>)}</div>
   <div className="hg-start-example"><strong>Need help with your home?</strong><p>Begin with one useful action: a 15-minute reset, a simple household checklist, meal planning, a weekly routine, or one home-care skill.</p><a href="/family-home">Go to Family &amp; Home →</a></div>
  </section>

  <section id="develop" className="hg-women-develop">
   <div><span className="hg-kicker">Develop My Gifts</span><h2>Notice it. Learn it. Practice it. Build the skill.</h2><p>Start with an interest or ability you already have—or something you have always wanted to learn. Choose one skill, find a beginner resource, practice it, and keep building from there.</p></div>
   <div className="hg-women-process"><span>Need</span><b>→</b><span>Learn</span><b>→</b><span>Practice</span><b>→</b><span>Build the Skill</span><b>→</b><span>Biblical Connection</span></div>
  </section>
  <SiteFooter/>
 </main>;
}