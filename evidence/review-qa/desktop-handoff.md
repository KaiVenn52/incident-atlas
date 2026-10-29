# Checkout latency after deploy

Recorded Nebius response — no new request.

Root cause: UNKNOWN. This is a draft for human review, not authorization to change production.

Checkout latency spikes and 503 errors observed after a deployment that changed DB\_POOL\_MAX from 40 to 4\.

## Timeline

2026-10-18T09:40:00Z · Release checkout-api v2\.18 started; DB\_POOL\_MAX changed from 40 to 4\.
[deploy:1]
```text
2026-10-18T09:40:00Z release checkout-api v2.18 started; DB_POOL_MAX changed from 40 to 4.
```

2026-10-18T09:42:00Z · Rollout complete; all 6 replicas healthy\.
[deploy:2]
```text
2026-10-18T09:42:00Z rollout complete; all 6 replicas healthy.
```

2026-10-18T09:43:00Z · p95 latency 4200ms; connection acquisition timeout count=183\.
[app:1]
```text
2026-10-18T09:43:00Z p95 latency 4200ms; connection acquisition timeout count=183.
```

2026-10-18T09:44:00Z · HTTP 503 rate 12%; no application crash observed\.
[app:2]
```text
2026-10-18T09:44:00Z HTTP 503 rate 12%; no application crash observed.
```

2026-10-18T09:45:00Z · db active connections=24; database CPU=21%; max connections=400\.
[app:3]
```text
2026-10-18T09:45:00Z db active connections=24; database CPU=21%; max connections=400.
```

## Candidate explanations — not confirmed

Reduced DB\_POOL\_MAX may have saturated the application connection pool causing latency and 503 errors\.
[book:1]
```text
Pool acquisition timeouts can indicate a saturated application connection pool.
```

## Read-only next checks

Read-only inspection of pool configuration and per-replica wait queues per the runbook, no commands required\.
[book:2]
```text
Compare pool configuration and per-replica wait queues with the last healthy release.
```

## Still unknown

- Missing direct metrics on connection wait time
- Unclear whether DB\_POOL\_MAX change was intentional or accidental
- No evidence of application code change beyond configuration

Exact quotes establish attribution, not source authenticity or causal entailment.