import { NextResponse } from "next/server";
import { getCommandAccess } from "../../command-center/_lib/access";

export const runtime="nodejs";

function outputText(data:any){
  if(typeof data?.output_text==="string") return data.output_text;
  return (data?.output??[]).flatMap((item:any)=>item?.content??[]).filter((part:any)=>part?.type==="output_text").map((part:any)=>part.text).join("\n");
}

export async function POST(request:Request){
  const access=await getCommandAccess();
  if(access.state!=="ready") return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await request.json().catch(()=>null);
  const question=typeof body?.question==="string"?body.question.trim():"";
  if(!question||question.length>8000) return NextResponse.json({error:"Enter a question."},{status:400});
  const key=process.env.OPENAI_API_KEY;
  if(!key) return NextResponse.json({error:"Ask & Learn is built, but the server AI connection still needs its API key configured."},{status:503});
  const response=await fetch("https://api.openai.com/v1/responses",{
    method:"POST",
    headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},
    body:JSON.stringify({
      model:process.env.OPENAI_MODEL||"gpt-5.6-luna",
      store:false,
      instructions:"You are the Hands Gifted Ask & Learn assistant. Give a useful, direct answer. Separate documented facts from interpretation when that distinction matters. Do not pretend a source was checked unless web search actually supplied it. When faith or Scripture is relevant, label faith interpretation separately from factual evidence. Protect private family information. End with 2-4 concise next actions the user could take with the answer.",
      input:question
    })
  });
  const data=await response.json().catch(()=>null);
  if(!response.ok) return NextResponse.json({error:data?.error?.message||"AI response failed."},{status:502});
  return NextResponse.json({answer:outputText(data),responseId:data?.id??null});
}