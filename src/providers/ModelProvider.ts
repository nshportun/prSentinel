export interface ModelResponse {
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface ModelProviderConfig {
  modelId: string;
  apiKey?: string;
  awsAccessKey?: string;
  awsSecretKey?: string;
  awsRegion?: string;
  baseUrl?: string;
}

export interface ModelProvider {
  analyze(prompt: string, context: string): Promise<ModelResponse>;
  getCapabilities(): string[];
}
