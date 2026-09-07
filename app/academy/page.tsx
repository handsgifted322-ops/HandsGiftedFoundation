import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { academy } from "../../lib/catalog";
import { publicLearningJourney } from "../../lib/surface-map";

export default function AcademyPage() {
  return (
    <main>
      <SiteHeader />

      <section className="inner-hero academy-hero">
        <span>Hands Gifted Academy</span>
        <h1>A separate learning experience connected to the Foundation.</h1>
        <p>The Foundation website explains the mission, programs, resources, and current work. The Academy is its own learning destination, entered from the Foundation through this page.</p>
        <div className="hero-actions">
          <a className="button gold" href="/family/academy/world">Enter the Academy</a>
          <a className="button" href="/family">Family sign in</a>
        </div>
      </section>

      <section className="section parchment">
        <div className="section-heading">
          <span>One Academy · Different access</span>
          <h2>The Kingdom learning experience lives here.</h2>
          <p>Visitors can understand what the Academy teaches and how the learning journey works. Household members enter the private Kingdom experience for personalized lessons, assignments, progress, projects, and family development.</p>
        </div>
        <div className="detail-grid">
          {publicLearningJourney.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span>Family Academy framework</span>
          <h2>Shared foundation. Role- and age-aware pathways.</h2>
          <p>Mother, father, and children remain part of one connected Academy. The curriculum adapts by role, age, maturity, and current unlocked level while preserving parent authority and sibling privacy.</p>
        </div>
        <div className="detail-grid">
          {academy.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><h3>{item}</h3></article>)}
        </div>
        <div className="access-note">
          <strong>Private family learning remains protected.</strong>
          <p>Child-specific progress, assignments, responsibilities, school support, help requests, assessments, and parent verification stay behind family access and are managed through the Command Center.</p>
          <a className="button gold" href="/family/academy/world">Enter the Kingdom Academy</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
