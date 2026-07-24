import { describe, it, expect } from "vitest";
import { SecretScanningCheck } from "./SecretScanningCheck.js";

describe("SecretScanningCheck", () => {
  const check = new SecretScanningCheck();

  it("detects API keys in diff", async () => {
    const chunks = ['api_key = "sk_test_1234567890abcdef"'];
    const findings = await check.run(
      {
        owner: "test",
        repo: "test",
        pullNumber: 1,
        diffContent: chunks.join("\n"),
        baseCommit: "abc",
        headCommit: "def",
      },
      chunks
    );

    expect(findings.length).toBeGreaterThan(0);
    expect(findings[0].rule).toBe("secret-exposure");
    expect(findings[0].level).toBe("error");
  });

  it("detects GitHub tokens", async () => {
    const chunks = ['github_token = "ghp_12345678901234567890123456789012345678"'];
    const findings = await check.run(
      {
        owner: "test",
        repo: "test",
        pullNumber: 1,
        diffContent: chunks.join("\n"),
        baseCommit: "abc",
        headCommit: "def",
      },
      chunks
    );

    expect(findings.length).toBeGreaterThan(0);
  });

  it("returns empty for safe diffs", async () => {
    const chunks = ['const name = "John Doe";', 'const email = "john@example.com";'];
    const findings = await check.run(
      {
        owner: "test",
        repo: "test",
        pullNumber: 1,
        diffContent: chunks.join("\n"),
        baseCommit: "abc",
        headCommit: "def",
      },
      chunks
    );

    expect(findings.length).toBe(0);
  });
});
