// This describes the cited source types, not the truth or confidence of a claim.
export function citationSupport(item,sources){
 const byId=new Map(sources.map(source=>[source.id,source]));
 const kinds=item.citations.map(citation=>byId.get(citation.sourceId)?.kind);
 return kinds.length&&kinds.every(kind=>kind==='runbook')
  ? 'Runbook-only citation. Check incident-specific evidence before accepting this explanation.'
  : 'Incident source cited. A citation does not establish causation.';
}
