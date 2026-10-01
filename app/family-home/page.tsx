import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
const paths=[
 ["Household Routines","Create simple morning, evening, weekly, and reset routines that make home life easier.","Build a routine"],
 ["Meals & Food","Plan meals, prepare food, build kitchen skills, and make family food routines more manageable.","Plan & prepare"],
 ["Home Care","Learn cleaning, organization, clothing care, and practical household maintenance.","Care for the home"],
 ["Family Connection","Strengthen communication, shared responsibility, and meaningful time together.","Connect as a family"],
 ["Children & Family Life","Support learning, routines, responsibilities, and practical development at home.","Support family life"],
 ["Stability & Stewardship","Use what you have wisely, plan ahead, and strengthen the household one step at a time.","Build stability"]
] as const;
export default function Page(){return <main className="hg-clean-home"><SiteHeader/>
 <section className="hg-path-hero hg-family-path"><div><span className="hg-kicker">Hands Gifted Family &amp; Home</span><h1>Build a home that works for the people living in it.</h1><p>Practical help for routines, meals, home care, family connection, and responsible stewardship.</p></div><div className="hg-path-image"/></section>
 <section className="hg-path-body"><div className="hg-clean-heading"><h2>What does your household need?</h2><span>Choose one area.</span></div><div className="hg-women-grid">{paths.map(([t,d,a])=><section className="hg-women-card" key={t}><h3>{t}</h3><p>{d}</p><strong>{a}</strong></section>)}</div></section>
 <section className="hg-path-callout"><h2>Start with the part of home life that needs attention now.</h2><p>You do not need a complete household overhaul. Choose one useful routine or skill, practice it, and build from there.</p></section><SiteFooter/></main>}