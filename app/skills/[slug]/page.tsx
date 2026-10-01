import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { getHandsGiftedSkill, handsGiftedSkills } from "../../../lib/handsGiftedSkills";

export function generateStaticParams() {
  return handsGiftedSkills.map((skill) => ({ slug: skill.slug }));
}

const pageChoices: Record<string, readonly (readonly [string,string,string])[]> = {
  braiding: [
    ["Finished Styles","See completed braid styles and portfolio work.","#work"],
    ["Watch the Process","Process photos and videos will live here as the collection grows.","#process"],
    ["Hair Care & Tools","Practical information for women and girls learning hair care.","#learn"],
    ["Request a Style","Ask about a braid style or appointment.","/book#braiding"],
  ],
  sewing: [
    ["Garments I've Made","See completed garments and sewing projects.","#work"],
    ["Projects & Process","Follow the making process, techniques, and progress.","#process"],
    ["Learn to Sew","Beginner information for women and children who want to learn.","#learn"],
    ["Tools & Supplies","Start with the basic tools and materials used in sewing.","#tools"],
  ],
  cooking: [
    ["Recipe Book","Explore foods and recipes developed through Hands Gifted Cooking.","#work"],
    ["What's Cooking","See meals, kitchen projects, and new additions.","#process"],
    ["Kitchen Skills","Build useful everyday cooking skills.","#learn"],
    ["Healthier Choices","Explore practical alternatives and balanced family-food ideas.","#healthier"],
  ],
  gardening: [
    ["Garden Journey","Follow what is being planted, tested, and learned.","#work"],
    ["What We're Growing","See current garden projects and progress.","#process"],
    ["Learn With Me","Beginner-friendly gardening information for women and children.","#learn"],
    ["Tools & Resources","Explore useful beginner garden tools and resources.","#tools"],
  ],
};

export default async function SkillWorldPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getHandsGiftedSkill(slug);
  if (!skill) notFound();
  const choices=pageChoices[slug]??[];

  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero compact-directory-hero">
      <span>Skills of the Hands · {skill.shortTitle}</span>
      <h1>{skill.title}</h1>
      <p>{skill.summary}</p>
    </section>

    <section className="public-page-content compact-directory">
      <div className="directory-grid">
        {choices.map(([title,text,href])=><a className="directory-card" href={href} key={title}><h2>{title}</h2><p>{text}</p><strong>Open →</strong></a>)}
      </div>

      <section id="work" className="public-page-card public-page-wide" style={{marginTop:28}}>
        <span className="status-label">{slug==="braiding"?"My work":slug==="sewing"?"My creations":slug==="cooking"?"Recipe collection":"Garden journey"}</span>
        <h2>{slug==="braiding"?"Completed styles":slug==="sewing"?"Garments and projects":slug==="cooking"?"Hands Gifted Recipe Book":"Learning by growing"}</h2>
        <p>{slug==="braiding"?"This gallery is reserved for real braid styles completed and photographed through Hands Gifted.":slug==="sewing"?"This gallery is reserved for real garments and sewing projects as they are completed and documented.":slug==="cooking"?"Finished meals and tested recipes can be added here over time, including practical healthier alternatives where appropriate.":"This area documents real planting, progress, lessons, successes, and mistakes without presenting developing experience as professional expertise."}</p>
      </section>

      <section id="process" className="public-page-card public-page-wide" style={{marginTop:18}}>
        <span className="status-label">Photos + video</span>
        <h2>{slug==="cooking"?"See it being made":slug==="gardening"?"See the progress":slug==="sewing"?"See how it was made":"Watch the process"}</h2>
        <p>Selected photos and videos can be featured here. When the Hands Gifted YouTube channel and skill playlist are ready, this page can link directly to that specific playlist instead of sending visitors through unrelated personal social posts.</p>
      </section>

      <section id="learn" className="public-page-card public-page-wide" style={{marginTop:18}}>
        <span className="status-label">Learn</span>
        <h2>Useful information for women and children</h2>
        <ul>{skill.learn.map(item=><li key={item}>{item}</li>)}</ul>
      </section>

      {(slug==="sewing"||slug==="gardening")&&<section id="tools" className="public-page-card public-page-wide" style={{marginTop:18}}>
        <span className="status-label">Start with the basics</span><h2>Tools & resources</h2><p>Practical beginner tools, supplies, and learning resources can be added here as they are tested and useful.</p>
      </section>}

      {slug==="cooking"&&<section id="healthier" className="public-page-card public-page-wide" style={{marginTop:18}}>
        <span className="status-label">Everyday choices</span><h2>Healthier choices</h2><p>Practical ingredient and preparation alternatives can be shared here without turning Hands Gifted into a medical or nutrition-advice service.</p>
      </section>}

      {slug==="braiding"&&<section className="public-page-card public-page-wide" style={{marginTop:18}}>
        <span className="status-label">Braiding service</span><h2>Interested in a style?</h2><p>Visitors can send a service inquiry. Availability, style, preparation, timing, pricing, and any appointment requirements are confirmed before a booking is finalized.</p><a className="button gold" href="/book#braiding">Request a style</a>
      </section>}

      <div className="public-page-actions" style={{marginTop:24}}><a className="button" href="/skills">← All Skills</a></div>
    </section>
    <SiteFooter />
  </main>;
}