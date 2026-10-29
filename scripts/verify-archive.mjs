import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const script=await readFile(new URL('./verify-archive.ps1',import.meta.url),'utf8');
// Invoke this reviewed local verification code as a command, without changing machine or user execution policy.
const run=spawnSync('powershell.exe',['-NoProfile','-Command',script],{encoding:'utf8'});
if(run.status!==0)throw new Error(run.stderr);
const result=JSON.parse(run.stdout.trim());
await writeFile('deliverables/archive-verification.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
