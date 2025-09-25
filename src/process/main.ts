import { app , BrowserWindow, ipcMain} from 'electron'
import { getPreloadPath } from './pathResolver.js'
import { getAvailableLLMs, isDev } from './utils.js'
import path from 'path'

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload : getPreloadPath()
        }
    })

    ipcMain.handle('getAvailableLLMs', () => getAvailableLLMs())

    if(isDev()){
        mainWindow.loadURL('http://localhost:8000');
    }
    else{
        mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'))
    }
    mainWindow.maximize()
}

app.on('ready',createWindow)