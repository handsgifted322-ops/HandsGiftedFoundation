import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ProgramExplorer } from "../../components/ProgramExplorer";

export default function ProgramsPage() {
  return <main><SiteHeader /><section className="inner-hero"><span>Hands Gifted development lanes</span><h1>One family-owned business. Multiple skills and opportunities growing together.</h1><p>These lanes show what our family is learning, practicing, organizing, or preparing to build. A listing here does not automatically mean a public service, finished product, separate business, or operating program has launched.</p></section><section className="section parchment"><ProgramExplorer /></section><SiteFooter /></main>;
}
