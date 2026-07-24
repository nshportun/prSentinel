import { CheckContext, DataQualityCheck, Finding } from "./types.js";

interface NotebookCell {
  cell_type: string;
  source: string | string[];
  outputs?: NotebookOutput[];
}

interface NotebookOutput {
  output_type: string;
  text?: string | string[];
  data?: Record<string, unknown>;
}

interface NotebookContent {
  cells: NotebookCell[];
}

export class NotebookSecurityCheck implements DataQualityCheck {
  name = "notebook";

  async run(_context: CheckContext, diffChunks: string[]): Promise<Finding[]> {
    const findings: Finding[] = [];

    for (let chunkIdx = 0; chunkIdx < diffChunks.length; chunkIdx++) {
      const chunk = diffChunks[chunkIdx];

      if (!chunk.includes(".ipynb")) continue;

      try {
        const nbContent = this.extractNotebookJson(chunk);
        if (!nbContent) continue;

        const cells: NotebookCell[] = nbContent.cells;
        for (let cellIdx = 0; cellIdx < cells.length; cellIdx++) {
          const cell = cells[cellIdx];

          if (cell.cell_type === "code") {
            const source = Array.isArray(cell.source)
              ? cell.source.join("")
              : String(cell.source ?? "");
            if (this.hasSecretPatterns(source)) {
              findings.push({
                rule: "notebook-secret",
                level: "error",
                message: "Detected potential secret in notebook cell",
                file: `notebook-cell-${cellIdx}`,
                startLine: cellIdx,
                endLine: cellIdx,
              });
            }
          }

          const outputs: NotebookOutput[] = cell.outputs ?? [];
          for (const output of outputs) {
            if (
              output.output_type === "execute_result" ||
              output.output_type === "stream"
            ) {
              const text = this.getOutputText(output);
              if (this.containsPII(text)) {
                findings.push({
                  rule: "notebook-pii-output",
                  level: "warning",
                  message: "Detected potential PII in cell output",
                  file: `notebook-output-${cellIdx}`,
                  startLine: cellIdx,
                  endLine: cellIdx,
                });
              }
            }
          }
        }
      } catch {
        // Not valid notebook JSON
      }
    }

    return findings;
  }

  private extractNotebookJson(chunk: string): NotebookContent | null {
    const match = chunk.match(/\{[\s\S]*"cells"[\s\S]*\}/);
    if (!match) return null;
    try {
      const parsed = JSON.parse(match[0]) as unknown;
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "cells" in parsed &&
        Array.isArray((parsed as Record<string, unknown>).cells)
      ) {
        return parsed as NotebookContent;
      }
      return null;
    } catch {
      return null;
    }
  }

  private hasSecretPatterns(text: string): boolean {
    const patterns = [
      /api[_-]?key\s*[=:]\s*['"][^'"]+/i,
      /password\s*[=:]\s*['"][^'"]+/i,
      /token\s*[=:]\s*['"][^'"]+/i,
    ];
    return patterns.some((p) => p.test(text));
  }

  private getOutputText(output: NotebookOutput): string {
    if (typeof output.text === "string") return output.text;
    if (Array.isArray(output.text)) return (output.text as string[]).join("");
    if (typeof output.data === "object" && output.data !== null) {
      const plain = output.data["text/plain"];
      if (typeof plain === "string") return plain;
    }
    return "";
  }

  private containsPII(text: string): boolean {
    return (
      /\b\d{3}-\d{2}-\d{4}\b/.test(text) ||
      /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/.test(text)
    );
  }
}
