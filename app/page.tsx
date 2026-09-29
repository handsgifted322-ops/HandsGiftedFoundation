import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

const lifeAreas = [
  ["Faith & Biblical Living","Build daily life on scripture, prayer, wisdom, character, and practical obedience.","/resources"],
  ["Healing, Health & Recovery","Find grounded wellness information, recovery support, and guidance on when professional care is needed.","/resources/food-wellness"],
  ["Marriage & Family","Strengthen communication, household unity, responsibilities, and family rhythms.","/resources"],
  ["Children & Development","Support learning, life skills, interests, school needs, responsibility, and opportunities.","/activities"],
  ["Home & Daily Living","Build repeatable routines for meals, cleaning, organization, planning, and household stewardship.","/resources/household-management"],
  ["Money & Stability","Work on budgeting, resources, employment, housing stability, and practical stewardship.","/resources"],
  ["Transportation & Access","Find practical ways to navigate transportation barriers and connect with verified resources.","/resources/community-resources"],
  ["Work, Skills & Purpose","Develop useful gifts through cooking, sewing, gardening, braiding, technology, work, and entrepreneurship.","/skills"],
  ["Rest, Joy & Community","Make room for healthy family connection, creativity, community, and restorative activities.","/activities"],
] as const;

const realLife = [
  ["Feeling overwhelmed at home?","Start with practical household direction instead of trying to fix everything at once.","/resources/household-management"],
  ["Trying to rebuild your family?","Explore faith, routines, communication, children’s development, and stability resources together.","/resources"],
  ["Recovering from your past?","Use biblical reflection alongside responsible recovery and professional resources when needed.","/resources"],
  ["Trying to find your gift?","Explore practical skills and interests that can grow through learning, practice, and service.","/skills"],
  ["Children struggling or needing direction?","Find activities, learning pathways, family support, and verified opportunities.","/activities"],
  ["Need help beyond information?","See developing Hands Gifted programs and service pathways.","/programs"],
] as const;

export default function Home(){
  return <main className="hg-home">
    <SiteHeader />

    <section className="hg-hero">
      <div className="hg-hero-copy">
        <div className="hg-kicker">Faith • Women • Family • Practical Skills • Stability</div>
        <h1>Discover the Gift.<br/><span>Build the Skill.</span></h1>
        <blockquote className="hg-scripture">“She seeketh wool, and flax, and worketh willingly with her hands.” <cite>— Proverbs 31:13 KJV</cite></blockquote>
        <p className="hg-hero-lead">Hands Gifted is a biblical resource for real life—helping women strengthen faith, develop practical skills, care for their households, rebuild stability, support their families, and use their gifts with purpose.</p>
        <div className="hg-hero-actions">
          <a className="button gold" href="#real-life">Start with real life</a>
          <a className="button glass" href="/resources">Explore resources</a>
        </div>
        <div className="hg-hero-note"><strong>Real life. Biblical direction. Practical help.</strong><span>Learning is meant to move into practice: learn, practice, document, improve, teach, and serve.</span></div>
      </div>
      <div className="hg-hero-visual" aria-label="Women and families learning practical Hands Gifted skills">
        <div className="hg-visual-main"><img src="/catalog/family-learning.jpg" alt="Family learning practical skills together" /></div>
        <div className="hg-visual-stack">
          <img src="/catalog/cooking.jpg" alt="Practical cooking and household skills" />
          <img src="/catalog/sewing.jpg" alt="Sewing and working willingly with the hands" />
        </div>
        <div className="hg-visual-badge"><span>HANDS GIFTED</span><strong>Faith into practice.</strong><small>Hands • household • purpose</small></div>
      </div>
    </section>

    <section id="real-life" className="hg-section hg-builds">
      <div className="hg-section-heading"><span>Start where you are</span><h2>What are you trying to work through right now?</h2><p>You do not have to understand the entire Hands Gifted system first. Start with the part of everyday life that needs attention.</p></div>
      <div className="hg-build-grid">
        {realLife.map(([title,body,href])=><a className="hg-build-card" key={title} href={href}><div className="hg-build-body"><small>Real-life starting point</small><h3>{title}</h3><p>{body}</p><strong>Start here →</strong></div></a>)}
      </div>
    </section>

    <section className="hg-value-strip" aria-label="Hands Gifted foundation">
      <article><span>01</span><strong>Faith</strong><small>Seek biblical wisdom</small></article>
      <article><span>02</span><strong>Hands</strong><small>Learn and practice useful skills</small></article>
      <article><span>03</span><strong>Household</strong><small>Build order and stability</small></article>
      <article><span>04</span><strong>Service</strong><small>Use growth to help others</small></article>
    </section>

    <section className="hg-section hg-now">
      <div className="hg-now-copy"><span>Everyday life areas</span><h2>One resource center. Different doors into real life.</h2><p>Use the area that matches the need. Hands Gifted connects biblical grounding with practical information, skill development, trustworthy outside resources, and deeper programs or services as they are developed.</p></div>
      <div className="hg-build-grid">
        {lifeAreas.map(([title,body,href])=><a className="hg-build-card" key={title} href={href}><div className="hg-build-body"><small>Hands Gifted resource area</small><h3>{title}</h3><p>{body}</p><strong>Explore →</strong></div></a>)}
      </div>
    </section>

    <section className="hg-section hg-model">
      <div className="hg-model-intro"><span>How Hands Gifted grows</span><h2>Learn → Practice → Document → Improve → Teach → Serve.</h2><p>Hands Gifted does not need to pretend that every skill is already mastered. Learning can begin with trustworthy information, move into real household practice, preserve what worked, improve what did not, and only then become something responsible to teach or offer.</p></div>
      <div className="hg-proof-grid">
        <article><span>01</span><h3>Biblical foundation</h3><p>Connect the subject to scripture in context and practical daily application.</p></article>
        <article><span>02</span><h3>Practical direction</h3><p>Use accurate information and manageable actions instead of overwhelming people with a giant plan.</p></article>
        <article><span>03</span><h3>Build the skill</h3><p>Practice cooking, sewing, gardening, household management, family development, creative skills, and more.</p></article>
        <article><span>04</span><h3>Get deeper help</h3><p>Move into Hands Gifted programs, tools, products, services, or qualified outside resources when information alone is not enough.</p></article>
      </div>
    </section>

    <section className="hg-section hg-future">
      <div><span>Resources • Programs • Services</span><h2>Information is the beginning—not always the whole solution.</h2><p>Some visitors need an article or activity. Others need a structured program, practical tool, or hands-on support. Hands Gifted is being developed so those layers can connect without exposing private family information.</p></div>
      <div className="hg-future-actions"><a className="button gold" href="/resources">Resources</a><a className="button" href="/programs">Programs</a><a className="button" href="/book">Services</a></div>
    </section>

    <section className="hg-private-note"><strong>Private family information stays private.</strong><span>The public website can be informed by lived experience without publishing children’s records, health information, household finances, private journals, addresses, or other protected family details. Public use requires an intentional approval step.</span></section>

    <section className="hg-final-cta">
      <div><span>Hands Gifted</span><h2>Use your hands. Build your household. Serve your community. Walk according to the Most High.</h2><p>Start with one real need, learn what is useful, put it into practice, and build from there.</p></div>
      <div><a className="button gold" href="/resources">Explore resources</a><a className="button glass" href="/programs">Explore programs</a></div>
    </section>

    <SiteFooter />
  </main>;
}
