import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export default function FamilyPage() {
  return <main><SiteHeader /><section className="secure-hero family-access"><div><span>Private family access</span><h1>Family Dashboard</h1><p>Each family member enters the part of the system meant for them. Children see only their own day, responsibilities, school support, Academy, progress, projects, and help requests.</p><div className="secure-badge">No child or household records are exposed on this public preview. Authentication must be connected before personal family data is rendered here.</div></div><div className="secure-card"><strong>Child My Day</strong><ul><li>Today</li><li>Responsibilities</li><li>School Support</li><li>Family Academy</li><li>Progress</li><li>Projects</li><li>Ask for Help</li></ul><a className="button" href="/academy">Explore public Academy overview</a></div></section><SiteFooter /></main>;
}
