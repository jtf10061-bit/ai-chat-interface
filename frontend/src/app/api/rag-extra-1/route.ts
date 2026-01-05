import { getBase64File } from "@/util/extra-1/blob"
import { getItemByVector } from "@/util/extra-1/cosmos"
import { getChatCompletions, getEmbedding } from "@/util/extra-1/openai-extra-shrkm"
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export const POST = async (req: NextRequest) => {
    try {
        const { message } = await req.json();
        console.log("RAG-extra用のAPIルート")
        console.log("Get embedding from Azure OpenAI");
        const embedding =  await getEmbedding(message);

        console.log("Search veoctor from Azure Cosmos DB");
        const cosmosItems = await getItemByVector(embedding);

        console.log("Create system message and image_content.");
        let systemMessage = "あなたが持っている知識は使ってはいけません。'検索結果'と画像の情報のみを使って回答しなさい。わからない場合は、「わかりません。」と回答しなさい。";
        systemMessage += "# 検索結果:\n";

        let images: any[] = []
        for (const result of cosmosItems) {
            systemMessage +=
            '## ' +
            (cosmosItems.indexOf(result) + 1) +
            '\n' +
            result.content +
            '\n\n';

            if(result.is_contain_image) {
                const image = await getBase64File(result.image_blob_path!);
                images.push(image);
            }
         }

         console.log("systmMessage:", systemMessage);
         const result = await getChatCompletions(systemMessage, message, images);
         let aiMessage = result[0].message?.content || "";

        return NextResponse.json({ aiMessage: aiMessage }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({aiMessage: error.message}, { status: 500 });
    }
}

export const dynamic = "force-dynamic";
