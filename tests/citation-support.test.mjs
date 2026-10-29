import test from 'node:test';
import assert from 'node:assert/strict';
import {citationSupport} from '../src/citation-support.mjs';
test('candidate support distinguishes a generic mechanism from incident sources without assigning confidence',()=>{
 const sources=[{id:'book',kind:'runbook'},{id:'app',kind:'log'}];
 assert.match(citationSupport({citations:[{sourceId:'book'}]},sources),/^Runbook-only/);
 assert.match(citationSupport({citations:[{sourceId:'book'},{sourceId:'app'}]},sources),/does not establish causation/);
 assert.doesNotMatch(citationSupport({citations:[]},sources),/Runbook-only/);
});
