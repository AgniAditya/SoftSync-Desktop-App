const electron = require('electron') // Import Electron module (gives access to ipcRenderer and contextBridge)

// Define API functions that will be exposed to the renderer process
const apis = {
    // Fetch the list of available LLM models from the main process
    getAvailableLLMs: () => {
        return electron.ipcRenderer.invoke('getAvailableLLMs')
    },

    // Send a prompt and model name to main process to get chat response
    getChatResponse: (prompt : string, model : string) => {
        return electron.ipcRenderer.invoke('getChatResponse', prompt, model)
    },

    connectToMCPServer: (softwareName : string) => {
        return electron.ipcRenderer.invoke('connectToMCPServer',softwareName)
    }
}

// Expose defined APIs to the renderer process via the global "window.electron" object
electron.contextBridge.exposeInMainWorld('electron', apis)