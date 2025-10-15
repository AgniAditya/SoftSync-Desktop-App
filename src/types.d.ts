import { apiError } from './process/electronUtils/apiError.js'
import { apiResponse } from './process/electronUtils/apiResponse.js'

declare global {
    interface Window {
        electron : {
            getAvailableLLMs: () => Promise<apiResponse | apiError>
            getChatResponse: (prompt : string, model : string) => Promise<apiResponse | apiError>
            connectToMCPServer: (softwareName : string) => Promise<apiResponse | apiError>
        }
    }
} 

export{}