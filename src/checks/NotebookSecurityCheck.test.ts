import { describe, it, expect } from "vitest";
import { NotebookSecurityCheck } from "./NotebookSecurityCheck.js";

describe("NotebookSecurityCheck", () => {
  const check = new NotebookSecurityCheck();

  it("detects secrets in notebook cells", async () => {
    const notebookDiff = `
+++ b/analysis.ipynb
{
  "cells": [
    {
      "cell_type": "code",
      "source": "api_key = 'sk_test_secret123'"
    }
  ]
}
    `;
    const findings = await check.run(
      {
        owner: "test",
        repo: "test",
        pullNumber: 1,
        diffContent: notebookDiff,
        baseCommit: "abc",
        headCommit: "def",
      },
      [notebookDiff]
    );

    expect(findings.length).toBeGreaterThan(0);
  });

  it("ignores non-notebook diffs", async () => {
    const chunks = ["+++ b/script.py\nprint('hello')"];
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

  it("detects PII (SSN) in cell output text array", async () => {
    const notebookDiff = `+++ b/analysis.ipynb
{
  "cells": [
    {
      "cell_type": "code",
      "source": "print(df.head())",
      "outputs": [
        {
          "output_type": "execute_result",
          "text": ["Name, SSN\\n", "Alice, 123-45-6789\\n"]
        }
      ]
    }
  ]
}`;
    const findings = await check.run(
      { owner: "t", repo: "t", pullNumber: 1, diffContent: notebookDiff, baseCommit: "a", headCommit: "b" },
      [notebookDiff]
    );
    expect(findings.some((f) => f.rule === "notebook-pii-output")).toBe(true);
  });

  it("detects PII (credit card) in output text string", async () => {
    const notebookDiff = `+++ b/analysis.ipynb
{
  "cells": [
    {
      "cell_type": "code",
      "source": "print(cc)",
      "outputs": [
        {
          "output_type": "stream",
          "text": "card: 4111 1111 1111 1111"
        }
      ]
    }
  ]
}`;
    const findings = await check.run(
      { owner: "t", repo: "t", pullNumber: 1, diffContent: notebookDiff, baseCommit: "a", headCommit: "b" },
      [notebookDiff]
    );
    expect(findings.some((f) => f.rule === "notebook-pii-output")).toBe(true);
  });

  it("reads output text from data[text/plain]", async () => {
    const notebookDiff = `+++ b/analysis.ipynb
{
  "cells": [
    {
      "cell_type": "code",
      "source": "df",
      "outputs": [
        {
          "output_type": "execute_result",
          "data": { "text/plain": "SSN: 987-65-4321" }
        }
      ]
    }
  ]
}`;
    const findings = await check.run(
      { owner: "t", repo: "t", pullNumber: 1, diffContent: notebookDiff, baseCommit: "a", headCommit: "b" },
      [notebookDiff]
    );
    expect(findings.some((f) => f.rule === "notebook-pii-output")).toBe(true);
  });
});
