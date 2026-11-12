import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const audiences=[
 ["women","Women","02_For_Women.webp"],["children","Children","03_For_Children.webp"],
 ["family","Family & Home","04_Family_and_Home.webp"],["faith","Bible & Faith","05_Bible_and_Faith.webp"],
] as const;
const skills=[
 ["Sewing & Mending","06_Sewing_and_Mending.webp"],["Cooking & Food Preparation","07_Cooking_and_Food.webp"],
 ["Hair & Braiding","08_Hair_and_Braiding.webp"],["Gardening & Growing Food","09_Gardening.webp"],
 ["Clothing Care","10_Clothing_Care.webp"],["Home Care & Household Management","11_Home_Care.webp"],
 ["Crafts & Making","12_Crafts_and_Making.webp"],["Creative & Other Skills","13_Creative_Skills.webp"],
] as const;
const resources=[
 ["Printable Learning Activities","14_Featured_Children.webp"],["Healthy Meal Ideas","15_Featured_Family_Meal.webp"],
 ["Beginner Sewing Guide","16_Featured_Sewing.webp"],["Understanding Proverbs 31","17_Featured_Bible.webp"],
] as const;
const values=[
 ["Faith","We recognize God as the source of wisdom, strength, and purpose."],
 ["Family","Strong families and healthy households matter."],
 ["Stewardship","We help people manage the resources, abilities, time, and opportunities entrusted to them."],
 ["Wisdom","Knowledge becomes powerful when it can be applied to real life."],
 ["Service","We use what we have to help others."],
 ["Diligence","Progress often begins with small, faithful steps."],
 ["Generational Growth","We want today's lessons to become opportunities for the generations that follow."],
] as const;

export default function Home(){
 return <main className="hg-clean-home"><SiteHeader/>
  <section id="start-here" className="hg-art hg-hero-art" aria-label="Hands Gifted — Discover the Gift. Build the Skill." />

  <section id="explore" className="hg-clean-audiences" aria-label="Explore Hands Gifted">
   {audiences.map(([id,label,file])=><a key={id} id={id} href={id==="women"?"/women":id==="children"?"/children":id==="family"?"/family-home":"/bible-faith"} aria-label={"Explore "+label} className="hg-art hg-audience-art" style={{backgroundImage:`url('/images/hands-gifted/${file}')`}} />)}
  </section>

  <section className="public-page-content">
   <div className="public-page-grid">
    <article className="public-page-card public-page-wide">
     <span className="status-label">Our Foundation</span>
     <h2>Faith, family, service, wisdom, and the gifts within every person.</h2>
     <p>Hands Gifted strengthens women, children, and families through practical support, education, encouragement, and connection. We believe helping means more than meeting an immediate need: it means helping people find knowledge, resources, skills, relationships, and opportunities for their next step.</p>
     <div className="public-page-actions"><a className="button gold" href="/about">Learn about Hands Gifted</a><a className="button" href="/resources">Explore resources</a></div>
    </article>
    <article className="public-page-card">
     <img src="/images/hands-gifted/02_For_Women.webp" alt="Women learning and developing practical skills" style={{width:"100%",aspectRatio:"16 / 10",objectFit:"cover",borderRadius:"12px",marginBottom:"14px"}}/>
     <h3>Support women</h3><p>Encouragement, practical learning, resource connections, and opportunities to develop gifts and skills.</p>
    </article>
    <article className="public-page-card">
     <img src="/images/hands-gifted/03_For_Children.webp" alt="Children learning and building life skills" style={{width:"100%",aspectRatio:"16 / 10",objectFit:"cover",borderRadius:"12px",marginBottom:"14px"}}/>
     <h3>Equip children</h3><p>Age-appropriate learning, practical skills, creativity, and experiences that support growth.</p>
    </article>
    <article className="public-page-card">
     <img src="/images/hands-gifted/04_Family_and_Home.webp" alt="Family learning and strengthening everyday household life" style={{width:"100%",aspectRatio:"16 / 10",objectFit:"cover",borderRadius:"12px",marginBottom:"14px"}}/>
     <h3>Strengthen families</h3><p>Household knowledge, useful systems, family resources, and connections that support everyday stability.</p>
    </article>
    <article className="public-page-card public-page-wide">
     <span className="status-label">How We Help</span>
     <h2>Help → Connect → Equip → Teach → Empower</h2>
     <p>Sometimes the next step is immediate assistance. Sometimes it is finding the right organization, learning a skill, organizing a household, or identifying an opportunity. Hands Gifted aims to help people move from feeling overwhelmed toward being informed, equipped, supported, and able to take their next step.</p>
    </article>
   </div>
  </section>

  <section id="skills" className="hg-clean-section">
   <div className="hg-clean-heading"><h2>Skills of the Hands</h2><span>Practical skills for everyday life.</span></div>
   <div className="hg-clean-skills">{skills.map(([label,file])=><a key={label} href="#skills-content" className="hg-clean-skill"><div className="hg-art" style={{backgroundImage:`url('/images/hands-gifted/${file}')`}}/><span>{label}</span></a>)}</div>
  </section>

  <section id="resources" className="hg-clean-feature">
   <div className="hg-clean-resources"><div className="hg-clean-heading"><h2>Featured Resources</h2><span>Practical help for real life.</span></div>
    <div className="hg-clean-resource-grid">{resources.map(([label,file])=><a key={label} href="#resources-content" className="hg-clean-resource"><div className="hg-art" style={{backgroundImage:`url('/images/hands-gifted/${file}')`}}/><span>{label}</span></a>)}</div>
   </div>
   <a id="children-learning" href="#children-content" aria-label="Children and Learning" className="hg-art hg-children-art"/>
  </section>

  <section id="biblical-foundation" className="hg-art hg-bible-art" aria-label="A Biblical Foundation for Everyday Life"/>
  <section id="women-content" className="hg-anchor"/>
  <section id="children-content" className="hg-anchor"/><section id="family-content" className="hg-anchor"/><section id="faith-content" className="hg-anchor"/><section id="skills-content" className="hg-anchor"/><section id="resources-content" className="hg-anchor"/>
  <SiteFooter/>
 </main>;
}
