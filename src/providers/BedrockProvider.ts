import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";
import { ModelProvider, ModelProviderConfig, ModelResponse } from "./ModelProvider.js";

export class BedrockProvider implements ModelProvider {
  private client: AnthropicBedrock;
  private modelId: string;

  constructor(config: ModelProviderConfig) {
    this.modelId = config.modelId;
    const awsAccessKey =
      config.awsAccessKey ?? process.env.AWS_ACCESS_KEY_ID;
    const awsSecretKey =
      config.awsSecretKey ?? process.env.AWS_SECRET_ACCESS_KEY;
    const awsRegion =
      config.awsRegion ?? process.env.AWS_REGION ?? "us-east-1";

    // The SDK uses discriminated union: either both keys are strings,
    // or both are absent. Spread only when both are present.
    this.client =
      awsAccessKey && awsSecretKey
        ? new AnthropicBedrock({ awsAccessKey, awsSecretKey, awsRegion })
        : new AnthropicBedrock({ awsRegion });
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
      throw new Error("No text response from Bedrock");
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
