import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Executive Dashboard | Hands Gifted Command Center",
  robots: { index: false, follow: false },
};

type Task = { id:string; title:string; description:string|null; status:string; priority:string|null; due_at:string|null; project_id:string|null };
type Project = { id:string; name:string; status:string; priority:string|null; initiative_state:string|null };
type Need = { id:string; title:string; category:string; status:string; priority:string|null; needed_by:string|null };
type Assignment = { id:string; title:string; status:string; parent_check_status:string; assignment_date:string };
type Academy = { id:string; title:string; status:string; due_at:string|null };
type Member = { id:string; display_name:string; household_role:string; age_group:string|null };
type ContentItem = { id:string; title:string; status:string; content_type:string };
type Connection = { provider:string; connection_scope:string; status:string };

function fmtDate(value:string|null){
  if(!value) return "No date";
  return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(new Date(value));
}
function isPast(value:string|null){return Boolean(value && new Date(value).getTime() < Date.now())}
function priorityScore(value:string|null){return value==="urgent"?4:value==="high"?3:value==="normal"?2:1}

const modules = [
  ["📖","Spiritual Foundation","Bible · Prayer · Sabbath · Study","/command-center/more"],
  ["🏠","Wife / Mother & Household","Home · Meals · Routines · Family care","/command-center/household"],
  ["💼","Executive / EAA","Schedule · Emails · Tasks · Follow-ups","/command-center/inbox"],
  ["♛","Hands Gifted CEO","Projects · Programs · Content · Business","/command-center/projects"],
  ["🛡","Family Stability","Housing · Utilities · Transportation · Needs","/command-center/operations"],
  ["🎓","Family Academy","Learning · Assignments · Progress · Skills","/command-center/academy"],
  ["🎒","Children & School","Schedules · Assignments · Events · Supplies","/command-center/academy"],
  ["🍴","Food & Kitchen","Meals · Prep · Inventory · Grocery systems","/command-center/household"],
  ["🧹","Home Management","Cleaning · Laundry · Repairs · Organization","/command-center/household"],
  ["📦","Inventory Center","Needs · Low items · Household supplies","/command-center/operations"],
  ["✉","Communication Hub","Email · Messages · Alerts · Follow-ups","/command-center/inbox"],
  ["🖥","Website Development","Content · Design · Pages · Deployment","/command-center/projects"],
] as const;

export default async function ExecutiveDashboard(){
  const access = await getCommandAccess();
  if(access.state !== "ready"){
    const msg = accessMessage(access.state);
    return <div className={styles.dash}><section className={styles.access}><h1>{msg.title}</h1><p>{msg.body}</p><p><Link href="/">Return to Hands Gifted</Link></p></section></div>;
  }

  const supabase = await createSupabaseServerClient();
  const org = access.organizationId;
  const [taskRes,projectRes,needRes,assignRes,academyRes,memberRes,contentRes,connectionRes] = await Promise.all([
    supabase.from("tasks").select("id,title,description,status,priority,due_at,project_id").eq("organization_id",org).not("status","in",'("completed","complete")').order("due_at",{ascending:true,nullsFirst:false}).limit(30),
    supabase.from("projects").select("id,name,status,priority,initiative_state").eq("organization_id",org).not("status","in",'("completed","complete","archived")').order("updated_at",{ascending:false}).limit(30),
    supabase.from("household_needs").select("id,title,category,status,priority,needed_by").eq("organization_id",org).neq("status","resolved").order("needed_by",{ascending:true,nullsFirst:false}).limit(20),
    supabase.from("household_assignments").select("id,title,status,parent_check_status,assignment_date").eq("organization_id",org).order("assignment_date",{ascending:false}).limit(20),
    supabase.from("academy_assignments").select("id,title,status,due_at").eq("organization_id",org).not("status","in",'("completed","complete")').order("due_at",{ascending:true,nullsFirst:false}).limit(20),
    supabase.from("household_members").select("id,display_name,household_role,age_group").eq("organization_id",org).eq("is_active",true).order("display_name"),
    supabase.from("content_items").select("id,title,status,content_type").eq("organization_id",org).neq("status","published").order("updated_at",{ascending:false}).limit(12),
    supabase.from("integration_connections").select("provider,connection_scope,status").eq("organization_id",org),
  ]);

  const tasks=(taskRes.data??[]) as Task[];
  const projects=(projectRes.data??[]) as Project[];
  const needs=(needRes.data??[]) as Need[];
  const assignments=(assignRes.data??[]) as Assignment[];
  const academy=(academyRes.data??[]) as Academy[];
  const members=(memberRes.data??[]) as Member[];
  const drafts=(contentRes.data??[]) as ContentItem[];
  const connections=(connectionRes.data??[]) as Connection[];

  const urgent=[...tasks].sort((a,b)=>{
    const aOver=isPast(a.due_at)?10:0; const bOver=isPast(b.due_at)?10:0;
    return (bOver+priorityScore(b.priority))-(aOver+priorityScore(a.priority));
  }).slice(0,3);
  const websiteProjectIds=projects.filter(p=>/website|domain/i.test(p.name)).map(p=>p.id);
  const websiteTasks=tasks.filter(t=>t.project_id && websiteProjectIds.includes(t.project_id));
  const waiting=tasks.filter(t=>/waiting|blocked/i.test(t.status));
  const parentChecks=assignments.filter(a=>a.parent_check_status && a.parent_check_status!=="pass");
  const dueTasks=tasks.filter(t=>t.due_at).slice(0,5);
  const activeProjects=projects.length;
  const activeConnections=connections.filter(c=>c.status==="active").map(c=>c.provider);
  const dateLabel=new Intl.DateTimeFormat("en-US",{weekday:"long",month:"short",day:"numeric"}).format(new Date());

  const priorityCards = urgent.length ? urgent : [
    {id:"empty-1",title:"No urgent tasks surfaced",description:"The Dashboard will bring new high-priority work forward here.",status:"clear",priority:"normal",due_at:null,project_id:null},
  ];

  return <div className={styles.dash}>
    <header className={styles.topbar}>
      <div className={styles.brand}><div className={styles.crown}>♛</div><div className={styles.brandCopy}><strong>HANDS GIFTED</strong><span>Command Center · Dashboard</span></div></div>
      <div className={styles.search}>⌕ <span>Search the Command Center…</span></div>
      <div className={styles.profile}><div className={styles.profileDot}>S</div><div className={styles.profileText}><strong>Shayla</strong><span>Executive Dashboard</span></div></div>
    </header>

    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.navLabel}>Command</div>
        <Link className={`${styles.navLink} ${styles.navActive}`} href="/command-center/dashboard"><span className={styles.navIcon}>⌂</span>Dashboard</Link>
        <Link className={styles.navLink} href="/command-center"><span className={styles.navIcon}>☀</span>My Day</Link>
        <Link className={styles.navLink} href="/command-center/calendar"><span className={styles.navIcon}>□</span>Calendar</Link>
        <Link className={styles.navLink} href="/command-center/inbox"><span className={styles.navIcon}>✉</span>Inbox</Link>
        <Link className={styles.navLink} href="/command-center/projects"><span className={styles.navIcon}>▣</span>Projects</Link>
        <Link className={styles.navLink} href="/command-center/household"><span className={styles.navIcon}>⌂</span>Family</Link>
        <Link className={styles.navLink} href="/command-center/projects"><span className={styles.navIcon}>◎</span>Website</Link>
        <Link className={styles.navLink} href="/command-center/academy"><span className={styles.navIcon}>◇</span>Academy</Link>
        <Link className={styles.navLink} href="/command-center/resources"><span className={styles.navIcon}>▤</span>Resources</Link>
        <Link className={styles.navLink} href="/command-center/more"><span className={styles.navIcon}>☰</span>More</Link>
        <div className={styles.sidebarQuote}><strong>Purpose Builds Stronger Families</strong><p>“Moreover it is required in stewards, that a man be found faithful.”<br/>1 Corinthians 4:2 KJV</p></div>
      </aside>

      <main className={styles.main}>
        <section className={styles.welcome}>
          <div className={styles.welcomeMain}><h1>Welcome back, Shayla.</h1><p>Your Command Center is watching business, website, family, household, learning, and follow-up work in one place.</p></div>
          <div className={styles.affirmation}><span>{dateLabel}</span><p>Dashboard = awareness. Command Center = action. Public website = community-facing experience.</p></div>
        </section>

        <section className={styles.attention}>
          <div className={styles.sectionHead}><div className={styles.sectionTitle}><strong>♛ What Needs My Attention</strong><span>Highest-value work surfaced from protected Command Center records.</span></div><Link className={styles.sectionLink} href="/command-center">View My Day →</Link></div>
          <div className={styles.priorityGrid}>
            {priorityCards.slice(0,3).map((task,index)=><article key={task.id} className={`${styles.priorityCard} ${index===0?styles.priorityHigh:index===1?styles.priorityMed:styles.priorityLow}`}><div className={styles.priorityLabel}>{index===0?"High priority":index===1?"Next priority":"Watch"}</div><h3>{task.title}</h3><p>{task.description??`${String(task.status).replaceAll("_"," ")} · ${fmtDate(task.due_at)}`}</p><Link href="/command-center">Open →</Link></article>)}
            <article className={styles.captureCard}><div className={styles.captureTop}><div className={styles.capturePlus}>＋</div><div><strong>Quick Capture</strong><br/><span>Add a task, note, idea or reminder.</span></div></div><Link href="/command-center/inbox#capture">Add now</Link></article>
          </div>
        </section>

        <section className={styles.moduleGrid} aria-label="Command Center work areas">
          {modules.map(([icon,title,summary,href])=><Link key={title} className={styles.module} href={href}><div className={styles.moduleIcon}>{icon}</div><strong>{title}</strong><span>{summary}</span></Link>)}
        </section>

        <section className={styles.widgets}>
          <article className={styles.widget}><div className={styles.widgetHead}><strong>★ Today’s Priorities</strong><Link href="/command-center">View all</Link></div>{tasks.slice(0,5).map(t=><div className={styles.listRow} key={t.id}><i className={`${styles.dot} ${t.priority==="urgent"||t.priority==="high"?"":styles.mutedDot}`}></i><span>{t.title}</span><time>{fmtDate(t.due_at)}</time></div>)}{!tasks.length?<div className={styles.empty}>No open tasks surfaced.</div>:null}</article>

          <article className={styles.widget}><div className={styles.widgetHead}><strong>□ Today / Due Soon</strong><Link href="/command-center/calendar">Calendar</Link></div>{dueTasks.map(t=><div className={styles.listRow} key={t.id}><i className={styles.dot}></i><span>{t.title}</span><time>{fmtDate(t.due_at)}</time></div>)}{!dueTasks.length?<div className={styles.empty}>Calendar integration will add real appointments here. Until then, dated Command Center tasks appear in this panel.</div>:null}</article>

          <article className={styles.widget}><div className={styles.widgetHead}><strong>✉ Important Email</strong><Link href="/command-center/inbox">Inbox</Link></div><div className={styles.empty}><strong>Gmail web sync is the next integration layer.</strong><br/>The connected Gmail account can already be worked with through ChatGPT, but the website runtime still needs a secure ingestion/sync path before email can automatically appear here. No messages are being faked.</div></article>

          <article className={styles.widget}><div className={styles.widgetHead}><strong>◎ Website / Developer</strong><Link href="/command-center/projects">Open</Link></div><div className={styles.listRow}><i className={styles.dot}></i><span>Open website tasks</span><time>{websiteTasks.length}</time></div><div className={styles.listRow}><i className={styles.dot}></i><span>Draft content decisions</span><time>{drafts.length}</time></div><div className={styles.listRow}><i className={styles.dot}></i><span>Active projects</span><time>{activeProjects}</time></div><div className={styles.empty}>Website activity should route into Command Center records first; this Dashboard only summarizes what needs your attention.</div></article>
        </section>

        <section className={styles.statusGrid}>
          <article className={styles.statusPanel}><h3>⌂ Household Status</h3><div className={styles.statusChips}><div className={styles.statusChip}><strong>{assignments.length}</strong><span>Assignments</span></div><div className={styles.statusChip}><strong>{parentChecks.length}</strong><span>Checks</span></div><div className={styles.statusChip}><strong>{needs.length}</strong><span>Needs</span></div><div className={styles.statusChip}><strong>{academy.length}</strong><span>Academy</span></div></div></article>
          <article className={styles.statusPanel}><h3>⚡ Quick Actions</h3><div className={styles.quickGrid}><Link className={styles.quick} href="/command-center/inbox#capture">Add Task</Link><Link className={styles.quick} href="/command-center/projects">Projects</Link><Link className={styles.quick} href="/command-center/household">Household</Link><Link className={styles.quick} href="/command-center/academy">Academy</Link><Link className={styles.quick} href="/command-center/content">Content</Link><Link className={styles.quick} href="/command-center/review">Review</Link></div></article>
          <article className={styles.statusPanel}><h3>♟ Family Members</h3><div className={styles.memberRow}>{members.map(member=><div className={styles.member} key={member.id}><div className={styles.avatar}>{member.display_name.slice(0,1).toUpperCase()}</div><strong>{member.display_name}</strong><span>{member.household_role.replaceAll("_"," ")}</span></div>)}</div></article>
        </section>

        <section className={styles.statusGrid} style={{marginTop:8}}>
          <article className={styles.statusPanel}><h3>System Sources</h3><div className={styles.empty}>Live registered sources: {activeConnections.length?activeConnections.join(" · "):"No active integration registry entries surfaced"}. <span className={styles.sourceBadge}>Supabase protected data</span></div></article>
          <article className={styles.statusPanel}><h3>Waiting / Follow-ups</h3><div className={styles.empty}>{waiting.length} task{waiting.length===1?"":"s"} currently marked waiting or blocked. <Link href="/command-center/waiting" style={{color:"#e2c15d"}}>Open queue →</Link></div></article>
          <article className={styles.statusPanel}><h3>Architecture Rule</h3><div className={styles.empty}>Public Website → creates approved signals and requests. Command Center → stores, routes and manages the work. Dashboard → summarizes what you need to know and links you to the next action.</div></article>
        </section>
      </main>
    </div>

    <nav className={styles.mobileNav} aria-label="Dashboard mobile navigation"><Link href="/command-center/dashboard"><b>⌂</b><span>Dashboard</span></Link><Link href="/command-center"><b>☀</b><span>My Day</span></Link><Link href="/command-center/inbox#capture"><b>＋</b><span>Capture</span></Link><Link href="/command-center/calendar"><b>□</b><span>Calendar</span></Link><Link href="/command-center/more"><b>☰</b><span>More</span></Link></nav>
  </div>;
}
