import { app , BrowserWindow} from 'electron'
import { getPreloadPath } from './pathResolver.js'
import { isDev } from './utils.js'
import path from 'path'

const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 1200,
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

}

app.on('ready',createWindow)