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
});
