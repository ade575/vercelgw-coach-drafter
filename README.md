# GorryWell — Ruang Rencana

A two-page meal-planning prototype for user preferences and professional review. Indonesian interface, three clearly labelled synthetic users, and seven-day meal drafts informed by a fourteen-day history.

## Run locally

Node.js 22+ (Vercel project: 24.x), npm.

```bash
npm ci
npm run dev
```

Open `/pelatih` for the coach and `/pengguna` for the user. Both views use the same versioned browser localStorage. No database, account login, external messages, or real users are connected. Data persists on that browser and origin only; different devices and preview/production URLs have separate data. Storage events keep open tabs on the same origin in sync.

## Test the full flow

1. Open user preferences, select a sample person, change and save preferences.
2. Open the coach page for that person; inspect preferences and expand the synthetic daily history.
3. Set a plan start date and optional professional energy target/instructions.
4. Select `Contoh lokal · tanpa AI` and create a draft. This deterministic catalog-based mode uses dietary restrictions, allergies, meal frequency, ingredient dislikes, budget, and preparation limits. It stores free-text instructions and calorie targets but does not optimize them; the UI says so.
5. Change a meal or serving and save the draft. Unsaved edits can be included directly in the approval step.
6. Confirm review and choose `Setujui & kirim`. Confirm in the dialog. This publishes the reviewed snapshot to the prototype user page only; it sends no email, push, or message to a real person.
7. Open `Rencana dari pelatih` on the user page.
8. Change preferences and return to the coach: stale drafts are flagged and cannot be sent. Previously sent plans remain intact. Regeneration replaces the current draft and preserves sent versions (latest ten per user).

## Activate actual OpenAI generation

Example mode requires no environment variables. For live generation, set these **server-side Vercel environment variables**, then redeploy:

- `OPENAI_API_KEY`: your own OpenAI project key.
- `COACH_ACCESS_CODE`: a private coach generation passphrase (required for the public endpoint).
- `OPENAI_MODEL`: optional, defaults to `gpt-6-luna`.

Enter only the coach passphrase in the coach page when AI mode is selected. The OpenAI key stays server-side. Do not put it into chat, committed code, or a `NEXT_PUBLIC_` variable. Keep real data out of this public prototype repository.

The endpoint uses the OpenAI Responses API, low reasoning and verbosity, strict JSON schema, `store:false`, no tools, no retries/fallback spending, a 105-second upstream timeout, and a 6,500-token output cap. All model-selected dishes are validated against the dietary-filtered catalog. No AI output is auto-published. Provider refusal, invalid JSON, incomplete output, and upstream errors produce visible errors; they are never silently converted into an AI-labelled example.

The browser receives actual input/output/reasoning usage. Reasoning is already included in output tokens. No exact nutrition or medical suitability claim is made; catalog values are prototype estimates. Professional review remains necessary, including ingredient brands and cross-contact.

This is a role-switching demo, not multi-tenant authentication. A shared generation code limits casual access but does not authenticate individual coaches or provide durable rate limiting. Add real authentication, authorization, database persistence, request idempotency, and provider spend limits before exposing live generation to a wider audience. Preference and plan data sent to the model is treated as untrusted data, with constraints taking precedence over free text.

## History imports

Use the coach panel's `Unduh contoh JSON` to get the exact supported format, then `Impor riwayat`. The first version accepts normalized JSON arrays only (1–14 unique daily rows, at most a fourteen-day interval, <=40 KB):

```json
[
  {
    "date": "2026-10-14",
    "meals": ["Roti telur", "Nasi ayam", "Sup sayur"],
    "calories": 1750,
    "vegetables": true,
    "boughtLunch": true,
    "sleepHours": 7,
    "steps": 5600
  }
]
```

Use `null` for unobserved numerical/boolean measurements and `[]` for missing meal logs; never fill missing days with zero. Energy averages use only days with meal records and an energy value, and are always labelled as recorded intake rather than actual daily requirements. The UI shows source and coverage. Raw GorryWell exports require a separate mapper once their actual schema is provided.

## Structure

- `components/user-workspace.tsx`: preference questionnaire, sent-plan view.
- `components/coach-workspace.tsx`: profiles, history/import, generation, editing and approval.
- `components/plan-viewer.tsx`: weekly schedule and catalog-constrained editor.
- `components/store.tsx`: versioned browser state and cross-tab synchronization.
- `lib/model.ts`: validated preferences, history, generation and plan schemas.
- `lib/catalog.ts`: sample Indonesian dishes and estimated nutrition/cost/allergens.
- `lib/planner.ts`: filtering, history aggregation, example generation, output validation.
- `lib/seeds.ts`: synthetic profiles/history, generated relative to Jakarta date on first use.
- `app/api/generate/route.ts`: server-only live AI generation.
- `app/api/config/route.ts`: non-secret availability flags.

Exercise and grounding are shown as future planners, not clickable unfinished features. No Batch API, wearable connections, automatic schedule, or authentication system is included.

## Verification

```bash
npm run typecheck
npm test
npm run build
```

Tests cover all three sample profiles, missing-data handling, unknown/contradictory allergies, allergen rejection of model output, duplicate days/slots, dietary filtering and date arithmetic.
