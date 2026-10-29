export function createLimiter({maxActive=2,maxPerMinute=6,clock=Date.now}={}){
 let active=0;const history=[];
 return {acquire(){const now=clock();while(history.length&&history[0]<=now-60000)history.shift();if(active>=maxActive||history.length>=maxPerMinute)return null;active++;history.push(now);let released=false;return ()=>{if(!released){released=true;active--;}};}};
}
