import dotenv from 'dotenv'
import { envPath } from './electronEnv.js';

dotenv.config({ path: envPath() })

export const variables = {
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
}