import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export default function Home(){return <main className="hg-home reference-home"><SiteHeader/>
<section className="reference-hero">
<img src="/catalog/family-learning.jpg" alt="Mother and child learning together"/>
<div className="reference-shade"/>
<div className="reference-copy">
<p className="reference-kicker">Strong families. Brighter futures.</p>
<h1>Empowering Families.<br/><em>Changing Lives.</em></h1>
<p>Hands Gifted Foundation connects families with faith-centered education, practical skills, resources, and support that can be used in everyday life.</p>
<div className="reference-actions"><a className="reference-primary" href="/resources">Explore programs <span>›</span></a><a className="reference-secondary" href="/resources/community-resources">Find resources <span>›</span></a></div>
</div></section>
<section className="reference-mission">
<p className="reference-kicker">Our mission</p>
<h2>Equip families with useful knowledge, practical skills, resources, and opportunities to grow stronger together.</h2>
<div className="reference-values">
<a href="/resources/household-management"><b>♡</b><span>Support<br/>Families</span></a>
<a href="/resources/kids-learning"><b>▤</b><span>Expand<br/>Learning</span></a>
<a href="/resources/community-resources"><b>♙</b><span>Strengthen<br/>Community</span></a>
<a href="/skills"><b>☆</b><span>Develop<br/>Skills</span></a>
</div>
</section>
<section className="reference-next"><div><p className="reference-kicker">Hands Gifted</p><h2>Learn it. Practice it. Put it to use.</h2><p>Explore activities and practical learning for children and families—from school support and household skills to cooking, sewing, gardening, technology, and community resources.</p></div><a className="reference-primary" href="/activities">Explore activities <span>›</span></a></section>
<SiteFooter/></main>}