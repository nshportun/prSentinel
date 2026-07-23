# Expert Letter Pipeline Strategy

**Goal:** Secure 8-12 authentic expert letters from respected figures who can independently attest to PR Sentinel's original contribution and impact.

**Critical:** USCIS requires experts with **no personal/professional obligation** to the petitioner. Letters from friends, former managers, or direct colleagues will not be weighted heavily.

---

## Who Qualifies as an "Expert Witness"

### Strong Candidates (≥50% weight):
- **Maintainers of adjacent OSS projects** who adopt/cite PR Sentinel
  - Credibility source: They evaluated the tool, decided it solved a real problem
  - Relationship: Professional arm's-length, not friends
  - What they attest: "This tool catches issues our users were facing"

- **Researchers/professors** citing the tool in published work
  - Credibility source: Academic rigor, peer review of citations
  - What they attest: "PR Sentinel fills a gap in ML data governance"

- **Conference speakers/organizers** accepting talk about the tool
  - Credibility source: Independent review of topic relevance
  - What they attest: "This represents meaningful progress in data security"

- **Early-stage users from unrelated orgs** (not investors, not friends)
  - Credibility source: Independent discovery and adoption
  - What they attest: "We switched from [old tool] to PR Sentinel because..."

### Weak Candidates (avoid):
- Former colleagues/managers
- Family members
- People you met at conferences (even if brief)
- Anyone with a personal relationship to you
- Paid testimonials

---

## The "Specificity Brief" Approach

**Problem:** Generic letters ("This tool is great!") carry little weight.

**Solution:** Provide a one-page **specificity brief** that allows the expert to write a concrete, independently verifiable letter.

### Specificity Brief Template

```
CONFIDENTIAL — FOR EXPERT LETTER WRITER ONLY

Context:
I built PR Sentinel, an AI-powered GitHub Action that validates data quality in ML diffs.
It detects PII leakage, schema drift, secrets, and malformed datasets.

Request:
I'm applying for an EB-1A visa, which requires evidence of "original contribution of major significance."
Part of that evidence is letters from respected experts attesting that my work solved a previously 
unsolved problem or changed practice in the field.

Specific Claim I'd Like You to Attest To:
[Choose one]:
- "Your project [X] adopted PR Sentinel to solve [specific problem], which previously required 
  manual review / was unsolved / used a less effective tool."
- "PR Sentinel fills a gap in ML data governance that no existing tool adequately addresses."
- "Using PR Sentinel in your workflow has demonstrably improved data quality / reduced incidents."

What I'm NOT asking:
- Testimonials that aren't true
- Exaggeration of impact
- Personal favors or inflated praise
- Anything that misrepresents your actual experience

What I AM asking:
- Your honest assessment of the tool's utility for your specific use case
- Specific examples of problems it solved or gaps it filled
- Any caveats or limitations you've noticed

If you're not comfortable writing a letter, that's totally fine — just let me know.
Otherwise, here's what I'd love you to include:

---

Optional Letter Structure (not a template — your words):
1. Your background / why you're qualified to assess this
2. The specific problem you were facing (data quality, PII risk, schema validation, etc.)
3. How PR Sentinel addressed that problem
4. Impact on your workflow / adoption decision
5. Any limitations or caveats you've observed
6. Whether you believe this represents an original contribution

---

Timing: I'd need the letter by [date]. No length requirement.
Format: Email is fine; letterhead optional but nice.

Thank you for considering this!
```

---

## Candidate Identification Checklist

**Who to approach:**

- [ ] **OSS Project Maintainers** who respond positively to PR Sentinel issues
  - Only reach out if they've expressed interest / said yes to adoption
  - They have credibility; their adoption is independent verification

- [ ] **Researchers** publishing work on data governance, ML ops, or dataset validation
  - Search Google Scholar: "data quality," "PII detection," "ML governance"
  - Look for recent papers (last 2 years)
  - Check if they cite related work; see if PR Sentinel fits

- [ ] **Conference Talk Speakers** in ML/data/security space (last 12 months)
  - Search YouTube: "machine learning," "data quality," "data governance"
  - Look for talks about dataset management, ML testing, data validation
  - Speakers are used to public statements; likely willing to write letters

- [ ] **University Instructors** teaching ML/data courses with published materials
  - They have tenure/credibility; independent from you
  - If they cite your tool in coursework, they have specific expertise to attest

- [ ] **Early Adopters** from unrelated organizations (if they agree publicly)
  - Must have **no existing relationship** to you
  - Their adoption was independent (they chose the tool)
  - They can attest to solving real problems

**Who to avoid:**

- [ ] Former colleagues, managers, or direct reports
- [ ] People you've worked with in any paid capacity
- [ ] Friends or acquaintances
- [ ] Anyone who would benefit financially from your visa approval
- [ ] People you just met at a conference

---

## Letter Collection Workflow

### Phase 1: Identification (Week 2-3)
- [ ] List 15-20 potential experts
- [ ] Research each: background, credibility, relevance
- [ ] Verify no personal/professional relationship
- [ ] Identify **specific claims** they can attest to (not generic)

### Phase 2: Outreach (Week 3)
- [ ] Draft email introducing yourself and the request
- [ ] Attach specificity brief
- [ ] Make clear: no pressure, totally fine to decline
- [ ] Suggest letter format but emphasize they write in their own words
- [ ] Provide a deadline (2-3 weeks out)

### Phase 3: Follow-Up & Collection (Week 4+)
- [ ] Check in after 1 week if no response
- [ ] Offer to answer questions
- [ ] Collect letters as they arrive
- [ ] Store originals + scans in `docs/expert_letters/`
- [ ] Update tracking spreadsheet

---

## Tracking in `docs/expert_letters.csv`

```csv
expert_name,relationship_type,organization,specific_claim,identification_date,contact_date,draft_sent_date,signed_date,status,letter_url,notes
John Smith,OSS Maintainer,Great Expectations,"Adopted PR Sentinel for dataset validation",2026-07-24,2026-07-25,2026-07-25,pending,draft_sent,docs/expert_letters/john-smith-ge.pdf,"Emailed specificity brief; awaiting response"
Jane Doe,Researcher,MIT-CSAIL,"PR Sentinel fills gap in ML data governance",2026-07-24,pending,pending,pending,identified,none,"Paper on data validation; will reach out Week 3"
Dr. Bob,Professor,Stanford,"Considering adding to CS329S curriculum",2026-07-24,2026-07-25,2026-07-26,pending,draft_sent,none,"Expressed interest in teaching data quality; specificity brief sent"
```

---

## What the Letter Should Include (Examples)

### Example 1: OSS Maintainer
> "I'm the lead maintainer of Great Expectations, a widely-used data validation library used by 50K+ engineers. We evaluated PR Sentinel and integrated it into our CI pipeline because it solved a problem we couldn't address with existing tools: detecting PII leakage in dataset diffs at scale. Before PR Sentinel, we relied on manual code review and regex scanners, which missed real incidents. Since adopting it, we've caught 3 breaking schema changes and 2 potential PII exposures before they reached users. This represents a meaningful improvement in data security practice for the ML community."

### Example 2: Researcher
> "I research data governance in ML systems at MIT. PR Sentinel addresses a previously unsolved problem: semantic PII detection in versioned datasets. Existing tools (CodeQL, Snyk, Copilot) don't inspect data files; regex-only solutions have high false positive rates. PR Sentinel's LLM-powered approach represents original work that advances the field. I'm incorporating it into my research on dataset governance."

### Example 3: Early Adopter
> "We use PR Sentinel at [Company] to validate ML dataset diffs before they reach production. It detected a PII exposure in our training data that would have cost us $500K in incident response. Prior to adopting this tool, we had no automated way to catch such issues. This represents a genuine advance in ML ops tooling."

---

## Red Flags & Ethics

**Do NOT:**
- Pay for letters
- Ask someone to say things they don't believe
- Misrepresent someone's background or credibility
- Create fake letters or forge signatures
- Pressure someone into writing

**These are automatic disqualifications for EB-1A.**

---

## Expected Outcome

By end of Phase 4, you should have:
- 3-5 letters from **named OSS maintainers** (adoption evidence)
- 2-3 letters from **researchers/professors** (academic credibility)
- 2-3 letters from **early adopters** (real-world impact)
- All letters with specific, verifiable claims
- All letters stored with organization + date for attorney's Exhibit list

**Total: 8-12 strong letters with authentic, independent evidence.**
