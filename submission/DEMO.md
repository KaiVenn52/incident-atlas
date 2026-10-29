# Current submission demonstration

Public video: https://youtu.be/Syk7d-4AO0Y . Published October 30, 2026 (MYT), following explicit owner approval. FFprobe duration: **81.48 seconds**. English burned captions, actual app footage, no music or narration.

Browser demo: https://kaivenn52.github.io/incident-atlas/

The video opens with conflicting regional recovery evidence, inspects source citations, distinguishes candidates from confirmed causes, shows the actual saved Nebius/Nemotron result inside the product, flags runbook-only candidate support, exports a Markdown handoff and demonstrates an untrusted log payload. Recording and replay make no new model request.

Reproduce with live inference disabled and the local server running: `npm run record:competition`. Local MP4: `evidence/IncidentAtlas-competition-demo.mp4`; captions: `evidence/competition-demo.srt`; metadata: `evidence/competition-demo-metadata.json`. Generated recording artifacts remain excluded from source archives. Publication and playback were verified; see `evidence/publication/public-release.json`.

## Historical recordings

The sections below preserve earlier recordings and the status at their creation. Their instructions and pending-inference statements are historical. The current video above is the submission reference.

### October 29 demonstration

Historical video: `evidence/IncidentAtlas-submission-demo.mp4`, recorded October 29, 2026. FFprobe duration: **72.00 seconds**. Silent actual application and saved provider JSON footage in Chrome, English burned-in captions, no music. It shows offline examples followed by the saved response from the separately approved real Nebius request. It does not make a new model request.

Reproduce with the server running and live inference disabled: `node scripts/record-demo.mjs --submission`. The script refuses to record if the status endpoint reports live inference enabled. It exercises fixture calls and then displays the existing provider-acceptance.json file. No generated UI reconstruction or AI imagery is used.

The new captions are `evidence/submission-demo.srt`; metadata and validation are `evidence/submission-demo-metadata.json` and `evidence/submission-demo-validation.json`. Publication copy is in `YOUTUBE.md`. One fictional case does not establish model accuracy; root cause remains unknown and exact citations require human causal review.

Public YouTube video: https://youtu.be/0ncrvV8CwM8 . The owner initially selected Unlisted, then explicitly requested Public on October 29. Studio confirmed Public with all changes saved; the viewing page was refreshed successfully. The generated local MP4 and recording artifacts remain excluded from source archives; the public viewing URL is included in submission materials. Final Devpost submission remains separate.

## Historical offline recording

The material below describes the original 61.84-second offline video and its then-pending provider status. The new 72-second video above supersedes it for submission.

The local demo shows the actual built app and fictional incident data in offline mode. It is a review artifact, not proof of a real Nebius call. No synthetic recreation of the UI is used.

Run the app, then `node scripts/record-demo.mjs` to record actual browser interactions. Convert the result using the command documented by that script's completion output. The English subtitle file is `evidence/demo.srt`. The final caption states that live inference and public submission remain pending.

## English narration / captions

“IncidentAtlas starts with evidence, not a confident answer. This local demonstration uses synthetic incident data and makes no model request.

A checkout deployment reduced the application's connection pool. Two minutes later, connection acquisition timeouts rose. The timeline preserves the source lines so an engineer can inspect the sequence.

The connection-pool explanation is a candidate. It is not a confirmed root cause. Follow the citation to the original configuration change.

The next check comes from the supplied runbook. IncidentAtlas suggests read-only investigation and cannot execute commands or change production.

Conflicting regional recovery signals remain visible. A green dashboard in one region does not supply evidence about every region.

Instructions inside a log stay inside the log. This payload cannot gain access to a shell because the app has no execution tool.

Export the evidence, report and provenance for review. The Nebius Nemotron adapter is implemented, but real inference still requires an authorized account and successful validated response.”

## Historical plan for a qualifying video

After live inference is authorized and verified, rerecord a brief live sequence, expose the returned model and redacted provenance, keep the offline/synthetic disclosure for fixture sections, and include actual provider feedback in the submission. Keep the complete video under three minutes. Upload to public YouTube only after owner review; confirm the durable public URL and playability before adding it to Devpost.
