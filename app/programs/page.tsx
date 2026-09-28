import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { handsGiftedSkills } from "../../lib/handsGiftedSkills";
const pathways=[
["Children & Learning","Parent-guided learning, responsibility, creativity, school support, practical projects, and discovering individual gifts.","/resources/kids-learning"],
["Family & Home","Household routines, organization, meal systems, stewardship, responsibilities, and family stability.","/resources/household-management"],
["Creative Arts & Technology","Art, music, media, digital creativity, technology, and useful creative development.","/resources/kids-learning"],
["Entrepreneurship & Opportunity","Money skills, honest work, creating value, entrepreneurship, and responsible opportunity.","/resources/kids-learning"],
["Family & Community Support","Verified resources, referrals, opportunities, and practical information that can strengthen families.","/resources/community-resources"],
] as const;
export default function ProgramsPage(){return <main className="public-page"><SiteHeader/>
<section className="public-page-hero"><span>Hands Gifted Programs</span><h1>Choose a subject. Open its world.</h1><p>Programs is a directory, not one long lesson. Tap a subject to open a page focused on that topic. Biblical principles are woven throughout Hands Gifted learning, family life, skills, work, stewardship, and service.</p></section>
<section className="public-page-content"><div className="section-heading left"><span>Practical skill worlds</span><h2>Build useful skills through real family life.</h2></div><div className="compact-directory">{handsGiftedSkills.map(s=><a className="directory-card" href={`/skills/${s.slug}`} key={s.slug}><small>{s.tagline}</small><h2>{s.title}</h2><p>{s.summary}</p><strong>Open {s.shortTitle} →</strong></a>)}</div></section>
<section className="public-page-content program-pathways"><div className="section-heading left"><span>Family development</span><h2>Choose another Hands Gifted pathway.</h2></div><div className="compact-directory">{pathways.map(([t,b,h])=><a className="directory-card" href={h} key={t}><h2>{t}</h2><p>{b}</p><strong>Open this subject →</strong></a>)}</div></section>
<SiteFooter/></main>}