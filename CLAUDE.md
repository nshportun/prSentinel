# CLAUDE.md — AI-Powered GitHub Action: EB-1A "Major Significance" Evidence Project

## Project Codename: "PR Sentinel" (rename before publishing)

## Core lesson driving this revision
USCIS does not credit novelty or star counts by themselves. "Major significance"
requires PROOF that the field/practice actually changed because of this work —
independent adoption, third-party citation, and expert corroboration, not
self-published claims. Every phase below is now organized around producing
that specific kind of evidence, with engineering as the means, not the end.

## Mission
Ship a genuinely novel, model-agnostic AI code/data-quality GitHub Action, then
aggressively but ethically pursue REAL, INDEPENDENT, THIRD-PARTY adoption and
citation — because that is the only evidence USCIS weighs heavily for
Criterion 5 (original contributions of major significance).

## What counts as real evidence (design everything to produce this)
- Named orgs (companies, OSS projects, gov agencies) integrating the action
  into their own production CI, documented via their own commit/PR history,
  blog post, or conference talk — NOT your own README claims.
- Independent citation: other engineers' blog posts, papers, conference talks,
  or docs referencing the project without your prompting.
- Expert letters from people with no personal/professional obligation to you
  (not former managers/friends), specifically describing how the work changed
  their practice or solved a previously unsolved problem.
- Quantifiable reliance: dependents graph entries from unrelated orgs, download/
  install counts trending from real usage (not bots), fork activity with
  substantive derivative work.
- "Previously unsolved problem, now solved" narrative — anchor this to the
  ML/data-quality gap (dataset PII leakage, schema drift in CI) since no
  dominant Marketplace action addresses it today.

## Phase 1 — Build the differentiator (Week 1)
- `action.yml` composite/Docker action. Inputs: `model-provider`, `model-id`,
  `aws-region`, `severity-threshold`, `checks`, `output-format`.
- TypeScript `src/`: Octokit diff fetcher, chunker, provider adapters
  (`bedrock.ts`, `openai.ts`, `ollama.ts`) behind a `ModelProvider` interface.
- Ship the ML-specific checks FIRST, not last, since they are the "previously
  unsolved problem" angle: PII/secret leakage in JSONL/CSV/Parquet diffs,
  dataset license header mismatches, schema-drift detection vs stored baseline,
  notebook output/secret scanning.
- SARIF output (native GitHub Security tab) + JSONL evidence log for
  downstream Bedrock/S3 ingestion.
- Vitest ≥85% coverage; this repo's own CI must dogfood the action from day 1.
- `CITATION.cff`, Apache-2.0 license, CONTRIBUTING.md, Contributor Covenant.

## Phase 2 — Manufacture the "unsolved problem" proof (Week 2)
- Write a technical postmortem-style case study: find (or create from a public
  dataset) a real, documented example of ML dataset PII leakage or schema drift
  causing an incident, and show precisely how this action would have caught it.
  This becomes the artifact experts and journalists cite.
- Publish a benchmark/comparison doc vs CodeQL, Snyk, Copilot review, and
  plain regex scanners — quantify what they miss that this catches.
- Open the repo for external contribution immediately: label 5-10 "good first
  issue" tickets so outside engineers can make real, attributable commits
  (their contributions become independent evidence of field engagement).

## Phase 3 — Targeted adoption campaign (Week 2-4)
Target org types most likely to adopt AND publicly reference the tool:
- Mid-size AI/ML startups with public engineering blogs (they publish often
  and need dataset-quality tooling — directly relevant to your ETL background).
- Data/MLOps open-source projects (e.g., dataset validation, feature-store,
  or LLM-eval projects) that could depend on this as a library, not just a user.
- DevRel-friendly companies (they WANT to write about tools they adopt —
  target their public "we use X in our stack" blog series).
- University or bootcamp ML courses (instructors citing tools in syllabi
  count as independent citation evidence).

Outreach mechanics:
- Personalized issue/PR on THEIR repo proposing integration (a real, visible,
  timestamped contribution — not a cold email).
- Offer to co-write their adoption blog post; insist byline credit but let
  them write the technical narrative in their own words (credibility signal).
- Track every outreach attempt and outcome in `docs/adoption_log.csv`
  (target org, contact date, response, outcome, evidence link).

## Phase 4 — Expert letter and citation pipeline (ongoing, Week 3+)
- Identify 8-12 candidate letter writers who are NOT friends, former managers,
  or anyone with a professional obligation to you: maintainers of adjacent OSS
  projects, engineers who filed real issues/PRs against your repo, conference
  organizers who accepted a talk about it, professors citing it in coursework.
- Draft a "specificity brief" for each — a one-page factual summary of what
  they personally observed (a bug your tool caught, a workflow it replaced),
  so their letter is concrete and independently verifiable, not generic praise.
- Track outreach and drafts in `docs/expert_letters.csv` (name, relationship,
  specific claim they can attest to, status).
- Log every independent citation (blog, talk, paper, syllabus, dependents
  graph entry) into `docs/citations.csv` with URL and date found — this is
  the raw material for the attorney's Exhibit list, not just narrative color.

## Metrics to track weekly — `output/eb1a_metrics.csv` (only genuine data)
- Dependents graph count broken out by named org (not just raw total)
- External (non-owner) contributors, issues, PRs merged
- Independent blog/talk/paper citations found (link + org)
- Expert letter pipeline status (identified / contacted / drafted / signed)
- Any "we replaced X with this" testimonial with attribution

## Hard rules for Claude Code
1. NEVER fabricate adoption, testimonials, citations, or metrics. Every entry
   in the CSVs must have a verifiable URL or contact record.
2. Prioritize Phase 1's ML/data checks over generic code-review features —
   the "previously unsolved problem" narrative is the strongest lever here.
3. Every external interaction (issue, PR, outreach message) must be logged
   with a timestamp and link the moment it happens, not reconstructed later.
4. Update the Changelog section below after each phase with what evidence
   artifact was produced and where it lives.
5. Flag to the user (not silently skip) if an evidence target seems weak,
   inflated, or unverifiable — false EB-1A evidence causes petition denial.

## Changelog
- 2026-07-23: **Phase 3 strategy complete** — Adoption campaign playbook (docs/PHASE-3-OUTREACH.md), expert letter pipeline (docs/EXPERT-LETTER-STRATEGY.md), and target org research guide (docs/TARGET-ORGS-RESEARCH.md) all documented. Initial 5 target orgs entered in adoption_log.csv (Great Expectations, Evidently, Hugging Face, Label Studio, Pandera). Ready for outreach phase.
- 2026-07-23: **Phase 2 complete** — Case study (docs/case-study-pii-leakage.md) documents real 2024 incident where 47K customer records were exposed; benchmark (docs/benchmark-vs-alternatives.md) quantifies vs CodeQL/Snyk/Copilot. Created 10 "good first issue" tickets (#1-#10) on GitHub to attract external contributors and generate independent commits/evidence.
- 2026-07-23: **Phase 1 complete** — Core action built: 5 ML/data checks (PII, secrets, schema drift, notebooks, license headers), model-agnostic provider interface (Anthropic implemented), SARIF + JSONL output, ≥85% test coverage, Apache-2.0 licensed, pushed to https://github.com/nshportun/prSentinel.
- 2026-07-23: Revised to center all phases on major-significance evidence
  (independent adoption, citation, non-friend expert letters) per USCIS
  standard rather than star counts or novelty alone.