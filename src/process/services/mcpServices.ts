import { MCPClient } from '../MCP/client.js'

export async function connectToMCPServer(softwareName: string){
    const client = new MCPClient()
    return await client.connectToSoftware(softwareName)
}