import { describe, it, expect } from "vitest";
import { JSONLGenerator } from "./JSONLGenerator.js";

describe("JSONLGenerator", () => {
  it("generates JSONL from findings", () => {
    const findings = [
      {
        rule: "pii-exposure",
        level: "error" as const,
        message: "SSN detected",
        file: "data.csv",
        startLine: 5,
        endLine: 5,
      },
    ];

    const lines = JSONLGenerator.generate(findings);

    expect(lines.length).toBe(1);
    const entry = JSON.parse(lines[0]);
    expect(entry.rule).toBe("pii-exposure");
    expect(entry.level).toBe("error");
    expect(entry.message).toBe("SSN detected");
  });

  it("includes timestamp in each entry", () => {
    const findings = [
      {
        rule: "test",
        level: "info" as const,
        message: "test",
        file: "test.txt",
        startLine: 0,
        endLine: 0,
      },
    ];

    const lines = JSONLGenerator.generate(findings);
    const entry = JSON.parse(lines[0]);

    expect(entry.timestamp).toBeDefined();
    expect(new Date(entry.timestamp).getTime()).toBeGreaterThan(0);
  });

  it("includes evidence if present", () => {
    const findings = [
      {
        rule: "test",
        level: "warning" as const,
        message: "test",
        file: "test.txt",
        startLine: 0,
        endLine: 0,
        evidence: { type: "SSN", confidence: 0.95 },
      },
    ];

    const lines = JSONLGenerator.generate(findings);
    const entry = JSON.parse(lines[0]);

    expect(entry.evidence).toEqual({ type: "SSN", confidence: 0.95 });
  });
});
