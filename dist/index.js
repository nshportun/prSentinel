import * as core from "@actions/core";
import * as github from "@actions/github";
import { promises as fs } from "fs";
import { DiffFetcher, DiffChunker } from "./diff/index.js";
import { PIIDetectionCheck, SecretScanningCheck, SchemaDriftCheck, NotebookSecurityCheck, LicenseHeaderCheck, } from "./checks/index.js";
import { AnthropicProvider, BedrockProvider } from "./providers/index.js";
import { SARIFGenerator, JSONLGenerator } from "./output/index.js";
/**
 * Resolve an action input across regular and composite action contexts.
 *
 * @actions/core getInput(name) reads INPUT_<NAME> where spaces become
 * underscores but hyphens are preserved. Composite action env blocks
 * do NOT support keys with hyphens reliably, so action.yml sets the
 * underscore form (INPUT_MODEL_ID) instead.  We try both here.
 */
function getInput(name, fallbackEnv) {
    // 1. core.getInput — works in regular (non-composite) action contexts
    const fromCore = core.getInput(name);
    if (fromCore)
        return fromCore;
    // 2. Underscore-normalised form set by action.yml composite env block
    const underscoreKey = `INPUT_${name.toUpperCase().replace(/-/g, "_")}`;
    const fromUnderscore = process.env[underscoreKey] ?? "";
    if (fromUnderscore)
        return fromUnderscore;
    // 3. Explicit fallback env var (e.g. GITHUB_TOKEN for github-token)
    if (fallbackEnv)
        return process.env[fallbackEnv] ?? "";
    return "";
}
function buildProvider(modelId) {
    const hasAws = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY;
    const hasAnthropic = process.env.ANTHROPIC_API_KEY;
    if (hasAws && !hasAnthropic) {
        core.info("Using AWS Bedrock provider");
        return new BedrockProvider({ modelId });
    }
    if (hasAnthropic) {
        core.info("Using Anthropic direct API provider");
        return new AnthropicProvider({ modelId });
    }
    // Default to Bedrock (relies on IAM role / env creds)
    core.info("No explicit API key found — using AWS Bedrock (IAM/env creds)");
    return new BedrockProvider({ modelId });
}
async function run() {
    try {
        const modelId = getInput("model-id");
        const checksInput = getInput("checks") || "pii,secrets,schema";
        const outputFormat = getInput("output-format") || "sarif";
        const severityThreshold = getInput("severity-threshold") || "warning";
        const githubToken = getInput("github-token", "GITHUB_TOKEN");
        if (!modelId) {
            core.setFailed("model-id input is required. " +
                "For Bedrock use e.g. anthropic.claude-opus-4-5-20251101-v1:0");
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
        const provider = buildProvider(modelId);
        const requestedChecks = checksInput.split(",").map((c) => c.trim());
        const checks = new Map();
        if (requestedChecks.includes("pii")) {
            checks.set("pii", new PIIDetectionCheck(modelId, provider));
        }
        if (requestedChecks.includes("secrets")) {
            checks.set("secrets", new SecretScanningCheck());
        }
        if (requestedChecks.includes("schema")) {
            checks.set("schema", new SchemaDriftCheck(modelId, provider));
        }
        if (requestedChecks.includes("notebook")) {
            checks.set("notebook", new NotebookSecurityCheck());
        }
        if (requestedChecks.includes("license")) {
            checks.set("license", new LicenseHeaderCheck());
        }
        const allFindings = [];
        for (const [name, check] of checks) {
            core.info(`Running ${name} check...`);
            const findings = await check.run({
                owner,
                repo,
                pullNumber,
                diffContent: chunks.join("\n"),
                baseCommit: diff.baseCommit,
                headCommit: diff.headCommit,
            }, chunks);
            allFindings.push(...findings);
        }
        // Filter by severity threshold
        const severityOrder = { info: 0, warning: 1, error: 2 };
        const thresholdLevel = severityOrder[severityThreshold] ?? 1;
        const filteredFindings = allFindings.filter((f) => severityOrder[f.level] >= thresholdLevel);
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
    }
    catch (error) {
        core.setFailed(error instanceof Error ? error.message : String(error));
    }
}
run();
//# sourceMappingURL=index.js.map