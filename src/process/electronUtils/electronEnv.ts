import path from 'path'        // Node.js path module for handling and joining file paths
import { app } from 'electron' // Electron app module for accessing app-specific paths

// Returns the absolute path to the preload script used by BrowserWindow
export function getPreloadPath() {
    return path.join(app.getAppPath(), '/dist-electron/preload.cjs')
}

// Returns the correct .env file path depending on whether the app is in dev or production mode
export function envPath() {
    return isDev()
        ? path.join(app.getAppPath(), ".env")            // In dev, use project root path
        : path.join(process.resourcesPath, ".env");      // In production, use resources directory
}

// Checks if the current environment is development
export function isDev(): boolean {
    return process.env.NODE_ENV === 'development'
}
