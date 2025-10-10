import dotenv from 'dotenv'              // Import dotenv to load environment variables from a .env file
import { envPath } from './electronEnv.js' // Import helper function to get correct .env file path

// Load environment variables from the specified .env file path
dotenv.config({ path: envPath() })

// Export an object containing key environment variables for use throughout the app
export const variables = {
    openRouterApiKey: process.env.OPENROUTER_API_KEY, // API key for OpenRouter service
}
