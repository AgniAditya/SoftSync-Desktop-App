import { ipcMain } from "electron";
import { getAvailableLLMs, getChatResponse } from "./services/llmServices.js";

export function loadIpcHandlers() {
    ipcMain.handle('getAvailableLLMs',async () =>{
        return await getAvailableLLMs()
    })
    
    ipcMain.handle('getChatResponse', async (
        _,prompt: string,
        model : string
    ) => {
        return await getChatResponse(prompt,model)
    })
}