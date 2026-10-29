import {z} from 'zod';
const text=z.string().trim().min(1).max(4000);
export const Input=z.object({title:z.string().trim().min(1).max(160),sources:z.array(z.object({id:z.string().regex(/^[a-zA-Z0-9_-]{1,40}$/),name:z.string().min(1).max(120),kind:z.enum(['log','change','runbook']),lines:z.array(z.string().min(1).max(2000)).min(1).max(200)})).min(1).max(12)}).strict().superRefine((v,c)=>{if(new Set(v.sources.map(s=>s.id)).size!==v.sources.length)c.addIssue({code:'custom',message:'Source IDs must be unique'});if(JSON.stringify(v).length>80000)c.addIssue({code:'custom',message:'Evidence exceeds 80,000 characters'});});
const citation=z.object({sourceId:z.string(),line:z.number().int().positive(),quote:text}).strict();
const claim={statement:text,citations:z.array(citation).min(1).max(8)};
export const Report=z.object({summary:text,rootCause:z.literal('unknown'),timeline:z.array(z.object({...claim,timestamp:z.string().datetime()}).strict()).max(80),hypotheses:z.array(z.object({...claim,status:z.literal('candidate')}).strict()).max(10),checks:z.array(z.object(claim).strict()).max(12),unknowns:z.array(text).min(1).max(16)}).strict();
export function validateReport(value,input){
 const report=Report.parse(value);
 for(const item of [...report.timeline,...report.hypotheses,...report.checks])for(const c of item.citations){
  const source=input.sources.find(s=>s.id===c.sourceId);
  if(!source||!source.lines[c.line-1]||!source.lines[c.line-1].includes(c.quote))throw new Error('Citation rejected: missing source, line, or verbatim quote');
 }
 for(const item of report.timeline)if(!item.citations.some(c=>input.sources.find(s=>s.id===c.sourceId).lines[c.line-1].includes(item.timestamp)))throw new Error('Timeline timestamp is not present in its cited line');
 // All actions are inert review text. Reject obvious shell instructions even when a model copies an injected payload.
 if(report.checks.some(c=>/\b(curl|wget|sudo|bash|powershell|rm\s+-|kubectl|exec\(|eval\()|https?:\/\//i.test(c.statement)))throw new Error('Executable or external action rejected');
 report.timeline.sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
 return report;
}
export const schemaHint={summary:'Short neutral incident summary. Do not assert a root cause.',rootCause:'unknown',timeline:[{timestamp:'ISO 8601 UTC timestamp copied from cited line',statement:'Observed event',citations:[{sourceId:'exact id',line:1,quote:'verbatim substring from that line'}]}],hypotheses:[{statement:'Conditional candidate explanation, not a confirmed cause',status:'candidate',citations:[{sourceId:'exact id',line:1,quote:'verbatim substring'}]}],checks:[{statement:'Read-only inspection suggestion grounded in the supplied runbook; no commands or URLs',citations:[{sourceId:'exact id',line:1,quote:'verbatim substring'}]}],unknowns:['Missing evidence and uncertainties']};
