import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const nav = [["Home","/"],["Shop","/shop"],["Services","/services"],["About","/about"],["Contact","/contact"]] as const;

export default function ContactPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Contact Hands Gifted</span>
      <h1>Questions, inquiries, and collaboration.</h1>
      <p>Use this page for current service questions, product interest, partnership conversations, community resource connections, or general Hands Gifted inquiries.</p>
    </section>
    <section className="public-page-content">
      <nav className="public-page-nav" aria-label="Public website">{nav.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
      <div className="public-page-grid">
        <article className="public-page-card"><span className="status-label">General contact</span><h2>Email Hands Gifted</h2><p>The public business contact for Hands Gifted is available for questions and inquiries.</p><div className="contact-list"><a href="mailto:handsgifted322@gmail.com">handsgifted322@gmail.com</a></div><a className="button gold" href="mailto:handsgifted322@gmail.com?subject=Hands%20Gifted%20Inquiry">Send an email</a></article>
        <article className="public-page-card"><span className="status-label">Service inquiry</span><h2>Braiding</h2><p>Ask about current availability, style needs, and next steps. Full booking and pricing tools are still being organized.</p><a className="button" href="mailto:handsgifted322@gmail.com?subject=Hands%20Gifted%20Braiding%20Inquiry">Braiding inquiry</a></article>
        <article className="public-page-card"><span className="status-label">Product interest</span><h2>Digital resources</h2><p>Ask about the Prayer Journal, Proverbs 31 Workbook, Titus 2 Guide, or future Hands Gifted resources.</p><a className="button" href="mailto:handsgifted322@gmail.com?subject=Hands%20Gifted%20Product%20Interest">Product inquiry</a></article>
        <article className="public-page-card public-page-wide"><h2>Partnerships and community connections</h2><p>Hands Gifted is still developing. Potential collaborators, community organizations, resource providers, vendors, and supporters can use the same public email and clearly state the purpose of the message.</p><div className="public-page-actions"><a className="button gold" href="mailto:handsgifted322@gmail.com?subject=Hands%20Gifted%20Partnership%20Inquiry">Partnership inquiry</a><a className="button" href="/about">Read about Hands Gifted</a></div></article>
      </div>
      <div className="public-page-note"><strong>Privacy:</strong> Do not send children&apos;s school records, medical information, financial records, case-management documents, or other private family information through the public contact channel.</div>
    </section>
    <SiteFooter />
  </main>;
}
