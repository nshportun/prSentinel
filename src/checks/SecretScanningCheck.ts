import { CheckContext, DataQualityCheck, Finding } from "./types.js";

export class SecretScanningCheck implements DataQualityCheck {
  name = "secrets";

  async run(_context: CheckContext, diffChunks: string[]): Promise<Finding[]> {
    const findings: Finding[] = [];
    const patterns = [
      { regex: /(?:api[_-]?key|apikey)\s*=\s*['""]?([a-zA-Z0-9_\-]+)['""]?/gi, type: "API Key" },
      { regex: /(?:aws[_-]?secret|secret[_-]?access[_-]?key)\s*=\s*['""]?([a-zA-Z0-9+\/]{40})['""]?/gi, type: "AWS Secret" },
      { regex: /github[_-]?token\s*=\s*ghp_[a-zA-Z0-9_]{36}/gi, type: "GitHub Token" },
      { regex: /(?:password|passwd)\s*=\s*['""]?([^'""\s]+)['""]?/gi, type: "Password" },
      { regex: /-----BEGIN RSA PRIVATE KEY-----/gi, type: "RSA Private Key" },
      { regex: /-----BEGIN PRIVATE KEY-----/gi, type: "Private Key" },
    ];

    for (let chunkIdx = 0; chunkIdx < diffChunks.length; chunkIdx++) {
      const chunk = diffChunks[chunkIdx];
      const lines = chunk.split("\n");

      for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx];

        for (const { regex, type } of patterns) {
          if (regex.test(line)) {
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
