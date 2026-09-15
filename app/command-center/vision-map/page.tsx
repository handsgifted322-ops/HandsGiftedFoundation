import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";

export const metadata: Metadata = { title: "Vision & Progress Map | Hands Gifted", robots: { index:false, follow:false } };

const areas = [
  ["Faith & direction","FOUNDATION","Use faith as the decision filter for household, family, work, rest, and growth."],
  ["Family & motherhood","LIVED / ACTIVE","Protect family connection, school support, responsibilities, routines, and private household priorities."],
  ["Household organization","LIVED / PROTOTYPE","Continue testing routines, inventory, meals, schedules, responsibilities, and SOPs."],
  ["Hands Gifted business","ACTIVE BUSINESS","Keep one current offer focus while the larger vision remains phased."],
  ["Braiding & natural hair","LIVED / DOING","Document real finished work and skill growth; decide later whether to expand into a service or teaching lane."],
  ["Cooking & family food","LIVED / R&D","Document recipes, shopping lessons, healthier-eating changes, and repeatable kitchen systems."],
  ["Sewing & modest apparel","LEARNING","Practice construction and finishing before treating full garments or classes as ready."],
  ["Gardening","PARKED / OPTIONAL","Keep visible as a future possibility without adding pressure to the current family workload."],
  ["Daughters of Sarah / Family Academy","FRAMEWORK","Use private family learning where helpful; public expansion requires later maturity and safeguards."],
  ["Shop / workshops / events","FUTURE","Do not activate until products, skills, demand, capacity, and business readiness support them."],
] as const;

const audit = [
  "What moved from conversation into real action?",
  "What did I actually practice or finish?",
  "Which drafts still have no real-world use?",
  "What accelerated since the last review?",
  "What slowed, stalled, or became too much?",
  "What should move to the parking lot?",
  "What are the next three finishable priorities?",
] as const;

export default function VisionMapPage(){
  return <main><SiteHeader/>
    <section className="inner-hero"><span>PRIVATE · EXECUTIVE VISIBILITY</span><h1>Vision & Progress Map</h1><p>This page exists because a large number of chats, ideas, plans, and documents can make the overall direction hard to see. The map separates lived work, learning, prototypes, active business, frameworks, parked ideas, and future possibilities.</p><div className="hero-actions"><a className="button gold" href="/command-center">Back to Command Center</a><a className="button" href="/command-center/sops">Open SOPs</a></div></section>
    <section className="section">
      <div className="section-heading left"><span>Whole-system status</span><h2>See the scope before choosing the next task.</h2><p>Keep the vision broad while keeping the active workload narrow.</p></div>
      <div className="detail-grid" style={{marginTop:24}}>{areas.map(([title,status,body])=><article key={title}><span>{status}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className="section-heading left" style={{marginTop:48}}><span>Founder review</span><h2>Questions for the recurring Whole-System Vision & Progress Audit</h2></div>
      <div className="detail-grid" style={{marginTop:24}}>{audit.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></article>)}</div>
      <div className="access-note" style={{marginTop:36}}><strong>PROGRESS RULE</strong><p>Do not count a new ChatGPT document as real-world completion. Track movement through conversation → decision → action → practice → proof → validated use.</p></div>
    </section><SiteFooter/></main>
  }
