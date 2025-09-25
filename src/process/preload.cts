const electron = require('electron')

const apis = {
    getAvailableLLMs : () => {
        return electron.ipcRenderer.invoke('getAvailableLLMs')
    },
    getChatResponse: (prompt : string , model : string) => {
        return electron.ipcRenderer.invoke('getChatResponse',prompt,model)
    }
}

electron.contextBridge.exposeInMainWorld('electron',apis)