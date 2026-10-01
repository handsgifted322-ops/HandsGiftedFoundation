import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const areas=[
 ["Faith & Womanhood","Biblical principles for character, wisdom, stewardship, and everyday life."],
 ["Skills of the Hands","Develop practical skills such as sewing, cooking, hair care, gardening, clothing care, and making."],
 ["Home & Family Life","Practical support for routines, meals, household organization, family care, and stability."],
 ["Personal Development","Identify your gifts, strengthen your abilities, learn new skills, and set practical goals."],
 ["Learning & Resources","Explore useful guides, learning materials, tutorials, and practical resources."],
 ["Start Where You Are","Choose one area to learn or strengthen without trying to change everything at once."]
] as const;

export default function WomenPage(){
 return <main className="hg-clean-home"><SiteHeader/>
  <section className="hg-clean-section hg-women-page">
   <div className="hg-clean-heading"><h1>For Women</h1><span>Grow in faith, wisdom &amp; practical skills.</span></div>
   <div className="hg-women-grid">{areas.map(([title,description])=><section className="hg-women-card" key={title}><h2>{title}</h2><p>{description}</p></section>)}</div>
  </section>
  <SiteFooter/>
 </main>;
}
