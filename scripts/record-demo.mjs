import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const submission=process.argv.includes('--submission');
const output=submission?'IncidentAtlas-submission-demo.mp4':'IncidentAtlas-local-demo.mp4';
const subtitle=submission?'submission-demo.srt':'demo.srt';
const raw=submission?'evidence/demo-raw/submission-demo.webm':'evidence/demo.webm';
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
 await shot(submission?'IncidentAtlas: evidence before answers.\nOffline examples, then a saved real provider response.':'IncidentAtlas: evidence before answers.\nLocal synthetic demonstration. No AI inference.',async()=>{});
 await shot('A deployment changed the connection pool.\nBuild a reviewable timeline from the supplied evidence.',async()=>{await page.getByRole('button',{name:'Build incident brief'}).click();await page.locator('.timeline li').first().waitFor();await page.locator('.results').scrollIntoViewIfNeeded();});
 await shot('The pool explanation is a candidate, not a confirmed cause.\nFollow its citation to the original source line.',async()=>{await page.getByRole('tab',{name:/Candidates/}).click();await page.locator('.claim .cite').first().click();await page.locator('#source-inspector .highlight').waitFor();await page.locator('#source-inspector').scrollIntoViewIfNeeded();});
 await shot('Next checks come from the supplied runbook.\nSuggestions are text. The app cannot execute commands.',async()=>{await page.getByRole('tab',{name:/Next checks/}).click();await page.getByRole('button',{name:'Close',exact:true}).click();await page.locator('.results').scrollIntoViewIfNeeded();});
 await shot('Conflicting recovery signals stay in the timeline.\nOne healthy region does not establish global recovery.',async()=>{await page.getByRole('button',{name:/02 Conflicting/}).click();await page.getByRole('button',{name:'Build incident brief'}).click();await page.locator('.timeline li').first().waitFor();await page.locator('.results').scrollIntoViewIfNeeded();});
 await shot('An instruction inside a log stays untrusted data.\nThere is no shell or production action tool to access.',async()=>{await page.getByRole('button',{name:/03 Untrusted/}).click();await page.getByRole('button',{name:'Build incident brief'}).click();await page.locator('.timeline li').first().waitFor();await page.locator('.results').scrollIntoViewIfNeeded();});
 await shot('Export the sources, report and provenance as JSON.\nExact quotes establish attribution; human review is still required.',async()=>{await page.getByRole('button',{name:/01 Checkout/}).click();await page.getByRole('button',{name:'Build incident brief'}).click();await page.locator('.timeline li').first().waitFor();await page.locator('.results').scrollIntoViewIfNeeded();const d=page.waitForEvent('download');await page.getByRole('button',{name:'Export review JSON'}).click();await(await d).saveAs(submission?'evidence/submission-demo-export.json':'evidence/demo-export.json');});
 if(submission){
  await shot('Saved real Nebius response from October 29.\nOne fictional case; this recording makes no new AI request.',async()=>{await page.goto(pathToFileURL(resolve('evidence/provider-acceptance.json')).href);await page.evaluate(()=>window.find('modelRequested'));},8500);
  await shot('Nemotron returned 582 input and 2,840 output tokens in 10.37s.\nValidated citations still require human causal review.',async()=>{await page.evaluate(()=>window.find('durationMs'));},6500);
  await shot('Public MIT source and downloadable test build on GitHub.\nIncidentAtlas keeps the incident commander in control.',async()=>{await page.goto('http://127.0.0.1:4318');await page.getByRole('button',{name:'Build incident brief'}).waitFor();},5000);
 }else await shot('A real Nebius request was separately verified on October 29.\nThis clip shows offline fixtures; final submission is separate.',async()=>{await page.evaluate(()=>window.scrollTo(0,0));});
 const video=page.video();await context.close();await video.saveAs(raw);
 await writeFile('evidence/'+subtitle,captions.map((c,i)=>`${i+1}\n${timestamp(c.begin)} --> ${timestamp(c.end)}\n${c.text}\n`).join('\n'));
 const args=['-y','-i',raw,'-vf',`pad=1280:1000:0:0:color=0x102c29,subtitles=evidence/${subtitle}:force_style='FontName=Arial,FontSize=8,PrimaryColour=&H00FFFFFF,OutlineColour=&H00102C29,BorderStyle=1,Outline=1,Alignment=2,MarginV=8'`,'-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart','evidence/'+output];
 const rendered=spawnSync('ffmpeg',args,{stdio:['ignore','ignore','pipe'],encoding:'utf8'});
 if(rendered.status!==0)throw new Error('FFmpeg failed: '+rendered.stderr?.slice(-1600));
 await writeFile('evidence/'+(submission?'submission-demo-metadata.json':'demo-metadata.json'),JSON.stringify({recordedAt:new Date().toISOString(),source:'actual built app and saved provider JSON in Chrome via Playwright',providerInferenceDuringRecording:false,recordedProviderEvidenceShown:submission,syntheticData:true,captions:captions.length,elapsedMs:Date.now()-start,video:output,audio:'none; English burned-in captions'},null,2));
 console.log('Actual UI demo recorded and captioned: evidence/'+output);
}finally{await browser.close();}

