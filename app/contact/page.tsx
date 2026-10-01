import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export default function ContactPage(){
 return <main className="hg-clean-home"><SiteHeader/>
  <section className="hg-clean-section hg-women-page">
   <div className="hg-clean-heading"><h1>Contact Hands Gifted</h1><span>Reach out or follow along.</span></div>
   <div className="hg-women-grid">
    <section className="hg-women-card"><h2>Email</h2><p>Questions about Hands Gifted, website resources, or general inquiries.</p><p><a href="mailto:handsgifted322@gmail.com">handsgifted322@gmail.com</a></p></section>
    <section className="hg-women-card"><h2>Instagram</h2><p>Follow Hands Gifted on Instagram.</p><p><a href="https://www.instagram.com/handsgifted322" target="_blank" rel="noreferrer">@handsgifted322</a></p></section>
    <section className="hg-women-card"><h2>TikTok</h2><p>Follow Hands Gifted on TikTok.</p><p><a href="https://www.tiktok.com/@gifted.hands867" target="_blank" rel="noreferrer">@gifted.hands867</a></p></section>
   </div>
  </section>
  <SiteFooter/>
 </main>;
}