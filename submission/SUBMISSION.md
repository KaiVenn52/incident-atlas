# IncidentAtlas

## Tagline

Reconstruct incidents with traceable evidence, candidate causes, and honest unknowns.

## Inspiration

An incident channel can contain a confident explanation long before it contains a reliable timeline. A deployment happens, errors rise, someone announces recovery, and another region is still failing. Engineers need a way to inspect the evidence without inheriting the loudest conclusion.

## What it does

IncidentAtlas turns a supplied bundle of logs, deployment changes and runbooks into a reviewable incident brief. Each timeline observation, candidate explanation and next check carries a source ID, line number and exact quote. Selecting a citation opens the original supplied text. The brief retains unknowns and never marks a root cause as confirmed. Suggestions are inert review text; the application cannot execute shell commands or modify production.

Three synthetic cases demonstrate a connection-pool configuration change, conflicting regional recovery signals, and an instruction embedded in an untrusted log. An editable evidence bundle and JSON export make each review reproducible.

## How we built it

The product uses React and Vite with a small Node HTTP service and Zod contracts. Offline mode is deterministic and makes no AI request. The live runtime adapter sends an incident bundle to NVIDIA Nemotron through Nebius Token Factory, then validates the response's structure, model identity and citation references before accepting it. Timeout, cancellation, concurrency limits, rate limits and sanitized errors are explicit application states.

On October 29, 2026, one owner-approved real request to Nebius Token Factory returned `nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B`, matching the requested model. The shared runtime adapter accepted the response after schema, exact-quote, line-reference and timestamp validation. It took 10.37 seconds and reported 582 input and 2,840 output tokens. The fictional incident produced five timeline entries, one candidate explanation, a read-only check and explicit unknowns. Root cause remained unknown. The single case is reproducible evidence of integration, not a model accuracy or incident-resolution benchmark.

## What makes it useful

The central interaction is an evidence review, not a chat transcript. Engineers can move from a candidate explanation to the exact line that motivated it, see conflicting observations in order, and keep unanswered questions visible. The absence of an execution tool is deliberate: the incident commander retains responsibility for operational changes.

## Challenges

A well-formed JSON response can still contain invented references. A genuine quote can still be used to support an unjustified inference. IncidentAtlas rejects the first problem mechanically and makes the second limitation visible. Exact-quote validation is not semantic entailment or authenticity verification. Human review remains necessary.

## Accomplishments and validation

The local application builds and runs, with automated contract, adversarial, HTTP and injected-transport checks, plus real desktop and mobile browser interaction verification. See the evidence directory for exact results. These tests establish local behavior only. The synthetic incidents are not a production benchmark, and no incident-response time improvement is claimed.

## Next steps

Complete authorized live inference with synthetic data, evaluate drafts against manually reviewed reference incidents, collect real user feedback, and prepare controlled judging access. Any production integration would require authentication, data-handling review and tenant isolation.

## Tool feedback draft

Local integration observations: the OpenAI-compatible protocol allows a small native-fetch adapter. Explicit response model identity, completion status and exact citation checks are essential for this workflow. A successful connection alone would not validate the analysis.

Hands-on feedback from one real synthetic-case request: Nemotron produced a schema-valid report with exact source quotes and preserved unknown root cause, accepted in 10.37 seconds with 3,422 total tokens. One hypothesis cited only the generic runbook while referring to the deployment configuration, demonstrating why exact citations still require a human causal review. Integration friction: the cookbook used a lowercase model key and regional hostname, while the authenticated catalog used a case-sensitive routing key and warned regional URLs can stop working; we aligned the adapter with the current catalog key and global endpoint guidance. The console Usage view had not posted this request immediately after completion. No broad model-quality or latency comparison is claimed.

## Required links and disclosures

Public code repository: pending owner-approved publication.

Judge access / test build: local source package prepared; final access method pending.

Public YouTube demo: pending; local footage is not a public YouTube entry.

New work: IncidentAtlas implementation began October 18, 2026, during the listed development window. Owner must verify authorship/ownership declarations. AI coding assistance was used; no synthetic user, deployment, provider or production success is claimed.
