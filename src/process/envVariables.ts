import dotenv from 'dotenv'
import { envPath } from './electronUtils/electronEnv.js';

dotenv.config({ path: envPath() })

export const variables = {
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
}