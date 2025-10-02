import { ipcMain } from "electron";
import { getAvailableLLMs, getChatResponse } from "./utils.js";

export function loadIpcHandlers() {
    ipcMain.handle('getAvailableLLMs',async () =>{
        try {
            return await getAvailableLLMs()
        } catch (error) {
            console.error('Error in getAvailableLLMs:', error)
            return {error : true, message: (error as Error).message}
        }
    })
    
    ipcMain.handle('getChatResponse', async (
        _,prompt: string,
        model : string
    ) => {
        try {
            return await getChatResponse(prompt,model)
        } catch (error) {
            console.error('Error in getChatResponse:', error)
            return { error: true, message: (error as Error).message }
        }
    })
}