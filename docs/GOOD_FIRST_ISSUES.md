# Good First Issues for External Contributors

These 10 issues are designed for new contributors to gain familiarity with the codebase while making real, attributable contributions.

## Issue 1: Add OpenAI Provider Implementation

**Title:** `feat: implement OpenAI model provider adapter`

**Description:**
PR Sentinel currently supports Anthropic's Claude. Add support for OpenAI's GPT-4 to make the tool more flexible for teams already using OpenAI.

**Acceptance Criteria:**
- [ ] Create `src/providers/OpenAIProvider.ts` implementing the `ModelProvider` interface
- [ ] Use the `openai` npm package
- [ ] Support `gpt-4-turbo` and `gpt-4o` models
- [ ] Add environment variable `OPENAI_API_KEY` support
- [ ] Write tests in `src/providers/OpenAIProvider.test.ts` with 85%+ coverage
- [ ] Update `action.yml` to document `model-provider: openai` option
- [ ] Update README with OpenAI example

**Difficulty:** ⭐⭐ Intermediate  
**Files to touch:** 
- `src/providers/OpenAIProvider.ts` (new)
- `src/providers/OpenAIProvider.test.ts` (new)
- `action.yml`
- `README.md`

---

## Issue 2: Add Parquet Schema Validation

**Title:** `feat: validate Parquet file schema changes in diffs`

**Description:**
Currently `SchemaDriftCheck` handles CSV/JSON. Parquet files are widely used in ML pipelines but schema changes aren't validated. Parse `.parquet` diffs and detect breaking changes.

**Acceptance Criteria:**
- [ ] Extend `SchemaDriftCheck` to parse Parquet binary format (or use `parquetjs`)
- [ ] Detect field removals, type changes, nested structure changes
- [ ] Add test cases in `src/checks/SchemaDriftCheck.test.ts`
- [ ] Maintain 85%+ coverage
- [ ] Document Parquet support in README

**Difficulty:** ⭐⭐⭐ Advanced  
**Files to touch:**
- `src/checks/SchemaDriftCheck.ts`
- `src/checks/SchemaDriftCheck.test.ts`
- `README.md`

---

## Issue 3: Add AWS Bedrock Provider Support

**Title:** `feat: implement AWS Bedrock model provider`

**Description:**
Teams using AWS infrastructure should be able to use Bedrock models (Claude via AWS, Titan, etc.). Add `BedrockProvider` for cost-conscious, AWS-native deployments.

**Acceptance Criteria:**
- [ ] Create `src/providers/BedrockProvider.ts` implementing `ModelProvider`
- [ ] Support Claude models via Bedrock API
- [ ] Accept `aws-region` and `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`
- [ ] Add comprehensive tests
- [ ] Update action.yml and README with Bedrock example

**Difficulty:** ⭐⭐⭐ Advanced  
**Files to touch:**
- `src/providers/BedrockProvider.ts` (new)
- `src/providers/BedrockProvider.test.ts` (new)
- `action.yml`
- `README.md`

---

## Issue 4: Improve Secret Pattern Detection

**Title:** `refactor: add comprehensive regex patterns for secrets`

**Description:**
`SecretScanningCheck` uses basic patterns. Add more sophisticated detectors for:
- Slack webhooks
- Stripe API keys (sk_live, sk_test)
- Firebase config strings
- MongoDB connection strings
- Docker registry tokens

**Acceptance Criteria:**
- [ ] Add 5+ new secret patterns to `SecretScanningCheck`
- [ ] Each pattern must have a test case with real/fake examples
- [ ] Maintain high precision (low false positive rate)
- [ ] Update evidence types in test assertions
- [ ] Achieve 90%+ coverage on the check class

**Difficulty:** ⭐⭐ Intermediate  
**Files to touch:**
- `src/checks/SecretScanningCheck.ts`
- `src/checks/SecretScanningCheck.test.ts`

---

## Issue 5: Add YAML/Config File Validation

**Title:** `feat: add checks for YAML/configuration file diffs`

**Description:**
Users often accidentally commit `.env.example` files, `docker-compose.yml`, or other configs with secrets. Add a check that scans YAML diffs for common misconfigurations.

**Acceptance Criteria:**
- [ ] Create `src/checks/ConfigSecurityCheck.ts`
- [ ] Scan YAML/TOML/INI files for secret keys, passwords
- [ ] Flag suspicious patterns (e.g., `password: value`, `api_key: value`)
- [ ] Add comprehensive tests
- [ ] Update `index.ts` to include new check in available checks list

**Difficulty:** ⭐⭐ Intermediate  
**Files to touch:**
- `src/checks/ConfigSecurityCheck.ts` (new)
- `src/checks/ConfigSecurityCheck.test.ts` (new)
- `src/checks/index.ts`
- `README.md`

---

## Issue 6: Add Contributor Analytics Dashboard Script

**Title:** `docs: create script to generate contributor metrics for adoption tracking`

**Description:**
Phase 3 tracks adoption. Create a Node.js script that reads GitHub API to populate `docs/eb1a_metrics.csv` with:
- External contributors (non-owner)
- PR merge count
- Issue engagement
- Dependents graph entries

**Acceptance Criteria:**
- [ ] Create `scripts/update-metrics.js` or `.ts`
- [ ] Query GitHub API for contributors, PRs, issues
- [ ] Append timestamped row to `docs/eb1a_metrics.csv`
- [ ] Document usage in README
- [ ] Provide example GitHub Actions workflow to run weekly

**Difficulty:** ⭐⭐ Intermediate  
**Files to touch:**
- `scripts/update-metrics.js` (new)
- `README.md`
- `.github/workflows/metrics.yml` (optional)

---

## Issue 7: Add Email Notification on Critical Findings

**Title:** `feat: add email notification output for critical PII/secrets`

**Description:**
When PR Sentinel finds high-confidence PII or secrets, ops teams should be notified immediately. Add an output handler that can send email alerts (integrating with services like SendGrid or GitHub email).

**Acceptance Criteria:**
- [ ] Add optional `notify-email` input to `action.yml`
- [ ] When errors found, POST to email service endpoint
- [ ] Include SARIF summary in email
- [ ] Add tests for notification logic (mock email service)
- [ ] Document in README

**Difficulty:** ⭐⭐⭐ Advanced  
**Files to touch:**
- `src/output/EmailNotifier.ts` (new)
- `src/index.ts` (integrate notifier)
- `action.yml`
- `README.md`

---

## Issue 8: Add SQL Injection Pattern Detection

**Title:** `feat: detect SQL injection vulnerabilities in dataset diffs`

**Description:**
When developers commit datasets with unsanitized SQL strings or dangerous patterns, flag them. Add detector for common SQL injection payloads.

**Acceptance Criteria:**
- [ ] Create `src/checks/SQLInjectionCheck.ts`
- [ ] Detect common SQL injection patterns (UNION SELECT, DROP TABLE, etc.)
- [ ] Flag suspicious strings in CSV/JSON
- [ ] Add 10+ test cases
- [ ] Maintain high precision

**Difficulty:** ⭐⭐ Intermediate  
**Files to touch:**
- `src/checks/SQLInjectionCheck.ts` (new)
- `src/checks/SQLInjectionCheck.test.ts` (new)
- `src/checks/index.ts`

---

## Issue 9: Add Local Ollama Provider Support

**Title:** `feat: implement Ollama model provider for local/self-hosted inference`

**Description:**
Teams with privacy constraints or high volume can run Ollama locally. Add support for connecting to local Ollama instances, allowing fully offline analysis.

**Acceptance Criteria:**
- [ ] Create `src/providers/OllamaProvider.ts`
- [ ] Accept `ollama-base-url` input (default: `http://localhost:11434`)
- [ ] Support any Ollama-compatible model (llama2, mistral, etc.)
- [ ] Add tests with mock Ollama endpoint
- [ ] Document setup in README

**Difficulty:** ⭐⭐ Intermediate  
**Files to touch:**
- `src/providers/OllamaProvider.ts` (new)
- `src/providers/OllamaProvider.test.ts` (new)
- `action.yml`
- `README.md`

---

## Issue 10: Add SARIF Suppression Rules Support

**Title:** `feat: allow suppressing specific rules via config file`

**Description:**
Teams may want to disable certain checks (e.g., if they use a different PII tool). Add support for `.pr-sentinel.json` config file to allow disabling checks per-project.

**Acceptance Criteria:**
- [ ] Create config file schema (TypeScript type)
- [ ] Support `.pr-sentinel.json` at repo root
- [ ] Allow disabling checks: `{ "disabled": ["pii", "license"] }`
- [ ] Allow setting custom severity per check
- [ ] Add tests for config parsing
- [ ] Document in README

**Difficulty:** ⭐⭐ Intermediate  
**Files to touch:**
- `src/config/ConfigLoader.ts` (new)
- `src/index.ts` (load config)
- `README.md`

---

## How to Contribute

1. **Pick an issue** from the list above
2. **Comment** on the issue to claim it (avoid duplicate work)
3. **Follow CONTRIBUTING.md** for setup and testing
4. **Create a PR** linking the issue
5. **Your contribution becomes independent evidence** for the project's impact

**Questions?** Open a discussion or ask in the issue.

---

**Why these issues matter:**
- Each one strengthens the "previously unsolved problem" narrative (ML/data-quality gaps)
- External contributions demonstrate **real field adoption and engagement**
- Your commits appear in GitHub history—**independent, attributable evidence** for EB-1A
