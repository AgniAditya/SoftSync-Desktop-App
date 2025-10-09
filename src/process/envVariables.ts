import dotenv from 'dotenv'
import path from "path";
import { isDev } from './electronUtils/electronEnv.js';
import { app } from 'electron';

// Decide path depending on environment
const envPath = isDev()
  ? path.join(app.getAppPath(), ".env")
  : path.join(process.resourcesPath, ".env");

dotenv.config({ path: envPath })

export const variables = {
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
}