import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { PublicAreaNav } from "../components/PublicAreaNav";
import { publicResourceAreas } from "../lib/publicResources";
import { handsGiftedSkills } from "../lib/handsGiftedSkills";

const childPathways = [
  ["Learn", "School support, reading, STEM, technology, financial literacy, and resources that build knowledge.", "/resources/kids-learning"],
  ["Discover Your Gifts", "Explore creativity, music, technology, entrepreneurship, practical abilities, and interests worth developing.", "/resources/kids-learning"],
  ["Build Life Skills", "Practice cooking, gardening, braiding, sewing, money skills, communication, technology, responsibility, and independence.", "/skills"],
  ["Grow in Faith", "Follow scripture study trails that connect biblical principles to character, wisdom, work, family, and daily life.", "/resources/kids-learning#scripture"],
  ["Health & Wellness", "Learn food, hygiene, routine, movement, and general wellness principles with qualified resources where needed.", "/resources/food-wellness"],
  ["Find Opportunities", "Discover verified youth programs, mentoring, arts, STEM, entrepreneurship, scholarships, camps, and community support.", "/resources/community-resources"],
] as const;

const supportModel = [
  ["01", "Start with the child", "Ask what the child needs to learn, understand, practice, discover, or access."],
  ["02", "Develop practical gifts", "Connect learning to useful skills children and adults can practice, improve, create with, and potentially turn into opportunity."],
  ["03", "Support the family around them", "Give parents and caregivers practical information, household systems, and resource navigation that make development easier to support."],
  ["04", "Connect faith to practice", "Use scripture as a continuing study framework: context, principle, reflection, and practical application—not a decorative verse."],
  ["05", "Protect the deeper value", "Give useful public information while reserving complete Hands Gifted systems, original products, member resources, and direct services for their proper layers."],
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
        <h1>Discover the gift.<br/><span>Build the skill. Prepare for life.</span></h1>
        <p className="hg-hero-lead">Hands Gifted is a faith-centered child and family development platform where children and families can learn, build practical skills, follow scripture into real-life application, find trustworthy resources, request Hands Gifted services, and discover original products as they are developed.</p>
        <div className="hg-hero-actions">
          <a className="button gold" href="/resources/kids-learning">Start with kids & learning</a>
          <a className="button glass" href="/skills">Explore Hands Gifted Skills</a>
        </div>
        <div className="hg-hero-note"><strong>Children at the center. Families around them. Skills put into practice.</strong><span>Public information should be valuable without giving away every complete Hands Gifted tool, product, or service process.</span></div>
      </div>
      <div className="hg-hero-visual" aria-label="Hands Gifted child, family, and practical skill development">
        <div className="hg-visual-main"><img src="/catalog/family-learning.jpg" alt="Children and family learning together" /></div>
        <div className="hg-visual-stack">
          <img src="/catalog/cooking.jpg" alt="Hands Gifted cooking and practical kitchen skills" />
          <img src="/catalog/sewing.jpg" alt="Hands Gifted sewing and making skills" />
        </div>
        <div className="hg-visual-badge"><span>HANDS GIFTED</span><strong>Learn • practice • create.</strong><small>Then build opportunity</small></div>
      </div>
    </section>

    <section className="hg-value-strip" aria-label="Hands Gifted development priorities">
      <article><span>01</span><strong>Knowledge</strong><small>Learn how the world works</small></article>
      <article><span>02</span><strong>Gifts</strong><small>Discover strengths and interests</small></article>
      <article><span>03</span><strong>Skills</strong><small>Practice real-world capability</small></article>
      <article><span>04</span><strong>Faith</strong><small>Connect learning to scripture</small></article>
    </section>

    <section id="children" className="hg-section hg-builds">
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

    <section id="skills" className="hg-section hg-now">
      <div className="hg-now-copy">
        <span>Hands Gifted Skills</span>
        <h2>Cooking. Gardening. Braiding. Sewing.</h2>
        <p>These are four connected Hands Gifted skill worlds—not four unrelated businesses. Each world can teach practical ability, involve children and families, connect to scripture, support a direct service layer, and produce original Hands Gifted products without exposing every complete process for free.</p>
      </div>
      <div className="hg-build-grid">
        {handsGiftedSkills.map((skill)=><a className="hg-build-card" key={skill.slug} href={`/skills/${skill.slug}`}>
          <div className="hg-build-image"><img src={skill.image} alt={skill.title}/><span>{skill.serviceStatus}</span></div>
          <div className="hg-build-body"><small>{skill.tagline}</small><h3>{skill.title}</h3><p>{skill.summary}</p><strong>Learn • Book • Shop →</strong></div>
        </a>)}
      </div>
      <div className="hg-hero-actions" style={{marginTop:32}}><a className="button gold" href="/skills">Enter Hands Gifted Skills</a><a className="button" href="/book">Book / request a service</a></div>
    </section>

    <section className="hg-section hg-model">
      <div className="hg-model-intro">
        <span>How the ecosystem works</span>
        <h2>Child → skill → family → faith → deeper value.</h2>
        <p>The public website should help someone learn something useful first. From there they can move into practical skill worlds, scripture study, family support, verified resources, products, or services without everything being collapsed into one giant free page.</p>
      </div>
      <div className="hg-proof-grid">
        {supportModel.map(([number,title,body])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section className="hg-section hg-now">
      <div className="hg-now-copy">
        <span>Hands Gifted Resource Center</span>
        <h2>Six doors into a deeper family-resource ecosystem.</h2>
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
        <h2>Children need adults and households equipped to guide them.</h2>
        <p>Household organization remains important, but it sits in its proper place: as one support structure around child development, family stability, practical learning, and opportunity.</p>
      </div>
      <div className="hg-build-grid">
        {parentSupports.map(([title,body])=><article className="hg-build-card" key={title}>
          <div className="hg-build-body"><small>Parent & caregiver support</small><h3>{title}</h3><p>{body}</p></div>
        </article>)}
      </div>
      <div className="hg-hero-actions" style={{marginTop:32}}><a className="button gold" href="/resources/household-management">Household resources</a><a className="button" href="/household-system">Deeper household system</a></div>
    </section>

    <section className="hg-section hg-future">
      <div>
        <span>Free resources + protected creations + direct services</span>
        <h2>Give real value without giving away the entire Hands Gifted business.</h2>
        <p>Public information, scripture pathways, verified resources, and selected starter guidance can remain accessible. Original books, workbooks, planners, kits, courses, systems, member resources, and service processes belong in the product or service layer when they are ready.</p>
      </div>
      <div className="hg-future-actions"><a className="button gold" href="/resources">Use free resources</a><a className="button" href="/shop">See products</a><a className="button" href="/book">Book a service</a></div>
    </section>

    <PublicAreaNav />

    <section className="hg-private-note"><strong>Private family information stays private.</strong><span>The public site can be informed by real experience without publishing children&apos;s school records, health information, legal matters, household finances, private journals, addresses, or other protected family details.</span></section>

    <section className="hg-final-cta">
      <div><span>Hands Gifted</span><h2>Learn something. Develop a gift. Use the skill. Keep going deeper.</h2><p>Start with children and learning, enter a Hands Gifted skill world, support the family around the child, connect with trustworthy resources, and use deeper products or services when they fit the need.</p></div>
      <div><a className="button gold" href="/skills">Explore Hands Gifted Skills</a><a className="button glass" href="/resources">Find family resources</a></div>
    </section>

    <SiteFooter />
  </main>;
}
