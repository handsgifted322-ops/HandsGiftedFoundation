import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export default function Page(){
 return <main className="hg-clean-home"><SiteHeader/>
  <section className="hg-clean-section hg-women-page">
   <div className="hg-clean-heading"><h1>Bible & Faith</h1><span>Biblical principles for everyday life.</span></div>
   <div className="hg-women-grid">
    <section className="hg-women-card"><h2>Biblical Foundation</h2><p>Explore scripture and biblical principles that inform everyday life.</p></section>
    <section className="hg-women-card"><h2>Women in Scripture</h2><p>Study biblical examples of women, wisdom, character, service, and faith.</p></section>
    <section className="hg-women-card"><h2>Family & Home</h2><p>Explore biblical principles related to family, household responsibility, and stewardship.</p></section>
    <section className="hg-women-card"><h2>Work & Skills</h2><p>Connect useful work, diligence, learning, and skills of the hands with biblical principles.</p></section>
    <section className="hg-women-card"><h2>Character & Wisdom</h2><p>Study principles involving wisdom, patience, discipline, integrity, and growth.</p></section>
    <section className="hg-women-card"><h2>Scripture Resources</h2><p>Find organized scripture references and learning resources for further study.</p></section>
   </div>
  </section>
  <SiteFooter/>
 </main>;
}
