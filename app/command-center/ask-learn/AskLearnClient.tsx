"use client";
import { FormEvent, useState } from "react";
import styles from "./ask.module.css";

export default function AskLearnClient(){
 const [question,setQuestion]=useState(""); const [answer,setAnswer]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
 async function submit(e:FormEvent){e.preventDefault(); if(!question.trim())return; setLoading(true);setError("");setAnswer("");
  try{const r=await fetch("/api/ask-learn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not get an answer.");setAnswer(d.answer||"No answer returned.");}
  catch(err){setError(err instanceof Error?err.message:"Could not get an answer.");}finally{setLoading(false)}
 }
 return <div className={styles.ask}>
  <form onSubmit={submit} className={styles.form}><label htmlFor="hg-question">What do you want to know?</label><textarea id="hg-question" value={question} onChange={e=>setQuestion(e.target.value)} rows={5} maxLength={8000} placeholder="Ask a real question. Hands Gifted will respond here, then you can decide what is worth saving or developing."/><button disabled={loading||!question.trim()}>{loading?"Thinking…":"Ask Hands Gifted"}</button></form>
  {error&&<div className={styles.error}><strong>Connection needed</strong><p>{error}</p></div>}
  {answer&&<section className={styles.answer}><span>RESPONSE</span><div>{answer}</div><nav><button type="button" onClick={()=>setQuestion(q=>q+"\n\nFollow-up: ")}>Ask a follow-up</button><a href="/command-center/workspace">Save / develop in workspace</a></nav></section>}
 </div>
}