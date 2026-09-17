import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { PublicAreaNav } from "../components/PublicAreaNav";
import { publicResourceAreas } from "../lib/publicResources";

const childPathways = [
  ["Learn", "School support, reading, STEM, technology, financial literacy, and resources that build knowledge.", "/resources/kids-learning"],
  ["Discover Your Gifts", "Explore creativity, music, technology, entrepreneurship, practical abilities, and interests worth developing.", "/resources/kids-learning"],
  ["Build Life Skills", "Practice cooking, home care, money skills, communication, technology, sewing, responsibility, and independence.", "/resources/practical-life-skills"],
  ["Grow in Faith", "Follow scripture study trails that connect biblical principles to character, wisdom, work, family, and daily life.", "/resources/kids-learning#scripture"],
  ["Health & Wellness", "Learn food, kitchen, hygiene, routine, movement, and general wellness principles with qualified resources where needed.", "/resources/food-wellness"],
  ["Find Opportunities", "Discover verified youth programs, mentoring, arts, STEM, entrepreneurship, scholarships, camps, and community support.", "/resources/community-resources"],
] as const;

const supportModel = [
  ["01", "Start with the child", "Ask what the child needs to learn, understand, practice, discover, or access."],
  ["02", "Support the family around them", "Give parents and caregivers practical information, household systems, and resource navigation that make development easier to support."],
  ["03", "Connect faith to practice", "Use scripture as a continuing study framework: context, principle, reflection, and practical application—not a decorative verse."],
  ["04", "Go deeper when useful", "Free information remains available while full workbooks, systems, lessons, member libraries, products, and services can provide deeper structure."],
] as const;

const parentSupports = [
  ["Household routines", "Morning and evening rhythms, responsibilities, planning, preparation, and repeatable family systems."],
  ["Meals & inventory", "Meal planning, grocery organization, kitchen participation, food inventory, and reducing waste."],
  ["Children's needs", "Keep school, clothing, hygiene, learning, activities, appointments, emotional check-ins, and opportunities from falling through the cracks."],
  ["Family scheduling", "Coordinate school, work, appointments, preparation, community opportunities, and recurring household rhythms."],
  ["Home organization", "Cleaning, room standards, household resets, simple SOPs, and age-appropriate shared responsibility."],
  ["Stability resources", "Navigate housing, transportation, workforce, financial, school, youth, and community support with verified information."],
] as const;

export default function Home(){
  return <main className="hg-home">
    <SiteHeader />

    <section className="hg-hero">
      <div className="hg-hero-copy">
        <div className="hg-kicker">Children • Family • Faith • Skills • Resources</div>
        <h1>Help children grow.<br/><span>Equip families to guide them.</span></h1>
        <p className="hg-hero-lead">Hands Gifted is a faith-centered child and family development resource platform. We provide practical information, learning pathways, scripture study, life-skills guidance, family resources, and deeper tools that help children discover their gifts and prepare for the world ahead.</p>
        <div className="hg-hero-actions">
          <a className="button gold" href="/resources/kids-learning">Explore kids & learning</a>
          <a className="button glass" href="/resources">Open the resource center</a>
        </div>
        <div className="hg-hero-note"><strong>Children at the center. Families around them.</strong><span>Useful public information stays accessible. Deeper Hands Gifted tools, products, membership content, and services can grow from there.</span></div>
      </div>
      <div className="hg-hero-visual" aria-label="Hands Gifted child and family development">
        <div className="hg-visual-main"><img src="/catalog/family-learning.jpg" alt="Children and family learning together" /></div>
        <div className="hg-visual-stack">
          <img src="/catalog/cooking.jpg" alt="Children learning practical kitchen skills" />
          <img src="/catalog/sewing.jpg" alt="Practical skill development" />
        </div>
        <div className="hg-visual-badge"><span>HANDS GIFTED</span><strong>Learn • practice • grow.</strong><small>Faith + knowledge + life skills</small></div>
      </div>
    </section>

    <section className="hg-value-strip" aria-label="Hands Gifted child development priorities">
      <article><span>01</span><strong>Knowledge</strong><small>Learn how the world works</small></article>
      <article><span>02</span><strong>Gifts</strong><small>Discover strengths and interests</small></article>
      <article><span>03</span><strong>Life Skills</strong><small>Practice real-world capability</small></article>
      <article><span>04</span><strong>Faith</strong><small>Connect learning to scripture</small></article>
    </section>

    <section id="builds" className="hg-section hg-builds">
      <div className="hg-section-heading">
        <span>Start with the child</span>
        <h2>What does this child need to learn, practice, discover, or access?</h2>
        <p>Hands Gifted organizes learning around the whole child: knowledge, practical skills, faith, creativity, technology, responsibility, opportunity, and preparation for adulthood.</p>
      </div>
      <div className="hg-build-grid">
        {childPathways.map(([title,body,href])=><a className="hg-build-card" key={title} href={href}>
          <div className="hg-build-body"><small>Child development pathway</small><h3>{title}</h3><p>{body}</p><strong>Explore →</strong></div>
        </a>)}
      </div>
    </section>

    <section className="hg-section hg-model">
      <div className="hg-model-intro">
        <span>How Hands Gifted supports growth</span>
        <h2>Child → family → scripture → deeper tools.</h2>
        <p>The public website should help someone solve a real problem or learn something useful first. It can then lead into more detailed study, verified resources, downloads, products, memberships, or services where appropriate.</p>
      </div>
      <div className="hg-proof-grid">
        {supportModel.map(([number,title,body])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section className="hg-section hg-now">
      <div className="hg-now-copy">
        <span>Hands Gifted Resource Center</span>
        <h2>Six doors into a much deeper resource ecosystem.</h2>
        <p>Each area continues into subtopics, scripture study trails, practical guidance, verified outside resources, free information, and deeper Hands Gifted tools as they are developed.</p>
      </div>
      <div className="hg-build-grid">
        {publicResourceAreas.map((area)=><a className="hg-build-card" key={area.slug} href={`/resources/${area.slug}`}>
          <div className="hg-build-body"><small>{area.tag}</small><h3>{area.title}</h3><p>{area.summary}</p><strong>Open resource area →</strong></div>
        </a>)}
      </div>
      <div className="hg-hero-actions" style={{marginTop:32}}><a className="button gold" href="/resources">Browse all resources</a></div>
    </section>

    <section className="hg-section hg-builds">
      <div className="hg-section-heading">
        <span>Supporting the family around the child</span>
        <h2>Children develop best when the household around them has usable systems and support.</h2>
        <p>Household organization remains important, but it now sits in its proper place: as one support structure around children and family development rather than the entire identity of Hands Gifted.</p>
      </div>
      <div className="hg-build-grid">
        {parentSupports.map(([title,body])=><article className="hg-build-card" key={title}>
          <div className="hg-build-body"><small>Parent & caregiver support</small><h3>{title}</h3><p>{body}</p></div>
        </article>)}
      </div>
      <div className="hg-hero-actions" style={{marginTop:32}}><a className="button gold" href="/resources/household-management">Household management resources</a><a className="button" href="/household-system">See the deeper household system</a></div>
    </section>

    <section className="hg-section hg-future">
      <div>
        <span>Free help + deeper value</span>
        <h2>The site can serve families without giving away every developed tool.</h2>
        <p>Public information, scripture pathways, verified community resources, and selected starter guidance remain useful and accessible. Full workbooks, planners, lesson collections, courses, household systems, member libraries, and direct services can become paid products as they are genuinely developed.</p>
      </div>
      <div className="hg-future-actions"><a className="button gold" href="/resources">Use free resources</a><a className="button" href="/shop">See products</a></div>
    </section>

    <PublicAreaNav />

    <section className="hg-private-note"><strong>Private family information stays private.</strong><span>The public site can be informed by real experience without publishing children&apos;s school records, health information, legal matters, household finances, private journals, addresses, or other protected family details.</span></section>

    <section className="hg-final-cta">
      <div><span>Hands Gifted</span><h2>Learn something useful. Follow the scriptures behind it. Keep going deeper.</h2><p>Start with children and learning, build practical life skills, support the family around the child, and connect with trustworthy resources and deeper Hands Gifted tools as they become available.</p></div>
      <div><a className="button gold" href="/resources/kids-learning">Start with children</a><a className="button glass" href="/resources/community-resources">Find resources</a></div>
    </section>

    <SiteFooter />
  </main>;
}
