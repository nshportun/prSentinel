import { Finding } from "../checks/index.js";

export interface JSONLEntry {
  timestamp: string;
  rule: string;
  level: string;
  message: string;
  file: string;
  location: {
    line: number;
    column?: number;
  };
  evidence?: Record<string, unknown>;
}

export class JSONLGenerator {
  static generate(findings: Finding[]): string[] {
    return findings.map((finding) => {
      const entry: JSONLEntry = {
        timestamp: new Date().toISOString(),
        rule: finding.rule,
        level: finding.level,
        message: finding.message,
        file: finding.file,
        location: {
          line: finding.startLine,
          column: finding.startColumn,
        },
        evidence: finding.evidence,
      };
      return JSON.stringify(entry);
    });
  }
}
