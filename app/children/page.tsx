import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
const paths=[
 ["Learning & School","Build study habits, curiosity, and confidence with age-appropriate learning.","Learning tools"],
 ["Character & Responsibility","Practice respect, responsibility, consistency, and everyday habits.","Character tools"],
 ["Practical Life Skills","Learn useful skills for home, self-care, food, organization, and everyday life.","Life skills"],
 ["Creativity & Gifts","Explore art, music, science, making, interests, and developing talents.","Explore gifts"],
 ["Faith & Biblical Learning","Learn biblical principles in a family-centered, age-appropriate way.","Faith learning"],
 ["Activities & Resources","Find practical activities and learning resources children can use with family guidance.","Find activities"]
] as const;
export default function Page(){return <main className="hg-clean-home"><SiteHeader/>
 <section className="hg-path-hero hg-children-path"><div><span className="hg-kicker">Hands Gifted for Children</span><h1>Learn. Practice. Discover what you can do.</h1><p>A family-guided place for children to strengthen learning, responsibility, practical skills, creativity, and faith.</p></div><div className="hg-path-image"/></section>
 <section className="hg-path-body"><div className="hg-clean-heading"><h2>Choose an area to grow</h2><span>Learn by doing.</span></div><div className="hg-women-grid">{paths.map(([t,d,a])=><section className="hg-women-card" key={t}><h3>{t}</h3><p>{d}</p><strong>{a}</strong></section>)}</div></section>
 <section className="hg-path-callout"><h2>Try one thing at a time.</h2><p>Read it. Try it. Practice it. Ask for help when you need it. Keep building the skill.</p></section><SiteFooter/></main>}