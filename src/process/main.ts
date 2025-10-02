import { app , BrowserWindow} from 'electron'
import { getPreloadPath } from './pathResolver.js'
import { isDev } from './utils.js'
import path from 'path'
import { loadIpcHandlers } from './ipcHandlers.js'

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
        throw new Error('Error in mainWindow.')
    }
}

app.on('ready',createWindow)