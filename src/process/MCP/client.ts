import { apiError } from "../electronUtils/apiError.js";
import { apiResponse } from "../electronUtils/apiResponse.js";
import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Tool } from "@anthropic-ai/sdk/resources.js";
import { variables } from "../electronUtils/envVariables.js";

// Class to manage TCP client connection to an MCP (Modular Control Protocol) server
export class MCPClient {
    private clientConnect: boolean = false;
    private mcp: Client;
    private transport: StdioClientTransport | null = null;
    private tools: Tool[] = [];

    constructor() {
        this.mcp = new Client({name: "mcp-client-cli", version: "1.0.0" });
    }

    // Connects the client to a specific software's MCP server
    async connectToSoftware() : Promise<apiResponse | apiError>{
        try {
            // Validate input software name
            const serverScriptPath = variables.serverPath;
            if(!serverScriptPath) return new apiError(404,"Path is not defined");
            
            this.transport = new StdioClientTransport({
                command: "node",
                args: [serverScriptPath]
            })

            await this.mcp.connect(this.transport)

            this.tools = (await this.mcp.listTools()).tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    input_schema: tool.inputSchema
                }
            });

            return new apiResponse(
                200,
                this.tools.map(({name}) => name),
                `Successfully connected`)
        } catch (error) {
            // Throw standardized API error if connection fails
            console.log(error)
            return new apiError(500, `Can not connect ${error}`);
        }
    }

    // Returns whether the client is currently connected
    isClientConnected(): boolean {
        return this.clientConnect;
    }
}
