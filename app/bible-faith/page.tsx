import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
const paths=[
 ["Biblical Foundation","Explore scripture and biblical principles that can inform everyday life.","Study the foundation"],
 ["Women in Scripture","Study biblical examples involving women, wisdom, character, service, and faith.","Study women in scripture"],
 ["Family & Home","Explore scripture connected with family life, household responsibility, and stewardship.","Study family & home"],
 ["Work & Skills","Connect diligence, useful work, learning, and skills of the hands with biblical principles.","Study work & skills"],
 ["Character & Wisdom","Study wisdom, patience, discipline, integrity, responsibility, and growth.","Study character"],
 ["Scripture Resources","Use organized scripture references and study resources to continue learning.","Find scripture resources"]
] as const;
export default function Page(){return <main className="hg-clean-home"><SiteHeader/>
 <section className="hg-path-hero hg-faith-path"><div><span className="hg-kicker">Bible &amp; Faith</span><h1>A biblical foundation for everyday life.</h1><p>Study scripture by subject, understand the principle, and consider how it connects with practical life.</p></div><div className="hg-path-image"/></section>
 <section className="hg-path-body"><div className="hg-clean-heading"><h2>Choose a study area</h2><span>Scripture. Principle. Application.</span></div><div className="hg-women-grid">{paths.map(([t,d,a])=><section className="hg-women-card" key={t}><h3>{t}</h3><p>{d}</p><strong>{a}</strong></section>)}</div></section>
 <section className="hg-path-callout"><h2>Read the scripture. Understand the principle. Apply it carefully.</h2><p>Hands Gifted connects biblical learning with practical development without replacing personal study.</p></section><SiteFooter/></main>}