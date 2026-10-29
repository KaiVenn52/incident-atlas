import {readFile,writeFile,mkdir,open} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {prepareAcceptance,executeAcceptance} from '../lib/live-acceptance.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const args=process.argv.slice(2);
let dispatchReserved=false;
try{
 const execute=args.includes('--execute');
 const valid=execute?args.length===3&&args[0]==='--execute'&&args[1]==='--approval':args.length===0;
 if(!valid)throw new Error('Usage: npm run acceptance OR npm run acceptance -- --execute --approval acceptance-approval.local.json');
 const input=JSON.parse(await readFile(resolve(root,'fixtures/acceptance-input.json'),'utf8'));
 const prepared=prepareAcceptance(input);const dir=resolve(root,'evidence/acceptance');await mkdir(dir,{recursive:true});
 await writeFile(resolve(dir,'preflight.json'),JSON.stringify(prepared.plan,null,2));
 await writeFile(resolve(dir,'request.json'),JSON.stringify(prepared.request,null,2));
 if(!execute){console.log(JSON.stringify({mode:'LOCAL_PREFLIGHT_ONLY',networkCalls:0,plan:prepared.plan,next:'Review submission/LIVE-ACCEPTANCE.md. Do not execute without owner-approved credentials, credit/billing review and a matching local approval file.'},null,2));}
 else{
  const approval=JSON.parse(await readFile(resolve(root,args[2]),'utf8'));
  const record=await executeAcceptance(prepared,approval,{enabled:process.env.NEBIUS_LIVE_ENABLED==='true',key:process.env.NEBIUS_API_KEY,
   reserve:async value=>{let file;try{file=await open(resolve(dir,'live-attempt.lock'),'wx',0o600);await file.writeFile(JSON.stringify(value,null,2));await file.sync();dispatchReserved=true;}catch(e){if(e.code==='EEXIST')throw new Error('PREVIOUS_ATTEMPT_EXISTS_RECONCILE_BEFORE_RETRY');throw e;}finally{await file?.close();}},
   persist:async value=>{await writeFile(resolve(dir,'live-result.json'),JSON.stringify(value,null,2),{mode:0o600});}
  });
  console.log(JSON.stringify({state:record.state,error:record.error??null,manualReviewRequired:true,resultPath:'evidence/acceptance/live-result.json',automaticRetries:0},null,2));
  if(record.state!=='accepted')process.exitCode=2;
 }
}catch(error){const code=/^[A-Z0-9_]+$/.test(error.message)?error.message:'ACCEPTANCE_PREFLIGHT_FAILED';console.error(JSON.stringify({state:dispatchReserved?'failed-or-unknown':'not-dispatched',error:code,networkCalls:dispatchReserved?'unknown':0,help:'Review submission/LIVE-ACCEPTANCE.md; no key values or raw diagnostics are logged.'}));process.exitCode=1;}
