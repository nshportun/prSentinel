import { describe, it, expect } from "vitest";
import { SARIFGenerator } from "./SARIFGenerator.js";

describe("SARIFGenerator", () => {
  it("generates valid SARIF from findings", () => {
    const findings = [
      {
        rule: "pii-exposure",
        level: "error" as const,
        message: "Found SSN",
        file: "data.csv",
        startLine: 5,
        endLine: 5,
      },
    ];

    const sarif = SARIFGenerator.generate(findings);

    expect(sarif.version).toBe("2.1.0");
    expect(sarif.runs.length).toBe(1);
    expect(sarif.runs[0].results.length).toBe(1);
    expect(sarif.runs[0].results[0].ruleId).toBe("pii-exposure");
  });

  it("handles multiple findings with same rule", () => {
    const findings = [
      {
        rule: "secret-exposure",
        level: "error" as const,
        message: "API key found",
        file: "config.py",
        startLine: 10,
        endLine: 10,
      },
      {
        rule: "secret-exposure",
        level: "error" as const,
        message: "Token found",
        file: "config.py",
        startLine: 20,
        endLine: 20,
      },
    ];

    const sarif = SARIFGenerator.generate(findings);

    expect(sarif.runs[0].results.length).toBe(2);
    expect(sarif.runs[0].tool.driver.rules.length).toBe(1);
  });

  it("maps severity levels correctly", () => {
    const findings = [
      { rule: "warning-rule", level: "warning" as const, message: "Warning", file: "file.txt", startLine: 0, endLine: 0 },
      { rule: "error-rule", level: "error" as const, message: "Error", file: "file.txt", startLine: 1, endLine: 1 },
      { rule: "info-rule", level: "info" as const, message: "Info", file: "file.txt", startLine: 2, endLine: 2 },
    ];

    const sarif = SARIFGenerator.generate(findings);

    expect(sarif.runs[0].results[0].level).toBe("warning");
    expect(sarif.runs[0].results[1].level).toBe("error");
    expect(sarif.runs[0].results[2].level).toBe("info");
  });
});
