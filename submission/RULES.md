# Official requirements mapping

Checked October 21, 2026 against the [official rules](https://nebiusglobalaihackathon.devpost.com/rules). This is a preparation checklist; entrant eligibility remains an owner declaration.

- Development/submission window: August 26, 2026, 09:00 Pacific to October 30, 2026, 10:00 PDT. Deadline conversion: **October 31, 2026, 01:00 MYT** (October 30, 17:00 UTC).
- Runtime: Nebius Token Factory inference or Nebius AI Cloud compute, using an NVIDIA open-source model. Best Apps and Agents fits this copilot.
- Public repository with open-source license, setup instructions, functioning judging access, English materials, public YouTube demo under three minutes, and tool feedback are required.
- Entrants must meet local majority age and geographic/conflict restrictions. Malaysia is not in the named exclusion examples; this alone does not confirm personal eligibility.
- Overall prizes: USD 20,000 / 10,000 / 6,000. Track prize: Jetson Orin Nano hardware. Tavily USD 3,000 requires a functional runtime API call; IncidentAtlas does not claim this. City USD 500 requires IRL attendance; excluded from this remote plan.

All remote preparation is local. Participation in an in-person city event is not planned. Identity, ownership, terms and eligibility responses must come from the owner.

## Model configuration source

The [official Nebius Nano cookbook](https://github.com/nebius/token-factory-cookbook/blob/main/models/nemotron/nemotron3-nano-30b.md) was the original configuration source. On October 29, the authenticated console showed routing key `nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B` and current processing in eu-north1. Runtime configuration was updated to that exact routing key and the global API hostname per [public endpoint guidance](https://docs.tokenfactory.nebius.com/public-serverless), which warns regional URLs can stop working as processing moves. The console links NVIDIA Open Model License. Configuration availability alone is not proof of successful inference.

The agent-reach Jina route returned a 403 challenge on the rules page. The first-party web tool successfully read the official rules; this was the source used for verification. No challenge bypass or login was attempted.
