# Target Organizations Research

## Tier 1: Mid-Size AI/ML Startups (High Priority)

These companies have public blogs, solve data quality problems, and move fast.

### Research Sources:
- Y Combinator Batch pages (search "data" and "ML"): https://ycombinator.com/companies/
- Crunchbase filtered by funding stage (Series A/B) and industry (ML, Data)
- GitHub trending ML/data repos (filter by "company" in profile)
- Product Hunt ML/data category
- Kaggle competition sponsors

### Companies to Approach (Template)

```
Name: [Company Name]
Website: [domain]
GitHub Org: [org-url]
Repos: [3-5 relevant repos with data/ML workflows]
Maintainers: [GitHub handles of decision-makers]
Blog: [company blog URL, "AI" or "Engineering" section]
Contact: [email or Twitter handle]
Pitch Angle: [1-2 sentence problem they solve that PR Sentinel addresses]
Status: [not_contacted / issue_opened / response_pending / positive / negative / merged]
Notes: [relevant context]
```

### Example Entries to Research:

1. **Label Studio** (data labeling platform)
   - Website: label-studio.io
   - GitHub: https://github.com/heartexlabs/label-studio
   - Pitch: "Validate data quality in labeling dataset diffs"
   - Status: [to be filled]

2. **Hugging Face Datasets**
   - Website: huggingface.co/datasets
   - GitHub: https://github.com/huggingface/datasets
   - Pitch: "Prevent PII leakage in community dataset contributions"
   - Status: [to be filled]

3. **Great Expectations**
   - Website: greatexpectations.io
   - GitHub: https://github.com/great-expectations/great_expectations
   - Pitch: "Complement schema validation with semantic PII detection"
   - Status: [to be filled]

---

## Tier 2: Open-Source Data/ML Projects

### Research Sources:
- GitHub trending (filter by language: Python, JavaScript)
- Search keywords: "dataset validation," "ml testing," "schema validator"
- Papers with code: https://paperswithcode.com/
- MLflow, Airflow, Prefect ecosystems (plugins)

### Companies to Approach (Template)

```
Project: [Name]
GitHub: [org-url]
Maintainers: [@handle1, @handle2]
Stars: [current count]
Last Commit: [date]
Integration Point: [where PR Sentinel fits]
Contact: [email, Twitter, or GitHub issue]
Status: [not_contacted / issue_opened / response_pending / positive / negative]
Evidence Link: [GitHub issue/PR/discussion URL]
```

### Example Entries:

1. **Pandera** (data validation)
   - GitHub: https://github.com/unionai-oss/pandera
   - Integration: "Add Pandera schema compatibility checks"

2. **Evidently** (data drift & quality)
   - GitHub: https://github.com/evidentlyai/evidently
   - Integration: "PII detection alongside data drift monitoring"

3. **MLflow** (ML tracking)
   - GitHub: https://github.com/mlflow/mlflow
   - Integration: "Validate dataset diffs in MLflow versioning"

---

## Tier 3: University ML/Data Science Programs

### Research Sources:
- Stanford: https://ai.stanford.edu/ (courses, syllabi)
- MIT: https://web.mit.edu/ (OpenCourseWare, CSAIL)
- CMU: https://ml.cmu.edu/
- UC Berkeley: https://ml.berkeley.edu/
- Search: "machine learning course" + "syllabus" + "GitHub"

### Contact Template

```
University: [Name]
Program: [ML/Data Science degree/certificate]
Instructor(s): [Name, email]
Course: [code + title]
Course URL: [GitHub repo or syllabus]
Relevance: [Does course involve data engineering, datasets, or ML pipelines?]
Outreach Type: [Email, Twitter, GitHub issue]
Pitch: [Why students should learn about data validation]
Status: [not_contacted / email_sent / response_pending / positive / negative]
Evidence: [Link to syllabus update or course material]
```

### Example Entries:

1. **Stanford CS 329S — Machine Learning Systems Design**
   - Instructor: Chip Huyen
   - Website: https://github.com/chiphuyen/cs329s-ml-systems-design
   - Pitch: "Add dataset quality validation to the ML systems design curriculum"

2. **CMU 10-619 — AI Engineering**
   - Instructor: [to research]
   - Pitch: "Teach students about data governance and PII prevention"

3. **UC Berkeley W261 — Machine Learning at Scale**
   - Instructor: [to research]
   - Pitch: "Data quality automation in distributed ML pipelines"

---

## Outreach Tracking

Maintain this in `docs/adoption_log.csv`:

```csv
target_org,contact_date,contact_type,response_date,response_status,outcome,evidence_url,notes
Label Studio,2026-07-24,GitHub Issue #123,2026-07-25,positive,in_discussion,https://github.com/heartexlabs/label-studio/issues/123,"Maintainer interested; awaiting feature request details"
Great Expectations,2026-07-24,GitHub Issue #456,none,no_response,pending,https://github.com/great-expectations/great_expectations/issues/456,"Follow-up reminder sent 2026-07-31"
Stanford CS329S,2026-07-25,Email to Chip Huyen,2026-07-26,positive,positive_response,chip.huyen@stanford.edu,"Will consider adding to next semester's curriculum"
```

---

## Research Workflow

1. **Identify:** Find 5-10 promising targets per tier
2. **Validate:**
   - Check if they actually work with datasets/ML
   - Verify maintainers are active (commits in last 3 months)
   - Ensure they have a blog or public presence
3. **Craft:** Write 1-2 personalized sentences specific to their codebase
4. **Outreach:** Create GitHub issue or send email
5. **Log:** Record in adoption_log.csv with timestamp
6. **Follow-up:** Check for responses weekly; log outcome
7. **Document:** If positive, capture evidence (PR, blog post, citation)

---

## Red Lines

**Do not approach:**
- Solo developers with <100 followers (no amplification)
- Inactive projects (last commit >6 months ago)
- Projects that already have competing solutions
- Organizations with history of SEO/manipulative practices
- Companies that charge for feature adoption credits

---

## Resources

- **GitHub API for research:** `gh repo list <org> --limit 100`
- **Find company blogs:** site:github.com/<company> "blog" OR "engineering"
- **Conference talks:** Search YouTube for "ML," "data engineering," filter by date
- **Academic impact:** Semantic Scholar, Papers with Code
