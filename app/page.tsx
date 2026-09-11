import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { PublicAreaNav } from "../components/PublicAreaNav";
import { missionPath, programs, projects, surfaces } from "../lib/catalog";

const storyCards = [
  ["01", "Strengthen connection", "Create intentional ways for women, children, and families to learn, work, create, and grow together again."],
  ["02", "Learn through real life", "Use household needs as opportunities to build practical skills, confidence, responsibility, creativity, and family participation."],
  ["03", "Document what develops", "Gather photos, videos, recipes, projects, and reflections as private evidence before deciding what is appropriate to share publicly."],
  ["04", "Build opportunity carefully", "When a skill becomes useful, repeatable, responsible, and strong enough, explore whether it can become content, a resource, product, service, or program."],
];

const pillars = [
  ["FAITH", "Trust, character, stewardship"],
  ["FAMILY", "Connection and unity"],
  ["SKILLS", "Practical learning"],
  ["OPPORTUNITY", "Purposeful development"],
  ["SERVICE", "Share from capacity"],
];

const featuredPrograms = [programs[0], programs[7], programs[10], programs[12], programs[15], programs[18]];

const creatingNow = [
  {
    category: "Cooking & Food",
    experience: "Family meals, learning how to eat healthier, cooking together, and simple Cooking 101 moments with the children.",
    creation: "Approved meal photos, recipes, short cooking videos, healthy-eating lessons, and future G&G Food Services connections.",
    status: "Creating now",
  },
  {
    category: "Gardening & Growing",
    experience: "Family garden outings, visiting places where food is grown, picking vegetables, learning plants, and growing our own food at home.",
    creation: "Garden photos and videos, planting notes, growth updates, harvest-to-kitchen stories, and family science observations.",
    status: "Creating now",
  },
  {
    category: "Sewing & Making",
    experience: "Learning, practicing, repairing, designing, and using our hands to create useful or modest items for real family needs.",
    creation: "Progress photos, finished projects, design ideas, sewing lessons, and future products only after the work is ready.",
    status: "In development",
  },
  {
    category: "Art & Creativity",
    experience: "Drawing, coloring, painting, character ideas, design, crafts, music, media, and creative projects involving the children and family.",
    creation: "Parent-approved artwork, project photos, digital creations, music or video projects, and portfolio pieces that show growth without exposing private records.",
    status: "Creating now",
  },
  {
    category: "Braiding",
    experience: "A real skill Shayla can already provide while the broader Hands Gifted service portfolio is still being developed.",
    creation: "Braiding appointments can be offered by inquiry now. Portfolio photos, style examples, and fuller booking information can be added as approved images are uploaded.",
    status: "Available by inquiry",
  },
];

const featuredWork = [
  { image: "/building-strong-families.png", label: "Family Development", title: "Connection, practical learning, and household growth begin at home." },
  { image: "/modest-fashion-purpose.png", label: "Creative Development", title: "Modest design, sewing, creativity, and useful skills are being learned and documented." },
  { image: "/hands-gifted-coming-soon.png", label: "Development Stage", title: "Hands Gifted is building carefully before presenting ideas as finished services or programs." },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section id="top" className="hero-shell recovered-hero">
        <div className="hero-content recovered-hero-content">
          <div className="eyebrow light">Faith-centered family development · currently in development</div>
          <h1 className="recovered-headline">Reconnect.<br/><span>Learn. Build. Serve.</span></h1>
          <p className="lead light-copy">Hands Gifted is being developed for women, children, and families navigating difficult seasons and working toward greater connection, practical growth, opportunity, and stability together.</p>
          <div className="hero-actions">
            <a className="button gold" href="#creating">See what we’re creating</a>
            <a className="button glass" href="/programs">Explore development lanes</a>
          </div>
          <div className="hero-path-note">Strengthen the household. Develop the gifts. Build together. Serve others.</div>
        </div>
      </section>

      <PublicAreaNav />

      <section className="pillar-band" aria-label="Hands Gifted values">
        {pillars.map(([title, body]) => (
          <article key={title}><strong>{title}</strong><span>{body}</span></article>
        ))}
      </section>

      <section className="announcement-bar">
        <span>Development stage</span>
        <p>Hands Gifted is not presenting every idea as a launched business or operating program. The current work is to learn, practice, document, organize, validate, and build responsibly.</p>
        <a href="#creating">See what is being created →</a>
      </section>

      <section id="story" className="section story-section">
        <div className="story-intro">
          <div className="section-heading left no-margin">
            <span>Why Hands Gifted exists</span>
            <h2>Families need more opportunities to connect, learn, and build together.</h2>
          </div>
          <div className="story-copy">
            <p>Hands Gifted grew from lived awareness of how difficult seasons can affect an entire household. The vision is larger than temporary assistance: it is about helping women, children, and families reconnect, recognize what they can do, learn practical skills, use available resources wisely, and build toward greater stability.</p>
            <p>Faith shapes the values behind Hands Gifted. Family unity, stewardship, modesty, character, responsibility, learning, creativity, opportunity, and service guide the work while the business and organizational structure are still being developed.</p>
          </div>
        </div>
        <div className="story-grid">
          {storyCards.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section id="creating" className="section parchment programs-section">
        <div className="programs-topline">
          <div className="section-heading left no-margin">
            <span>What we’re creating</span>
            <h2>Every area has two sides: what the family experiences and what we create from it.</h2>
          </div>
          <div className="programs-intro">
            <p>Hands Gifted does not wait for everything to become a product before showing real growth. Approved photos, videos, projects, meals, garden moments, artwork, and lessons can document what is actually happening now. Products and larger services remain clearly labeled until they are ready.</p>
          </div>
        </div>
        <div className="featured-program-grid">
          {creatingNow.map((item) => (
            <article key={item.category}>
              <span>{item.status}</span>
              <h3>{item.category}</h3>
              <p><strong>Family side:</strong> {item.experience}</p>
              <p><strong>Creation side:</strong> {item.creation}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section showcase-section">
        <div className="showcase-heading">
          <span>Hands Gifted in development</span>
          <h2>Real practice first. Public claims later.</h2>
          <p>Cooking, gardening, natural hair and self-care learning, modest apparel, sewing, family learning, music, media, technology, and other practical skills are development lanes—not separate launched businesses.</p>
        </div>
        <div className="showcase-grid">
          {featuredWork.map((item) => <article key={item.title}><div className="showcase-image"><img src={item.image} alt={item.title} /></div><div className="showcase-copy"><span>{item.label}</span><h3>{item.title}</h3></div></article>)}
        </div>
      </section>

      <section id="path" className="section dark path-section">
        <div className="section-heading">
          <span>How Hands Gifted develops</span>
          <h2>From faith and family needs to demonstrated skill, opportunity, and service.</h2>
          <p>The model keeps the household first and prevents an idea from being treated like a finished business before it has been practiced and tested.</p>
        </div>
        <div className="path-timeline">
          {missionPath.map(([title, body], index) => (
            <article className="path-card" key={title}>
              <div className="path-number">{String(index + 1).padStart(2, "0")}</div>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="surfaces" className="section surfaces-section">
        <div className="section-heading"><span>Public and private stay separate</span><h2>One vision, with protected family spaces.</h2><p>The public Hands Gifted website explains the developing model. Private family records, school information, routines, progress, and parent administration remain in protected spaces.</p></div>
        <div className="surface-grid">
          {surfaces.map((surface, index) => {
            const href = index === 0 ? "/programs" : index === 1 ? "/command-center" : "/family";
            const publicTitle = index === 0 ? "Public Hands Gifted" : index === 1 ? "Parent Command Center" : "Children & Family Dashboard";
            const linkLabel = index === 0 ? "Explore the developing model" : index === 1 ? "Open parent access" : "Open family access";
            return <article className={`surface-card surface-${index + 1}`} key={surface.title}>
              <div className="surface-icon">{index === 0 ? "◈" : index === 1 ? "⌂" : "✦"}</div>
              <span className="audience">{surface.audience}</span>
              <h3>{publicTitle}</h3><p>{surface.description}</p><a className="surface-link" href={href}>{linkLabel} →</a>
            </article>;
          })}
        </div>
      </section>

      <section id="programs" className="section parchment programs-section">
        <div className="programs-topline">
          <div className="section-heading left no-margin"><span>Development lanes</span><h2>Different skills. One family-development model.</h2></div>
          <div className="programs-intro"><p>These are areas being developed, practiced, documented, or planned. A listing here does not mean the lane is already a public service or revenue-generating business.</p><a className="button" href="/programs">Browse development lanes</a></div>
        </div>
        <div className="featured-program-grid">
          {featuredPrograms.map((program) => <article key={program.name}><span>{program.category}</span><h3>{program.name}</h3><p>{program.description}</p><a href="/programs">Learn more →</a></article>)}
        </div>
      </section>

      <section id="academy" className="section academy-section">
        <div className="academy-panel">
          <div className="academy-copy">
            <div className="eyebrow">Family Academy</div>
            <h2>Parents and children learning, practicing, creating, and documenting growth together.</h2>
            <p>The Academy is being developed as a parent-guided family learning environment connecting faith, academics, practical skills, creativity, technology, responsibility, and individual gifts.</p>
            <div className="academy-actions"><a className="button" href="/academy">Explore Family Academy</a><a className="text-link" href="/family">Family sign in →</a></div>
          </div>
          <div className="academy-board">
            <div className="academy-window-head"><span></span><span></span><span></span><strong>Family Academy</strong></div>
            <div className="academy-window-body">
              {[
                ["Connect", "Family learning and projects create purposeful time together"],
                ["Learn", "Faith, academics, practical life, creativity, technology, and money skills"],
                ["Practice", "Use knowledge through supervised real household projects"],
                ["Create", "Meals, gardens, drawings, sewing, media, music, and useful projects"],
                ["Document", "Private portfolio evidence before any founder-approved public sharing"],
              ].map(([title, body], index) => <div className="academy-row" key={title}><span>{String(index + 1).padStart(2,"0")}</span><div><strong>{title}</strong><p>{body}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section dark roadmap-section">
        <div className="roadmap-head">
          <div className="section-heading left no-margin"><span>What is happening now</span><h2>Development with clear truth labels.</h2></div>
          <p>Current work is labeled so visitors can distinguish what is in progress from what is only planned.</p>
        </div>
        <div className="roadmap">
          {projects.slice(0,6).map(([name, status, description]) => <article key={name}><span className={`status ${status}`}>{status.replace("_", " ")}</span><h3>{name}</h3><p>{description}</p><div className="roadmap-line"></div></article>)}
        </div>
      </section>

      <section className="section support-section">
        <div className="support-heading"><span>The developing model</span><h2>Connect. Learn. Build. Share.</h2></div>
        <div className="support-grid">
          <article><span>01</span><h3>Connect</h3><p>Strengthen family connection through purposeful learning, shared responsibilities, projects, and time together.</p></article>
          <article><span>02</span><h3>Develop</h3><p>Build practical skills, individual gifts, confidence, creativity, financial understanding, and readiness for opportunity.</p></article>
          <article><span>03</span><h3>Share</h3><p>As capacity grows, develop appropriate resources, content, products, services, referrals, or community support that may help others.</p></article>
        </div>
      </section>

      <section id="connect" className="connect-section">
        <div>
          <span className="eyebrow light">Hands Gifted</span>
          <h2>Strengthen the household. Develop the gifts. Build together. Serve others.</h2>
          <p>Hands Gifted is currently in development. Follow the journey as the family-development model, practical skills, content, resources, and business structure are built responsibly.</p>
        </div>
        <div className="connect-actions"><a className="button gold" href="#creating">See what we’re creating</a><a className="button glass" href="/family">Family sign in</a></div>
      </section>

      <SiteFooter />
    </main>
  );
}
