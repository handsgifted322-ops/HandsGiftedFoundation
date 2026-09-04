import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { academy } from "../../lib/catalog";

export default function AcademyPage() {
  return <main><SiteHeader /><section className="inner-hero academy-hero"><span>Family Academy</span><h1>Learn. Practice. Show. Serve. Teach.</h1><p>A connected learning system for Scripture, character, responsibility, practical skills, gifts, family study, and demonstrated mastery.</p></section><section className="section"><div className="detail-grid">{academy.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><h3>{item}</h3></article>)}</div><div className="access-note"><strong>Private family learning stays private.</strong><p>Child-specific progress, assignments, responsibilities, school support, and help requests belong behind authenticated family access rather than on the public website.</p><a className="button" href="/family">Go to family access</a></div></section><SiteFooter /></main>;
}
