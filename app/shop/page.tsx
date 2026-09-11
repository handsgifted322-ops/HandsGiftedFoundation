import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const nav = [["Home","/"],["Shop","/shop"],["Services","/services"],["About","/about"],["Contact","/contact"]] as const;

export default function ShopPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted Shop</span>
      <h1>Useful products built from real family learning.</h1>
      <p>The first public shop is being prepared around digital resources that can be delivered without large inventory costs. Products stay clearly labeled until checkout and delivery are fully connected.</p>
    </section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Public website">{nav.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
      <div className="public-page-grid">
        <article className="public-page-card"><span className="status-label">Preparing for first release</span><h2>Hands Gifted Prayer Journal</h2><p>A faith-centered guided journal for reflection, prayer, study, and practical growth.</p><div className="shop-price">Digital product</div><a className="button" href="mailto:handsgifted322@gmail.com?subject=Prayer%20Journal%20Interest">Ask about early availability</a></article>
        <article className="public-page-card"><span className="status-label">Preparing for first release</span><h2>Proverbs 31 Workbook</h2><p>A structured workbook focused on study, household stewardship, character, skills, and practical application.</p><div className="shop-price">Digital product</div><a className="button" href="mailto:handsgifted322@gmail.com?subject=Proverbs%2031%20Workbook%20Interest">Ask about early availability</a></article>
        <article className="public-page-card"><span className="status-label">Preparing for first release</span><h2>Titus 2 Guide</h2><p>A guided resource for women centered on faith, family responsibility, learning, and practical development.</p><div className="shop-price">Digital product</div><a className="button" href="mailto:handsgifted322@gmail.com?subject=Titus%202%20Guide%20Interest">Ask about early availability</a></article>
      </div>
      <div className="public-page-note"><strong>Income-first setup:</strong> These are the first-release product lanes. A direct checkout connection will be added only after pricing, files, delivery, and payment handling are ready so visitors are not sent through an incomplete purchase flow.</div>
    </section>
    <SiteFooter />
  </main>;
}
