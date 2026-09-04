import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export default function CommandCenterPage() {
  return <main><SiteHeader /><section className="secure-hero"><div><span>Private parent workspace</span><h1>Hands Gifted Command Center</h1><p>The protected parent/operator side for household planning, approvals, child oversight, school administration, routines, needs, stability work, and Hands Gifted administration.</p><div className="secure-badge">Secure Supabase authentication and role-aware access are the required next connection for this route.</div></div><div className="secure-card"><strong>Parent view</strong><ul><li>Today & priorities</li><li>Family members</li><li>Household routines & zones</li><li>School & appointments</li><li>Needs & stability work</li><li>Hands Gifted projects</li><li>Approvals & verification</li></ul></div></section><SiteFooter /></main>;
}
