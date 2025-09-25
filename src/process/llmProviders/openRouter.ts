import OpenAi from 'openai'
import dotenv from 'dotenv';

dotenv.config();

const openRouterApiKey = process.env.OPENROUTER_API_KEY
console.log(openRouterApiKey)
if(!openRouterApiKey) throw new Error('Open Router Api Key not defined')

class Openrouter {
    private openai : OpenAi

    constructor () {
        this.openai = new OpenAi({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: openRouterApiKey,
        })
    }

    async processQuery(query: string , model : string) : Promise<string> {
        const completions = await this.openai.chat.completions.create({
            model: model,
            messages: [
                {
                    role: 'user',
                    content: query,
                },
            ],
        })

        const response = completions.choices[0].message.content
        if(!response) throw new Error(`Error while getting a response from ${model}`);

        return response
    }
}

export const openrouter = new Openrouter()