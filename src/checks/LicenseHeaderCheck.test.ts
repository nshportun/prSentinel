import { describe, it, expect } from "vitest";
import { LicenseHeaderCheck } from "./LicenseHeaderCheck.js";

describe("LicenseHeaderCheck", () => {
  const check = new LicenseHeaderCheck();
  const ctx = {
    owner: "test",
    repo: "test",
    pullNumber: 1,
    diffContent: "",
    baseCommit: "abc",
    headCommit: "def",
  };

  it("flags a new dataset file without a license marker", async () => {
    const chunk = `+++ b/data/train.csv\n@@ -0,0 +1,3 @@\n+id,label\n+1,cat\n+2,dog`;
    const findings = await check.run(ctx, [chunk]);
    expect(findings.length).toBe(1);
    expect(findings[0].rule).toBe("missing-license-header");
    expect(findings[0].level).toBe("warning");
  });

  it("does not flag a dataset file that has a license comment", async () => {
    const chunk = `+++ b/data/train.csv\n@@ -0,0 +1,3 @@\n+# License: Apache-2.0\n+id,label\n+1,cat`;
    const findings = await check.run(ctx, [chunk]);
    expect(findings.length).toBe(0);
  });

  it("does not flag non-dataset files", async () => {
    const chunk = `+++ b/src/model.py\n@@ -0,0 +1 @@\n+import torch`;
    const findings = await check.run(ctx, [chunk]);
    expect(findings.length).toBe(0);
  });

  it("recognises attribution markers", async () => {
    const chunk = `+++ b/data/test.jsonl\n@@ -0,0 +1 @@\n+# Dataset from HuggingFace`;
    const findings = await check.run(ctx, [chunk]);
    expect(findings.length).toBe(0);
  });

  it("recognises CC-BY markers", async () => {
    const chunk = `+++ b/data/test.csv\n@@ -0,0 +1 @@\n+# CC-BY 4.0`;
    const findings = await check.run(ctx, [chunk]);
    expect(findings.length).toBe(0);
  });

  it("ignores chunks without +++ (no new files added)", async () => {
    const chunk = `--- a/data/old.csv\n@@ -1 +1 @@\n-id\n+identifier`;
    const findings = await check.run(ctx, [chunk]);
    expect(findings.length).toBe(0);
  });
});
