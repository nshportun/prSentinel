import Anthropic from "@anthropic-ai/sdk";
import { ModelProvider, ModelProviderConfig, ModelResponse } from "./ModelProvider.js";

export class AnthropicProvider implements ModelProvider {
  private client: Anthropic;
  private modelId: string;

  constructor(config: ModelProviderConfig) {
    this.modelId = config.modelId;
    this.client = new Anthropic({
      apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
    });
  }

  async analyze(prompt: string, context: string): Promise<ModelResponse> {
    const message = await this.client.messages.create({
      model: this.modelId,
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `${prompt}\n\nContext:\n${context}`,
        },
      ],
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from Anthropic");
    }

    return {
      content: textContent.text,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      },
    };
  }

  getCapabilities(): string[] {
    return ["pii-detection", "schema-analysis", "secret-scanning"];
  }
}
