import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

type ContextRow={id:string;area:string;title:string;summary:string|null;maturity:string|null;confidentiality:string|null;approval_status:string|null;updated_at:string};

export default async function PrivateRecordsPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context);
 const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="private-records" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 if(access.role!=="owner") return <CommandCenterShell active="private-records" context={context}><section className={styles.access}><h1>Owner access required</h1><p>Private Owner Records are intentionally separated from staff and ordinary administrative access.</p></section></CommandCenterShell>;
 const supabase=await createSupabaseServerClient();
 const {data}=await supabase.from("project_context_entries").select("id,area,title,summary,maturity,confidentiality,approval_status,updated_at").eq("organization_id",access.organizationId).in("confidentiality",["private","owner_only"]).order("updated_at",{ascending:false}).limit(60);
 const rows=(data??[]) as ContextRow[];
 return <CommandCenterShell active="private-records" context={context}>
  <div className={styles.pageTitle}><div className={styles.eyebrow}>Owner-only boundary</div><h1>Private Owner Records</h1><p>Confidential context is separated from public Hands Gifted content, ordinary family operations and staff-accessible administration.</p></div>
  <div className={styles.notice}><strong>Privacy rule</strong><p>This surface is owner-only. Operational actions should be separated from private narrative whenever possible—for example, a private journal note can create a separate rent-verification task without exposing the journal itself.</p></div>
  <section className={styles.section}><div className={styles.sectionHeader}><h2>Private context register</h2><span className={styles.count}>{rows.length}</span></div>
   {rows.length?rows.map(r=><div className={styles.row} key={r.id}><span className={styles.severity+" "+styles.neutral}/><div className={styles.rowMain}><div className={styles.rowReason}>{r.area.replaceAll("_"," ")} · {r.confidentiality}</div><div className={styles.rowTitle}>{r.title}</div><div className={styles.rowMeta}><span>{r.maturity??"record"}</span><span>{r.approval_status??"private"}</span></div></div></div>):<div className={styles.empty}>No owner-only/private context records have been routed here yet.</div>}
  </section>
 </CommandCenterShell>
}
