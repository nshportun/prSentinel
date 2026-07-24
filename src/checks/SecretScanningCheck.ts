import { CheckContext, DataQualityCheck, Finding } from "./types.js";

interface SecretPattern {
  regex: RegExp;
  type: string;
}

const SECRET_PATTERNS: SecretPattern[] = [
  { regex: /(?:api[_-]?key|apikey)\s*=\s*['"]?([a-zA-Z0-9_-]{8,})['"]?/i, type: "API Key" },
  { regex: /(?:aws[_-]?secret|secret[_-]?access[_-]?key)\s*=\s*['"]?([a-zA-Z0-9+/]{40})['"]?/i, type: "AWS Secret" },
  { regex: /github[_-]?token\s*=\s*['"]?ghp_[a-zA-Z0-9_]{36}['"]?/i, type: "GitHub Token" },
  { regex: /(?:password|passwd)\s*=\s*['"]?([^'"\s]{4,})['"]?/i, type: "Password" },
  { regex: /-----BEGIN RSA PRIVATE KEY-----/i, type: "RSA Private Key" },
  { regex: /-----BEGIN PRIVATE KEY-----/i, type: "Private Key" },
];

export class SecretScanningCheck implements DataQualityCheck {
  name = "secrets";

  async run(_context: CheckContext, diffChunks: string[]): Promise<Finding[]> {
    const findings: Finding[] = [];

    for (let chunkIdx = 0; chunkIdx < diffChunks.length; chunkIdx++) {
      const chunk = diffChunks[chunkIdx];
      const lines = chunk.split("\n");

      for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx];

        for (const { regex, type } of SECRET_PATTERNS) {
          // Create a fresh regex each time to avoid stateful `lastIndex` with /g
          if (new RegExp(regex.source, regex.flags).test(line)) {
            findings.push({
              rule: "secret-exposure",
              level: "error",
              message: `Detected potential ${type} in diff`,
              file: `diff-chunk-${chunkIdx}`,
              startLine: lineIdx,
              endLine: lineIdx,
              snippet: line.substring(0, 80),
            });
          }
        }
      }
    }

    return findings;
  }
}
