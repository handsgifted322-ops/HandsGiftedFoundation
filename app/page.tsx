import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { missionPath, programs, projects, surfaces } from "../lib/catalog";

const storyCards = [
  ["01", "Start with the household", "Build order, routines, meals, school support, Sabbath preparation, needs, and stability before expansion."],
  ["02", "Develop gifts into skill", "Practice cooking, sewing, braiding, gardening, media, technology, entrepreneurship, and practical life."],
  ["03", "Turn skill into proof", "Create meals, garments, gardens, portfolios, resources, products, services, and teachable projects."],
  ["04", "Serve from capacity", "Use what has been proven to strengthen women, children, families, and neighbors without exposing private family records."],
];

const pillars = [
  ["FAITH", "Foundation and character"],
  ["FAMILY", "Stronger households"],
  ["SKILLS", "Hands-on learning"],
  ["STABILITY", "Purposeful growth"],
];

const featuredPrograms = [
  programs[0], programs[1], programs[3], programs[5], programs[10], programs[17]
];

const featuredWork = [
  { image: "/building-strong-families.png", label: "Family Development", title: "Building strong families through faith, learning, and practical life." },
  { image: "/modest-fashion-purpose.png", label: "Creative Skills & Trades", title: "Modest apparel and creative work developed with purpose." },
  { image: "/hands-gifted-coming-soon.png", label: "Foundation Build", title: "A growing ecosystem for women, children, households, and community service." },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section id="top" className="hero-shell recovered-hero">
        <div className="hero-content recovered-hero-content">
          <div className="eyebrow light">Build the household. Develop the gift. Serve with purpose.</div>
          <h1 className="recovered-headline">Strong hands.<br/><span>Strong families.</span></h1>
          <p className="lead light-copy">Hands Gifted Foundation is building faith-centered pathways where women, children and families can strengthen daily life, develop practical skills, learn together and grow with purpose.</p>
          <div className="hero-actions">
            <a className="button gold" href="/programs">Explore programs</a>
            <a className="button glass" href="#story">Our story</a>
          </div>
          <div className="hero-path-note">Use your hands. Build your household. Serve your community. Walk according to the Most High.</div>
        </div>
      </section>

      <section className="pillar-band" aria-label="Hands Gifted pillars">
        {pillars.map(([title, body]) => (
          <article key={title}>
            <strong>{title}</strong>
            <span>{body}</span>
          </article>
        ))}
      </section>

      <section className="announcement-bar">
        <span>Current direction</span>
        <p>Household stability comes before expansion. What is learned and proven in real life becomes the foundation for resources that can serve other families.</p>
        <a href="#work">See the work →</a>
      </section>

      <section id="story" className="section story-section">
        <div className="story-intro">
          <div className="section-heading left no-margin">
            <span>Why Hands Gifted exists</span>
            <h2>Rebuilding life can reveal what your hands were created to do.</h2>
          </div>
          <div className="story-copy">
            <p>Hands Gifted grew from a real process of examining the household, rebuilding what needed attention, learning practical skills, organizing family life, and finding ways to turn gifts into useful work.</p>
            <p>The journey is still being built. The goal is not to pretend every program is finished; it is to document what is being learned, prove what works, and eventually use that growing capacity to strengthen other women, children, and families.</p>
          </div>
        </div>
        <div className="story-grid">
          {storyCards.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="section showcase-section">
        <div className="showcase-heading"><span>Hands Gifted in motion</span><h2>Not just ideas. A growing body of work.</h2><p>These visuals come from existing Hands Gifted development and show the direction already being built across family, learning, modest apparel, and public ministry work.</p></div>
        <div className="showcase-grid">
          {featuredWork.map((item) => <article key={item.title}><div className="showcase-image"><img src={item.image} alt={item.title} /></div><div className="showcase-copy"><span>{item.label}</span><h3>{item.title}</h3></div></article>)}
        </div>
      </section>

      <section id="path" className="section dark path-section">
        <div className="section-heading">
          <span>How we build</span>
          <h2>From seeking wisdom to teaching what has been demonstrated.</h2>
          <p>The same nine-stage progression guides household development, learning, skill-building, production, stability, and service.</p>
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
        <div className="section-heading"><span>Explore Hands Gifted</span><h2>One ecosystem. Different doors for different people.</h2><p>The Foundation, parent workspace, and child experience stay connected while protecting the information each audience should and should not see.</p></div>
        <div className="surface-grid">
          {surfaces.map((surface, index) => {
            const href = index === 0 ? "/programs" : index === 1 ? "/command-center" : "/family";
            const publicTitle = index === 0 ? "Explore the Foundation" : index === 1 ? "Parent Command Center" : "Kids & Family Dashboard";
            const linkLabel = index === 0 ? "Explore programs and resources" : index === 1 ? "Open parent access" : "Open family access";
            return <article className={`surface-card surface-${index + 1}`} key={surface.title}>
              <div className="surface-icon">{index === 0 ? "◈" : index === 1 ? "⌂" : "✦"}</div>
              <span className="audience">{surface.audience}</span>
              <h3>{publicTitle}</h3>
              <p>{surface.description}</p>
              <a className="surface-link" href={href}>{linkLabel} →</a>
            </article>;
          })}
        </div>
      </section>

      <section id="programs" className="section parchment programs-section">
        <div className="programs-topline">
          <div className="section-heading left no-margin"><span>Explore Hands Gifted</span><h2>Programs families can grow through.</h2></div>
          <div className="programs-intro"><p>The full Hands Gifted ecosystem includes 20 program pathways. The homepage highlights six major entry points so visitors can understand the work without being overwhelmed.</p><a className="button" href="/programs">Browse all programs</a></div>
        </div>
        <div className="featured-program-grid">
          {featuredPrograms.map((program) => <article key={program.name}><span>{program.category}</span><h3>{program.name}</h3><p>{program.description}</p><a href="/programs">Learn more →</a></article>)}
        </div>
      </section>

      <section id="academy" className="section academy-section">
        <div className="academy-panel">
          <div className="academy-copy">
            <div className="eyebrow">Family Academy</div>
            <h2>Learning that connects Scripture, responsibility, practical skill, and demonstrated growth.</h2>
            <p>The Academy gives women, parents, children, and youth structured learning pathways while keeping school administration and private family records in the appropriate protected spaces.</p>
            <div className="academy-actions"><a className="button" href="/academy">Explore Family Academy</a><a className="text-link" href="/family">Family sign in →</a></div>
          </div>
          <div className="academy-board">
            <div className="academy-window-head"><span></span><span></span><span></span><strong>Family Academy</strong></div>
            <div className="academy-window-body">
              {[
                ["Daughters of Sarah", "Biblical womanhood, household wisdom, modesty, practical skill"],
                ["Kings of God", "Character, service, practical competence, technology, leadership"],
                ["Family Study", "Shared Scripture, discussion, memory, family application"],
                ["Practical Skills", "Cooking, gardening, sewing, creativity, technology, money skills"],
                ["Mastery", "Learn → Practice → Ready to Show → Demonstrated → Helper → Mentor/Teacher"],
              ].map(([title, body], index) => <div className="academy-row" key={title}><span>{String(index + 1).padStart(2,"0")}</span><div><strong>{title}</strong><p>{body}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section dark roadmap-section">
        <div className="roadmap-head">
          <div className="section-heading left no-margin"><span>What is happening now</span><h2>Building publicly without pretending everything is finished.</h2></div>
          <p>Each project is labeled by maturity so visitors can distinguish active work, in-development work, and future plans.</p>
        </div>
        <div className="roadmap">
          {projects.slice(0,6).map(([name, status, description]) => <article key={name}><span className={`status ${status}`}>{status.replace("_", " ")}</span><h3>{name}</h3><p>{description}</p><div className="roadmap-line"></div></article>)}
        </div>
      </section>

      <section className="section support-section">
        <div className="support-heading"><span>Ways to connect</span><h2>Come through the door that fits what you need.</h2></div>
        <div className="support-grid">
          <article><span>01</span><h3>Get support</h3><p>Explore family stability, resource navigation, education, and practical support pathways.</p><a href="/#connect">Find support →</a></article>
          <article><span>02</span><h3>Learn a skill</h3><p>Explore sewing, braiding, cooking, gardening, media, practical life, and entrepreneurship development.</p><a href="/programs">Explore skills →</a></article>
          <article><span>03</span><h3>Partner or contribute</h3><p>Support materials, outreach, programs, learning resources, and community-centered development.</p><a href="/#connect">Connect with us →</a></article>
        </div>
      </section>

      <section id="connect" className="connect-section">
        <div>
          <span className="eyebrow light">Hands Gifted Foundation</span>
          <h2>Gifted hands. Purposed heart. Kingdom impact.</h2>
          <p>Follow the journey, explore the programs, connect for support, or partner with the work as it develops.</p>
        </div>
        <div className="connect-actions"><a className="button gold" href="/programs">Explore Hands Gifted</a><a className="button glass" href="/family">Family sign in</a></div>
      </section>

      <SiteFooter />
    </main>
  );
}
