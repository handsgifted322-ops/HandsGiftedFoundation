import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const areas = [
  ["Start Reading the Bible", "Learn how to find books, chapters, and verses, and begin studying one passage at a time."],
  ["A New Beginning", "Explore repentance, forgiveness, responsibility, and practical changes through scripture."],
  ["Women of Scripture", "Meet Sarah and other women in scripture through beginner-friendly character studies."],
  ["Understanding Biblical Living", "Explore commandments, dietary laws, Sabbath, modesty, and stewardship with context."],
  ["Living What I Learn", "Reflect on everyday choices, family relationships, patience, and service."]
] as const;

export default function BibleFaithPage() {
  return <main className="hg-clean-home">
    <SiteHeader/>
    <section className="hg-path-hero hg-faith-path">
      <div>
        <span className="hg-kicker">Walk According to the Most High</span>
        <h1>A New Walk, One Step at a Time</h1>
        <p>New to the Bible? Returning to faith? You can begin here. Explore free, beginner-friendly lessons that help you read scripture, ask questions, and put what you learn into practice.</p>
        <p><a href="/resources/bible-faith">Start your first free lesson →</a></p>
      </div><div className="hg-path-image" aria-hidden="true"/>
    </section>
    <section className="hg-path-body">
      <div className="hg-clean-heading"><h2>Choose where to begin</h2><span>Read. Understand. Reflect. Practice.</span></div>
      <div className="hg-women-grid">
        {areas.map(([title, description], index) => <section className="hg-women-card" key={title}>
          <h3>{title}</h3><p>{description}</p>
          {index === 0 ? <a href="/resources/bible-faith">Open free beginner lesson →</a> : <p><small>More lessons in development</small></p>}
        </section>)}
      </div>
    </section>
    <section className="hg-path-callout">
      <h2>There is room to learn.</h2>
      <p>Each lesson begins with a real question, identifies the scripture, explains its context, and offers a practical reflection. Biblical text is distinguished from Hands Gifted commentary and faith-tradition interpretations.</p>
      <p>Learning is a journey, not a test of your spiritual worth.</p>
    </section>
    <SiteFooter/>
  </main>;
}
