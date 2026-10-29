# IncidentAtlas submission readiness

Local readiness review date: October 29, 2026 (Asia/Kuala_Lumpur). Official competition rules were checked October 28; Builder Program terms were checked October 25. Track: **Best Apps and Agents**. Submission deadline: October 30, 2026 at 10:00 AM PDT, equivalent to October 31 at 01:00 MYT.

**Decision: REAL_PROVIDER_ACCEPTANCE_VERIFIED / NOT_SUBMISSION_READY.** On October 29 the owner-provided promo was redeemed: USD 25 confirmed, before-card credit use stated by the console. A project key was explicitly approved and saved only in local .env. A separately approved single real request through the shared runtime adapter succeeded, with matching NVIDIA model identity, validated structure/citations and manual review. Full local suite: 52/52. The public MIT repository is verified. Source test build publication is in progress; public YouTube upload, eligibility declarations and final submission remain outstanding. Live UI remains disabled and no second provider request is approved.

Account history: the owner completed authentication, verification and billing directly. The assistant performed the authorized promo redemption, key creation and single fictional-data inference. No card top-up was performed. Immediate Usage ledger reconciliation was still pending after the response; a rounded USD 25.00 display does not prove zero charge. See `ACCOUNT-AND-CREDITS.md` and `evidence/provider-acceptance.json`. Personal screenshots, keys and voucher values are excluded from source archives.

## Evidence ledger

| Requirement / claim | Status | Evidence / next action |
|---|---|---|
| Runnable app | Local implementation | `npm ci`, `npm run build`, `npm start`; loopback UI and API |
| Source-based timeline, candidate explanations, suggestions | Local synthetic demonstrations | Three fixtures; exact-quote and line-reference checks |
| Failure and adversarial validation | Current full suite 52/52 | October 29, after endpoint/model configuration revision; `evidence/provider-validation.md`. Automated provider transports are injected; the separate real call is recorded independently |
| Desktop / mobile interaction QA | Local real browser | `evidence/ui-qa.json`, PNG screenshots, WebM recordings |
| Targeted inference failure UX | 8/8 local browser checks pass | `evidence/failure-qa/results.json`; missing config, auth, 429 and invalid-citation responses injected at desktop/mobile widths; no provider requests |
| Reproducible source package | Historical baseline clean-copy validation | `evidence/clean-package.json`; original install, 39/39 tests, build and HTML/JS/API smoke checks. Acceptance additions validated separately |
| One-request inference acceptance entry | **One real execution accepted** | Owner approved exact regenerated plan; persistent local lock remains; no retry or second call |
| Real Nebius inference with NVIDIA model | **VERIFIED: one fictional incident** | `evidence/provider-acceptance.json`: actual requested/returned model, response ID, usage, timestamps, hashes and report |
| Provider model identity and output quality | Identity matches; one case manually reviewed | Five grounded timeline entries, candidate cause and unknown root cause retained. Causal citation support remains incomplete; no production quality benchmark |
| Public open-source code | **VERIFIED PUBLIC, MIT** | https://github.com/KaiVenn52/incident-atlas ; initial published commit cbd658d97d435b4c0a970c59094212cbb1e560d0 |
| Judge-accessible app or test build | **Public downloadable source test build verified** | https://github.com/KaiVenn52/incident-atlas/releases/tag/v0.1.0 ; GitHub asset uploaded and SHA-256 matched local archive; requires Node/npm, no account for offline cases |
| YouTube demonstration | **Uploaded and saved as Unlisted, owner requested** | 72-second actual UI + saved provider response, English captions; checks found no issues. Viewing link is private and deliberately absent from this public repository. Rules' publicly-visible requirement remains unresolved |
| Required provider / model feedback | Real single-case feedback drafted | `SUBMISSION.md` records actual timing/tokens, causal-review limitation and catalog/cookbook configuration friction |
| Entrant eligibility / registration / legal declarations | **Pending owner confirmation** | Owner must review official rules and answer personal eligibility questions |
| Final Devpost entry | **Not submitted** | Resolve items above; owner reviews final links and fields before submission |

## External actions awaiting owner authorization

Account creation, Builder Program credit application, acceptance of provider/model/competition terms, funding or credit use, publication of code/video/demo, and final entry each have a separate effect. A provider key alone is not blanket consent for an unspecified spend. Prepare the exact intended inference and budget before a paid call. The implementation makes no automatic live calls on startup or page load.

## Limits that matter to judges

Exact citations prove where a quotation came from. They do not prove the source is truthful or the model's paraphrase follows from it. The UI explicitly retains human review and an unknown root cause. There is no retrieval from real production systems, authentic log ingestion, measured incident-resolution improvement, or real-user benchmark. Local synthetic coverage must not be described as model accuracy.

The app is a loopback review tool. Before hosting, add authentication, tenant isolation, approved data handling, secret management, cost controls beyond this process-local limiter, and hosting-specific security review. Do not expose the current local server directly to the internet.

## Final owner review packet

Review the live export (synthetic input only), public repository and license, judge instructions, public YouTube link and duration, exact Devpost description, provider feedback, personal eligibility answers, and any cost/terms. Final approval is requested only after these concrete materials are ready.
