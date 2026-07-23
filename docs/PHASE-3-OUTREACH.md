# Phase 3: Targeted Adoption Campaign

**Goal:** Secure real, independent, named org adoption + citation evidence for EB-1A.

**Timeline:** 2 weeks (Weeks 2-4 of project)

---

## Target Organization Profile

Focus on orgs most likely to:
1. **Actually use the tool** (solves a real data-quality pain)
2. **Publicly reference it** (publish blog, cite in docs, talk at conference)
3. **Generate attributable GitHub evidence** (PRs/commits from their team)

### Tier 1: High-Probability Targets

**Type: Mid-size AI/ML startups with public engineering blogs**

- Solve dataset quality problems in production
- Publish regularly on their engineering blog
- Have public GitHub repos with data/ML workflows
- Decision-making speed: <2 weeks

**Examples to research:**
- Companies in Y Combinator recent batches (data/AI focus)
- Series A/B ML infrastructure startups
- Search: "MLOps platform," "feature store," "dataset validation"
- Filter: "We use X in production" blog posts

**Why:** They directly benefit from PII/schema checks, and DevRel teams love blogging about new tools.

### Tier 2: Data/MLOps Open-Source Projects

- Actively maintained dataset validation, ML testing, or feature-store projects
- Maintainers with 1K+ GitHub followers
- Repos with 1K+ stars (growing, but not mega-projects)
- Natural integration point: PR checks for contributor datasets

**Examples to research:**
- Great Expectations, Evidently, Pandera (schema validation)
- MLflow, Prefect, Airflow (ML orchestration)
- Hugging Face Datasets, TFDS (dataset distribution)

**Why:** Using PR Sentinel becomes part of their CI; you get a dependents graph entry.

### Tier 3: University ML/Data Science Programs

- Actively teaching ML/data practices
- Instructors publishing syllabus or course materials publicly
- Encouraging students to contribute to open projects

**Examples to research:**
- Stanford AI Index, MIT 6.S897 (ML for Production)
- UC Berkeley MIDS, CMU ML Engineering
- Search for publicly posted course materials on GitHub

**Why:** Instructor citing tool in coursework = independent evidence.

---

## Outreach Strategy

### Step 1: Personalized Issue/PR (Not Cold Email)

Create a **real, visible, timestamped contribution** to their repo proposing integration:

**Example Issue Template:**

```
Title: [Suggestion] Use PR Sentinel for dataset diff validation in CI

Body:
I noticed you're accepting dataset contributions in your repo.
I built PR Sentinel — a GitHub Action that catches PII leakage, schema drift, 
and secret exposure in ML dataset diffs.

Thought it might be useful for validating contributor submissions. Here's an example:
- [Link to case study showing real incident it would have caught]
- [Link to benchmark vs CodeQL/Snyk]

Would you be interested in integrating it? Happy to:
1. Open a PR adding the workflow to your CI
2. Help troubleshoot any edge cases
3. Co-write an adoption blog post if you decide to use it

Let me know!
```

**Why this works:**
- Not spam; solves a real problem they have
- Visible in their repo; tracked by GitHub
- Demonstrates initiative and understanding of their codebase
- Easy "no" if not interested; easy "yes" to collaborate

### Step 2: Offer Co-Written Adoption Blog Post

**If they express interest:**

"I'd love to write a blog post with you about how you integrated it. You lead the narrative — I just make sure the technical details are accurate. Your byline, your voice."

**Why:**
- They get free content for their blog
- Blog post = independent citation
- Their audience discovers the tool organically
- Timestamps and links are verifiable

### Step 3: Log Everything

Every outreach attempt goes into `docs/adoption_log.csv`:

```csv
target_org,contact_date,contact_type,response_date,response_status,outcome,evidence_url,notes
Great Expectations,2026-07-24,GitHub Issue,2026-07-25,positive,merged PR,https://github.com/great-expectations/great_expectations/pull/123,Added PR Sentinel to CI; email for blog post follow-up sent 2026-07-26
Evidently AI,2026-07-24,GitHub Issue,2026-07-26,no_response,pending,https://github.com/evidentlyai/evidently/issues/456,Sent reminder 2026-07-31
Stanford AI Index,2026-07-25,Email to prof,2026-07-27,positive,mentioned in syllabus,https://github.com/stanford-ai-index/2026-report,Added citation to course materials
```

---

## Execution Checklist

### Week 1 (Prep)
- [ ] Identify 15-20 Tier 1 targets (mid-size ML startups)
- [ ] Identify 10-15 Tier 2 targets (OSS projects)
- [ ] Identify 5-10 Tier 3 targets (university programs)
- [ ] Research contact: GitHub maintainer username, Twitter, email

### Week 2 (Initial Outreach)
- [ ] Create issues/PRs on 5 Tier 1 targets
- [ ] Create issues on 5 Tier 2 targets
- [ ] Email 3 university instructors
- [ ] Log all attempts in adoption_log.csv
- [ ] Track responses

### Week 3 (Follow-Up)
- [ ] Check for responses from Week 2
- [ ] Send follow-up to non-responders (if appropriate)
- [ ] For positive responses: offer co-written blog post
- [ ] For merged PRs: request credit in their release notes
- [ ] Identify citations in their blog/docs
- [ ] Log outcomes

### Week 4 (Blog & Citation Harvest)
- [ ] Co-write blog posts with adopters
- [ ] Publish on their platforms
- [ ] Scan for independent citations (Twitter, HN, Reddit)
- [ ] Update citations.csv with links
- [ ] Update metrics dashboard

---

## Evidence Collection Template

When adoption happens, document:

1. **GitHub Evidence:**
   - Link to their PR/issue (visible commit history)
   - Their contributor name + timestamp
   - Optional: their release notes mentioning the tool

2. **Blog Post Evidence:**
   - Link to published post
   - Author (their team), date, org attribution
   - Screenshot (PDF backup) in case link dies

3. **Citation Evidence:**
   - Link to syllabus / docs / blog
   - Quote or snippet showing PR Sentinel referenced
   - Organization name

Example entry in `docs/citations.csv`:

```csv
2026-07-30,https://blog.evidently.ai/pr-sentinel-case-study,blog_post,Evidently AI,"We integrated PR Sentinel to validate dataset schemas in our open-source data validation library. It caught 3 breaking changes before they reached users.",independent_adoption
2026-07-31,https://github.com/stanford-ai-index/2026-report/blob/main/syllabus.md,course_syllabus,Stanford AI Index,"Students are required to use PR Sentinel when submitting dataset PRs to the course repo.",academic_citation
```

---

## Messaging Guidelines

### DO:
- Lead with **their problem, not your tool**
- Show you understand their codebase/workflow
- Emphasize **unsolved problem**: "This is the first tool that validates dataset diffs"
- Offer co-authorship (their narrative, your expertise)
- Make it easy to say yes (link to case study, docs, example)

### DON'T:
- Cold email lists ("You might be interested...")
- Emphasize star counts or "novel" features
- Ask for testimonials upfront
- Offer payment/kickbacks (ethical red flags)
- Spam (one issue per org; respect "no thanks")

---

## Success Metrics

By end of Phase 3, target:

- **5-8 named org adopters** (GitHub evidence)
- **3-5 blog posts** published by partner orgs (independent citation)
- **2-3 expert letters** from maintainers (authentic, not written by you)
- **10+ citations** on Twitter/HN/GitHub discussions (organic discovery)
- **50K+ impressions** across partner blogs

**All verifiable, timestamped, linked.**

---

## Red Flags to Avoid

- **Fabricated adoption:** Don't create fake commits/orgs
- **Inauthentic quotes:** Don't misquote or cherry-pick blog text
- **Inflated metrics:** Don't buy stars, forks, or downloads
- **Paid citations:** Don't pay for blog posts or testimonials
- **Fake experts:** Don't impersonate or pressure people into letters

USCIS flags false EB-1A evidence and can result in petition denial.
