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

export default function Home(){
 return <main className="hg-clean-home"><SiteHeader/>
  <section id="start-here" className="hg-art hg-hero-art" aria-label="Hands Gifted — Discover the Gift. Build the Skill." />

  <section id="explore" className="hg-clean-audiences" aria-label="Explore Hands Gifted">
   {audiences.map(([id,label,file])=><a key={id} id={id} href={"#"+id+"-content"} aria-label={"Explore "+label} className="hg-art hg-audience-art" style={{backgroundImage:`url('/images/hands-gifted/${file}')`}} />)}
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
  <section id="women-content" className="hg-clean-section hg-women-content">
   <div className="hg-clean-heading"><h2>For Women</h2><span>Grow in faith, wisdom &amp; practical skills.</span></div>
   <div className="hg-women-grid">
    <div className="hg-women-card"><h3>Faith &amp; Womanhood</h3><p>Biblical principles for character, wisdom, stewardship, and everyday life.</p></div>
    <div className="hg-women-card"><h3>Skills of the Hands</h3><p>Develop practical skills such as sewing, cooking, hair care, gardening, clothing care, and making.</p></div>
    <div className="hg-women-card"><h3>Home &amp; Family Life</h3><p>Practical support for routines, meals, household organization, family care, and stability.</p></div>
    <div className="hg-women-card"><h3>Personal Development</h3><p>Identify your gifts, strengthen your abilities, learn new skills, and set practical goals.</p></div>
    <div className="hg-women-card"><h3>Learning &amp; Resources</h3><p>Explore useful guides, learning materials, tutorials, and practical resources.</p></div>
    <div className="hg-women-card"><h3>Start Where You Are</h3><p>Choose one area to learn or strengthen without trying to change everything at once.</p></div>
   </div>
  </section>
  <section id="children-content" className="hg-anchor"/><section id="family-content" className="hg-anchor"/><section id="faith-content" className="hg-anchor"/><section id="skills-content" className="hg-anchor"/><section id="resources-content" className="hg-anchor"/>
  <SiteFooter/>
 </main>;
}