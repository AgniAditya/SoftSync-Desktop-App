import path from 'path'
import { app } from 'electron'

export function getPreloadPath(){
    return path.join(app.getAppPath(),'/dist-electron/preload.cjs')
}

export function envPath(){
    return isDev() ? path.join(app.getAppPath(), ".env")
      : path.join(process.resourcesPath, ".env");
}

export function isDev() : boolean {
    return process.env.NODE_ENV === 'development'
}