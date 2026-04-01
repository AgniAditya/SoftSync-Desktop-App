import dotenv from 'dotenv'
import { envPath } from './electronEnv.js'

dotenv.config({ path: envPath() })

// Export an object containing key environment variables for use throughout the app
export const variables = {
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
    serverPath : process.env.SERVER_PATH
}
