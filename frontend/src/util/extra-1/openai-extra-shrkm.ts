import { AzureKeyCredential, OpenAIClient } from "@azure/openai";

interface MyChatChoice {
  message?: {
    role?: string;
    content?: string | null;
  };
  index: number;
  finishReason?: string | null;
}

export const getChatCompletions = async (
  systemMessage: string,
  messages: string,
  images: string[]
): Promise<MyChatChoice[]> => {
  return new Promise(async (resolve, reject) => {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
    const azureApiKye = process.env.AZURE_OPENAI_API_KEY!;
    const deploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_Id!;

    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKye)
    );

    let messages;
    if (images.length > 0) {
      try {
        const response = await client.getChatCompletions(
          deploymentId,
          [
            {
              role: "system",
              content: systemMessage,
            },
            {
              role: "user",
              content: messages,
            },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  imageUrl: {
                    url: `data:image/png;base64,${images[0]}`,
                  },
                },
              ],
            },
          ],
          { maxTokens: 4096 }
        );
        resolve(response.choices);
      } catch (error) {
        reject(error);
      }
    } else {
      try {
        const response = await client.getChatCompletions(
          deploymentId,
          [
            { role: "system", content: systemMessage },
            { role: "user", content: messages },
          ],
          { maxTokens: 4096 }
        );
        resolve(response.choices);
      } catch (error) {
        reject(error);
      }
    }
  });
};

export const getEmbedding = async (message: string): Promise<number[]> => {
  return new Promise(async (resolve, reject) => {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
    const azureApiKye = process.env.AZURE_OPENAI_API_KEY!;
    const deploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_Id!;
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKye)
    );

    const embedding = await client.getEmbeddings(deploymentId, [message]);
    resolve(embedding.data[0].embedding);
  });
};
