import dotenv from 'dotenv'

dotenv.config()

export const variables = {
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
    rendererPort: process.env.RENDERER_PORT,
}