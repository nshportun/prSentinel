import { describe, it, expect, vi, beforeEach } from "vitest";
import { SchemaDriftCheck } from "./SchemaDriftCheck.js";
import { AnthropicProvider } from "../providers/AnthropicProvider.js";

vi.mock("../providers/AnthropicProvider.js", () => ({
  AnthropicProvider: vi.fn().mockImplementation(() => ({
    analyze: vi.fn(),
    getCapabilities: vi.fn().mockReturnValue(["schema-analysis"]),
  })),
}));

describe("SchemaDriftCheck", () => {
  const ctx = {
    owner: "test",
    repo: "test",
    pullNumber: 1,
    diffContent: "",
    baseCommit: "abc",
    headCommit: "def",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns findings for schema issues in data files", async () => {
    const mockAnalyze = vi.fn().mockResolvedValue({
      content: JSON.stringify([
        { issue: "Field 'age' removed", severity: "high", fieldName: "age", suggestion: "Deprecate before removing" },
      ]),
    });
    (AnthropicProvider as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyze: mockAnalyze,
      getCapabilities: vi.fn(),
    }));

    const check = new SchemaDriftCheck("claude-3-5-sonnet-20241022");
    const findings = await check.run(ctx, [
      "+++ b/schema.json\n-{ \"age\": \"int\" }",
    ]);

    expect(findings.length).toBe(1);
    expect(findings[0].rule).toBe("schema-drift");
    expect(findings[0].level).toBe("error");
  });

  it("maps medium/low severity to warning", async () => {
    const mockAnalyze = vi.fn().mockResolvedValue({
      content: JSON.stringify([
        { issue: "Naming inconsistency", severity: "medium", fieldName: "userId", suggestion: "Use snake_case" },
      ]),
    });
    (AnthropicProvider as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyze: mockAnalyze,
      getCapabilities: vi.fn(),
    }));

    const check = new SchemaDriftCheck();
    const findings = await check.run(ctx, ["+++ b/data.csv\n+userId,name"]);

    expect(findings[0].level).toBe("warning");
  });

  it("skips non-data file diffs", async () => {
    const mockAnalyze = vi.fn().mockResolvedValue({ content: "[]" });
    (AnthropicProvider as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyze: mockAnalyze,
      getCapabilities: vi.fn(),
    }));

    const check = new SchemaDriftCheck();
    const findings = await check.run(ctx, ["+++ b/main.py\n+x = 1"]);

    expect(mockAnalyze).not.toHaveBeenCalled();
    expect(findings.length).toBe(0);
  });

  it("handles invalid JSON from model gracefully", async () => {
    const mockAnalyze = vi.fn().mockResolvedValue({ content: "not json" });
    (AnthropicProvider as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyze: mockAnalyze,
      getCapabilities: vi.fn(),
    }));

    const check = new SchemaDriftCheck();
    const findings = await check.run(ctx, ["+++ b/data.json\n+{}"]);

    expect(findings.length).toBe(0);
  });
});
