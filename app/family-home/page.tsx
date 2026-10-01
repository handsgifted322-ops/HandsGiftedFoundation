import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export default function Page(){
 return <main className="hg-clean-home"><SiteHeader/>
  <section className="hg-clean-section hg-women-page">
   <div className="hg-clean-heading"><h1>Family & Home</h1><span>Practical support for stronger everyday family life.</span></div>
   <div className="hg-women-grid">
    <section className="hg-women-card"><h2>Household Routines</h2><p>Build simple routines that help the home function with greater consistency.</p></section>
    <section className="hg-women-card"><h2>Meals & Food</h2><p>Explore meal planning, food preparation, kitchen skills, and family meal ideas.</p></section>
    <section className="hg-women-card"><h2>Home Care</h2><p>Learn practical cleaning, organization, clothing care, and household maintenance skills.</p></section>
    <section className="hg-women-card"><h2>Family Connection</h2><p>Strengthen communication, shared responsibilities, and meaningful time together.</p></section>
    <section className="hg-women-card"><h2>Children & Family Life</h2><p>Support everyday parenting, learning, routines, and age-appropriate responsibility.</p></section>
    <section className="hg-women-card"><h2>Stability & Stewardship</h2><p>Use practical planning and stewardship to strengthen the household over time.</p></section>
   </div>
  </section>
  <SiteFooter/>
 </main>;
}
