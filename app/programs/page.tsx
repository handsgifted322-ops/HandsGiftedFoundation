import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ProgramExplorer } from "../../components/ProgramExplorer";

export default function ProgramsPage() {
  return <main><SiteHeader /><section className="inner-hero"><span>Hands Gifted development lanes</span><h1>One family-development model. Different areas of learning, practice, creativity, opportunity, and service.</h1><p>These lanes are active, in development, or planned. A listing here does not automatically mean a public service, finished program, or operating business has launched.</p></section><section className="section parchment"><ProgramExplorer /></section><SiteFooter /></main>;
}
