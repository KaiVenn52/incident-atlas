import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const submission=true;
const output=submission?'IncidentAtlas-competition-demo.mp4':'IncidentAtlas-local-demo.mp4';
const subtitle=submission?'competition-demo.srt':'demo.srt';
const raw=submission?'evidence/demo-raw/competition-demo.webm':'evidence/demo.webm';
const status=await fetch('http://127.0.0.1:4318/api/status').then(r=>r.json());
if(status.liveReady)throw new Error('Recording requires live inference to remain disabled');
await mkdir('evidence/demo-raw',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1280,height:900},recordVideo:{dir:'evidence/demo-raw',size:{width:1280,height:900}}});
const page=await context.newPage();const start=Date.now();const captions=[];
function timestamp(ms){const n=Math.max(0,Math.floor(ms));return `${String(Math.floor(n/3600000)).padStart(2,'0')}:${String(Math.floor(n/60000)%60).padStart(2,'0')}:${String(Math.floor(n/1000)%60).padStart(2,'0')},${String(n%1000).padStart(3,'0')}`;}
async function shot(text,action,hold=7000){const begin=Date.now()-start;await action();await page.waitForTimeout(hold);captions.push({begin,end:Date.now()-start,text});}
try{
 await page.goto('http://127.0.0.1:4318');await page.getByRole('button',{name:'Build incident brief'}).waitFor();
 await shot('The dashboard says recovered. Another region still fails.\nIncidentAtlas keeps both facts visible.',async()=>{await page.getByRole('button',{name:/02 Conflicting/}).click();await page.getByRole('button',{name:'Build incident brief'}).click();await page.locator('.timeline li').first().waitFor();await page.locator('.results').scrollIntoViewIfNeeded();},8500);
 await shot('A recovery announcement is a source, not a verdict.\nFollow each claim back to the exact original line.',async()=>{await page.locator('.timeline .cite').last().click();await page.locator('#source-inspector .highlight').waitFor();await page.locator('#source-inspector').scrollIntoViewIfNeeded();},8000);
 await shot('A deployment changed the pool size from 40 to 4.\nThat is a candidate explanation. The root cause stays unknown.',async()=>{await page.getByRole('button',{name:/01 Checkout/}).click();await page.getByRole('button',{name:'Build incident brief'}).click();await page.locator('.timeline li').first().waitFor();await page.getByRole('tab',{name:/Candidates/}).click();await page.locator('.results').scrollIntoViewIfNeeded();},8500);
 await shot('Suggestions are read-only. No shell, deployment or remediation tool.\nThe incident commander decides the next action.',async()=>{await page.getByRole('tab',{name:/Next checks/}).click();},7000);
 await shot('Now inspect an actual saved Nebius + NVIDIA Nemotron response.\nFictional input, real inference on October 29. No new request here.',async()=>{await page.getByRole('button',{name:'Review real Nebius run ↗'}).click();await page.locator('.provider-proof').waitFor();await page.locator('.results').scrollIntoViewIfNeeded();},9000);
 await shot('The real run took 10.37s: 582 input and 2,840 output tokens.\nThese numbers come from the accepted provider receipt.',async()=>{},7000);
 await shot('Exact citations prove attribution, not causation.\nThis candidate cites a generic runbook. Human review still matters.',async()=>{await page.getByRole('tab',{name:/Candidates/}).click();await page.locator('.claim .cite').first().click();await page.locator('#source-inspector .highlight').waitFor();await page.locator('#source-inspector').scrollIntoViewIfNeeded();},9500);
 await shot('Export a handoff with source quotes and open questions.\nThe evidence and uncertainty travel with the incident.',async()=>{await page.getByRole('button',{name:'Close',exact:true}).click();await page.locator('.results').scrollIntoViewIfNeeded();const d=page.waitForEvent('download');await page.getByRole('button',{name:'Export handoff .md'}).click();await(await d).saveAs('evidence/competition-demo-handoff.md');},7500);
 await shot('Untrusted log instructions stay inert text.\nOffline examples and historical inference are clearly labeled.',async()=>{await page.getByRole('button',{name:/03 Untrusted/}).click();await page.getByRole('button',{name:'Build incident brief'}).click();await page.locator('.timeline li').first().waitFor();await page.locator('.results').scrollIntoViewIfNeeded();},7500);
 await shot('IncidentAtlas: evidence before answers.\nPublic MIT source. Try the browser demo or run locally.',async()=>{await page.getByRole('button',{name:'Review real Nebius run ↗'}).click();await page.locator('.provider-proof').waitFor();await page.evaluate(()=>window.scrollTo(0,0));},7000);
 const video=page.video();await context.close();await video.saveAs(raw);
 await writeFile('evidence/'+subtitle,captions.map((c,i)=>`${i+1}\n${timestamp(c.begin)} --> ${timestamp(c.end)}\n${c.text}\n`).join('\n'));
 const args=['-y','-i',raw,'-vf',`pad=1280:1000:0:0:color=0x102c29,subtitles=evidence/${subtitle}:force_style='FontName=Arial,FontSize=8,PrimaryColour=&H00FFFFFF,OutlineColour=&H00102C29,BorderStyle=1,Outline=1,Alignment=2,MarginV=8'`,'-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart','evidence/'+output];
 const rendered=spawnSync('ffmpeg',args,{stdio:['ignore','ignore','pipe'],encoding:'utf8'});
 if(rendered.status!==0)throw new Error('FFmpeg failed: '+rendered.stderr?.slice(-1600));
 await writeFile('evidence/'+(submission?'competition-demo-metadata.json':'demo-metadata.json'),JSON.stringify({recordedAt:new Date().toISOString(),source:'actual built app, including saved provider response rendered in IncidentAtlas, in Chrome via Playwright',providerInferenceDuringRecording:false,recordedProviderEvidenceShown:submission,syntheticData:true,captions:captions.length,elapsedMs:Date.now()-start,video:output,audio:'none; English burned-in captions'},null,2));
 console.log('Actual UI demo recorded and captioned: evidence/'+output);
}finally{await browser.close();}

