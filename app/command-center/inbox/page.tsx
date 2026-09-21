import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import { captureWork } from "../actions";
import styles from "../command-center.module.css";

type Row={id:string;title:string;status:string;priority:string|null;due_at:string|null;created_at:string};
const fieldStyle={width:"100%",minHeight:42,border:"1px solid #cec7d0",borderRadius:10,padding:"9px 10px",background:"#fff",color:"#28222b"} as const;

export default async function InboxPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="inbox" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient();
 const {data}=await supabase.from("tasks").select("id,title,status,priority,due_at,created_at").eq("organization_id",access.organizationId).not("status","in",'("complete","completed","archived")').order("created_at",{ascending:false}).limit(30);
 const rows=(data??[]) as Row[];
 return <CommandCenterShell active="inbox" context={context}>
  <div className={styles.pageTitle}><div className={styles.eyebrow}>Capture → classify → route → execute</div><h1>Inbox & Triage</h1><p>Capture the item once and immediately give the system enough context to put it in the right operational lane.</p></div>
  <form id="capture" action={captureWork} className={styles.capturePanel}>
    <label htmlFor="capture-title">What needs attention?</label>
    <textarea id="capture-title" name="title" required maxLength={240} placeholder="Example: Confirm rent payment posted and save the receipt."/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginTop:12}}>
      <label>Area<select name="area" defaultValue="general" style={fieldStyle}>
        <option value="general">General / triage</option><option value="household_operations">Household operations</option><option value="children_school">Children & school</option><option value="family_calendar">Family calendar</option><option value="housing_stability">Housing & stability</option><option value="transportation_work">Transportation & work</option><option value="assistance_case_management">Assistance / case management</option><option value="faith_family_rhythm">Faith & family rhythm</option><option value="family_academy">Family Academy</option><option value="hands_gifted_ceo">Hands Gifted CEO</option><option value="projects_rd">Projects / R&D</option><option value="private_owner_records">Private owner records</option><option value="sop_routines">SOP & routines</option><option value="waiting_followup">Waiting / follow-up</option><option value="approvals">Approvals</option><option value="system_health">System health</option>
      </select></label>
      <label>Privacy<select name="privacy" defaultValue="private" style={fieldStyle}><option value="internal">Internal</option><option value="private">Private</option><option value="owner_only">Owner only</option></select></label>
      <label>Priority<select name="priority" defaultValue="normal" style={fieldStyle}><option value="low">Low</option><option value="normal">Normal</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></label>
      <label>Due date<input name="due_at" type="date" style={fieldStyle}/></label>
    </div>
    <div className={styles.buttonRow}><button className={styles.button} type="submit">Save & Route</button><button className={styles.button+" "+styles.buttonSecondary} type="reset">Clear</button></div>
  </form>
  <section className={styles.section} style={{marginTop:14}}><div className={styles.sectionHeader}><h2>Open work</h2><span className={styles.count}>{rows.length}</span></div>{rows.length?rows.map(r=><div className={styles.row} key={r.id}><span className={styles.severity+" "+(r.priority==="urgent"?styles.critical:r.priority==="high"?styles.attention:styles.neutral)}/><div className={styles.rowMain}><div className={styles.rowReason}>{r.status.replaceAll("_"," ")}</div><div className={styles.rowTitle}>{r.title}</div><div className={styles.rowMeta}><span>{r.priority??"normal"}</span><span>{r.due_at?new Date(r.due_at).toLocaleDateString():"Needs routing"}</span></div></div><a className={styles.primaryAction+" "+styles.secondaryAction} href="/command-center/operations">Triage</a></div>):<div className={styles.empty}>Inbox clear. New captures will appear here.</div>}</section>
 </CommandCenterShell>
}
