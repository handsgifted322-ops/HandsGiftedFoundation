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
  <section id="women-content" className="hg-anchor"/><section id="children-content" className="hg-anchor"/><section id="family-content" className="hg-anchor"/><section id="faith-content" className="hg-anchor"/><section id="skills-content" className="hg-anchor"/><section id="resources-content" className="hg-anchor"/>
  <SiteFooter/>
 </main>;
}