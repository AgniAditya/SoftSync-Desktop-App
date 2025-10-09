import { app , BrowserWindow} from 'electron'
import { getPreloadPath } from './electronUtils/electronEnv.js'
import { isDev } from './electronUtils/electronEnv.js'
import path from 'path'
import { loadIpcHandlers } from './ipcHandlers.js'
import { apiError } from './electronUtils/apiError.js'

const createWindow = () => {
    try {
        const mainWindow = new BrowserWindow({
            webPreferences: {
                preload : getPreloadPath()
            }
        })
    
        if(isDev()){
            mainWindow.loadURL('http://localhost:8000');
        }
        else{
            mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'))
        }
        mainWindow.maximize()

        loadIpcHandlers()

    } catch (error) {
        console.error(error)
        throw new apiError(
            500,
            (error as Error).message
        )
    }
}

app.on('ready',createWindow)