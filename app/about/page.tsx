import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const principles = [
  ["Faith", "We recognize God as the source of wisdom, strength, and purpose."],
  ["Family", "Strong families and healthy households matter."],
  ["Stewardship", "People should be equipped to manage the resources, abilities, time, and opportunities entrusted to them."],
  ["Wisdom", "Knowledge becomes powerful when it can be applied to real life."],
  ["Service", "We are called to use what we have to help others."],
  ["Diligence", "Progress often begins with small, faithful steps."],
  ["Generational Growth", "We want the lessons learned today to become opportunities for the children and generations that follow."],
] as const;

const approach = [
  ["Help", "Sometimes the answer is immediate assistance or a practical next step."],
  ["Connect", "Sometimes it is finding the right resource, organization, relationship, or opportunity."],
  ["Equip", "Sometimes it is gaining knowledge, tools, or a practical skill."],
  ["Teach", "Sometimes it is learning how to apply that knowledge in everyday life."],
  ["Empower", "The goal is to help people move forward with greater understanding, support, and confidence."],
] as const;

export default function AboutPage(){
  return <main className="public-page">
    <SiteHeader/>
    <section className="public-page-hero">
      <span>Our Foundation</span>
      <h1>Discover the Gift. Build the Skill.</h1>
      <p>Hands Gifted is rooted in faith, family, service, wisdom, stewardship, and the belief that every person has God-given gifts and purpose. We strengthen women, children, and families through practical support, education, encouragement, and connection.</p>
      <div className="hg-hero-actions"><a className="button gold" href="/programs">Explore programs</a><a className="button" href="/resources">Explore resources</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        <article className="public-page-card public-page-wide">
          <span className="status-label">Our Purpose</span>
          <h2>Helping people means more than meeting an immediate need.</h2>
          <p>It means helping people find the knowledge, resources, skills, relationships, and opportunities that can help them take their next step. Sometimes that next step is practical assistance. Sometimes it is a resource connection, a new skill, a useful household system, or simply identifying where to begin.</p>
        </article>

        <article className="public-page-card public-page-wide">
          <span className="status-label">What We Believe</span>
          <h2>Principles that guide how we serve, teach, organize, and build.</h2>
          <div className="public-page-grid">
            {principles.map(([title,body])=><article className="public-page-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </article>

        <article className="public-page-card public-page-wide">
          <span className="status-label">Our Approach</span>
          <h2>Help → Connect → Equip → Teach → Empower</h2>
          <div className="public-page-grid">
            {approach.map(([title,body],index)=><article className="public-page-card" key={title}><span className="status-label">0{index+1}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </article>

        <article className="public-page-card">
          <img src="/images/hands-gifted/02_For_Women.webp" alt="Women learning and supporting one another" style={{width:"100%",aspectRatio:"16 / 10",objectFit:"cover",borderRadius:"12px",marginBottom:"14px"}}/>
          <h3>Women and personal development</h3>
          <p>Learning, encouragement, practical skills, resource connections, and opportunities to strengthen everyday life.</p>
        </article>
        <article className="public-page-card">
          <img src="/images/hands-gifted/03_For_Children.webp" alt="Children learning and developing practical skills" style={{width:"100%",aspectRatio:"16 / 10",objectFit:"cover",borderRadius:"12px",marginBottom:"14px"}}/>
          <h3>Children and learning</h3>
          <p>Age-appropriate education, creativity, life skills, and opportunities to discover and develop their abilities.</p>
        </article>
        <article className="public-page-card">
          <img src="/images/hands-gifted/04_Family_and_Home.webp" alt="Family and household learning" style={{width:"100%",aspectRatio:"16 / 10",objectFit:"cover",borderRadius:"12px",marginBottom:"14px"}}/>
          <h3>Family and household strength</h3>
          <p>Practical household knowledge, routines, planning, and tools that support healthier, more organized everyday life.</p>
        </article>

        <article className="public-page-card public-page-wide">
          <span className="status-label">Community Connection</span>
          <h2>A bridge to help, not a promise to provide every service.</h2>
          <p>Hands Gifted may help people locate and understand available resources for food and basic necessities, housing, employment, transportation, education, family support, financial organization, and other needs. We do not claim to provide every service ourselves. For crisis situations and specialist needs—including domestic safety, mental health, addiction and recovery, and housing services—we aim to connect people with qualified organizations and professionals.</p>
          <p>People deserve dignity when they are struggling. They should not have to disclose their entire life story just to find basic public information. We protect private family information and do not share another person's story without permission.</p>
        </article>

        <article className="public-page-card public-page-wide">
          <span className="status-label">Learning and Growth</span>
          <h2>Learn → Practice → Document → Prove → Teach / Productize</h2>
          <p>We develop practical knowledge through research and real experience. We practice, document what works and what needs improvement, and establish capability before turning that knowledge into a public lesson, product, program, or service. This keeps our public offers grounded in demonstrated work rather than promises.</p>
        </article>

        <article className="public-page-card public-page-wide">
          <span className="status-label">Scripture</span>
          <h2>Principles we seek to put into practice.</h2>
          <blockquote>
            <p>“Every man according as he purposeth in his heart, so let him give...”</p>
            <strong>2 Corinthians 9:7</strong>
          </blockquote>
          <blockquote>
            <p>“She openeth her mouth with wisdom; and in her tongue is the law of kindness.”</p>
            <strong>Proverbs 31:26</strong>
          </blockquote>
          <blockquote>
            <p>“And let us not be weary in well doing...”</p>
            <strong>Galatians 6:9</strong>
          </blockquote>
          <p>We seek to put these principles into practice through the way we serve, teach, organize, create, and build.</p>
        </article>
      </div>
    </section>
    <SiteFooter/>
  </main>;
}
