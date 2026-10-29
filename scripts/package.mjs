import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,relative,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const root=resolve('.');
const excluded=new Set(['node_modules','dist','.git','.env','acceptance-approval.local.json','private-onboarding','deliverables','recordings','demo-raw']);
const files=[];
async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){if(excluded.has(item.name)||item.name==='MANIFEST.json')continue;const path=resolve(dir,item.name),rel=relative(root,path).split(sep).join('/');if(/^evidence\/(?:acceptance\/)?live-/.test(rel)||/^evidence\/(?:submission-demo|IncidentAtlas-submission-demo\.mp4$)/.test(rel))continue;if(item.isDirectory())await walk(path);else if(item.isFile())files.push({path:rel,sha256:createHash('sha256').update(await readFile(path)).digest('hex')});}}
await walk(root);files.sort((a,b)=>a.path.localeCompare(b.path));
const providerRecord=JSON.parse(await readFile('evidence/provider-acceptance.json','utf8').catch(error=>{if(error.code==='ENOENT')return 'null';throw error;}));
const providerInference=providerRecord?.state==='accepted'&&providerRecord?.evidence?.inference===true&&providerRecord?.evidence?.validated===true;
await writeFile('MANIFEST.json',JSON.stringify({createdAt:new Date().toISOString(),providerInference,providerEvidence:providerInference?'evidence/provider-acceptance.json':null,files},null,2));
await mkdir('deliverables',{recursive:true});
// A fixed script reads the manifest; file paths are passed as data, never interpolated shell code.
const ps="$ErrorActionPreference = 'Stop'; Add-Type -AssemblyName System.IO.Compression; Add-Type -AssemblyName System.IO.Compression.FileSystem; $packageManifest = Get-Content -Raw MANIFEST.json | ConvertFrom-Json; $packageTarget = Join-Path (Get-Location) 'deliverables/IncidentAtlas-local-review.zip'; if (Test-Path -LiteralPath $packageTarget) { Remove-Item -LiteralPath $packageTarget }; $packageStream = [IO.File]::Open($packageTarget, [IO.FileMode]::CreateNew); $packageArchive = [IO.Compression.ZipArchive]::new($packageStream,[IO.Compression.ZipArchiveMode]::Create); try { foreach ($packageFile in $packageManifest.files) { [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($packageArchive,(Join-Path (Get-Location) $packageFile.path),$packageFile.path) | Out-Null }; [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($packageArchive,(Join-Path (Get-Location) 'MANIFEST.json'),'MANIFEST.json') | Out-Null } finally { $packageArchive.Dispose(); $packageStream.Dispose() }; (Get-Item -LiteralPath $packageTarget).Length";
const result=spawnSync('powershell.exe',['-NoProfile','-Command',ps],{encoding:'utf8'});
if(result.status!==0)throw new Error(result.stderr);
console.log(JSON.stringify({files:files.length+1,package:'deliverables/IncidentAtlas-local-review.zip',bytes:Number(result.stdout.trim())},null,2));
