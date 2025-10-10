// This file defines the Openrouter class, which interacts with the OpenRouter API 
// to process user queries and generate chat responses using OpenAI models.

import OpenAi from 'openai'
import { variables } from '../electronUtils/envVariables.js'
import { ChatCompletionMessageParam } from 'openai/resources'
import { apiError } from '../electronUtils/apiError.js'
import { apiResponse } from '../electronUtils/apiResponse.js'

// Retrieve the OpenRouter API key from environment variables
const openRouterApiKey = variables.openRouterApiKey
if(!openRouterApiKey) throw new Error('Open Router Api Key not defined')

// Openrouter class handles communication with the OpenRouter API
class Openrouter {
    private openai : OpenAi // Instance of the OpenAi client
    private messageContext : ChatCompletionMessageParam[] // Stores the context of the chat messages

    constructor () {
        // Initialize the OpenAi client with the OpenRouter API base URL and API key
        this.openai = new OpenAi({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: openRouterApiKey,
        })
        // Set the initial system message for the chat context
        this.messageContext = [{ role: 'system', content: "You are a helpful assistant and funny friend." }]
    }

    // Processes a user query and returns a response from the OpenAI model
    async processQuery(query: string , model : string) : Promise<apiResponse | apiError> {
        try {
            // Add the user's query to the message context
            this.messageContext.push({
                role: 'user',
                content: query
            })
    
            // Send the chat request to the OpenRouter API
            const completions = await this.openai.chat.completions.create({
                model: model,
                temperature: 0,
                messages: this.messageContext,
            })
            
            // Extract the response from the API
            const response = completions.choices[0].message.content
            if(!response) throw new Error(`Error while getting a response from ${model}`);
    
            // Add the assistant's response to the message context
            this.messageContext.push({
                role: 'assistant',
                content: response
            })
    
            // Return a successful API response
            return new apiResponse(
                200,
                response,
                "succesfully get the chat response"
            )
        } catch (error) {
            console.error('Error in process query:',error)
            // Return an error response in case of failure
            return new apiError(
                500,
                (error as Error).message,
            )
        }
    }
}

// Export an instance of the Openrouter class for use in other parts of the application
export const openrouter = new Openrouter()