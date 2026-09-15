import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata:Metadata={
  title:"Family Household Operating System | Hands Gifted",
  description:"A practical household operating system in development for women and mothers managing busy or rebuilding households.",
};

const components=[
  ["Weekly household planner","A single weekly view for priorities, schedules, preparation, and family follow-through."],
  ["Meal & inventory system","Plan meals from what is actually on hand, track quantities, and reduce last-minute decisions."],
  ["Cleaning & reset routines","Simple repeatable standards for daily resets and household zones."],
  ["Children’s responsibility tracker","Age-appropriate responsibility tracking designed for parent oversight and consistency."],
  ["Family scheduling pages","Coordinate school, work, appointments, household preparation, and recurring rhythms."],
  ["Preparation planning","Support advance preparation for important household rhythms, including Sabbath preparation where relevant."],
  ["Simple household SOP templates","Document recurring household procedures so they can be followed, reviewed, and improved."],
] as const;

export default function HouseholdSystemPage(){
  return <main className="public-page">
    <SiteHeader />
    <section className="public-page-hero">
      <span>Hands Gifted 90-Day Flagship</span>
      <h1>A practical operating system for a household that has too much to keep in its head.</h1>
      <p>Hands Gifted is developing the Family Household Operating System for women and mothers managing busy or rebuilding households. The goal is not another complicated productivity app. It is a usable system for recurring home operations.</p>
      <div className="hero-actions"><a className="button gold" href="/contact">Ask about the pilot</a><a className="button" href="/about">Why Hands Gifted starts at home</a></div>
    </section>

    <section className="public-page-content">
      <div className="public-page-grid">
        {components.map(([title,body])=><article className="public-page-card" key={title}><span className="status-label">In development</span><h2>{title}</h2><p>{body}</p></article>)}
      </div>

      <div className="public-page-note"><strong>What we are testing:</strong> whether the target customer understands the problem, wants the system, uses it consistently, and considers it valuable enough to pay for.</div>

      <div className="public-page-grid" style={{marginTop:32}}>
        <article className="public-page-card"><span className="status-label">Designed for</span><h2>Busy households</h2><p>When meals, schedules, chores, school needs, inventory, preparation, and reminders are spread across too many places.</p></article>
        <article className="public-page-card"><span className="status-label">Designed for</span><h2>Rebuilding households</h2><p>When a family needs simple structure, repeatable routines, and visible next actions while stability is being rebuilt step by step.</p></article>
        <article className="public-page-card"><span className="status-label">Privacy boundary</span><h2>Family-tested, not family-exposed</h2><p>Private household records are not the product. Public tools are built from privacy-safe lessons and repeatable methods, without exposing child, school, financial, health, journal, or case-management information.</p></article>
      </div>

      <div className="public-page-note" style={{marginTop:32}}><strong>Current status:</strong> The system is being developed and validated. Hands Gifted is not presenting every internal household tool or R&D lane as a public product.</div>
    </section>
    <SiteFooter />
  </main>;
}
