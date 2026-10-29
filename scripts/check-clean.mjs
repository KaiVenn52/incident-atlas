import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const target=resolve('deliverables/clean-check');
const digest=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
const runtime=['package.json','package-lock.json','server.mjs','index.html','src/main.jsx','src/style.css','lib/contracts.mjs','lib/fixtures.mjs','lib/provider.mjs','lib/rate-limit.mjs','lib/live-acceptance.mjs','scripts/live-acceptance.mjs','fixtures/acceptance-input.json'];
for(const file of runtime)assert.equal(await digest(resolve(target,file)),await digest(resolve(file)),`Runtime source mismatch: ${file}`);
const commands={};
for(const [name,command] of [['install','npm.cmd ci --offline --cache .npm-cache'],['tests','npm.cmd test'],['build','npm.cmd run build']]){
 const run=spawnSync(process.env.ComSpec||'cmd.exe',['/d','/s','/c',command],{cwd:target,encoding:'utf8'});
 await writeFile(`evidence/clean-${name}.txt`,(run.stdout||'')+(run.stderr||''));
 assert.equal(run.status,0,`${name} failed: ${run.stderr}`);commands[name]={command,exitCode:run.status};
 if(name==='tests'){const passed=run.stdout.match(/pass (\d+)/),failed=run.stdout.match(/fail (\d+)/);assert.ok(passed&&failed);commands[name].passed=Number(passed[1]);commands[name].failed=Number(failed[1]);}
}
const {server}=await import(pathToFileURL(resolve(target,'server.mjs')));
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let result;
try{const base='http://127.0.0.1:'+server.address().port;const page=await fetch(base);assert.equal(page.status,200);const html=await page.text();assert.match(html,/IncidentAtlas/);const js=html.match(/src="([^\"]+\.js)"/)[1];assert.equal((await fetch(base+js)).status,200);const status=await(await fetch(base+'/api/status')).json();assert.equal(status.liveReady,false);const scenarios=await(await fetch(base+'/api/scenarios')).json();const r=await fetch(base+'/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'fixture',input:{title:scenarios[0].title,sources:scenarios[0].sources}})});assert.equal(r.status,200);assert.equal((await r.json()).evidence.inference,false);result={checkedAt:new Date().toISOString(),source:'ZIP extracted to deliverables/clean-check',runtimeFilesMatch:runtime.length,...commands,smoke:{html:200,js:200,fixture:200,liveReady:false},providerInference:false};}finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
await writeFile('evidence/clean-package.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
