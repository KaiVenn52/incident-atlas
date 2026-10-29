import {test} from 'node:test';
import assert from 'node:assert/strict';
import {recordedReview,handoffMarkdown} from '../src/recorded-review.mjs';
test('recorded provider review is validated, clearly historical, and isolated between views',()=>{
 const first=recordedReview();assert.equal(first.recorded,true);assert.equal(first.evidence.inference,true);assert.equal(first.report.rootCause,'unknown');assert.equal(first.evidence.modelRequested,first.evidence.modelReturned);assert.equal(first.evidence.usage.total_tokens,3422);
 first.report.timeline[0].statement='mutated';assert.notEqual(recordedReview().report.timeline[0].statement,'mutated');
});
test('handoff keeps candidate status, source quotes and unknowns instead of claiming a confirmed cause',()=>{
 const result=recordedReview(),text=handoffMarkdown(result.input,result);
 assert.match(text,/Recorded Nebius response/);assert.match(text,/Root cause: UNKNOWN/);assert.match(text,/Candidate explanations — not confirmed/);assert.match(text,/\[deploy:1\]/);assert.match(text,/DB_POOL_MAX changed from 40 to 4/);assert.match(text,/Missing direct metrics/);
});
test('untrusted markdown inside a source quote stays within a longer code fence',()=>{
 const result=recordedReview();result.report.timeline[0].citations[0].quote='```\n[external](https://example.invalid)\n```';
 assert.match(handoffMarkdown(result.input,result),/````text\n```\n\[external\]\(https:\/\/example.invalid\)\n```\n````/);
});
test('handoff escapes active markdown and HTML in model prose while retaining full event time',()=>{
 const result=recordedReview();result.report.summary='<img src=x> [click](https://example.invalid)';
 const text=handoffMarkdown(result.input,result);
 assert.match(text,/&lt;img src=x&gt;/);assert.ok(!text.includes('[click](https://'));
 assert.ok(text.includes(result.report.timeline[0].timestamp));
});
