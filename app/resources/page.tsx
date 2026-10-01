import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const groups=[
  ["kids-learning","Kids & Learning","School support, activities, life skills, interests, and family learning.","/resources/kids-learning"],
  ["family","Family Resources","Marriage, parenting, communication, routines, and family connection.","/programs"],
  ["faith","Bible & Faith","Scripture study, biblical living, character, and practical application.","/resources/bible-faith"],
  ["home","Home & Daily Living","Meals, cleaning, organization, household routines, and stewardship.","/resources/household-management"],
  ["stability","Stability & Community","Money, work, transportation, community resources, and rebuilding stability.","/resources/community-resources"],
  ["skills","Skills & Purpose","Cooking, sewing, gardening, braiding, creativity, and useful work.","/skills"],
] as const;

export default function ResourcesPage(){
 return <main className="public-page"><SiteHeader/>
  <section className="public-page-hero compact-directory-hero"><span>Hands Gifted Resources</span><h1>What do you need help with?</h1><p>Scroll through the choices below, then open the area you need.</p></section>
  <section className="public-page-content compact-directory">
   <div className="resource-scrollbox" role="region" aria-label="Resource choices" tabIndex={0}>
    {groups.map(([id,title,text,href])=><a id={id} className="resource-scroll-card" href={href} key={id}><div><h2>{title}</h2><p>{text}</p></div><strong>Open →</strong></a>)}
   </div>
  </section>
  <SiteFooter/>
 </main>;
}