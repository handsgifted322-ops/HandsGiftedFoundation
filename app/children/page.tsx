import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export default function Page(){
 return <main className="hg-clean-home"><SiteHeader/>
  <section className="hg-clean-section hg-women-page">
   <div className="hg-clean-heading"><h1>Children</h1><span>Learning, character & practical development.</span></div>
   <div className="hg-women-grid">
    <section className="hg-women-card"><h2>Learning & School</h2><p>Support learning, study habits, curiosity, and age-appropriate educational development.</p></section>
    <section className="hg-women-card"><h2>Character & Responsibility</h2><p>Build responsibility, respect, consistency, and useful everyday habits.</p></section>
    <section className="hg-women-card"><h2>Practical Life Skills</h2><p>Develop age-appropriate skills for home, self-care, creativity, and everyday life.</p></section>
    <section className="hg-women-card"><h2>Creativity & Gifts</h2><p>Explore interests, talents, making, music, art, science, and other developing gifts.</p></section>
    <section className="hg-women-card"><h2>Faith & Biblical Learning</h2><p>Introduce biblical principles and learning in an age-appropriate, family-centered way.</p></section>
    <section className="hg-women-card"><h2>Activities & Resources</h2><p>Find practical learning activities, guides, and resources for children and families.</p></section>
   </div>
  </section>
  <SiteFooter/>
 </main>;
}
