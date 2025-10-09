import OpenAi from 'openai'
import { variables } from '../envVariables.js'
import { ChatCompletionMessageParam } from 'openai/resources'
import { apiError } from '../electronUtils/apiError.js'
import { apiResponse } from '../electronUtils/apiResponse.js'

const openRouterApiKey = variables.openRouterApiKey
if(!openRouterApiKey) throw new Error('Open Router Api Key not defined')

class Openrouter {
    private openai : OpenAi
    private messageContext : ChatCompletionMessageParam[]

    constructor () {
        this.openai = new OpenAi({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: openRouterApiKey,
        })
        this.messageContext = [{ role: 'system', content: "You are a helpful assistant and funny friend." }]
    }

    async processQuery(query: string , model : string) : Promise<apiResponse> {
        try {
            this.messageContext.push({
                role: 'user',
                content: query
            })
    
            const completions = await this.openai.chat.completions.create({
                model: model,
                temperature: 0,
                messages: this.messageContext,
            })
            
            const response = completions.choices[0].message.content
            if(!response) throw new Error(`Error while getting a response from ${model}`);
    
            this.messageContext.push({
                role: 'assistant',
                content: response
            })
    
            return new apiResponse(
                200,
                response,
                "succesfully get the chat response"
            )
        } catch (error) {
            console.error('Error in process query:',error)
            throw new apiError(
                500,
                (error as Error).message,
            )
        }
    }
}

export const openrouter = new Openrouter()