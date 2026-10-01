import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
const choices=[
 ["Family Learning","Activities, child development, practical learning, and family participation.","/activities"],
 ["Faith & Biblical Living","Scripture-centered resources and practical biblical application.","/resources#faith"],
 ["Home & Family Development","Household routines, family systems, organization, and stability.","/resources#home"],
 ["Skills & Purpose","Cooking, gardening, braiding, sewing, creativity, and useful skill development.","/skills"],
 ["Services","See Hands Gifted support and service options as they become available.","/services"],
] as const;
export default function ProgramsPage(){return <main className="public-page"><SiteHeader/>
 <section className="public-page-hero compact-directory-hero"><span>Programs & Services</span><h1>What would you like to explore?</h1><p>Choose a path. Details appear only after you select one.</p></section>
 <section className="public-page-content compact-directory"><div className="directory-grid">
 {choices.map(([title,text,href])=><a className="directory-card" href={href} key={title}><h2>{title}</h2><p>{text}</p><strong>Open →</strong></a>)}
 </div></section><SiteFooter/></main>}