import Link from "next/link";
import type { ReactNode } from "react";
import styles from "../command-center.module.css";

type ActiveNav="today"|"inbox"|"calendar"|"more"|"approvals"|"waiting"|"projects"|"routines"|"discover"|"review";
type Context="all"|"business"|"family"|"personal";

const sideActionLinks=[
  ["Today","/command-center","today"],
  ["Inbox & Triage","/command-center/inbox","inbox"],
  ["Approvals","/command-center/approvals","approvals"],
  ["Waiting & Follow-ups","/command-center/waiting","waiting"],
  ["Calendar","/command-center/calendar","calendar"],
] as const;
const sideSystemLinks=[
  ["Projects","/command-center/projects","projects"],
  ["Routines & Playbooks","/command-center/routines","routines"],
  ["Discover / Insights","/command-center/discover","discover"],
  ["Weekly Review","/command-center/review","review"],
  ["More","/command-center/more","more"],
] as const;

function contextHref(path:string, context:Context){return context==="all"?path:`${path}?context=${context}`}

export function CommandCenterShell({children,active="today",context="all",rightRail}: {children:ReactNode;active?:ActiveNav;context?:Context;rightRail?:ReactNode}){
  const currentPath=active==="today"?"/command-center":active==="inbox"?"/command-center/inbox":active==="calendar"?"/command-center/calendar":active==="more"?"/command-center/more":`/command-center/${active}`;
  return <div className={styles.shell}>
    <header className={styles.appBar}>
      <div className={styles.brand}><div className={styles.brandMark}>HG</div><div className={styles.brandText}><strong>Command Center</strong><span>Founder + Family Operations</span></div></div>
      <div className={styles.actions}><span className={styles.privateBadge}>Private</span><Link className={styles.iconButton} href="/command-center/discover" aria-label="Search and discover">⌕</Link><Link className={styles.iconButton} href="/command-center/approvals" aria-label="Open decisions and alerts">●</Link><Link className={styles.iconButton} href="/command-center/more" aria-label="Open profile and settings">S</Link></div>
    </header>
    <div className={styles.contextBar}><nav className={styles.contextTabs} aria-label="Command Center context">
      {(["all","business","family","personal"] as Context[]).map((item)=><Link key={item} href={contextHref(currentPath,item)} className={`${styles.contextTab} ${context===item?styles.contextTabActive:""}`}>{item==="all"?"All":item[0].toUpperCase()+item.slice(1)}</Link>)}
    </nav></div>
    <div className={styles.body}>
      <aside className={styles.sideNav} aria-label="Command Center navigation">
        <div className={styles.desktopTitle}><strong>Hands Gifted</strong><span>Private operations</span></div>
        <div className={styles.sideLabel}>Action</div>
        {sideActionLinks.map(([label,href,key])=><Link key={href} className={`${styles.sideLink} ${active===key?styles.sideLinkActive:""}`} href={contextHref(href,context)}><span>{label}</span><span>›</span></Link>)}
        <div className={styles.sideGroup}><div className={styles.sideLabel}>Operate</div>{sideSystemLinks.map(([label,href,key])=><Link key={href} className={`${styles.sideLink} ${active===key?styles.sideLinkActive:""}`} href={contextHref(href,context)}><span>{label}</span><span>›</span></Link>)}</div>
      </aside>
      <main className={styles.main}>{children}</main>
      <aside className={styles.detailPane} aria-label="Command Center quick status">{rightRail??<><div className={styles.detailCard}><h3>Operating rule</h3><p>The Command Center brings decisions and next actions forward. Private records stay private; public release always requires an explicit approval.</p></div></>}</aside>
    </div>
    <nav className={styles.bottomNav} aria-label="Primary Command Center navigation">
      <Link href={contextHref("/command-center",context)} className={`${styles.navItem} ${active==="today"?styles.navActive:""}`}><span className={styles.navIcon}>⌂</span><span>Today</span></Link>
      <Link href={contextHref("/command-center/inbox",context)} className={`${styles.navItem} ${active==="inbox"?styles.navActive:""}`}><span className={styles.navIcon}>▣</span><span>Inbox</span></Link>
      <Link href="/command-center/inbox#capture" className={`${styles.navItem} ${styles.capture}`}><span className={styles.navIcon}>＋</span><span>Capture</span></Link>
      <Link href={contextHref("/command-center/calendar",context)} className={`${styles.navItem} ${active==="calendar"?styles.navActive:""}`}><span className={styles.navIcon}>□</span><span>Calendar</span></Link>
      <Link href={contextHref("/command-center/more",context)} className={`${styles.navItem} ${active==="more"?styles.navActive:""}`}><span className={styles.navIcon}>☰</span><span>More</span></Link>
    </nav>
  </div>
}

export function normalizeContext(value:string|undefined):Context{return value==="business"||value==="family"||value==="personal"?value:"all"}
