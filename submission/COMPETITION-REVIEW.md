# IncidentAtlas competition review

Reviewed October 30, 2026 (Malaysia). This is an internal assessment, not a prediction of judging results.

## Assessment

IncidentAtlas has a coherent interaction and verifiable model integration. Its strongest demonstration is contradictory recovery evidence, followed by inspection of a real model candidate whose citation is insufficient to establish causation. That sequence demonstrates the problem and the product's judgment better than a generic “summarize logs” pitch.

The original presentation asked judges to install Node and read small raw JSON to verify the integration. This review fixes the local experience and prepares a browser-only version. Public deployment remains pending account access. A champion-level claim is not supported by the present evidence: there is one actual model case, no observed customer use, and no measured operational improvement.

## Changes completed

| Finding | Change | Verification |
|---|---|---|
| Installation friction for first review | Separate static build: examples, historical real response and exports; no key required | Desktop/mobile QA, zero API and external requests |
| Provider evidence hidden in raw JSON | Actual saved response rendered inside the product with model, UTC date, duration and usage | Receipt parsed and validated through the existing contracts |
| A generic runbook can look like strong causal support | Candidate notice identifies runbook-only citation sets and asks for incident-specific evidence | Source-type test and real-browser checks; no confidence score is invented |
| Export is developer-oriented | Markdown handoff with complete event times, exact quotes, candidates and unknowns | Unit tests, downloads inspected at both viewport sizes |
| Untrusted Markdown could alter an exported handoff | Escape model prose and HTML; source quotes use a fence longer than any embedded fence | Adversarial Markdown export tests |
| Timeline times omit the date | Full UTC date below each timestamp | Desktop/mobile rendering |
| Keyboard tab navigation incomplete | Roving focus, arrow keys, Home and End | Browser keyboard check |
| Subpath deployment can break the home link | Use the Vite base URL | Static build served under `/incident-atlas/` |
| Video starts with explanation rather than a problem | Open with conflicting regional recovery signals | New actual-app recording, English burned captions |
| Real inference proof hard to read on video | Show saved response and source inspection within the app | Provider and citation frames inspected |
| Submission text has stale future steps | Describe completed real inference accurately; retain pending external steps | README, quickstart, submission and readiness reviewed |

## Validation

- 57 automated tests pass. These include local contracts, HTTP behavior, injected provider transport, limits, recorded-result isolation, source-type labeling and safe exports.
- Local production and browser-demo production builds pass.
- Existing desktop/mobile interaction QA passes; all 8 injected failure-state browser checks pass.
- New static-demo QA passes at 1440×1000 and 390×844: historical labels, exact citations, runbook warning, keyboard tabs, Markdown/JSON exports, malformed evidence, three offline cases, disabled live mode, no horizontal overflow, no console errors, no API requests and no external requests.
- No new inference was made during this review or video recording. Local live inference remains disabled.
- Browser plugin was unavailable. Local rendering was checked using installed Chrome through Playwright, as allowed by the frontend-testing-debugging fallback. External browser verification is pending because the CUA tool could not initialize with the current C-drive space.

Evidence: `evidence/review-qa/results.json`, `test-results.txt`, desktop/mobile screenshots, `evidence/ui-qa.json`, `evidence/failure-qa/results.json` and `evidence/provider-acceptance.json`.

## Judging fit and remaining weaknesses

The [official rules](https://nebiusglobalaihackathon.devpost.com/rules), rechecked during this review, give equal weight to technical execution, product design, credible impact and the idea. Deadline: October 30 at 10:00 PDT, or October 31 at 01:00 MYT. Best Apps and Agents remains the selected track.

| Area | Demonstrated strength | Material gap |
|---|---|---|
| Technical execution | Real Nebius/Nemotron request; exact identity, citation and timestamp validation; explicit failures | Only one real case; no measured model accuracy, scale or production ingestion |
| Product design | Complete source-to-brief-to-citation-to-handoff flow; responsive layout and keyboard operation | Public zero-key deployment still pending; editing requires JSON |
| Credible impact | Specific on-call problem: conflicting recovery signals and premature causal certainty | No interviews, usability sessions or measured time savings; do not claim these |
| Idea | Reviewable evidence and explicit causal limits, including a visible failure in the real model's support | Incident summarization is a crowded category; prove value through the evidence interaction rather than broad novelty claims |

## Video review

Original public video: https://youtu.be/0ncrvV8CwM8 (72 seconds). Keep this working link until a replacement is actually published.

Revised local candidate: `evidence/IncidentAtlas-competition-demo.mp4`, approximately 81 seconds, actual Chrome app footage, no generated product mockups, no copyrighted music, no narration, English captions. It demonstrates the conflicting case, citations, candidate/unknown boundary, read-only checks, real saved response, runbook-only support warning, handoff export and untrusted log case. It makes no new provider request. Recording and metadata are reproducible with `npm run record:competition` while local live mode is disabled.

The new video improves clarity; it does not establish production adoption or model accuracy. Silent captions are usable without audio, though a well-recorded owner voiceover could add personal conviction if time permits. Do not add a robotic narration merely to claim audio exists.

## External completion gates

1. Authenticate the CLI as the intended repository owner, KaiVenn52. The currently observed CLI identity is kangming0602; do not publish as that identity.
2. Push reviewed source, enable GitHub Pages with Actions, run the prepared Pages workflow, and verify the resulting public URL in a browser. No hosted-live inference is planned.
3. Review the new video and publish a replacement only after the owner approves the exact upload. Update submission links only after publication is verified.
4. Confirm personal eligibility, registration and declarations, review the concrete final Devpost form, and obtain final submission approval.

The published v0.1.0 release and original YouTube video remain valid historical artifacts. New local features are not claimed to exist in those older artifacts. Keep judging access available through December 15, 2026.
