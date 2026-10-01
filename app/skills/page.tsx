import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
const skills=[
 ["Cooking","Meals, kitchen skills, planning, and family food learning.","/skills/cooking"],
 ["Gardening","Growing food, nature, science, patience, and stewardship.","/skills/gardening"],
 ["Braiding","Hair care, creativity, technique, and skill development.","/skills/braiding"],
 ["Sewing","Measurement, repair, design, construction, and craftsmanship.","/skills/sewing"],
] as const;
export default function SkillsPage(){return <main className="public-page"><SiteHeader/>
 <section className="public-page-hero compact-directory-hero"><span>Hands Gifted Skills</span><h1>Choose a skill.</h1><p>Pick one area to learn, practice, or explore further.</p></section>
 <section className="public-page-content compact-directory"><div className="directory-grid">
 {skills.map(([title,text,href])=><a className="directory-card" href={href} key={title}><h2>{title}</h2><p>{text}</p><strong>Open →</strong></a>)}
 </div></section><SiteFooter/></main>}