import { ipcMain } from "electron"; // Import ipcMain to handle async messages from renderer process
import { getAvailableLLMs, getChatResponse } from "./llmServices.js"; // Import LLM-related service functions
import { connectToMCPServer } from "./mcpServices.js";

// Registers IPC handlers for communication between renderer and main process
export function loadIpcHandlers() {

    // Handle request from renderer to get list of available LLM models
    ipcMain.handle('getAvailableLLMs', async () => {
        return await getAvailableLLMs();
    });

    // Handle request from renderer to get chat response from a specific model
    ipcMain.handle('getChatResponse', async (
        _, prompt: string,  // '_' represents the event object (not used)
        model: string       // model name passed from renderer
    ) => {
        return await getChatResponse(prompt, model);
    });

    ipcMain.handle('connectToMCPServer',async (
        _, softwareName: string
    ) => {
        return await connectToMCPServer(softwareName)
    })
}