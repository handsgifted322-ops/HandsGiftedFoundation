import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const explore = [
  ["Learn","Explore useful information, research, Scripture, practical resources, and guided learning.","/resources"],
  ["Family","Find resources and development pathways built around real family life.","/resources"],
  ["Skills","Develop practical and creative abilities through learning, practice, and projects.","/skills"],
  ["Programs","Explore Hands Gifted programs, services, resources, and opportunities as they become ready.","/services"],
] as const;

const journey = [
  ["Discover","See what Hands Gifted is and where it may help."],
  ["Learn","Ask questions and build useful knowledge."],
  ["Develop","Practice skills, strengthen abilities, and keep growing."],
  ["Create","Turn learning into projects, resources, products, or evidence of growth."],
  ["Serve","Use developed gifts appropriately in family, work, business, or community."],
] as const;

export default function Home(){
  return <main className="hg-home hg-v2-public">
    <SiteHeader />
    <section className="hg-v2-hero">
      <div className="hg-v2-hero-copy">
        <div className="hg-kicker">FAITH · FAMILY · DEVELOPMENT</div>
        <h1>Develop what is already <span>in your hands.</span></h1>
        <p>Hands Gifted brings together practical knowledge, guided development, family learning, skills, resources, and opportunities so people can learn, put knowledge into practice, create, and keep developing.</p>
        <div className="hg-hero-actions">
          <a className="button gold" href="#explore">Explore Hands Gifted</a>
          <a className="button glass" href="/family">Sign In</a>
        </div>
        <div className="hg-v2-pathline"><strong>Learn</strong><span>→</span><strong>Develop</strong><span>→</span><strong>Create</strong><span>→</span><strong>Serve</strong></div>
      </div>
      <aside className="hg-v2-inside">
        <span>GO FURTHER WITH AN ACCOUNT</span>
        <h2>Public discovery becomes personal development.</h2>
        <p>Explore publicly first. When you are ready to go further, your account becomes the place to ask questions, save learning, continue work, and build over time.</p>
        <div className="hg-v2-inside-list">
          <div><b>Ask & Learn</b><small>Start with a real question.</small></div>
          <div><b>Save & Continue</b><small>Keep useful work instead of starting over.</small></div>
          <div><b>Develop</b><small>Connect knowledge to practical growth.</small></div>
          <div><b>My Work</b><small>Build projects and preserve evidence.</small></div>
        </div>
        <a className="button gold" href="/family">Sign In to My Hands Gifted</a>
      </aside>
    </section>

    <section id="explore" className="hg-v2-section">
      <div className="hg-v2-heading"><span>EXPLORE</span><h2>Choose where you want to grow.</h2><p>You do not need to understand the whole Hands Gifted ecosystem before finding something useful.</p></div>
      <div className="hg-v2-four">{explore.map(([title,body,href])=><a href={href} key={title}><span>Explore</span><h3>{title}</h3><p>{body}</p><strong>Open →</strong></a>)}</div>
    </section>

    <section className="hg-v2-section hg-v2-journey">
      <div className="hg-v2-heading"><span>THE HANDS GIFTED JOURNEY</span><h2>Knowledge should lead somewhere.</h2><p>Hands Gifted connects information to development and practical use rather than leaving learning as disconnected content.</p></div>
      <div className="hg-v2-steps">{journey.map(([title,body],i)=><article key={title}><b>{String(i+1).padStart(2,"0")}</b><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>

    <section className="hg-v2-section hg-v2-account">
      <div><span>MY HANDS GIFTED</span><h2>Explore publicly. Build privately.</h2><p>The public website helps you understand Hands Gifted and use appropriate public resources. Authenticated spaces are where personal learning, projects, progress, family information, and protected work can continue.</p></div>
      <div className="hg-v2-account-actions"><a className="button gold" href="/family">Sign In</a><a className="button" href="/about">Learn About Hands Gifted</a></div>
    </section>

    <section className="hg-private-note"><strong>Private work stays protected.</strong><span>Family records, children's information, private journals, household finances, school records, health information, and protected evidence do not become public simply because they inform Hands Gifted development.</span></section>
    <SiteFooter />
  </main>;
}
