import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const statusMap = [
  {area:"Faith & personal growth",status:"FOUNDATION",now:"Guides priorities, household stewardship, modesty, character, Sabbath, learning, and the pace of growth.",next:"Keep faith as a decision filter without turning private spiritual life into public content."},
  {area:"Braiding & natural hair",status:"LIVED / DOING",now:"A real skill practiced in the household with finished work that can be documented.",next:"Build a clean proof-of-work portfolio before deciding on services or teaching."},
  {area:"Cooking & budget food planning",status:"LIVED / DOING",now:"Real meals, grocery planning, recipes, healthier-eating changes, and kitchen learning are already happening.",next:"Document repeatable recipes and shopping lessons; test content before creating a paid resource."},
  {area:"Household organization",status:"LIVED / PROTOTYPE",now:"Routines, meal systems, inventory, family responsibilities, schedules, and SOPs are being tested in real family life.",next:"Continue the current Household Operating System prototype and validate whether it helps other target users."},
  {area:"Sewing & modest apparel",status:"LEARNING",now:"Current proof is limited to simple fringe/blue-border work and beginner alteration experience.",next:"Practice construction and finishing before offering dresses, skirts, headwraps, aprons, home textiles, or classes."},
  {area:"Gardening",status:"EXPLORATORY",now:"A possible family learning and practical-skill lane, but not a required current project.",next:"Keep parked unless capacity and family interest justify active practice."},
  {area:"Daughters of Sarah / Family Academy",status:"FRAMEWORK IN DEVELOPMENT",now:"Chat-developed and family-informed learning concepts around faith, character, household stewardship, practical skills, and growth.",next:"Use privately where helpful; do not present as a mature public academy until curriculum, safeguards, delivery, and demand are ready."},
  {area:"Modest apparel shop",status:"FUTURE",now:"Product ideas and standards exist, but a finished sellable collection does not.",next:"Develop skill, samples, sourcing, quality control, costs, sizing, demand, and compliance before launch."},
  {area:"Classes, workshops & events",status:"FUTURE",now:"Possible future ways to teach mature skills and share useful resources.",next:"Teach only from demonstrated competence and a repeatable lesson format."},
] as const;

const truthLabels = [
  ["LIVED / DOING","Something actually practiced in real life."],
  ["LEARNING","A skill being developed; competence is not yet claimed."],
  ["CHAT-DEVELOPED","An idea or framework organized through ChatGPT conversations."],
  ["DRAFTED","A document, workbook, SOP, design, or plan exists."],
  ["PROTOTYPE","Something is actively being tried, built, or tested."],
  ["VERIFIED / WORKING","Evidence shows the system, product, or technical feature actually works."],
  ["FUTURE","A possibility intentionally kept out of the current workload."],
] as const;

export default function JourneyPage(){
  return <main>
    <SiteHeader />
    <section className="inner-hero">
      <span>Hands Gifted · Journey & Progress Map</span>
      <h1>See the whole vision without pretending every idea is already built.</h1>
      <p>This map separates real-life practice from learning goals, ChatGPT-developed ideas, prototypes, verified work, and future possibilities. It is designed to make progress visible when many conversations and ideas are happening at once.</p>
      <div className="hero-actions"><a className="button gold" href="/household-system">Current business focus</a><a className="button" href="/programs">Explore development lanes</a></div>
    </section>

    <section className="section">
      <div className="section-heading left"><span>Current scope</span><h2>What is real now, what is developing, and what can wait.</h2><p>The point is not to shrink the vision. The point is to keep the vision truthful and sequenced.</p></div>
      <div className="detail-grid" style={{marginTop:24}}>
        {statusMap.map((item)=><article key={item.area}><span>{item.status}</span><h3>{item.area}</h3><p><strong>Now:</strong> {item.now}</p><p><strong>Next:</strong> {item.next}</p></article>)}
      </div>
    </section>

    <section className="section parchment">
      <div className="section-heading left"><span>Truth-status system</span><h2>Documents are not the same as lived results.</h2><p>Hands Gifted uses explicit maturity labels so a generated plan cannot accidentally be described as an operating program.</p></div>
      <div className="detail-grid" style={{marginTop:24}}>
        {truthLabels.map(([label,body])=><article key={label}><span>{label}</span><p>{body}</p></article>)}
      </div>
    </section>

    <section className="section">
      <div className="section-heading left"><span>Development path</span><h2>How work moves forward.</h2></div>
      <div className="about-steps" style={{marginTop:24}}>
        <div className="about-step"><strong>1. Seek & examine</strong>Identify the real household need, skill, conviction, capacity, and reason for doing the work.</div>
        <div className="about-step"><strong>2. Learn & practice</strong>Use the skill in real life, correct mistakes, and build competence without rushing to sell it.</div>
        <div className="about-step"><strong>3. Document</strong>Capture the process, evidence, costs, outcomes, lessons, and what still needs improvement.</div>
        <div className="about-step"><strong>4. Prototype</strong>Turn the strongest work into a small system, resource, sample, content series, or offer test.</div>
        <div className="about-step"><strong>5. Validate</strong>Ask whether it actually works, whether the intended person wants it, and whether the family can sustain it.</div>
        <div className="about-step"><strong>6. Build or park</strong>Promote mature work. Keep good but premature ideas in the future roadmap.</div>
      </div>
    </section>

    <section className="hg-private-note"><strong>Progress is measured by movement into reality.</strong><span>The important question is not how many ideas or documents exist. It is what moved from conversation → decision → action → practice → proof → validated use.</span></section>

    <SiteFooter />
  </main>;
}
