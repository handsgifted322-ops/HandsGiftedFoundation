import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { accessMessage, getCommandAccess } from "../_lib/access";
import { CommandCenterShell } from "../_components/CommandCenterShell";
import styles from "./workspace.module.css";
import { captureWorkspaceItem } from "../actions";

export const metadata:Metadata={title:"My Hands Gifted | Workspace",robots:{index:false,follow:false}};

type CountRow={count:number|null};
const actions=[
 ["Ask & Learn","Start with a question. Research, guidance and useful knowledge belong here.","/v2-preview/research"],
 ["Add My Work","Capture an idea, design, image concept, completed work, evidence or next step.","/command-center/inbox#capture"],
 ["Continue My Work","Reopen active projects instead of starting over.","/command-center/projects"],
 ["Develop Me","Wife · Mother · Daughter of Sarah — three roles, one development record.","/command-center/private-records"],
 ["Family & Academy","Parent-directed family learning, projects, skills and household development.","/command-center/academy"],
 ["Prepare to Share","Review appropriate work before it becomes public content, a product, service or program.","/command-center/approvals"],
] as const;

export default async function WorkspacePage(){
 const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <div className={styles.access}><h1>{m.title}</h1><p>{m.body}</p><Link href="/">Return to Hands Gifted</Link></div>}
 const supabase=await createSupabaseServerClient(); const org=access.organizationId;
 const [projects,tasks,evidence,knowledge,academy]=await Promise.all([
  supabase.from("projects").select("*",{count:"exact",head:true}).eq("organization_id",org).not("status","in",'("completed","complete","archived")'),
  supabase.from("tasks").select("*",{count:"exact",head:true}).eq("organization_id",org).not("status","in",'("completed","complete")'),
  supabase.from("source_artifacts").select("*",{count:"exact",head:true}).eq("organization_id",org),
  supabase.from("operating_knowledge").select("*",{count:"exact",head:true}).eq("organization_id",org),
  supabase.from("academy_assignments").select("*",{count:"exact",head:true}).eq("organization_id",org).not("status","in",'("completed","complete")')
 ]);
 const stats=[["Active projects",projects.count??0],["Open actions",tasks.count??0],["Evidence",evidence.count??0],["Knowledge",knowledge.count??0],["Academy work",academy.count??0]];
 return <CommandCenterShell active="dashboard" context="personal">
  <div className={styles.wrap}>
   <section className={styles.hero}><span className={styles.eyebrow}>MY HANDS GIFTED</span><h1>What are we developing today?</h1><p>One place to learn, create, develop, document the work, support the family, and prepare the right things to share.</p>
    <div className={styles.quick}><Link href="/v2-preview/research">Ask a question</Link><Link href="/command-center/inbox#capture">Add something</Link><Link href="/command-center/projects">Continue work</Link></div>
   </section>
   <section className={styles.captureBox}><div><span className={styles.eyebrowDark}>CAPTURE ONCE</span><h2>Bring the work here.</h2><p>Question, idea, design, research note, completed work or evidence. Start with what you have; organize it after capture.</p></div><form action={captureWorkspaceItem} className={styles.captureForm}><input name="title" required maxLength={240} placeholder="What are you working on?" /><textarea name="notes" maxLength={12000} rows={4} placeholder="Add the question, idea, notes, context, or what you completed..." /><div className={styles.formRow}><select name="kind" defaultValue="idea"><option value="question">Question</option><option value="idea">Idea</option><option value="work">Work in progress</option><option value="research">Research</option><option value="design">Design / creation</option><option value="evidence">Completed work / evidence</option></select><button type="submit">Save to My Hands Gifted</button></div><fieldset><legend>Connect to my development when relevant</legend><label><input type="checkbox" name="role" value="wife" /> Wife</label><label><input type="checkbox" name="role" value="mother" /> Mother</label><label><input type="checkbox" name="role" value="daughter_of_sarah" /> Daughter of Sarah</label></fieldset></form></section>
   <section className={styles.stats}>{stats.map(([label,value])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>
   <section><div className={styles.heading}><div><span>WORKBENCH</span><h2>Start with what you are actually doing.</h2></div><p>You do not need to choose a database or department first.</p></div>
    <div className={styles.grid}>{actions.map(([title,desc,href])=><Link className={styles.card} href={href} key={title}><span className={styles.arrow}>↗</span><h3>{title}</h3><p>{desc}</p></Link>)}</div>
   </section>
   <section className={styles.roles}><div><span>DEVELOP ME</span><h2>Three roles. One person.</h2><p>Your roles organize personal development; they are not three separate websites or copies of your work.</p></div><div className={styles.roleGrid}><div><b>Wife</b><small>Marriage · communication · household partnership · growth</small></div><div><b>Mother</b><small>Parent direction · children · teaching · family development</small></div><div><b>Daughter of Sarah</b><small>Faith · character · study · womanhood · practical development</small></div></div></section>
   <section className={styles.flow}><span>HOW WORK MOVES</span><h2>Question → Knowledge → Practice → Project → Evidence → Appropriate output</h2><p>Not every item has to complete every step. Public release remains intentional and reviewed.</p></section>
  </div>
 </CommandCenterShell>
}