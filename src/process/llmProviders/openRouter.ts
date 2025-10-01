import OpenAi from 'openai'
import { variables } from '../envVariables.js'
import { ChatCompletionMessageParam } from 'openai/resources'

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
        this.messageContext = [{ role: 'assistant', content: "You are a helpful assistant." }]
    }

    async processQuery(query: string , model : string) : Promise<string> {
        this.messageContext.push({
            role: 'user',
            content: query
        })

        const completions = await this.openai.chat.completions.create({
            model: model,
            messages: this.messageContext,
        })
        
        const response = completions.choices[0].message.content
        if(!response) throw new Error(`Error while getting a response from ${model}`);

        this.messageContext.push({
            role: 'assistant',
            content: response
        })

        return response
    }
}

export const openrouter = new Openrouter()