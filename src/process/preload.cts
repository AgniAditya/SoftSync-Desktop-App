const electron = require('electron')

const apis = {
    getAvailableLLMs : () => {
        return electron.ipcRenderer.invoke('getAvailableLLMs')
    }
}

electron.contextBridge.exposeInMainWorld('electron',apis)