import * as core from "@actions/core";
import * as github from "@actions/github";
import { promises as fs } from "fs";
import { DiffFetcher, DiffChunker } from "./diff/index.js";
import {
  PIIDetectionCheck,
  SecretScanningCheck,
  SchemaDriftCheck,
  NotebookSecurityCheck,
  LicenseHeaderCheck,
  type DataQualityCheck,
  type Finding,
} from "./checks/index.js";
import { SARIFGenerator, JSONLGenerator } from "./output/index.js";

async function run() {
  try {
    const modelProvider = core.getInput("model-provider") || "anthropic";
    const modelId = core.getInput("model-id");
    const checksInput = core.getInput("checks") || "pii,secrets,schema";
    const outputFormat = core.getInput("output-format") || "sarif";
    const severityThreshold = core.getInput("severity-threshold") || "warning";
    const githubToken = core.getInput("github-token");

    if (!modelId) {
      core.setFailed("model-id input is required");
      return;
    }

    if (!githubToken) {
      core.setFailed("github-token input is required");
      return;
    }

    const { context } = github;
    const { owner, repo } = context.repo;
    const pullNumber = context.payload.pull_request?.number;

    if (!pullNumber) {
      core.setFailed("This action only works on pull_request events");
      return;
    }

    core.info(`Fetching diff for PR #${pullNumber}...`);
    const diffFetcher = new DiffFetcher(githubToken);
    const diff = await diffFetcher.fetchPullRequestDiff(owner, repo, pullNumber);

    core.info(`Chunking diff (${diff.files.length} files)...`);
    const chunker = new DiffChunker();
    const chunks = chunker.chunk(diff.files);

    const requestedChecks = checksInput.split(",").map((c) => c.trim());
    const checks: Map<string, DataQualityCheck> = new Map();

    if (requestedChecks.includes("pii")) {
      checks.set("pii", new PIIDetectionCheck(modelId));
    }
    if (requestedChecks.includes("secrets")) {
      checks.set("secrets", new SecretScanningCheck());
    }
    if (requestedChecks.includes("schema")) {
      checks.set("schema", new SchemaDriftCheck(modelId));
    }
    if (requestedChecks.includes("notebook")) {
      checks.set("notebook", new NotebookSecurityCheck());
    }
    if (requestedChecks.includes("license")) {
      checks.set("license", new LicenseHeaderCheck());
    }

    const allFindings: Finding[] = [];

    for (const [name, check] of checks) {
      core.info(`Running ${name} check...`);
      const findings = await check.run(
        {
          owner,
          repo,
          pullNumber,
          diffContent: chunks.join("\n"),
          baseCommit: diff.baseCommit,
          headCommit: diff.headCommit,
        },
        chunks
      );
      allFindings.push(...findings);
    }

    // Filter by severity threshold
    const severityOrder = { info: 0, warning: 1, error: 2 };
    const thresholdLevel = severityOrder[severityThreshold as keyof typeof severityOrder] || 1;
    const filteredFindings = allFindings.filter(
      (f) => severityOrder[f.level as keyof typeof severityOrder] >= thresholdLevel
    );

    core.info(`Found ${filteredFindings.length} issues`);

    // Output SARIF
    if (outputFormat.includes("sarif")) {
      const sarif = SARIFGenerator.generate(filteredFindings);
      const sarifPath = "sarif-report.sarif";
      await fs.writeFile(sarifPath, JSON.stringify(sarif, null, 2));
      core.setOutput("sarif-file", sarifPath);
      core.info(`SARIF report written to ${sarifPath}`);
    }

    // Output JSONL
    if (outputFormat.includes("jsonl")) {
      const jsonlLines = JSONLGenerator.generate(filteredFindings);
      const jsonlPath = "evidence-log.jsonl";
      await fs.writeFile(jsonlPath, jsonlLines.join("\n"));
      core.setOutput("jsonl-file", jsonlPath);
      core.info(`JSONL evidence log written to ${jsonlPath}`);
    }

    core.setOutput("issue-count", filteredFindings.length.toString());

    if (filteredFindings.length > 0) {
      for (const finding of filteredFindings.slice(0, 10)) {
        core.warning(`${finding.rule}: ${finding.message}`);
      }
      if (filteredFindings.length > 10) {
        core.warning(`... and ${filteredFindings.length - 10} more issues`);
      }
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

run();
