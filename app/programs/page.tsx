import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ProgramExplorer } from "../../components/ProgramExplorer";

export default function ProgramsPage() {
  return <main><SiteHeader /><section className="inner-hero"><span>Hands Gifted ecosystem</span><h1>Programs built around family, faith, stability, skill, and service.</h1><p>Browse the full program registry by category, need, or area of interest.</p></section><section className="section parchment"><ProgramExplorer /></section><SiteFooter /></main>;
}
