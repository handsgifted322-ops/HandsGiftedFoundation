import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ProgramExplorer } from "../../components/ProgramExplorer";

export default function ProgramsPage() {
  return <main><SiteHeader /><section className="inner-hero"><span>Hands Gifted · Development Lanes</span><h1>Keep the larger vision visible without treating every idea as launched.</h1><p>This area organizes current skills, learning goals, household prototypes, family-development frameworks, business work, and future possibilities. A listing here is a development record, not proof that a finished product, service, class, or public program is operating.</p><div className="hero-actions"><a className="button gold" href="/journey">See the journey map</a><a className="button" href="/household-system">See the current offer prototype</a></div></section><section className="section parchment"><ProgramExplorer /></section><SiteFooter /></main>;
}
