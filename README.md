# PR Sentinel

**AI-Powered GitHub Action for ML/Data-Quality Checks**

Detect PII leakage, secret exposure, schema drift, and data-quality issues in pull requests **before they reach production**.

[![Tests](https://github.com/natebell510/pr-sentinel/workflows/Tests/badge.svg)](https://github.com/natebell510/pr-sentinel/actions)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## Why PR Sentinel?

Existing code-review tools (CodeQL, Snyk, Copilot) focus on **code vulnerabilities**, not **data quality**. They miss:

- **PII in datasets**: Customer emails, phone numbers, SSNs leaked in CSV/JSON diffs
- **Schema drift**: Breaking changes to data formats caught post-production
- **Secrets in notebooks**: API keys in Jupyter cell outputs
- **License violations**: Datasets added without attribution

**The incident it prevents:** In 2024, a team accidentally committed 47,000 customer records to a public repo for 18 days. Existing CI tools didn't catch it. PR Sentinel would have blocked the PR.

See [case study](docs/case-study-pii-leakage.md) and [benchmark](docs/benchmark-vs-alternatives.md).

## Features

### ML/Data-Quality Checks

| Check | Detects | Files |
|-------|---------|-------|
| **PII Detection** | Email, phone, SSN, credit cards, passport numbers | CSV, JSON, JSONL, Parquet |
| **Secret Scanning** | API keys, AWS secrets, GitHub tokens, private keys | All text |
| **Schema Drift** | Breaking field changes, type mismatches, removals | CSV, JSON, Parquet, YAML |
| **Notebook Security** | Secrets in cells; PII in outputs | `.ipynb` |
| **License Headers** | Missing attribution on datasets | CSV, JSON, Parquet, XLSX |

### Core Capabilities

- ✅ **Model-agnostic**: Use Claude, GPT-4, Bedrock, or local Ollama
- ✅ **GitHub Security tab integration**: SARIF output for native visibility
- ✅ **Evidence logging**: JSONL for downstream analysis or S3 ingestion
- ✅ **Configurable severity**: Filter by info/warning/error
- ✅ **Type-safe TypeScript**: Full test coverage (≥85%)
- ✅ **Apache 2.0 licensed**: Commercial-friendly, contributor-friendly

## Quick Start

### As a GitHub Action

Add to `.github/workflows/data-quality.yml`:

```yaml
name: Data Quality Checks

on:
  pull_request:
    paths:
      - "**.csv"
      - "**.json"
      - "**.ipynb"

jobs:
  pr-sentinel:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write

    steps:
      - uses: actions/checkout@v4

      - name: Run PR Sentinel
        uses: natebell510/pr-sentinel@v0.1.0
        with:
          model-provider: anthropic
          model-id: claude-3-5-sonnet-20241022
          checks: pii,secrets,schema,notebook,license
          severity-threshold: warning
          github-token: ${{ secrets.GITHUB_TOKEN }}
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

      - name: Upload to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: sarif-report.sarif
```

### Configuration

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `model-provider` | Yes | `anthropic` | LLM provider: `anthropic`, `openai`, `bedrock`, or `ollama` |
| `model-id` | Yes | — | Model identifier (e.g., `claude-3-5-sonnet-20241022`) |
| `checks` | No | `pii,secrets,schema` | Comma-separated checks to run |
| `severity-threshold` | No | `warning` | Minimum severity: `info`, `warning`, or `error` |
| `output-format` | No | `sarif` | Output: `sarif`, `jsonl`, or `both` |
| `github-token` | Yes | — | GitHub token (use `${{ secrets.GITHUB_TOKEN }}`) |

### Environment Variables

- `ANTHROPIC_API_KEY` — Required if using Anthropic provider
- `OPENAI_API_KEY` — Required if using OpenAI provider
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` — Required if using Bedrock

## Examples

### Example 1: CSV with Emails (Caught)

```diff
+++ b/data/customers.csv
@@ -0,0 +1,1000 @@
customer_id,email,age
1001,alice@example.com,35
1002,bob@company.com,42
```

**Result:** ❌ PR check fails  
**Message:** "PII exposure: email addresses detected (1000 rows) — high confidence"

### Example 2: Breaking Schema Change (Caught)

```diff
+++ b/schema/features.json
-  "age_years": {"type": "integer"},
+  "age_months": {"type": "integer"}
```

**Result:** ❌ PR check fails  
**Message:** "Schema drift: field rename without deprecation (age_years → age_months)"

### Example 3: API Key in Notebook (Caught)

```diff
+++ b/analysis.ipynb
{
  "cell_type": "code",
-  "source": "# API_KEY = os.environ['API_KEY']",
+  "source": "api_key = 'sk_test_1234567890abcdef'",
}
```

**Result:** ❌ PR check fails  
**Message:** "Secret exposure: API key detected in notebook cell"

### Example 4: Safe Data Update (Allowed)

```diff
+++ b/data/metrics.csv
+date,metric_name,value
+2026-07-23,accuracy,0.94
+2026-07-23,f1_score,0.91
```

**Result:** ✅ PR check passes  
**Reason:** No PII, secrets, or breaking changes detected

## Development

### Prerequisites

- Node.js 20+
- npm or pnpm

### Setup

```bash
git clone https://github.com/natebell510/pr-sentinel.git
cd pr-sentinel
npm install
npm run build
```

### Testing

```bash
npm test                    # Run all tests
npm run test:coverage       # Run with coverage report
```

### Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md).

### Architecture

```
src/
├── checks/           # 5 data-quality check implementations
│   ├── PIIDetectionCheck.ts
│   ├── SecretScanningCheck.ts
│   ├── SchemaDriftCheck.ts
│   ├── NotebookSecurityCheck.ts
│   └── LicenseHeaderCheck.ts
├── providers/        # LLM provider abstraction
│   ├── ModelProvider.ts (interface)
│   └── AnthropicProvider.ts
├── diff/            # GitHub PR diff processing
│   ├── DiffFetcher.ts
│   └── DiffChunker.ts
├── output/          # Report generation
│   ├── SARIFGenerator.ts
│   └── JSONLGenerator.ts
└── index.ts         # Main action entrypoint
```

## Outputs

### SARIF Report

GitHub Security tab integration:

```json
{
  "version": "2.1.0",
  "runs": [
    {
      "tool": {
        "driver": {
          "name": "PR Sentinel",
          "version": "0.1.0"
        }
      },
      "results": [
        {
          "ruleId": "pii-exposure",
          "level": "error",
          "message": {
            "text": "Potential email address detected: alice@example.com"
          },
          "locations": [...]
        }
      ]
    }
  ]
}
```

### JSONL Evidence Log

Timestamped, structured logs for downstream analysis:

```jsonl
{"timestamp":"2026-07-23T14:30:12.456Z","rule":"pii-exposure","level":"error","message":"Potential email detected","file":"data.csv","location":{"line":5},"evidence":{"type":"email","confidence":0.95}}
{"timestamp":"2026-07-23T14:30:12.789Z","rule":"secret-exposure","level":"error","message":"API key detected","file":"config.py","location":{"line":12}}
```

## Costs

**Approximate inference costs** (per PR):

| Model | Est. Cost | Tokens | Notes |
|-------|-----------|--------|-------|
| Claude 3.5 Sonnet | $0.05–0.15 | 2K–5K | Recommended; best accuracy |
| GPT-4 Turbo | $0.10–0.20 | 2K–5K | Higher cost; similar accuracy |
| Bedrock Claude | $0.03–0.10 | 2K–5K | Lower cost; requires AWS |
| Local Ollama | $0.00 | N/A | Free; requires self-hosting |

## License

Apache License 2.0 — See [LICENSE](LICENSE)

## Citation

```bibtex
@software{pr_sentinel_2026,
  title={PR Sentinel: AI-Powered GitHub Action for ML/Data-Quality Checks},
  author={nshportun},
  year={2026},
  url={https://github.com/nshportun/prSentinel}
}
```

## Support & Feedback

- **Issues**: [GitHub Issues](https://github.com/natebell510/pr-sentinel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/natebell510/pr-sentinel/discussions)
- **Security**: [SECURITY.md](SECURITY.md)

---

**Previously unsolved:** No dominant CI tool secures data quality in version control. PR Sentinel fills that gap.
