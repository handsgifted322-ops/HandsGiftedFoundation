import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

const contactReasons = [
  ["Resource correction or suggestion", "Report an outdated link, suggest a legitimate family or youth resource, or share public information that may belong in the Resource Center.", "Hands%20Gifted%20Resource%20Suggestion"],
  ["Product or membership interest", "Ask about workbooks, planners, children's learning resources, family systems, future membership access, or other Hands Gifted products as they become available.", "Hands%20Gifted%20Product%20or%20Membership%20Interest"],
  ["Collaboration or partnership", "Organizations, educators, youth programs, vendors, and community groups can introduce a real collaboration opportunity. Hands Gifted will not label an organization a partner until a partnership actually exists.", "Hands%20Gifted%20Collaboration%20Inquiry"],
  ["General question", "Use the public contact channel for questions about Hands Gifted resources, the website, or current availability.", "Hands%20Gifted%20General%20Inquiry"],
] as const;

export default function ContactPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Contact Hands Gifted</span>
      <h1>Questions, resource suggestions, and collaboration.</h1>
      <p>Use the public contact channel for Hands Gifted resource questions, corrections, product or membership interest, and legitimate collaboration conversations.</p>
    </section>
    <section className="public-page-content">
      <div className="public-page-grid">
        <article className="public-page-card public-page-wide"><span className="status-label">Public contact</span><h2>Email Hands Gifted</h2><p>For general public inquiries, use the Hands Gifted business email and include enough detail to identify what you are contacting us about.</p><div className="contact-list"><a href="mailto:handsgifted322@gmail.com">handsgifted322@gmail.com</a></div></article>
        {contactReasons.map(([title,body,subject])=><article className="public-page-card" key={title}><span className="status-label">Contact reason</span><h3>{title}</h3><p>{body}</p><a className="button" href={`mailto:handsgifted322@gmail.com?subject=${subject}`}>Email about this</a></article>)}
        <article className="public-page-card public-page-wide"><span className="status-label">Resource integrity</span><h2>Resource listings and partnerships are not the same thing.</h2><p>Hands Gifted may share public information about an outside organization because it appears useful and has been checked. That does not mean the organization sponsors, endorses, or partners with Hands Gifted. Formal relationships should be identified only after they actually exist.</p></article>
      </div>
      <div className="public-page-note"><strong>Privacy:</strong> Do not send children's school records, medical information, financial records, legal documents, case-management records, passwords, precise home addresses, or other private family information through the public contact channel.</div>
    </section>
    <SiteFooter />
  </main>;
}
