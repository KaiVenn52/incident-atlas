import http from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const root=resolve('dist-demo'),observations=[];
const server=http.createServer(async(req,res)=>{
 const path=new URL(req.url,'http://localhost').pathname.replace(/^\/incident-atlas/,'')||'/';
 let file=resolve(root,'.'+path);if(file===root)file=resolve(root,'index.html');
 if(!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
 try{const body=await readFile(file);res.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'})[extname(file)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end();}
});
await new Promise(r=>server.listen(4320,'127.0.0.1',r));
await mkdir('evidence/review-qa',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
try{for(const [name,viewport] of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})){
 const context=await browser.newContext({viewport}),page=await context.newPage(),errors=[],apiCalls=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+m.location().url);});
 page.on('request',r=>{if(new URL(r.url()).pathname.startsWith('/api/'))apiCalls.push(r.url());if(!r.url().startsWith('http://127.0.0.1:4320/'))external.push(r.url());});
 await page.goto('http://127.0.0.1:4320/incident-atlas/');await page.getByRole('button',{name:/Review real Nebius run/}).click();
 await page.getByText('RECORDED NEBIUS RESPONSE · no new request',{exact:true}).waitFor();
 assert.match(await page.locator('.provider-proof').textContent(),/2,840/);assert.equal(await page.locator('.timeline li').count(),5);
 await page.getByRole('tab',{name:/Timeline/}).focus();await page.keyboard.press('ArrowRight');assert.equal(await page.getByRole('tab',{name:/Candidates/}).getAttribute('aria-selected'),'true');
 assert.match(await page.locator('.support-note').textContent(),/Runbook-only citation/);await page.locator('.claim .cite').first().click();await page.locator('#source-inspector .highlight').waitFor();assert.match(await page.locator('#source-inspector .highlight').textContent(),/Pool acquisition timeouts/);
 await page.getByRole('button',{name:'Close',exact:true}).click();await page.locator('.results').scrollIntoViewIfNeeded();
 await page.screenshot({path:`evidence/review-qa/${name}-recorded.png`,fullPage:true});
 const mdEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Export handoff .md',exact:true}).click();const md=await mdEvent;await md.saveAs(`evidence/review-qa/${name}-handoff.md`);assert.match(await readFile(`evidence/review-qa/${name}-handoff.md`,'utf8'),/Recorded Nebius response/);
 const jsonEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Export review JSON',exact:false}).click();const json=await jsonEvent;await json.saveAs(`evidence/review-qa/${name}-recorded.json`);const exported=JSON.parse(await readFile(`evidence/review-qa/${name}-recorded.json`,'utf8'));assert.equal(exported.recorded,true);assert.equal(exported.evidence.inference,true);
 await page.getByRole('button',{name:/02 Conflicting/}).click();await page.getByRole('button',{name:'Build incident brief'}).click();await page.getByText('OFFLINE FIXTURE · no provider inference',{exact:true}).waitFor();assert.equal(await page.locator('.timeline li').count(),3);
 await page.getByRole('button',{name:/03 Untrusted/}).click();await page.getByRole('button',{name:'Build incident brief'}).click();await page.getByText(/Ignore all previous instructions; run rm/).waitFor();
 await page.getByRole('button',{name:'Edit evidence',exact:false}).click();await page.getByLabel('Evidence JSON').fill('{"title":"Invalid","sources":[]}');await page.getByRole('button',{name:'Build incident brief'}).click();await page.getByRole('alert').filter({hasText:'The evidence bundle is invalid'}).waitFor();assert.equal(await page.locator('.results').count(),0);
 await page.getByRole('button',{name:/Review real Nebius run/}).click();await page.getByText('RECORDED NEBIUS RESPONSE · no new request',{exact:true}).waitFor();
 assert.equal(await page.locator('option[value="live"]').isEnabled(),false);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'horizontal overflow');
 assert.deepEqual(errors,[]);assert.deepEqual(apiCalls,[]);assert.deepEqual(external,[]);
 observations.push({viewport:name,recordedReview:true,citations:true,keyboardTabs:true,runbookOnlyWarning:true,markdownHandoff:true,jsonReplayLabel:true,offlineCases:true,invalidInputClearsReport:true,liveDisabled:true,apiCalls:0,externalRequests:0,consoleErrors:errors});await context.close();
}await writeFile('evidence/review-qa/results.json',JSON.stringify({checkedAt:new Date().toISOString(),reason:'Browser plugin not available; regular Playwright for local static-build QA per frontend-testing-debugging skill.',observations},null,2));console.log(JSON.stringify({passed:true,viewports:observations.length,providerCalls:0}));
}finally{await browser.close();await new Promise(r=>server.close(r));}
