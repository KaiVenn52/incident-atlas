import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
import {Input,validateReport} from './lib/contracts.mjs';
import {scenarios,fixtureReport} from './lib/fixtures.mjs';
import {infer,MODEL,ProviderError} from './lib/provider.mjs';
import {createLimiter} from './lib/rate-limit.mjs';
const root=fileURLToPath(new URL('.',import.meta.url));
const live=process.env.NEBIUS_LIVE_ENABLED==='true'&&Boolean(process.env.NEBIUS_API_KEY);
const limiter=createLimiter();
const send=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
export const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
 const url=new URL(req.url,'http://localhost');
 if(req.method==='GET'&&url.pathname==='/api/status')return send(res,200,{liveReady:live,model:process.env.NEBIUS_MODEL||MODEL,execution:'read-only analysis',providerVerified:false});
 if(req.method==='GET'&&url.pathname==='/api/scenarios')return send(res,200,scenarios);
 if(req.method==='POST'&&url.pathname==='/api/analyze'){
  if(req.headers.origin&&!new Set([`http://127.0.0.1:${server.address().port}`,`http://localhost:${server.address().port}`]).has(req.headers.origin))return send(res,403,{error:'ORIGIN_REJECTED'});
  if(!req.headers['content-type']?.startsWith('application/json'))return send(res,415,{error:'JSON_REQUIRED'});
  const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});
  let release;
  try{
   let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>100000){send(res,413,{error:'INPUT_TOO_LARGE'});return;}}
   let body;try{body=JSON.parse(raw);}catch{return send(res,400,{error:'INVALID_JSON'});}
   if(!['fixture','live'].includes(body.mode))return send(res,400,{error:'MODE_REQUIRED'});
   const input=Input.parse(body.input);
   if(body.mode==='fixture')return send(res,200,{report:validateReport(fixtureReport(input),input),evidence:{provider:'Offline fixture',inference:false,validated:true,modelReturned:null,receivedAt:new Date().toISOString()}});
   if(!live)return send(res,503,{error:'LIVE_NOT_CONFIGURED'});
   release=limiter.acquire();
   if(!release)return send(res,429,{error:'LOCAL_RATE_LIMIT'});
   const result=await infer(input,{key:process.env.NEBIUS_API_KEY,model:process.env.NEBIUS_MODEL||MODEL,signal:controller.signal});
   if(!res.destroyed)send(res,200,result);
  }catch(error){if(!res.destroyed)send(res,error instanceof ProviderError?error.status:400,{error:error instanceof ProviderError?error.code:'INVALID_EVIDENCE'});}finally{release?.();}
  return;
 }
 if(req.method!=='GET')return send(res,405,{error:'METHOD_NOT_ALLOWED'});
 if(url.pathname.startsWith('/api/'))return send(res,404,{error:'NOT_FOUND'});
 if(url.pathname==='/favicon.ico'){res.writeHead(204);res.end();return;}
 const dist=resolve(root,'dist');let path;try{path=resolve(dist,'.'+decodeURIComponent(url.pathname));}catch{return send(res,400,{error:'INVALID_PATH'});}
 if(path!==dist&&!path.startsWith(dist+sep))return send(res,403,{error:'PATH_REJECTED'});
 if(url.pathname==='/')path=resolve(dist,'index.html');
 try{const data=await readFile(path);res.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'})[extname(path)]||'application/octet-stream','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'"});res.end(data);}catch{send(res,404,{error:'BUILD_REQUIRED_OR_NOT_FOUND'});}
});
if(process.argv[1]===fileURLToPath(import.meta.url))server.listen(Number(process.env.PORT||4318),'127.0.0.1',()=>console.log(`IncidentAtlas http://127.0.0.1:${server.address().port} | live ${live?'enabled':'disabled'}`));
