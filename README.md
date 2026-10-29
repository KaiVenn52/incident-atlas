# IncidentAtlas

Evidence before answers. A local incident review desk for engineers who need to reconstruct a failure without mistaking a plausible explanation for a confirmed root cause.

**Current evidence level: runnable local application plus one real Nebius inference on a fictional incident, accepted October 29, 2026.** The shared runtime adapter returned the requested NVIDIA model and validated the report's structure and citations. See `evidence/provider-acceptance.json` and `evidence/provider-validation.md`. One synthetic case does not establish production quality or complete hackathon eligibility.

## Try IncidentAtlas

**[Open the interactive demo](https://kaivenn52.github.io/incident-atlas/) · [Watch the 81-second walkthrough](https://youtu.be/Syk7d-4AO0Y)**

No account, installation or API key is required. All incidents are fictional.

The new static review build runs entirely in the browser. Select **Review real Nebius run** to inspect the actual saved response, model identity, timing and usage without an API key or a new inference. Offline cases, exact-source inspection and handoff export also work. Runbook-only candidate citations are explicitly flagged. This is a historical response viewer, not a hosted live-inference service.

Build with `npm run build:demo`; serve `dist-demo` at `/incident-atlas/`. `npm run qa:demo` checks desktop/mobile behavior and verifies zero API/external requests. The manually triggered `.github/workflows/pages.yml` publishes only this static output after GitHub Pages is enabled. The [public demo](https://kaivenn52.github.io/incident-atlas/) is deployed on GitHub Pages and has been verified in a browser, including historical response review, exact citations, the conflicting case and Markdown download.

## Run locally

Public repository: [KaiVenn52/incident-atlas](https://github.com/KaiVenn52/incident-atlas). Downloadable source test build: [v0.2.0 release](https://github.com/KaiVenn52/incident-atlas/releases/tag/v0.2.0). Start with the [judge quickstart](submission/JUDGE-QUICKSTART.md).

Requires Node.js 22.16+ (validated with Node 24.20) and npm. From this directory:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd start
```

Open `http://127.0.0.1:4318`. Both the API and the built React interface run on one loopback server. `dev` currently runs this same server: rebuild the frontend after edits. Do not expose this local server publicly; it has no user authentication or tenant isolation.

```powershell
npm.cmd test
npm.cmd run qa
```

UI QA uses installed Google Chrome through Playwright (`channel: chrome`), and Playwright's video recorder. If the recorder is absent, install its FFmpeg component in a project-local cache and set `PLAYWRIGHT_BROWSERS_PATH` to that cache before both installation and QA. UI QA expects the local server on port 4318 with live mode disabled. It exercises synthetic scenarios and injected pending-request behavior; it does not make paid inference calls.

## Walk through the product

1. Select the synthetic checkout incident and build an offline brief.
2. Review the ordered timeline. Open Candidates and follow `deploy:1` to the exact original source line.
3. Open Next checks. The runbook suggestion is review text; nothing is executed.
4. Review Still unknown. Correlation does not confirm causation.
5. Export a Markdown incident handoff, or the input, report and provenance as JSON.
6. Try the conflicting recovery case and the malicious log-payload case. Neither produces a confirmed root cause.
7. Edit the JSON to supply your own source bundle. Invalid evidence is rejected before provider access.

Sources have unique `id`, display `name`, `kind` (`log`, `change`, or `runbook`), and `lines`. Title length: 160 characters. Up to 12 sources, 200 lines per source, 2,000 characters per line, 80,000 characters for the input bundle. HTTP request limit: 100,000 bytes. Example data lives in `lib/fixtures.mjs`. All example incidents and their operational metrics are fictional. Provider timing and usage in the saved receipt are actual.

## Nebius / NVIDIA runtime integration

The server uses the OpenAI-compatible chat completions protocol via native `fetch`. It sends incident evidence to a NVIDIA Nemotron model for a structured draft, then validates the result before returning it to the UI. The model routing key was checked in the authenticated Nebius catalog on October 29, 2026. The global endpoint follows the [public endpoint guidance](https://docs.tokenfactory.nebius.com/public-serverless), which warns that regional URLs can stop working as processing moves:

```text
POST https://api.tokenfactory.nebius.com/v1/chat/completions
model: nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B
```

This configuration succeeded in the October 29 single-request acceptance. Availability can change; review the current account before further credit use. The adapter requires the response's model to match the requested model exactly, and rejects a truncated completion. Alternate NVIDIA model IDs can be configured with `NEBIUS_MODEL`; no arbitrary endpoint override is accepted.

After the owner approves account/terms/credits and use of a key, copy `.env.example` to `.env`, set `NEBIUS_API_KEY`, set `NEBIUS_LIVE_ENABLED=true`, and restart. Never put keys in frontend code or commit `.env`. Select Nebius live inference in the UI; this explicitly sends the current evidence bundle to Nebius and may consume credits. Review/redact sensitive data first. The owner-approved acceptance used a server-side key stored only in ignored local .env.

The response export includes requested and returned model, provider response ID, time, usage if returned, duration and SHA-256 digests. Store a reviewed synthetic-input live export as provider evidence. Keys and raw provider diagnostics are excluded. Exported input and report may contain sensitive incident text; keep private unless deliberately reviewed for publication.

## Evidence and failure boundaries

- Offline fixture mode makes **no model request**. Its report is generated by deterministic example logic and has `inference: false`.
- Live mode rejects unknown sources, invalid line numbers, non-verbatim quotes, uncited claims, invented timeline timestamps, additional action fields, a confirmed `rootCause`, obvious command strings in checks, malformed JSON and incomplete responses.
- Exact quotations establish attribution only. The software does not verify source authenticity, completeness, semantic entailment, or the truth of a model's paraphrase. Summary, candidate explanations and suggestions require human review. Model prompt instructions are not a security boundary.
- There are no shell, deployment, production, wallet or external action tools. Source text (including injected commands) is rendered as escaped React text. Suggestions are inert text with no execute button.
- Live calls are limited to two concurrent requests and six starts per minute, with a 45-second timeout. There is no automatic retry that could duplicate billed requests. Cancellation propagates to the provider request; it cannot guarantee cancellation of provider-side processing or billing already underway.
- A failed analysis clears the previous report; UI state prevents late responses from a previous case replacing the current case.
- The API key remains server-side. No incident persistence, telemetry, external fonts, or analytics is configured. Browser exports are explicit user actions. Requests use same-origin JSON with origin checks and a loopback bind.

## Project map

| Path | Purpose |
|---|---|
| `src/` | Responsive React investigation desk |
| `lib/contracts.mjs` | Input, output and citation gates |
| `lib/provider.mjs` | Real Nebius adapter; sanitized failure states |
| `lib/fixtures.mjs` | Three fictional incidents and deterministic offline renderer |
| `lib/rate-limit.mjs` | Concurrency and per-minute controls |
| `server.mjs` | Loopback HTTP API and static build server |
| `tests/` | Contract, adversarial, transport, HTTP and rate-limit tests |
| `scripts/ui-qa.mjs` | Desktop / mobile interaction checks and recordings |
| `evidence/` | Local verification outputs and actual UI screenshots |
| `submission/` | Rules mapping, English submission copy and review readiness |

See `submission/READINESS.md` for the exact remaining submission blockers. MIT license; no NVIDIA weights are distributed. Respect the provider and model terms for runtime use.

## Competition review

The October 30 product/video audit and exact remaining gaps are in [COMPETITION-REVIEW.md](submission/COMPETITION-REVIEW.md). Current automated suite: **57/57**. The revised 81.48-second video is publicly available on YouTube; the earlier video remains as a historical artifact.

## Review artifacts

Public 81.48-second submission demonstration: [Watch IncidentAtlas on YouTube](https://youtu.be/Syk7d-4AO0Y). It shows offline application examples and the saved response from the separately approved real Nebius request; recording made no new model call. Final Devpost submission remains pending.

The one-request live acceptance entry is `npm.cmd run acceptance`. Its default is local preflight only, even with a key configured. See `submission/LIVE-ACCEPTANCE.md` for the exact synthetic request, fixed NVIDIA model, 5,000-token output cap, one-call/no-retry limit, account and billing review, approval file and persistent attempt lock. The October 29 owner-approved execution returned an accepted report; the persistent lock prevents another blind invocation. `npm.cmd run qa:failures` reproduces the four error presentations with local browser-response injection only.

If no account exists yet, `submission/ACCOUNT-AND-CREDITS.md` records the official account / hackathon credit / Builder Program routes, observed form fields, copy-ready project description, and exact owner actions still needed. The event promo was redeemed October 29 and USD 25 was confirmed before the approved request; Builder Program membership is separate and unverified.

`evidence/IncidentAtlas-local-demo.mp4` is a 61.81-second silent, captioned recording of the real offline UI. `evidence/VALIDATION.md` records local checks and their limits. `deliverables/IncidentAtlas-local-review.zip` is the source/evidence review package; `.env`, node_modules, build output and temporary recordings are excluded. `MANIFEST.json` records SHA-256 digests. Run `node scripts/package.mjs`, then `node scripts/verify-archive.mjs` to regenerate and check the archive.

The October 21 baseline runtime was independently extracted, installed, tested and built, with HTML/JS/API smoke checks; see `evidence/clean-package.json`. The later acceptance-entry additions have separate targeted evidence under `evidence/acceptance/` and `evidence/failure-qa/`; the baseline clean-copy record is not presented as a new full-package rerun. `scripts/check-clean.mjs` rechecks an extracted copy in `deliverables/clean-check` using its project-local npm cache. The extraction directory is a local verification workspace, not part of the source archive.

