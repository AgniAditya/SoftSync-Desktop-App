import { openrouter } from "../llmProviders/openRouter.js";
import { apiError } from "../electronUtils/apiError.js";
import { apiResponse } from "../electronUtils/apiResponse.js";

export async function getAvailableLLMs() : Promise<apiResponse> {
    const url = 'https://openrouter.ai/api/v1/models';
    const options = {method: 'GET'};

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return new apiResponse(
            200,
            data.data,
            "succesfully fetch the all models"
        )
    } catch (error) {
        console.log(error)
        throw new apiError(
            500,
            (error as Error).message
        )
    }
}

export async function getChatResponse(prompt : string,model : string) {
    const response = await openrouter.processQuery(prompt,model);
    return response;
}