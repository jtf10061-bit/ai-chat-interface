import { CosmosClient } from "@azure/cosmos";

// 取得するアイテムの型を定義
interface CosmosItem {
  file_name: string;
  content: string;
  is_contain_image: boolean;
  image_blob_path: string | null;
  SimilarityScore: number;
}

// ベクトル検索
export const getItemByVector = async (
  embedding: number[]
): Promise<CosmosItem[]> => {
  // return new Promise(async (resolve, reject) => {
  return new Promise(async (resolve) => {
    const cosmosClient = new CosmosClient({
      endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT!,
      key: process.env.AZURE_COSMOS_DB_KEY!,
    });

    const database = cosmosClient.database(
      process.env.AZURE_COSMOS_DB_DATABASE_NAME!
    );
    const container = database.container(
      process.env.AZURE_COSMOS_DB_CONTAINER_NAME!
    );

    const { resources } = await container.items
      .query({
        query:
          "SELECT TOP 10 c.file_name, c.content, c.is_contain_image, c.image_blob_path, VectorDistance(c.content_vector, @embedding) AS SimilarityScore FROM c WHERE VectorDistance(c.content_vector, @embedding) > 0.50 ORDER BY VectorDistance(c.content_vector, @embedding)",
        parameters: [{ name: "@embedding", value: embedding }],
      })
      .fetchAll();

    for (const item of resources) {
      console.log(
        `${item.file_name}, ${item.content}, ${item.image_blob_path}, ${item.SimilarityScore} is a capitol \n`
      );
    }
    resolve(resources);
  });
};
