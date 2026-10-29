# One-request live acceptance run

Current status: **one owner-approved real request accepted October 29, 2026**. The USD 25 promo credit was confirmed before execution. A project key was explicitly approved and saved only in ignored local .env; live UI remains disabled. Requested and returned model IDs match; schema/citations validated. Runtime 10,368 ms; 582 prompt and 2,840 completion tokens. See `../evidence/provider-acceptance.json` for actual synthetic-case evidence and manual review. Full current local suite: 52/52. The persistent attempt lock remains; do not rerun without a new review and explicit approval. Immediately after response, the console Usage view had not posted consumption; rounded balance remained USD 25.00.

## Shortest owner setup

1. Review the [official Token Factory quickstart](https://docs.tokenfactory.nebius.com/quickstart), [billing documentation](https://docs.tokenfactory.nebius.com/other-capabilities/billing-new), and [API key instructions](https://docs.tokenfactory.nebius.com/api-reference/introduction). Use an existing authorized account if available. Creating an account, accepting terms, applying for Builder Program credits, adding a card or topping up requires the owner's decision.
2. Check the selected model's current price and account availability in the console. Confirm actual credit balance, expiry, applicable rates and automatic card-charge exposure. The documentation checked October 21, 2026 describes mandatory billing/card setup during standard onboarding, a USD 1 trial credit valid for 30 days, and automatic charging conditions. These are public documentation statements, not proof of this owner's account terms or balance. Do not assume hackathon credits have already been granted.
3. Create an appropriately scoped API key only after approval. Keep it in this project's local `.env`, never in chat, screenshots or source control. Copy `.env.example`, fill `NEBIUS_API_KEY`, and set `NEBIUS_LIVE_ENABLED=true` only for an approved execution. Do not start or use live UI analysis while preparing the CLI run; it has a separate request path and can consume additional credits.
4. Run `npm.cmd run acceptance`. This **always performs zero network calls**, even when keys are configured. Review the exact request in `evidence/acceptance/request.json` and its fingerprint in `preflight.json`.
5. Copy `acceptance-approval.example.json` to `acceptance-approval.local.json`. The owner fills the reviewed pricing time, a realistic estimated request cost, funding mode, actual verified credit balance or explicit paid allowance, and an expiry within 24 hours. Copy the exact `planSha256`, and change approval/billing acknowledgements only after review. Unknown cost or unconfirmed credit coverage must remain unapproved.
6. Only after that concrete approval, execute the single-request command below. Do not use it merely to test whether a key works.

```powershell
npm.cmd run acceptance
# STOP: review the plan, current account pricing/credits, terms, and owner approval.
# The following command can consume credits or incur a charge:
npm.cmd run acceptance -- --execute --approval acceptance-approval.local.json
```

## Exact proposed request

| Item | Fixed value |
|---|---|
| Input | `fixtures/acceptance-input.json`: the fictional checkout incident, 3 sources, 8 original lines |
| Model | `nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B` (routing key verified in authenticated catalog October 29) |
| Endpoint | `https://api.tokenfactory.nebius.com/v1/chat/completions` |
| System prompt | Same `buildRequest()` used by the application runtime adapter |
| Maximum calls | **1** per locked attempt; no health ping, model listing, fallback or follow-up call |
| Maximum output tokens | **5,000** via `max_tokens`; a shorter/truncated response is rejected |
| Timeout | 45 seconds; cancellation does not guarantee provider-side billing cancellation |
| Automatic retries | **0** |
| Input tokens | Not measured. Byte counts and exact JSON are in the preflight; bytes are not a tokenizer result |
| Cost | Not quoted. Owner must check current model rates, input token accounting, output/reasoning billing, credit coverage and account charging behavior |

`estimatedRequestCostUsd` and `maximumApprovedPaidUsd` are owner review declarations. **They are not a provider-enforced dollar ceiling.** This client cannot inspect or enforce account billing controls. For credits-only approval, confirm adequate valid credit coverage and that the owner accepts the actual account billing behavior. If this cannot be established, do not execute. No stale public price or assumed free credit is used to authorize a call.

October 29 configuration revision: authenticated catalog routing key is `nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B`; it differs in case from the earlier cookbook key. The current processing region is eu-north1. Public endpoint documentation warns against relying on regional base URLs, so this plan uses the global hostname. The catalog's sample still displayed a regional URL; global routing guidance takes precedence. Regenerated plan hash: `5191b893b6b0fc716131fbd02bb1ba8cbe90a913a53f13e78896b0b117e01ddf`. The explicitly approved execution succeeded once. This does not guarantee continuing availability.

## Evidence and repeat protection

Before sending, the CLI validates the approval against the exact request fingerprint and creates `evidence/acceptance/live-attempt.lock` with exclusive creation and a disk sync. A second invocation is blocked while the lock exists, including after timeout or failure. This avoids a blind retry of a potentially billed call. The lock is local repeat protection, not an account-wide transaction guarantee.

Success writes `live-result.json` with the accepted report, synthetic input, requested/returned model, response ID, usage if present, hashes and timestamps. Review its semantic accuracy and inspect actual provider Usage/Billing before declaring the requirement complete. Exact-quote acceptance alone does not prove causal reasoning quality.

Auth failures, rate limits, malformed output, invalid citations and timeouts preserve a failed-or-unknown outcome with no automatic retry. Failed validation can still be a billed inference. Reconcile provider usage before considering a separately approved attempt; do not automatically delete the lock. Keys and raw provider error bodies are never recorded. Live attempt files and the local approval file are excluded from source packaging.

## Reproduce local failure experience without a key

With the built application running, `npm.cmd run qa:failures` injects only local browser responses for missing configuration, wrong-key/auth, rate limit and rejected citations. It checks the visible error, report clearing and enabled manual retry at desktop and mobile widths, and saves screenshots under `evidence/failure-qa/`. These are **injected UI failure checks**, not evidence that Nebius rejected a real key. Provider transport sanitization is checked separately by local tests.
