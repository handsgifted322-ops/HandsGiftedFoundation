import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { academy } from "../../lib/catalog";
import { publicLearningJourney } from "../../lib/surface-map";

export default function AcademyPage() {
  return (
    <main>
      <SiteHeader />

      <section className="inner-hero academy-hero">
        <span>Hands Gifted Public Learning</span>
        <h1>Explore. Learn. Study. Pray. Apply. Create. Serve.</h1>
        <p>The public Academy is where visitors can move from discovery into biblical study, prayer, practical application, creative work, and service without entering the private Family Dashboard.</p>
      </section>

      <section className="section parchment">
        <div className="section-heading">
          <span>Public learning journey</span>
          <h2>Learning should lead somewhere.</h2>
          <p>Hands Gifted public learning is structured to move people from information into reflection, practice, creation, and useful service.</p>
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
          <h2>Shared curriculum. Different levels of access.</h2>
          <p>Public visitors can explore approved learning content. Signed-in family members receive personalized lessons, assignments, progress, and projects through the private Family Dashboard.</p>
        </div>
        <div className="detail-grid">
          {academy.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><h3>{item}</h3></article>)}
        </div>
        <div className="access-note">
          <strong>Private family learning stays private.</strong>
          <p>Child-specific progress, assignments, responsibilities, school support, help requests, and parent verification belong behind authenticated family access and are managed through the Command Center.</p>
          <a className="button" href="/family">Go to Family Dashboard</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
