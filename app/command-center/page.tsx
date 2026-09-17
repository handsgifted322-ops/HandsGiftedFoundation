import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "./_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "./_lib/access";
import styles from "./command-center.module.css";

export const metadata: Metadata={title:"Hands Gifted Command Center",robots:{index:false,follow:false}};

type TaskRow={id:string;title:string;description:string|null;status:string;priority:string|null;due_at:string|null;project_id:string|null};
type NeedRow={id:string;title:string;category:string;status:string;priority:string|null;needed_by:string|null};
type HouseholdRow={id:string;title:string;status:string;parent_check_status:string;assignment_date:string};
type AcademyRow={id:string;title:string;status:string;due_at:string|null};
type ContentRow={id:string;title:string;status:string;content_type:string};
type ProjectRow={id:string;name:string;status:string;priority:string|null;due_at:string|null;initiative_state:string|null};
type AttentionItem={id:string;title:string;reason:string;meta:string;href:string;action:string;severity:"critical"|"attention"|"scheduled"|"neutral";context:"business"|"family"|"personal";score:number};

function isPast(value:string|null){return Boolean(value&&new Date(value).getTime()<Date.now())}
function isSoon(value:string|null,days=3){if(!value)return false;const diff=new Date(value).getTime()-Date.now();return diff>=0&&diff<=days*86400000}
function formatDate(value:string|null){if(!value)return "No date";return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(new Date(value))}
function taskContext(task:TaskRow,projects:ProjectRow[]){const p=projects.find(x=>x.id===task.project_id);const text=`${task.title} ${task.description??""} ${p?.name??""}`.toLowerCase();if(/faith|sabbath|holy|personal|founder|prayer/.test(text))return "personal" as const;if(/family|household|school|child|academy|food|grocery|home/.test(text))return "family" as const;return "business" as const}

export default async function CommandCenterPage({searchParams}:{searchParams:Promise<{context?:string}>}){
  const params=await searchParams; const context=normalizeContext(params.context);
  const access=await getCommandAccess();
  if(access.state!=="ready"){
    const message=accessMessage(access.state);
    return <CommandCenterShell context={context}><section className={styles.access}><h1>{message.title}</h1><p>{message.body}</p><p><Link href="/">Return to Hands Gifted</Link></p></section></CommandCenterShell>
  }
  const supabase=await createSupabaseServerClient();
  const org=access.organizationId;
  const [taskRes,needRes,houseRes,academyRes,contentRes,projectRes]=await Promise.all([
    supabase.from("tasks").select("id,title,description,status,priority,due_at,project_id").eq("organization_id",org).not("status","in",'("completed","complete")').order("due_at",{ascending:true,nullsFirst:false}).limit(18),
    supabase.from("household_needs").select("id,title,category,status,priority,needed_by").eq("organization_id",org).neq("status","resolved").order("needed_by",{ascending:true,nullsFirst:false}).limit(10),
    supabase.from("household_assignments").select("id,title,status,parent_check_status,assignment_date").eq("organization_id",org).neq("parent_check_status","pass").order("assignment_date",{ascending:false}).limit(10),
    supabase.from("academy_assignments").select("id,title,status,due_at").eq("organization_id",org).not("status","in",'("completed","complete")').order("due_at",{ascending:true,nullsFirst:false}).limit(10),
    supabase.from("content_items").select("id,title,status,content_type").eq("organization_id",org).neq("status","published").order("updated_at",{ascending:false}).limit(10),
    supabase.from("projects").select("id,name,status,priority,due_at,initiative_state").eq("organization_id",org).not("status","in",'("completed","complete","archived")').order("updated_at",{ascending:false}).limit(20),
  ]);
  const tasks=(taskRes.data??[]) as TaskRow[]; const needs=(needRes.data??[]) as NeedRow[]; const household=(houseRes.data??[]) as HouseholdRow[]; const academy=(academyRes.data??[]) as AcademyRow[]; const drafts=(contentRes.data??[]) as ContentRow[]; const projects=(projectRes.data??[]) as ProjectRow[];

  const attention:AttentionItem[]=[];
  tasks.forEach(t=>{const c=taskContext(t,projects);const urgent=t.priority==="urgent";const high=t.priority==="high";const overdue=isPast(t.due_at);const dueSoon=isSoon(t.due_at);attention.push({id:`task-${t.id}`,title:t.title,reason:overdue?"Overdue · owner action":urgent?"Urgent task":high&&dueSoon?"High priority · due soon":dueSoon?"Due soon":"Next action",meta:`${c} · ${t.status.replaceAll("_"," ")} · ${formatDate(t.due_at)}`,href:"/command-center/operations",action:overdue||urgent?"Handle":"Open",severity:overdue||urgent?"critical":dueSoon||high?"attention":"neutral",context:c,score:(overdue?100:0)+(urgent?80:0)+(high?35:0)+(dueSoon?25:0)});});
  needs.forEach(n=>attention.push({id:`need-${n.id}`,title:n.title,reason:isPast(n.needed_by)?"Need date passed":n.priority==="urgent"?"Urgent family need":"Family need",meta:`family · ${n.category} · ${formatDate(n.needed_by)}`,href:"/command-center/operations",action:"Review",severity:isPast(n.needed_by)||n.priority==="urgent"?"critical":"attention",context:"family",score:(isPast(n.needed_by)?95:0)+(n.priority==="urgent"?75:n.priority==="high"?35:15)}));
  household.forEach(h=>attention.push({id:`house-${h.id}`,title:h.title,reason:h.parent_check_status!=="pending"?"Parent verification":"Household follow-through",meta:`family · ${h.status.replaceAll("_"," ")} · ${h.parent_check_status.replaceAll("_"," ")}`,href:"/command-center/household",action:"Verify",severity:"scheduled",context:"family",score:h.parent_check_status!=="pending"?55:25}));
  academy.forEach(a=>attention.push({id:`academy-${a.id}`,title:a.title,reason:isPast(a.due_at)?"Academy item overdue":"Learning follow-up",meta:`family · Academy · ${formatDate(a.due_at)}`,href:"/command-center/academy",action:"Review",severity:isPast(a.due_at)?"critical":"scheduled",context:"family",score:isPast(a.due_at)?70:20}));
  drafts.forEach(d=>attention.push({id:`content-${d.id}`,title:d.title,reason:"Content decision",meta:`business · ${d.content_type} · ${d.status}`,href:"/command-center/content",action:"Review",severity:"attention",context:"business",score:40}));

  const filtered=attention.filter(i=>context==="all"||i.context===context).sort((a,b)=>b.score-a.score);
  const top=filtered.slice(0,5);
  const decisions=drafts.length+household.filter(h=>h.parent_check_status!=="pending").length;
  const waiting=tasks.filter(t=>/waiting/i.test(t.status));
  const urgent=filtered.filter(i=>i.severity==="critical").length;
  const dueSoon=filtered.filter(i=>i.severity==="attention").length;
  const activeProjects=projects.filter(p=>context==="all"||context==="business"||(/family|household|academy/i.test(p.name)&&context==="family")||(/faith|personal|sabbath/i.test(p.name)&&context==="personal"));
  const dateLabel=new Intl.DateTimeFormat("en-US",{weekday:"long",month:"short",day:"numeric"}).format(new Date());
  const rightRail=<><div className={styles.detailCard}><h3>Now</h3><p><strong>{urgent}</strong> critical · <strong>{decisions}</strong> decisions · <strong>{waiting.length}</strong> waiting</p></div><div className={styles.detailCard} style={{marginTop:10}}><h3>Operating boundary</h3><p>Private family and business records stay inside the Command Center. Public website release requires a separate explicit approval.</p></div></>;

  return <CommandCenterShell active="today" context={context} rightRail={rightRail}>
    <section className={styles.commandStrip}><div><div className={styles.eyebrow}>{dateLabel}</div><h1>What needs my attention now?</h1><p>{urgent} critical · {decisions} decisions · {waiting.length} follow-ups</p></div><Link href="/command-center/inbox" className={styles.focusButton}>Capture</Link></section>
    <div className={styles.metrics}><div className={styles.metric}><strong>{urgent}</strong><span>Critical</span></div><div className={styles.metric}><strong>{dueSoon}</strong><span>Due / review</span></div><div className={styles.metric}><strong>{decisions}</strong><span>Decisions</span></div><div className={styles.metric}><strong>{waiting.length}</strong><span>Waiting</span></div></div>

    <section className={styles.section}><div className={styles.sectionHeader}><h2>Attention stack</h2><Link href="/command-center/inbox">Open work queue</Link></div>{top.length?top.map(item=><div className={styles.row} key={item.id}><span className={`${styles.severity} ${styles[item.severity]}`}/><div className={styles.rowMain}><div className={styles.rowReason}>{item.reason}</div><div className={styles.rowTitle}>{item.title}</div><div className={styles.rowMeta}><span>{item.meta}</span></div></div><Link className={styles.primaryAction} href={item.href}>{item.action}</Link></div>):<div className={styles.empty}>Nothing is currently being surfaced for this context. Use Capture when something new needs attention.</div>}</section>

    <section className={styles.section}><div className={styles.sectionHeader}><h2>Decisions</h2><Link href="/command-center/approvals">Open approvals</Link></div><div className={styles.summaryGrid}><Link href="/command-center/approvals" className={styles.summaryCard}><strong>{drafts.length}</strong><span>Content reviews</span><p>Private drafts or public-release decisions.</p></Link><Link href="/command-center/household" className={styles.summaryCard}><strong>{household.length}</strong><span>Parent checks</span><p>Completion or correction decisions.</p></Link><Link href="/command-center/projects" className={styles.summaryCard}><strong>{activeProjects.length}</strong><span>Active projects</span><p>Outcomes that may need direction.</p></Link></div></section>

    <section className={styles.section}><div className={styles.sectionHeader}><h2>Waiting & blockers</h2><Link href="/command-center/waiting">View all</Link></div>{waiting.slice(0,3).length?waiting.slice(0,3).map(t=><div className={styles.row} key={t.id}><span className={`${styles.severity} ${styles.neutral}`}/><div className={styles.rowMain}><div className={styles.rowReason}>Waiting</div><div className={styles.rowTitle}>{t.title}</div><div className={styles.rowMeta}><span>{t.priority??"normal"}</span><span>{formatDate(t.due_at)}</span></div></div><Link className={`${styles.primaryAction} ${styles.secondaryAction}`} href="/command-center/waiting">Follow up</Link></div>):<div className={styles.empty}>No waiting tasks are currently surfaced.</div>}</section>

    <section className={styles.section}><div className={styles.sectionHeader}><h2>Projects at a glance</h2><Link href="/command-center/projects">All projects</Link></div>{activeProjects.slice(0,4).map(p=><div className={styles.row} key={p.id}><span className={`${styles.severity} ${p.priority==="urgent"?styles.critical:p.priority==="high"?styles.attention:styles.neutral}`}/><div className={styles.rowMain}><div className={styles.rowReason}>{p.initiative_state??"Project"}</div><div className={styles.rowTitle}>{p.name}</div><div className={styles.rowMeta}><span>{p.status.replaceAll("_"," ")}</span><span>{formatDate(p.due_at)}</span></div></div><Link className={`${styles.primaryAction} ${styles.secondaryAction}`} href="/command-center/projects">Open</Link></div>)}</section>

    <section className={styles.section}><div className={styles.sectionHeader}><h2>Close the day</h2><Link href="/command-center/review">Weekly review</Link></div><div className={styles.empty}>Before you stop: clear urgent items, update anything you are waiting on, and move unfinished work to a clear next action. The Command Center should end the day with fewer loose ends—not more tabs.</div></section>
  </CommandCenterShell>
}
