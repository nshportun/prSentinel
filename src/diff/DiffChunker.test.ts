import { describe, it, expect } from "vitest";
import { DiffChunker } from "./DiffChunker.js";

describe("DiffChunker", () => {
  it("chunks large diffs into smaller pieces", () => {
    const chunker = new DiffChunker(100);
    const files = [
      {
        filename: "file1.txt",
        patch: "line1\nline2\nline3\n",
        status: "modified",
        additions: 3,
        deletions: 0,
      },
      {
        filename: "file2.txt",
        patch: "line4\nline5\nline6\n",
        status: "modified",
        additions: 3,
        deletions: 0,
      },
    ];

    const chunks = chunker.chunk(files);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it("handles files without patches", () => {
    const chunker = new DiffChunker();
    const files = [
      {
        filename: "deleted.txt",
        status: "deleted",
        additions: 0,
        deletions: 5,
      },
    ];

    const chunks = chunker.chunk(files);
    expect(chunks.length).toBe(0);
  });

  it("preserves file content", () => {
    const chunker = new DiffChunker();
    const files = [
      {
        filename: "test.txt",
        patch: "+new line",
        status: "modified",
        additions: 1,
        deletions: 0,
      },
    ];

    const chunks = chunker.chunk(files);
    expect(chunks[0]).toContain("test.txt");
    expect(chunks[0]).toContain("new line");
  });
});
