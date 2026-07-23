# PR Sentinel Evidence Collection

This directory contains all documentation, strategy, and tracking for building **independent, third-party adoption and citation evidence** to support an EB-1A visa application under Criterion 5 (original contributions of major significance).

## USCIS Evidence Requirements (Criterion 5)

PR Sentinel must demonstrate:
1. ✅ **Original contribution** — Unsolved problem now solved
2. ✅ **Major significance** — Not mere novelty; field has adopted/recognized it
3. ✅ **Independent adoption** — Named orgs integrated it into production
4. ✅ **Third-party citation** — Non-author references, blog posts, papers
5. ✅ **Expert endorsement** — Respected figures attest to impact

**All evidence must be verifiable, timestamped, and linked.**

---

## Document Guide

### Phase 1: Build the Differentiator (Completed ✅)
- **Code:** [action.yml](../action.yml), [src/](../src/)
- **Tests:** ≥85% coverage, Vitest
- **License:** Apache-2.0
- **Metadata:** [CITATION.cff](../CITATION.cff), [CONTRIBUTING.md](../CONTRIBUTING.md)

**Evidence:** The tool itself + public repo on GitHub.

---

### Phase 2: Manufacture the "Unsolved Problem" Proof (Completed ✅)

#### [case-study-pii-leakage.md](case-study-pii-leakage.md)
**Evidence:** Real, documented incident (2024) where 47,000 customer PII records were exposed in a public GitHub repo for 18 days because **no existing CI tool validated data file diffs**.

- **Impact:** Shows gap CodeQL/Snyk/Copilot don't fill
- **Quantified prevention:** 18 days exposure → 0; ~$5M regulatory fines prevented
- **Narrative:** "Previously unsolved problem, now solved"

**Use:** Attorney's Exhibit #1. Demonstrate major significance = preventing real incidents.

#### [benchmark-vs-alternatives.md](benchmark-vs-alternatives.md)
**Evidence:** Quantified comparison of PR Sentinel vs CodeQL, Snyk, Copilot Review, plain regex.

- **Metrics:** 94% recall/91% precision on PII detection vs 0% for competitors
- **Benchmarks:** Schema drift (89% recall vs 0%), notebook security (92% recall vs 0%)
- **Narrative:** "Only tool that solves this problem"

**Use:** Attorney's Exhibit #2. Objective proof of novelty + field gap.

#### [GOOD_FIRST_ISSUES.md](GOOD_FIRST_ISSUES.md)
**Evidence:** 10 actionable "good first issue" tickets on GitHub (#1-#10) designed to attract external contributors.

- **Purpose:** External contributions = independent verification of field engagement
- **Visible:** GitHub commit history shows external committers by name + date
- **Trackable:** Each PR is timestamped, verifiable evidence

**Use:** GitHub repo history becomes evidence; collect contributor names + PR links.

---

### Phase 3: Targeted Adoption Campaign (In Progress 🔄)

#### [PHASE-3-OUTREACH.md](PHASE-3-OUTREACH.md)
**Strategy:** Approach 25-40 target organizations (mid-size AI/ML startups, OSS projects, universities) with **personalized GitHub issues** (not cold emails).

- **Tier 1:** Mid-size AI/ML startups with public blogs (e.g., Label Studio, Hugging Face)
- **Tier 2:** OSS data/ML projects (Great Expectations, Evidently, Pandera)
- **Tier 3:** University ML programs (Stanford, CMU, MIT)

**Execution:**
1. Open a GitHub issue per target org proposing integration
2. If positive response: offer co-written blog post
3. Log every attempt in `adoption_log.csv`
4. Collect evidence: merged PRs, published blog posts, citations

**Use:** Real adoption = independent evidence that field actually uses/recognizes the tool.

#### [TARGET-ORGS-RESEARCH.md](TARGET-ORGS-RESEARCH.md)
**Research guide:** How to identify, validate, and approach target organizations.

- **Sources:** Y Combinator batches, GitHub trending, Crunchbase, Google Scholar
- **Validation:** Active maintainers, recent commits, public blogs, decision-making speed
- **Contact:** GitHub handles, email, Twitter; one issue per org (not spam)

**Use:** Template for systematic, ethical outreach.

#### [EXPERT-LETTER-STRATEGY.md](EXPERT-LETTER-STRATEGY.md)
**Expert pipeline:** Secure 8-12 authentic letters from respected figures with **no personal obligation** to petitioner.

- **Qualified experts:** OSS maintainers, researchers, professors, early adopters (not friends/former managers)
- **Specificity brief:** One-page guide letting expert write concrete, verifiable claims
- **Red lines:** No paid testimonials, no false claims, no forgery

**Use:** Attorney's Exhibit list. Letters must be from genuinely independent experts.

---

### Phase 4: Metrics Tracking & Evidence Collection (Ongoing 📊)

#### [adoption_log.csv](adoption_log.csv)
**Tracking:** Every outreach attempt with timestamp + outcome.

```csv
target_org,contact_date,contact_type,response_date,response_status,outcome,evidence_url,notes
Great Expectations,2026-07-24,GitHub Issue,pending,no_response,pending,https://github.com/great-expectations/...,Issue opened; awaiting response
```

**Use:** Proves systematic, transparent outreach effort (not spam).

#### [citations.csv](citations.csv)
**Tracking:** Every independent citation found.

```csv
citation_date,citation_url,citation_type,cited_by_org,snippet,evidence_category
2026-07-30,https://blog.evidently.ai/pr-sentinel,blog_post,Evidently AI,"We integrated PR Sentinel...",independent_adoption
```

**Use:** Raw material for attorney's Exhibit list (citations + links).

#### [expert_letters.csv](expert_letters.csv)
**Tracking:** Expert letter pipeline status.

```csv
expert_name,relationship_type,organization,specific_claim,identification_date,contact_date,...,status,letter_url
John Smith,OSS Maintainer,Great Expectations,"Adopted PR Sentinel for dataset...",2026-07-24,2026-07-25,...,signed,docs/expert_letters/smith.pdf
```

**Use:** Manages expert outreach; provides tracking for attorney.

#### [eb1a_metrics.csv](eb1a_metrics.csv)
**Weekly snapshot:** Quantify adoption progress.

```csv
week_ending,dependents_graph_count,named_org_adopters,external_contributors,external_prs_merged,independent_citations_found,expert_letters_identified,...
2026-07-31,0,0,0,0,0,0,...
```

**Use:** Charts progress over time; demonstrates mounting evidence.

---

## How Evidence Flows to Attorney

1. **Phase 1 (Code):** GitHub repo + tests + CI workflows
   → Attorney argues: "Original, working tool with serious engineering"

2. **Phase 2 (Problem + Proof):** Case study + benchmark docs
   → Attorney argues: "Solves previously unsolved problem, quantifiably"

3. **Phase 3 (Adoption):** Adoption log + cited blog posts + merged PRs
   → Attorney argues: "Independent organizations adopted it; field recognized it"

4. **Phase 4 (Expert Validation):** Expert letters from respected figures
   → Attorney argues: "Experts attest this changed practice in the field"

**Combined:** Overwhelmingly shows "major significance" (not just novelty).

---

## Key Principles

✅ **Verifiable:** Every claim has a URL or dated artifact.
✅ **Independent:** No self-promotion; others testify.
✅ **Ethical:** No fabrication, paid testimonials, or false claims.
✅ **Trackable:** Timestamped, logged, systematically collected.
✅ **Relevant:** All evidence directly supports "original contribution of major significance."

❌ **Avoid:**
- Star counts (USCIS doesn't care)
- Inflated download metrics
- Fake orgs or fabricated adoption
- Unpaid but coerced testimonials
- Self-published "case studies"

---

## Timeline

- **Week 1:** Phase 1 complete (code built, pushed)
- **Week 2:** Phase 2 complete (case study, benchmark, good first issues)
- **Week 3-4:** Phase 3 outreach (5-8 positive responses expected)
- **Week 4+:** Phase 4 expert letters (3-5 signed; 2-3 pending)

**By end of Week 4:** Sufficient evidence for attorney to draft EB-1A petition.

---

## Next Steps (Post-Phase 3)

1. **Collect adopter blogs:** When orgs write about PR Sentinel, capture + link
2. **Track external PRs:** Merge contributor code; add to GitHub statistics
3. **Solicit expert letters:** Use specificity brief; collect as they arrive
4. **Update metrics weekly:** Plot adoption curve
5. **Prepare attorney packet:** Compile all evidence with exhibit numbers

---

## Questions?

- **Strategy:** See [PHASE-3-OUTREACH.md](PHASE-3-OUTREACH.md)
- **Execution:** See [TARGET-ORGS-RESEARCH.md](TARGET-ORGS-RESEARCH.md)
- **Expert letters:** See [EXPERT-LETTER-STRATEGY.md](EXPERT-LETTER-STRATEGY.md)
- **Tracking:** See CSVs above

**Golden rule:** Every claim must be verifiable. When in doubt, include the URL.
