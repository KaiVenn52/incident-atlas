import test from 'node:test';
import assert from 'node:assert/strict';
import {createLimiter} from '../lib/rate-limit.mjs';
test('no more than two concurrent provider calls; release is idempotent',()=>{const l=createLimiter();const a=l.acquire(),b=l.acquire();assert.equal(l.acquire(),null);a();a();const c=l.acquire();assert.ok(c);assert.equal(l.acquire(),null);b();c();});
test('six requests per minute; exactly sixty seconds restores capacity',()=>{let now=0;const l=createLimiter({clock:()=>now});for(let i=0;i<6;i++){const release=l.acquire();assert.ok(release);release();}assert.equal(l.acquire(),null);now=59999;assert.equal(l.acquire(),null);now=60000;assert.ok(l.acquire());});
