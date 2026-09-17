import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import styles from "../command-center.module.css";

const contexts=[
 ["Business","/command-center?context=business","Website development, operations, content, opportunities and business projects"],
 ["Family","/command-center?context=family","Household, children, Academy, school, food, routines and family needs"],
 ["Personal & Faith","/command-center?context=personal","Founder administration, private spiritual planning and personal priorities"],
] as const;
const action=[
 ["Approvals","/command-center/approvals","Decisions and verification"],
 ["Waiting & Follow-ups","/command-center/waiting","Dependencies and callbacks"],
 ["Projects","/command-center/projects","Multi-step outcomes"],
 ["Routines & Playbooks","/command-center/routines","Recurring execution and SOPs"],
 ["Discover / Insights","/command-center/discover","Useful information before it becomes a task"],
 ["Weekly Review","/command-center/review","Close loops and choose next outcomes"],
] as const;
const existing=[
 ["Household Control","/command-center/household","Assignments and parent checks"],
 ["Family Academy","/command-center/academy","Learning and progress"],
 ["Operations","/command-center/operations","Tasks, needs and stability work"],
 ["Content Control","/command-center/content","Private drafts and approved publishing"],
 ["Resources","/command-center/resources","Documents, media and assets"],
 ["System Health","/command-center/system-health","Runtime and integration checks"],
] as const;
export default async function MorePage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context);
 const group=(title:string,items:readonly (readonly [string,string,string])[])=><div className={styles.menuGroup}><div className={styles.menuLabel}>{title}</div><div className={styles.menuList}>{items.map(([label,href,desc])=><a className={styles.menuRow} href={href} key={href}><div><strong>{label}</strong><span>{desc}</span></div><span>›</span></a>)}</div></div>;
 return <CommandCenterShell active="more" context={context}><div className={styles.pageTitle}><div className={styles.eyebrow}>Everything else, organized</div><h1>More</h1><p>Context workspaces and lower-frequency control areas stay here so Today remains focused.</p></div>{group("Workspaces",contexts)}{group("Operate",action)}{group("Specialist areas",existing)}<div className={styles.menuGroup}><div className={styles.menuLabel}>Access</div><div className={styles.menuList}><a className={styles.menuRow} href="/command-center/system-health"><div><strong>Settings & Access</strong><span>Security, integrations and system status</span></div><span>›</span></a><a className={styles.menuRow} href="/"><div><strong>Public Hands Gifted website</strong><span>Leave the private Command Center</span></div><span>↗</span></a></div></div></CommandCenterShell>
}
