"use client";
import { FormEvent, useState } from "react";
import { saveAskLearnConversation } from "../actions";
import styles from "./ask.module.css";

type Turn={role:"user"|"assistant";content:string};

export default function AskLearnClient(){
 const [question,setQuestion]=useState(""); const [turns,setTurns]=useState<Turn[]>([]); const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const [saved,setSaved]=useState(false); const [saving,setSaving]=useState(false);
 async function submit(e:FormEvent){e.preventDefault(); const next=question.trim(); if(!next)return; setLoading(true);setError("");setSaved(false);
  try{const r=await fetch("/api/ask-learn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:next,history:turns})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not get an answer.");const answer=d.answer||"No answer returned.";setTurns(t=>[...t,{role:"user",content:next},{role:"assistant",content:answer}]);setQuestion("");}
  catch(err){setError(err instanceof Error?err.message:"Could not get an answer.");}finally{setLoading(false)}
 }
 async function save(){if(!turns.length)return;setSaving(true);setError("");const first=turns.find(t=>t.role==="user")?.content||"Ask & Learn conversation";const result=await saveAskLearnConversation({title:first.slice(0,100),turns});setSaving(false);if(result?.ok)setSaved(true);else setError("The conversation could not be saved.");}
 return <div className={styles.ask}>
  {turns.length>0&&<section className={styles.answer}><span>CONVERSATION</span>{turns.map((turn,i)=><div key={i} className={styles.turn}><strong>{turn.role==="user"?"YOU":"HANDS GIFTED"}</strong><div>{turn.content}</div></div>)}</section>}
  <form onSubmit={submit} className={styles.form}><label htmlFor="hg-question">{turns.length?"Ask a follow-up":"What do you want to know?"}</label><textarea id="hg-question" value={question} onChange={e=>setQuestion(e.target.value)} rows={5} maxLength={8000} placeholder={turns.length?"Continue this conversation...":"Ask a real question. Hands Gifted will respond here, then you can decide what is worth saving or developing."}/><button disabled={loading||!question.trim()}>{loading?"Thinking…":turns.length?"Continue conversation":"Ask Hands Gifted"}</button></form>
  {error&&<div className={styles.error}><strong>Needs attention</strong><p>{error}</p></div>}
  {turns.length>0&&<nav className={styles.tools}><button type="button" onClick={save} disabled={saving||saved}>{saving?"Saving…":saved?"Saved to My Hands Gifted":"Save conversation"}</button><a href="/command-center/workspace">Open My Hands Gifted</a><button type="button" onClick={()=>{setTurns([]);setQuestion("");setSaved(false);}}>Start a new question</button></nav>}
 </div>
}