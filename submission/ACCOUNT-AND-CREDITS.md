# Nebius account and credits handoff

Confirmed update — October 29: the owner supplied the final emailed voucher. It was applied once using With promo code. The console returned **Promo code applied. $25.00 added to your account balance**, displayed account balance USD 25.00, and stated it would use that balance before charging the card. The voucher value is deliberately omitted from source documents. After explicit owner confirmation, IncidentAtlas-acceptance was created in default-project and saved only to ignored local .env. The console displayed an expiration date of October 28, 2031; the creation form offered no scope or expiry choices. No full key was printed or saved in screenshots. Prior zero-balance observations below are historical.

The authenticated model catalog confirms routing key nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B, a public endpoint, current processing region eu-north1, and rates matching the Prices view below. The runtime and acceptance plan now use the global API hostname per public endpoint guidance. The owner approved one synthetic request with zero paid-card allowance, no retry, a 5,000-output-token limit and 45-second timeout. Estimated cost USD 0.0018 uses a conservative 10,000-input-token allowance plus the output limit; this is not a tokenizer measurement or provider-enforced dollar cap.

Latest observation — October 29, 2026 (MYT): the owner completed billing setup. The authenticated console shows Billing Active and account balance $0.00. Transactions shows an October closing balance of $0.00. No promo credit is confirmed. The balance plus control opens a top-up dialog; selecting With promo code exposes a code field and Apply promo code. The assistant did not submit a card top-up or apply a guessed code. The application activation code is not assumed to be the final emailed redemption code. The owner was asked to check the university mailbox and enter any received voucher directly in the website. Earlier incomplete-billing notes below are historical.

Authenticated Prices view, October 29: filtering Nemotron-3-Nano lists Nvidia-Nemotron-3-Nano-30B-A3B Input at USD 0.06 per million tokens and Output at USD 0.24 per million tokens (both valid from January 1, 2026); Cached USD 0.012 per million tokens (valid from October 20). The displayed region is eu-north1. Prices exclude applicable taxes. These are observed console rates, not a confirmed quote for the acceptance plan's us-central1 endpoint. Resolve the regional rate and model availability before approval. At the displayed output rate, 5,000 output tokens alone would cost USD 0.0012; this excludes input and is not a total-cost estimate or dollar cap. No price-driven execution approval was created.

Prepared October 22; updated October 28, 2026 (Asia/Kuala_Lumpur). **The separate hackathon promo-code request was submitted successfully, and the owner subsequently completed Nebius authentication and email verification.** The console created default-project. Billing onboarding requires address, bank card and Services Agreement acceptance; the owner elected to complete this directly. Billing completion, Builder membership, credited balance, API key and real inference remain unverified. Personal values and screenshots are kept only in the excluded `private-onboarding/` folder.

## Official routes

| Route | Official source / destination | Observed state |
|---|---|---|
| Token Factory account | https://tokenfactory.nebius.com/ | October 28: owner authentication/email verification completed; default-project created; mandatory billing setup awaits owner completion |
| Hackathon-specific USD 25 credit request | [Official promo form](https://nebius.com/promo-code?utm_promo_activation_code=NEBIUS-DEVPOST-GLOBAL26&utm_promo_code_type=Token_Factory&utm_promo_event_code=2026-devpost-global-ai-hack) | Submitted once October 28; official receipt: Form submitted / The promo code will be emailed to you. Grant and credited balance remain unverified |
| Builder Program | https://dev.nebius.com/builders#form | Required fields prefilled October 25; terms and marketing unchecked; Register not clicked; browser tab retained for owner action |

The official hackathon resource page lists USD 25 via the promo request using activation code **NEBIUS-DEVPOST-GLOBAL26**, plus another USD 25 through Builder Program. The Builder page independently lists USD 25 Token Factory credit. These are advertised offers, not confirmed grants, stacking entitlement or an account balance. Verify approval, expiry and actual credited amount after the owner completes the relevant steps.

## Actual Builder Program field map

| Field observed in browser | Prepared value / owner input |
|---|---|
| First name * | Owner-provided value filled without reversing name order |
| Last name * | Owner-provided value filled without reversing name order |
| Email * (previously Work or University Email) | Owner-provided university address entered; private screenshot available for final verification |
| Country * | Malaysia, explicitly confirmed by owner |
| Your company, university or organization * | Multimedia University, based on the supplied school domain and [official university contact page](https://www.mmu.edu.my/contact-info/); owner should review before submission |
| Organization website | Optional; leave blank if no authorized public URL |
| Job title * | Student, as supplied by owner |
| GitHub profile URL * (previously Your GitHub ID) | Owner-supplied full profile URL filled |
| Your LinkedIn profile link | Optional; leave blank unless supplied |
| What are you building? * | **AI apps and agents** is the observed matching option |
| Agree to Builder Program terms * | Leave unchecked until owner reviews the [actual terms](https://nebius.com/builders-terms-and-conditions) and approves acceptance |
| Product/event marketing | Optional; do not select by default |
| Register | Not clicked |

The program form did not expose a project-description textarea. Do not describe the following draft as a submitted field. If a later credit form asks for a project/use-case summary, this English text is ready for owner review:

> IncidentAtlas is a local incident-review application for engineers. It turns supplied logs, deployment changes and runbooks into a timeline, candidate explanations and read-only investigation suggestions, with exact source-line references. We plan to use NVIDIA Nemotron through Nebius Token Factory for structured draft analysis, then validate citations before displaying results. The first acceptance run will use only fictional incident data, with one request, a 5,000-token output cap and no automatic retry. The local application and offline demonstration are working; live Nebius inference has not yet been validated.

## Shortest next steps

1. Profile details and form prefill are complete. Owner reviews the live form and screenshots. The supplied name order was preserved; university name was resolved from the provided domain. Do not provide passwords, OTPs, card data or API keys in chat.
2. Owner completes sign-in / account creation and reviews required terms. If standard onboarding asks for a card, billing consent or payment, complete that directly only after reviewing the current account conditions. The assistant has not authorized any payment or accepted any agreement.
3. Owner personally accepts Builder Program terms and clicks Register after review: the [actual terms](https://nebius.com/builders-terms-and-conditions), Section H.2(e), prohibit automated signups. The separate promo request was submitted successfully October 28 under the owner's instruction to proceed; do not resubmit it. Optional telephone had only the default country prefix; all three marketing options remained unchecked. The receipt does not prove account registration, a credit grant, top-up or inference.
4. After confirmation email / credit approval, verify the actual Token Factory balance and expiry in the account. No credit is assumed before this durable signal.
5. Create a project-appropriate key through the official API-key page, keep it only in local `.env`, and review `LIVE-ACCEPTANCE.md` before the single inference request. Program membership does not itself prove account/API access or model availability.

## Observed browser limitations

October 22 history: Builder page initially reported a navigation timeout but was readable in its existing tab. Rejecting the cookie prompt exposed the HubSpot registration form. The promo page showed an empty white form container. Token Factory's logged-out landing page loaded, but the Log in click and a subsequent state recovery both timed out and reset browser control. No authentication success, entered identity, acceptance, credit balance or registration success signal was observed then. Browser retries were stopped after this repeated failure; no cookies, hidden session data or alternate automation channel was used.

October 25 follow-up: browser inventory recovery succeeded and a fresh Builder page loaded. The required fields were filled in the actual page, using direct DOM filling to correct unexpected text observed during the first input pass. Screenshots show the owner-provided name order, university/student/Malaysia selections and GitHub URL; the email control displays the entered university address but clips its full width in the screenshot. The email accessibility value is redacted, so no byte-for-byte DOM-value verification is claimed. Owner should check the complete address before submitting. Terms and marketing checkboxes remain visibly unchecked. Screenshots and any personal review data are excluded from Git and source archives.

The promo page's genuine embedded form subsequently loaded. Its fields are First name, Last name, Email, optional Phone number, Job title, Company name, optional Company website, Activation code, three optional marketing topics and Submit. The supplied profile and activation code were reviewed in screenshots, and submitted once October 28. The official success receipt states the promo code will be emailed. No subscriber phone number or website was supplied; marketing remained unchecked. This is the actual promo form, not the footer newsletter.

October 28 login follow-up: the owner completed GitHub authentication and email verification directly. The assistant filled the supplied university in profile setup, selected Events and enabled zero data retention. Continue completed profile initialization; the console created default-project. Billing setup then required legal name, residence country/address, bank card and Services Agreement acceptance. It describes a temporary $0 authorization, which does not eliminate later usage charges. The owner elected to fill and accept billing directly. No assistant password/OTP/card entry, billing agreement acceptance, API-key creation or inference occurred. The authenticated email differs from the promo-application university email; verify promo eligibility and account applicability before assuming a grant.

## Billing reference

The [official billing documentation](https://docs.tokenfactory.nebius.com/other-capabilities/billing-new), rechecked October 28, says billing setup and a bank card are mandatory during standard onboarding. It describes $1 trial credit valid for 30 days and automatic card charging for negative balances at month start or at the configured threshold. The [official event resources](https://nebiusglobalaihackathon.devpost.com/resources) advertise the promo and Builder offers but do not state an exemption from card onboarding. No documented card-free path was established in this review. Promo redemption is documented under balance → Top up → With promo code; verify the resulting Transactions entry and actual balance. No current exact per-token price or credited grant has been asserted.
