import { CheckContext, DataQualityCheck, Finding } from "./types.js";
import { AnthropicProvider } from "../providers/index.js";

export class SchemaDriftCheck implements DataQualityCheck {
  name = "schema";
  private provider: AnthropicProvider;

  constructor(modelId: string = "claude-3-5-sonnet-20241022") {
    this.provider = new AnthropicProvider({ modelId });
  }

  async run(context: CheckContext, diffChunks: string[]): Promise<Finding[]> {
    const findings: Finding[] = [];

    for (let i = 0; i < diffChunks.length; i++) {
      const chunk = diffChunks[i];

      // Only analyze diffs that touch data files
      if (!this.isDataFileDiff(chunk)) continue;

      const prompt = `Analyze this data schema diff for issues:
- Field removals without deprecation comments
- Type changes that break compatibility
- New required fields without defaults
- Field renames or reordering
- Inconsistent naming conventions

Respond with JSON:
[{"issue": "...", "severity": "high|medium|low", "fieldName": "...", "suggestion": "..."}]`;

      const response = await this.provider.analyze(prompt, chunk);

      try {
        const issues = JSON.parse(response.content);
        if (Array.isArray(issues)) {
          for (const item of issues) {
            findings.push({
              rule: "schema-drift",
              level: item.severity === "high" ? "error" : "warning",
              message: item.issue,
              file: `data-schema-${i}`,
              startLine: 0,
              endLine: 0,
              evidence: { fieldName: item.fieldName, suggestion: item.suggestion },
            });
          }
        }
      } catch {
        // JSON parse failed
      }
    }

    return findings;
  }

  private isDataFileDiff(chunk: string): boolean {
    return /\.(csv|json|jsonl|parquet|yaml|yml)/.test(chunk);
  }
}
