import { DiffFile } from "./DiffFetcher.js";

export class DiffChunker {
  private maxChunkSize: number;

  constructor(maxChunkSize: number = 4000) {
    this.maxChunkSize = maxChunkSize;
  }

  chunk(files: DiffFile[]): string[] {
    const chunks: string[] = [];
    let currentChunk = "";

    for (const file of files) {
      if (!file.patch) continue;

      const fileHeader = `--- a/${file.filename}\n+++ b/${file.filename}\n`;
      const fileContent = fileHeader + file.patch;

      if ((currentChunk + fileContent).length > this.maxChunkSize && currentChunk) {
        chunks.push(currentChunk);
        currentChunk = fileContent;
      } else {
        currentChunk += fileContent;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }
}
