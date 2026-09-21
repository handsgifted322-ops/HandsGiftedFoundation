import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import styles from "../command-center.module.css";

const family=[
 ["Family Operations","/command-center/family-operations","Children, school, household, meals, routines and family administration"],
 ["Stability & Case Management","/command-center/family-stability","Housing, rent, utilities, transportation, work and assistance follow-ups"],
 ["Family Academy","/command-center/academy","Learning, assignments, practical skills and progress"],
 ["Household Control","/command-center/household","Assignments, zones, chores and parent checks"],
 ["Calendar","/command-center/calendar","School, work, appointments, faith and family events"],
 ["Routines & Playbooks","/command-center/routines","SOPs, recurring execution and household rhythm"],
] as const;

const executive=[
 ["Hands Gifted CEO","/command-center/projects","Business projects, programs, R&D and execution"],
 ["Content Control","/command-center/content","Private drafts and approved public publishing"],
 ["Resources","/command-center/resources","Documents, media and operational assets"],
 ["Discover / Insights","/command-center/discover","Research and useful information before it becomes work"],
 ["Weekly Review","/command-center/review","Close loops, review capacity and choose next outcomes"],
] as const;

const control=[
 ["Inbox & Quick Capture","/command-center/inbox","Capture once, classify, route and triage"],
 ["Waiting & Follow-ups","/command-center/waiting","Callbacks, dependencies and external responses"],
 ["Approvals","/command-center/approvals","Decisions, verification and release gates"],
 ["Private Owner Records","/command-center/private-records","Owner-only context and confidential records"],
 ["System Health","/command-center/system-health","GitHub, Supabase, deployment and integration health"],
] as const;

export default async function MorePage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context);
 const group=(title:string,items:readonly (readonly [string,string,string])[])=><div className={styles.menuGroup}><div className={styles.menuLabel}>{title}</div><div className={styles.menuList}>{items.map(([label,href,desc])=><a className={styles.menuRow} href={href} key={href}><div><strong>{label}</strong><span>{desc}</span></div><span>›</span></a>)}</div></div>;
 return <CommandCenterShell active="more" context={context}>
   <div className={styles.pageTitle}><div className={styles.eyebrow}>Canonical master structure</div><h1>Command Center</h1><p>One private operating system for a seven-person household, family case management, parent administration and Hands Gifted executive work.</p></div>
   {group("Household + Family",family)}
   {group("CEO + Business",executive)}
   {group("Control + Privacy",control)}
   <div className={styles.menuGroup}><div className={styles.menuLabel}>Public boundary</div><div className={styles.menuList}><a className={styles.menuRow} href="/"><div><strong>Public Hands Gifted website</strong><span>Leave the private Command Center. Household and child records never belong on this surface.</span></div><span>↗</span></a></div></div>
 </CommandCenterShell>
}
