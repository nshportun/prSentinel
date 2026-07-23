import { Octokit } from "octokit";

export interface PullRequestDiff {
  files: DiffFile[];
  baseCommit: string;
  headCommit: string;
}

export interface DiffFile {
  filename: string;
  patch?: string;
  status: string;
  additions: number;
  deletions: number;
}

export class DiffFetcher {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async fetchPullRequestDiff(
    owner: string,
    repo: string,
    pullNumber: number
  ): Promise<PullRequestDiff> {
    const { data: pr } = await this.octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pullNumber,
    });

    const { data: files } = await this.octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pullNumber,
      per_page: 100,
    });

    return {
      files: files as DiffFile[],
      baseCommit: pr.base.sha,
      headCommit: pr.head.sha,
    };
  }
}
