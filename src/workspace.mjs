export const staticDemo=import.meta.env?.VITE_STATIC_DEMO==='true';
export async function loadWorkspace(signal){
 if(staticDemo){const {scenarios}=await import('../lib/fixtures.mjs');return {items:scenarios,status:{liveReady:false}};}
 const responses=await Promise.all([fetch('/api/scenarios',{signal}),fetch('/api/status',{signal})]);
 if(responses.some(r=>!r.ok))throw new Error('WORKSPACE_UNAVAILABLE');
 const [items,status]=await Promise.all(responses.map(r=>r.json()));return {items,status};
}
export async function analyzeBundle(input,mode,signal){
 if(staticDemo){
  if(mode!=='fixture')throw new Error('LIVE_NOT_CONFIGURED');
  const [{Input,validateReport},{fixtureReport}]=await Promise.all([import('../lib/contracts.mjs'),import('../lib/fixtures.mjs')]);
  try{const parsed=Input.parse(input);return {report:validateReport(fixtureReport(parsed),parsed),evidence:{provider:'Offline fixture',inference:false,validated:true,receivedAt:new Date().toISOString()}};}catch{throw new Error('INVALID_EVIDENCE');}
 }
 const response=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode,input}),signal});
 const data=await response.json();if(!response.ok)throw new Error(data.error||'ANALYSIS_FAILED');return data;
}
