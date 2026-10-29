# Acceptance-entry addendum

Checked October 22, 2026 (Asia/Kuala_Lumpur).

New implementation: a default-off, one-request CLI acceptance workflow sharing the exact request builder with the runtime provider adapter. Fixed synthetic input, request/plan fingerprints, explicit local approval requirements, current billing review, a positive cost estimate, credit/paid allowance declarations, and an exclusive durable dispatch reservation are implemented. No model, endpoint, retries or follow-up calls are substituted automatically.

Targeted command: `node --test tests/acceptance.test.mjs tests/core.test.mjs`. **38/38 passed**, comprising 11 new acceptance-entry checks and 27 affected provider/contract checks. Full command output is in `local-test-results.txt`. The unchanged baseline HTTP/rate-limit tests, clean-copy installation/build and existing video were not rerun for this increment.

The actual CLI was executed in isolated subprocess tests with a fetch guard that throws if any network call is attempted. A configured fake key did not cause default preflight to call the network. Missing configuration prevented the execute entry from dispatching. Test approval times and transport responses are synthetic; no real key or credit approval was used. Additional checks cover a stale/mismatched approval, incomplete billing review, assumed zero cost, insufficient credits, paid allowance, changed request, reservation failure and a single injected completion/failure without retry.

Targeted UI command: `npm run qa:failures`. **8/8 passed** in actual Chrome at desktop and mobile widths. Local browser-route injection supplied missing-configuration, auth, rate-limit and rejected-output responses. Each produced an understandable alert, no accepted report and an enabled manual action. No page script errors or horizontal document overflow were observed. Screenshots and machine-readable results are under `evidence/failure-qa/`. Representative desktop and mobile screenshots were visually inspected. These prove local presentation only, not real invalid-key or provider behavior.

Preflight material: `fixtures/acceptance-input.json`, `preflight.json`, and `request.json`. The parsed input is 898 UTF-8 bytes; the exact request is 2,350 UTF-8 bytes. These are not tokenizer counts. The cap is one request, 5,000 requested output tokens, 45 seconds, zero automatic retries. Pricing and current account credit coverage remain unknown.

No `live-attempt.lock`, `live-result.json`, local owner approval or local `.env` existed at the completion of this increment. No real inference was attempted. Status remains **LOCAL_REVIEW_READY / PROVIDER_UNVERIFIED / NOT_SUBMISSION_READY**.

The package filter was narrowed from all filenames beginning `live-` to generated live artifacts under `evidence/`, so the new `lib/live-acceptance.mjs` and `scripts/live-acceptance.mjs` are included in the source archive. The archive verifier now explicitly requires these entries while excluding local approval and real-attempt artifacts.

Final approval review follow-up (October 22): corrected two authorization edge cases. A future pricing-review timestamp is now rejected; changing timeout or another execution-contract field cannot retain the original approval fingerprint. The focused acceptance suite passed **13/13**, with actual output in `approval-regression-results.txt`. This is separate from the earlier 38-check provider/acceptance run. No new provider inference, full clean-install rerun or video recreation was performed.
