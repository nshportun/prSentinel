import { describe, it, expect, vi, beforeEach } from "vitest";
import { PIIDetectionCheck } from "./PIIDetectionCheck.js";
import { AnthropicProvider } from "../providers/AnthropicProvider.js";

vi.mock("../providers/AnthropicProvider.js", () => ({
  AnthropicProvider: vi.fn().mockImplementation(() => ({
    analyze: vi.fn(),
    getCapabilities: vi.fn().mockReturnValue(["pii-detection"]),
  })),
}));

describe("PIIDetectionCheck", () => {
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

  it("returns findings when model detects PII", async () => {
    const mockAnalyze = vi.fn().mockResolvedValue({
      content: JSON.stringify([
        { pattern: "123-45-6789", type: "SSN", risk: "high", lineOffset: 3 },
      ]),
    });
    (AnthropicProvider as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyze: mockAnalyze,
      getCapabilities: vi.fn().mockReturnValue(["pii-detection"]),
    }));

    const check = new PIIDetectionCheck("claude-3-5-sonnet-20241022");
    const findings = await check.run(ctx, ["+ssn = '123-45-6789'"]);

    expect(findings.length).toBe(1);
    expect(findings[0].rule).toBe("pii-exposure");
    expect(findings[0].level).toBe("error");
  });

  it("maps medium/low risk to warning", async () => {
    const mockAnalyze = vi.fn().mockResolvedValue({
      content: JSON.stringify([
        { pattern: "john@example.com", type: "Email", risk: "medium", lineOffset: 1 },
      ]),
    });
    (AnthropicProvider as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyze: mockAnalyze,
      getCapabilities: vi.fn(),
    }));

    const check = new PIIDetectionCheck("claude-3-5-sonnet-20241022");
    const findings = await check.run(ctx, ["+email = 'john@example.com'"]);

    expect(findings[0].level).toBe("warning");
  });

  it("returns empty when model returns empty array", async () => {
    const mockAnalyze = vi.fn().mockResolvedValue({ content: "[]" });
    (AnthropicProvider as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyze: mockAnalyze,
      getCapabilities: vi.fn(),
    }));

    const check = new PIIDetectionCheck();
    const findings = await check.run(ctx, ["+x = 1"]);

    expect(findings.length).toBe(0);
  });

  it("handles invalid JSON from model gracefully", async () => {
    const mockAnalyze = vi.fn().mockResolvedValue({ content: "not json" });
    (AnthropicProvider as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      analyze: mockAnalyze,
      getCapabilities: vi.fn(),
    }));

    const check = new PIIDetectionCheck();
    const findings = await check.run(ctx, ["+x = 1"]);

    expect(findings.length).toBe(0);
  });
});
