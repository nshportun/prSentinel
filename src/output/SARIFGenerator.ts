import { Finding } from "../checks/index.js";

interface SARIFResult {
  ruleId: string;
  level: "note" | "warning" | "error";
  message: { text: string };
  locations: Array<{
    physicalLocation: {
      artifactLocation: { uri: string };
      region: {
        startLine: number;
        startColumn?: number;
        endLine?: number;
        endColumn?: number;
      };
    };
  }>;
  properties?: Record<string, unknown>;
}

interface SARIFLog {
  version: "2.1.0";
  runs: Array<{
    tool: { driver: { name: string; version: string; rules: unknown[] } };
    results: SARIFResult[];
  }>;
}

export class SARIFGenerator {
  static generate(findings: Finding[], toolVersion: string = "0.1.0"): SARIFLog {
    const rules = new Map<string, unknown>();

    const results: SARIFResult[] = findings.map((finding) => {
      const ruleId = finding.rule;
      if (!rules.has(ruleId)) {
        rules.set(ruleId, {
          id: ruleId,
          shortDescription: { text: finding.message },
          defaultConfiguration: { level: finding.level },
        });
      }

      return {
        ruleId,
        level: finding.level as "note" | "warning" | "error",
        message: { text: finding.message },
        locations: [
          {
            physicalLocation: {
              artifactLocation: { uri: finding.file },
              region: {
                startLine: finding.startLine + 1,
                startColumn: finding.startColumn,
                endLine: finding.endLine + 1,
                endColumn: finding.endColumn,
              },
            },
          },
        ],
        properties: finding.evidence,
      };
    });

    return {
      version: "2.1.0",
      runs: [
        {
          tool: {
            driver: {
              name: "PR Sentinel",
              version: toolVersion,
              rules: Array.from(rules.values()),
            },
          },
          results,
        },
      ],
    };
  }
}
