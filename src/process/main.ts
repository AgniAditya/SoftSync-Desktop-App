import { app, BrowserWindow } from 'electron'                 // Import core Electron modules
import { getPreloadPath } from './electronUtils/electronEnv.js' // Get path to preload script
import { isDev } from './electronUtils/electronEnv.js'          // Check if environment is development
import path from 'path'                                         // Node.js path module for handling file paths
import { loadIpcHandlers } from './services/ipchandlersServices.js' // Load IPC handlers for main <-> renderer communication
import { apiError } from './electronUtils/apiError.js'          // Custom API error class for error handling

// Function to create the main application window
const createWindow = () => {
    try {
        // Create the main browser window
        const mainWindow = new BrowserWindow({
            webPreferences: {
                preload: getPreloadPath() // Attach preload script (for secure communication)
            }
        })
    
        // Load the correct URL depending on environment
        if (isDev()) {
            mainWindow.loadURL('http://localhost:8000') // Load from dev server
        } else {
            mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html')) // Load production build
        }

        mainWindow.maximize() // Open window in maximized mode

        loadIpcHandlers() // Initialize IPC event handlers for app logic

    } catch (error) {
        console.error(error) // Log error to console
        throw new apiError(
            500,
            (error as Error).message // Wrap error in custom apiError class
        )
    }
}

// When Electron has finished initialization, create the main window
app.on('ready', createWindow)
