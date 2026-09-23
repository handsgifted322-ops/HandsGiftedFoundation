import Link from "next/link";
import type { ReactNode } from "react";
import styles from "../command-center.module.css";

type ActiveNav="workspace"|"dashboard"|"today"|"inbox"|"calendar"|"more"|"approvals"|"waiting"|"projects"|"routines"|"discover"|"review"|"family-operations"|"family-stability"|"private-records"|"system-health";
type Context="all"|"business"|"family"|"personal";

const sideActionLinks=[
  ["My Hands Gifted","/command-center/workspace","workspace"],
  ["Dashboard","/command-center/dashboard","dashboard"],
  ["My Day","/command-center","today"],
  ["Inbox & Triage","/command-center/inbox","inbox"],
  ["Approvals","/command-center/approvals","approvals"],
  ["Waiting & Follow-ups","/command-center/waiting","waiting"],
  ["Calendar","/command-center/calendar","calendar"],
] as const;

const sideFamilyLinks=[
  ["Family Operations","/command-center/family-operations","family-operations"],
  ["Stability & Cases","/command-center/family-stability","family-stability"],
  ["Routines & Playbooks","/command-center/routines","routines"],
  ["Private Owner Records","/command-center/private-records","private-records"],
] as const;

const sideSystemLinks=[
  ["Projects / CEO","/command-center/projects","projects"],
  ["Discover / Insights","/command-center/discover","discover"],
  ["Weekly Review","/command-center/review","review"],
  ["System Health","/command-center/system-health","system-health"],
  ["More","/command-center/more","more"],
] as const;

function contextHref(path:string, context:Context){return context==="all"?path:path+"?context="+context}

export function CommandCenterShell({children,active="today",context="all",rightRail}: {children:ReactNode;active?:ActiveNav;context?:Context;rightRail?:ReactNode}){
  const currentPath=active==="workspace"?"/command-center/workspace":active==="dashboard"?"/command-center/dashboard":active==="today"?"/command-center":active==="inbox"?"/command-center/inbox":active==="calendar"?"/command-center/calendar":active==="more"?"/command-center/more":"/command-center/"+active;
  const sideLinks=(items:readonly (readonly [string,string,ActiveNav])[])=>
    items.map(([label,href,key])=><Link key={href} className={styles.sideLink+(active===key?" "+styles.sideLinkActive:"")} href={contextHref(href,context)}><span>{label}</span><span>›</span></Link>);
  return <div className={styles.shell}>
    <header className={styles.appBar}>
      <div className={styles.brand}><div className={styles.brandMark}>HG</div><div className={styles.brandText}><strong>Command Center</strong><span>Household + Family + CEO Operations</span></div></div>
      <div className={styles.actions}><span className={styles.privateBadge}>Private</span><Link className={styles.iconButton} href="/command-center/discover" aria-label="Search and discover">⌕</Link><Link className={styles.iconButton} href="/command-center/approvals" aria-label="Open decisions and alerts">●</Link><Link className={styles.iconButton} href="/command-center/more" aria-label="Open profile and settings">S</Link></div>
    </header>
    <div className={styles.contextBar}><nav className={styles.contextTabs} aria-label="Command Center context">
      {(["all","business","family","personal"] as Context[]).map((item)=><Link key={item} href={contextHref(currentPath,item)} className={styles.contextTab+(context===item?" "+styles.contextTabActive:"")}>{item==="all"?"All":item[0].toUpperCase()+item.slice(1)}</Link>)}
    </nav></div>
    <div className={styles.body}>
      <aside className={styles.sideNav} aria-label="Command Center navigation">
        <div className={styles.desktopTitle}><strong>Hands Gifted</strong><span>Private operating system</span></div>
        <div className={styles.sideLabel}>Action</div>
        {sideLinks(sideActionLinks)}
        <div className={styles.sideGroup}><div className={styles.sideLabel}>Family + Household</div>{sideLinks(sideFamilyLinks)}</div>
        <div className={styles.sideGroup}><div className={styles.sideLabel}>CEO + System</div>{sideLinks(sideSystemLinks)}</div>
      </aside>
      <main className={styles.main}>{children}</main>
      <aside className={styles.detailPane} aria-label="Command Center quick status">{rightRail??<div className={styles.detailCard}><h3>Operating rule</h3><p>Capture once, classify it, route it to the right family or business system, then track the next action. Private records stay private; public release requires explicit approval.</p></div>}</aside>
    </div>
    <nav className={styles.bottomNav} aria-label="Primary Command Center navigation">
      <Link href={contextHref("/command-center/dashboard",context)} className={styles.navItem+(active==="dashboard"?" "+styles.navActive:"")}><span className={styles.navIcon}>⌂</span><span>Dashboard</span></Link>
      <Link href={contextHref("/command-center/inbox",context)} className={styles.navItem+(active==="inbox"?" "+styles.navActive:"")}><span className={styles.navIcon}>▣</span><span>Inbox</span></Link>
      <Link href="/command-center/inbox#capture" className={styles.navItem+" "+styles.capture}><span className={styles.navIcon}>＋</span><span>Capture</span></Link>
      <Link href={contextHref("/command-center/calendar",context)} className={styles.navItem+(active==="calendar"?" "+styles.navActive:"")}><span className={styles.navIcon}>□</span><span>Calendar</span></Link>
      <Link href={contextHref("/command-center/more",context)} className={styles.navItem+(active==="more"?" "+styles.navActive:"")}><span className={styles.navIcon}>☰</span><span>More</span></Link>
    </nav>
  </div>
}

export function normalizeContext(value:string|undefined):Context{return value==="business"||value==="family"||value==="personal"?value:"all"}
