import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ProgramExplorer } from "../../components/ProgramExplorer";

export default function ProgramsPage() {
  return <main><SiteHeader /><section className="inner-hero"><span>Hands Gifted · Internal R&amp;D</span><h1>Skills and ideas being tested without competing with the current flagship.</h1><p>Cooking, gardening, sewing, hair/self-care, Family Academy, creative work, and other development lanes remain research and household-tested practice during the current 90-day focus. A listing here does not mean a public service, finished product, separate business, or operating program has launched.</p><div className="hero-actions"><a className="button gold" href="/household-system">See the active flagship</a><a className="button" href="/about">About the family-first model</a></div></section><section className="section parchment"><ProgramExplorer /></section><SiteFooter /></main>;
}
