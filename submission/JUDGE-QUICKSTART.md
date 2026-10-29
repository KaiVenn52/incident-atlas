# IncidentAtlas judge quickstart

Public code: https://github.com/KaiVenn52/incident-atlas

Source test build: https://github.com/KaiVenn52/incident-atlas/releases/tag/v0.2.1

## Open the browser demo

https://kaivenn52.github.io/incident-atlas/

No installation, account or payment required. Choose **Review real Nebius run**, inspect its citations and export a handoff. Try the conflicting-recovery and untrusted-log examples. The site makes no new model requests.

## New review build

The revised source adds a static browser build (`npm run build:demo`), a **Review real Nebius run** entry, source-type warnings for candidate explanations, and a Markdown handoff. Its public deployment is verified. The v0.2.1 source test build includes these additions; v0.1.0 remains a historical version.

## Run the app

Download IncidentAtlas-local-review.zip from the release and extract into its own directory, or clone the public repository. Install Node.js 22.16 or newer (validated with Node 24.20). In that directory run:

```sh
npm ci
npm run build
npm start
```

Windows PowerShell may require npm.cmd instead of npm. Open http://127.0.0.1:4318. The source test build includes its API server; opening index.html as a static file is insufficient. Keep the server bound to loopback.

No account, API key or payment is needed for the three offline demonstrations. Start with the checkout incident, build an offline brief, inspect a citation, review Candidates and Next checks, and export the report. Try the conflicting-recovery and malicious-log cases. All supplied incidents are fictional.

## Verify the real integration evidence

The default demonstration makes no model request and labels that fact. Separately, evidence/provider-acceptance.json contains the fictional input and actual accepted response from one owner-approved Nebius request on October 29, 2026. Requested/returned model: nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B. Duration: 10,368 ms. Usage: 582 prompt and 2,840 completion tokens. The shared lib/provider.mjs adapter validates both that CLI path and the live application route.

Manual review retained an unknown root cause and candidate explanation. Exact citations do not prove causal entailment; the candidate relied on a generic runbook citation. One case is not an accuracy benchmark. See evidence/provider-validation.md and submission/SUBMISSION.md for feedback and limits.

Live inference requires separately approved provider credentials and credits and can incur charges. No key is distributed. Do not enable it merely to inspect the offline test build.

## Validation and video

Current local automated suite: 57/57 after the October 30 review; local and static production builds passed. Run npm test to reproduce local tests (provider transport tests are injected). Historical desktop/mobile browser verification and the 61.84-second captioned offline recording are in evidence/. The included local video predates real inference and its final pending-inference caption is historical. The revised public 81.48-second YouTube video is https://youtu.be/Syk7d-4AO0Y . The earlier 72-second video remains available as a historical artifact.

MIT license. No production data, hosted multi-user service, real-user benchmark or final Devpost submission is claimed.
