export interface Finding {
  rule: string;
  level: "info" | "warning" | "error";
  message: string;
  file: string;
  startLine: number;
  endLine: number;
  startColumn?: number;
  endColumn?: number;
  snippet?: string;
  evidence?: Record<string, unknown>;
}

export interface CheckContext {
  owner: string;
  repo: string;
  pullNumber: number;
  diffContent: string;
  baseCommit: string;
  headCommit: string;
}

export interface DataQualityCheck {
  name: string;
  run(context: CheckContext, diffChunks: string[]): Promise<Finding[]>;
}
