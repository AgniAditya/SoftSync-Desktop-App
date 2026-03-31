import { MCPClient } from '../MCP/client.js'

export async function connectToMCPServer(){
    const client = new MCPClient()
    return await client.connectToSoftware()
}