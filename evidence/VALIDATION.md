# Local verification record

Baseline date: October 21, 2026 (Asia/Kuala_Lumpur). Acceptance-entry addendum: October 22, 2026, in `acceptance/VALIDATION.md`.

- Node.js 24.20.0 and npm 11.19.0.
- `npm run build`: passed; React/Vite production output produced successfully.
- `npm test`: **39 passed, 0 failed**. See `test-results.txt` for exact results. Includes three synthetic event sets, forged/absent citations, timestamps, additional execution fields, injected instructions, provider auth/429/HTTP errors, network failure, truncated/wrong-model/malformed outputs, timeout, cancellation, HTTP input/origin gates and rate/concurrency limits.
- `npm audit`: **0 known vulnerabilities** at check time, including development dependencies.
- `npm run qa`: passed for actual Chrome at 1440×1100 and 390×844. Both sessions tested three scenarios, source inspection, tabs, export, invalid JSON, live-unconfigured error and cancellation. No unexpected runtime console errors or horizontal document overflow. The intentional missing-credentials request produced an expected HTTP 503 diagnostic, recorded separately.
- Actual browser screenshots were visually inspected at desktop and mobile sizes. No generated concept imagery was used.
- Local actual-UI demo: H.264, 1280×1000, 61.84 seconds, English burned-in captions, no audio. Full decode and representative frame inspection completed. It shows synthetic/offline behavior only.
- Baseline clean package reproduction: ZIP extracted into `deliverables/clean-check`, manifest hashes checked, `npm ci --cache .npm-cache` completed with zero audit findings, then 39/39 tests and production build passed. Runtime source hashes matched the extracted copy at that baseline check. See `clean-package.json` for the historical HTML, JavaScript and fixture API smoke check; later acceptance additions have separate targeted validation.

The initial contract test identified permissive nested objects; strict nested schemas fixed it before the successful run. The initial QA script retained live mode during its final fixture assertion; the harness now explicitly chooses fixture mode. These were local repairs, not provider failures.

C: briefly reached zero free space during video frame export. Only individually identified duplicate recordings inside this project were removed; frame extraction and full video decode were then repeated successfully. Source and formal deliverables were preserved. No unrelated files were cleaned.

## Evidence limits

Provider responses in tests are injected. They are not evidence of real inference, provider latency, model accuracy, API-key validity or account credits. Offline exports explicitly contain `inference: false`. Browser sessions used an isolated desktop Chrome context, not a physical phone. Accessibility certification, production load testing and live-user outcome studies were not performed.
