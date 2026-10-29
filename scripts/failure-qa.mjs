import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4318';
await mkdir('evidence/failure-qa',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const checks=[];
try{
 for(const [viewportName,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const context=await browser.newContext({viewport});const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.getByRole('button',{name:'Build incident brief'}).waitFor();
  // A fixture supplies the prior report. Every later /api/analyze request is intercepted locally.
  await page.getByRole('button',{name:'Build incident brief'}).click();await page.locator('.results').waitFor();
  await page.getByLabel('Analysis mode').selectOption('live');
  for(const [code,status,expected] of [['LIVE_NOT_CONFIGURED',503,'Live inference is not configured'],['PROVIDER_AUTH',502,'Nebius rejected the credentials'],['PROVIDER_RATE_LIMIT',429,'Nebius is rate limiting requests'],['PROVIDER_OUTPUT_REJECTED',422,'model response failed the structure or citation checks']]){
   let intercepted=0;await page.route('**/api/analyze',async route=>{intercepted++;await route.fulfill({status,contentType:'application/json',body:JSON.stringify({error:code})});});
   await page.getByRole('button',{name:'Build incident brief'}).click();await page.getByRole('alert').filter({hasText:expected}).waitFor();
   assert.equal(intercepted,1);assert.equal(await page.locator('.results').count(),0);assert.equal(await page.getByRole('button',{name:'Build incident brief'}).isEnabled(),true);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   await page.getByRole('alert').scrollIntoViewIfNeeded();await page.screenshot({path:`evidence/failure-qa/${viewportName}-${code}.png`,fullPage:true});
   checks.push({viewport:viewportName,error:code,httpStatus:status,transport:'injected browser response; no provider contact',interceptedRequests:intercepted,reportVisible:false,retryEnabled:true,screenshot:`${viewportName}-${code}.png`});
   await page.unroute('**/api/analyze');
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 await writeFile('evidence/failure-qa/results.json',JSON.stringify({checkedAt:new Date().toISOString(),browser:'Google Chrome via Playwright; browser plugin unavailable',providerRequests:0,scope:'Targeted error presentation only; not authenticated provider verification.',checks},null,2));
 console.log(JSON.stringify({passed:true,checks:checks.length,providerRequests:0},null,2));
}finally{await browser.close();}
