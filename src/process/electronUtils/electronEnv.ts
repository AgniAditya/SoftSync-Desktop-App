import path from 'path'
import { app } from 'electron'

// Returns the absolute path to the preload script used by BrowserWindow
export function getPreloadPath() {
    return path.join(app.getAppPath(), '/dist-electron/preload.cjs')
}

// Returns the correct .env file path depending on whether the app is in dev or production mode
export function envPath() {
    return isDev()
        ? path.join(app.getAppPath(), ".env")
        : path.join(process.resourcesPath, ".env");
}

// Checks if the current environment is development
export function isDev(): boolean {
    return process.env.NODE_ENV === 'development'
}
