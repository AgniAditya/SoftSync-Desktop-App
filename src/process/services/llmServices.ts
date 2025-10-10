import { openrouter } from "../llmProviders/openRouter.js"; // Import OpenRouter provider for querying LLMs
import { apiError } from "../electronUtils/apiError.js";    // Custom API error class
import { apiResponse } from "../electronUtils/apiResponse.js"; // Custom API response class

// Fetches the list of available LLM models from OpenRouter API
export async function getAvailableLLMs(): Promise<apiResponse> {
    const url = 'https://openrouter.ai/api/v1/models'; // OpenRouter API endpoint
    const options = { method: 'GET' };                // HTTP GET request

    try {
        const response = await fetch(url, options);   // Send request to API
        const data = await response.json();           // Parse JSON response

        // Return standardized API response
        return new apiResponse(
            200,                 // HTTP-like status code
            data.data,           // Payload containing models
            "succesfully fetch the all models" // Informational message
        );
    } catch (error) {
        console.log(error); // Log error to console
        // Throw standardized API error
        throw new apiError(
            500,
            (error as Error).message
        );
    }
}

// Sends a prompt to the selected LLM model and returns the response
export async function getChatResponse(prompt: string, model: string) {
    const response = await openrouter.processQuery(prompt, model); // Query the LLM via OpenRouter
    return response;
}