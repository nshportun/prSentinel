import { CheckContext, DataQualityCheck, Finding } from "./types.js";
import { AnthropicProvider } from "../providers/AnthropicProvider.js";
import type { ModelProvider } from "../providers/ModelProvider.js";

export class PIIDetectionCheck implements DataQualityCheck {
  name = "pii-detection";
  private provider: ModelProvider;

  constructor(
    modelId: string = "claude-3-5-sonnet-20241022",
    provider?: ModelProvider
  ) {
    this.provider = provider ?? new AnthropicProvider({ modelId });
  }

  async run(_context: CheckContext, diffChunks: string[]): Promise<Finding[]> {
    const findings: Finding[] = [];

    for (let i = 0; i < diffChunks.length; i++) {
      const chunk = diffChunks[i];
      const prompt = `Analyze this code diff for PII exposure. Look for:
- Email addresses, phone numbers, credit card patterns
- AWS keys, API keys, tokens
- Social security numbers, passport numbers
- Database credentials
- Private user data in test fixtures

Respond with JSON array of findings or empty array if none found:
[{"pattern": "...", "type": "...", "risk": "high|medium|low", "lineOffset": N}]`;

      const response = await this.provider.analyze(prompt, chunk);

      try {
        const detected = JSON.parse(response.content);
        if (Array.isArray(detected)) {
          for (const item of detected) {
            findings.push({
              rule: "pii-exposure",
              level: item.risk === "high" ? "error" : "warning",
              message: `Potential ${item.type} detected: ${item.pattern}`,
              file: `diff-chunk-${i}`,
              startLine: item.lineOffset || 0,
              endLine: item.lineOffset || 0,
              evidence: item,
            });
          }
        }
      } catch {
        // JSON parse failed, skip this chunk
      }
    }

    return findings;
  }
}
