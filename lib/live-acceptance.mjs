import {createHash} from 'node:crypto';
import {Input} from './contracts.mjs';
import {buildRequest,ENDPOINT,MODEL,infer,ProviderError} from './provider.mjs';
const digest=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
export function prepareAcceptance(value){
 const input=Input.parse(value),request=buildRequest(input,MODEL);
 const contract={endpoint:ENDPOINT,model:MODEL,requestSha256:digest(request),inputSha256:digest(input),maxCalls:1,maxOutputTokens:request.max_tokens,timeoutMs:45000,automaticRetries:0};
 return {input,request,plan:{...contract,planSha256:digest(contract),syntheticInput:true,inputUtf8Bytes:Buffer.byteLength(JSON.stringify(input)),requestUtf8Bytes:Buffer.byteLength(JSON.stringify(request)),inputTokens:'not measured; use exact request JSON for the current model tokenizer',costUsd:'unknown until owner checks current account pricing and credit coverage',providerInferencePerformed:false}};
}
export function checkApproval(plan,approval,{now=Date.now(),enabled,key}={}){
 if(!enabled||!key)throw new Error('LIVE_CONFIGURATION_REQUIRED');
 if(approval?.approved!==true||approval.planSha256!==plan.planSha256)throw new Error('MATCHING_OWNER_APPROVAL_REQUIRED');
 const expires=Date.parse(approval.expiresAt);if(!Number.isFinite(expires)||expires<=now||expires>now+24*3600000)throw new Error('APPROVAL_MUST_EXPIRE_WITHIN_24_HOURS');
 const pricingTime=Date.parse(approval.pricingCheckedAt);
 if(approval.billingReviewed!==true||approval.billingExposureAcknowledged!==true||typeof approval.pricingCheckedAt!=='string'||!Number.isFinite(pricingTime)||pricingTime>now||now-pricingTime>24*3600000)throw new Error('CURRENT_BILLING_REVIEW_REQUIRED');
 if(typeof approval.estimatedRequestCostUsd!=='number'||!Number.isFinite(approval.estimatedRequestCostUsd)||approval.estimatedRequestCostUsd<=0)throw new Error('POSITIVE_COST_ESTIMATE_REQUIRED');
 if(approval.fundingMode==='credits'){
  if(approval.maximumApprovedPaidUsd!==0||approval.creditCoverageConfirmed!==true||typeof approval.verifiedCreditBalanceUsd!=='number'||!Number.isFinite(approval.verifiedCreditBalanceUsd)||approval.verifiedCreditBalanceUsd<approval.estimatedRequestCostUsd)throw new Error('CREDIT_COVERAGE_REQUIRED');
 }else if(approval.fundingMode==='paid'){
  if(typeof approval.maximumApprovedPaidUsd!=='number'||!Number.isFinite(approval.maximumApprovedPaidUsd)||approval.maximumApprovedPaidUsd<=0||approval.maximumApprovedPaidUsd<approval.estimatedRequestCostUsd)throw new Error('PAID_BUDGET_APPROVAL_REQUIRED');
 }else throw new Error('FUNDING_MODE_REQUIRED');
 return true;
}
export async function executeAcceptance(prepared,approval,{enabled,key,reserve,persist,fetcher,now=Date.now()}={}){
 const canonical=prepareAcceptance(prepared.input);
 if(['endpoint','model','requestSha256','inputSha256','maxCalls','maxOutputTokens','timeoutMs','automaticRetries','planSha256'].some(k=>canonical.plan[k]!==prepared.plan[k]))throw new Error('PLAN_CHANGED_REGENERATE_APPROVAL');
 prepared=canonical;
 checkApproval(prepared.plan,approval,{enabled,key,now});
 await reserve({state:'dispatch-reserved',planSha256:prepared.plan.planSha256,createdAt:new Date(now).toISOString(),maxCalls:1});
 try{
  const accepted=await infer(prepared.input,{key,model:MODEL,timeoutMs:prepared.plan.timeoutMs,fetcher});
  const record={state:'accepted',planSha256:prepared.plan.planSha256,input:prepared.input,...accepted,manualReviewRequired:true,chargeStatus:'check provider usage and billing'};
  await persist(record);return record;
 }catch(error){
  const record={state:'failed-or-unknown',planSha256:prepared.plan.planSha256,validatedResultPersisted:false,error:error instanceof ProviderError?error.code:'LOCAL_EVIDENCE_WRITE_FAILED',automaticRetries:0,chargeStatus:'unknown; reconcile provider usage before another attempt'};
  await persist(record);return record;
 }
}
