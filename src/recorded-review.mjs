import recorded from '../evidence/provider-acceptance.json' with {type:'json'};
import {Input,validateReport} from '../lib/contracts.mjs';
export function recordedReview(){
 if(recorded.state!=='accepted'||recorded.evidence.inference!==true)throw new Error('RECORDED_EVIDENCE_UNAVAILABLE');
 const input=Input.parse(structuredClone(recorded.input));
 return {input,report:validateReport(structuredClone(recorded.report),input),evidence:structuredClone(recorded.evidence),recorded:true};
}
export function handoffMarkdown(input,result){
 const text=value=>value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/[\\`*_{}\[\]()#+.!|~]/g,'\\$&');
 const cite=item=>item.citations.map(c=>{const fence='`'.repeat(Math.max(3,...(c.quote.match(/`+/g)||[]).map(s=>s.length+1)));return `[${c.sourceId}:${c.line}]\n${fence}text\n${c.quote}\n${fence}`;}).join('\n');
 const section=(name,items)=>`## ${name}\n\n`+items.map(item=>`${item.timestamp?item.timestamp+" · ":""}${text(item.statement)}\n${cite(item)}`).join('\n\n');
 return [`# ${text(input.title)}`,result.recorded?'Recorded Nebius response — no new request.':result.evidence.inference?'Nebius response — human review required.':'Offline fixture — no AI inference.',`Root cause: UNKNOWN. This is a draft for human review, not authorization to change production.`,text(result.report.summary),section('Timeline',result.report.timeline),section('Candidate explanations — not confirmed',result.report.hypotheses),section('Read-only next checks',result.report.checks),`## Still unknown\n\n${result.report.unknowns.map(u=>'- '+text(u)).join('\n')}`,`Exact quotes establish attribution, not source authenticity or causal entailment.`].join('\n\n');
}
