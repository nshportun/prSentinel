import { CheckContext, DataQualityCheck, Finding } from "./types.js";

export class LicenseHeaderCheck implements DataQualityCheck {
  name = "license";

  async run(_context: CheckContext, diffChunks: string[]): Promise<Finding[]> {
    const findings: Finding[] = [];

    for (let chunkIdx = 0; chunkIdx < diffChunks.length; chunkIdx++) {
      const chunk = diffChunks[chunkIdx];

      // Only check data files and datasets
      if (!this.isDatasetFile(chunk)) continue;

      const hasLicenseMarker = this.hasLicenseMarker(chunk);

      if (!hasLicenseMarker) {
        // Check if this looks like a new file addition
        if (chunk.includes("+++")) {
          findings.push({
            rule: "missing-license-header",
            level: "warning",
            message: "Dataset file added without license or attribution header",
            file: `dataset-${chunkIdx}`,
            startLine: 0,
            endLine: 0,
            evidence: { suggestion: "Add license, attribution, or data source comment at top" },
          });
        }
      }
    }

    return findings;
  }

  private isDatasetFile(chunk: string): boolean {
    const datasetExtensions = [".csv", ".json", ".jsonl", ".parquet", ".tsv", ".xlsx", ".db"];
    return datasetExtensions.some((ext) => chunk.includes(ext));
  }

  private hasLicenseMarker(chunk: string): boolean {
    const licensePatterns = [
      /license/i,
      /attribution/i,
      /cc-by/i,
      /apache\s*2/i,
      /mit\s*license/i,
      /gpl/i,
      /source:/i,
      /dataset\s*from/i,
    ];
    return licensePatterns.some((p) => p.test(chunk));
  }
}
