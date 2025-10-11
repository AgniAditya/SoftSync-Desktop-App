import net from "net"; // Node.js module for creating TCP network connections
import { getMCPServerHostAndPort } from "./mcpDiscovery.js"; // Function to discover server host and port for given software
import { apiError } from "../electronUtils/apiError.js"; // Custom API error class for standardized error handling
import { apiResponse } from "../electronUtils/apiResponse.js";

// Class to manage TCP client connection to an MCP (Modular Control Protocol) server
export class MCPClient {
    private clientConnect: boolean = false; // Indicates whether the client is currently connected
    private client: net.Socket | null;      // TCP socket instance for communication
    private serverInfo: serverinfo | null;  // Stores discovered server information

    constructor() {
        this.client = null;                 // Initialize client socket as null
        this.serverInfo = null;             // Initialize server info as null
    }

    // Connects the client to a specific software's MCP server
    async connectToSoftware(softwareName: string) : Promise<apiResponse | apiError>{
        try {
            // Validate input software name
            if (!softwareName || softwareName.length === 0)
                throw new apiError(400, "software not provided");

            // Discover server details for the given software
            this.serverInfo = await getMCPServerHostAndPort(softwareName);
            console.log(`[SoftSync Client] Service Found: ${this.serverInfo.name} at ${this.serverInfo.host}:${this.serverInfo.port}`);

            // Extract host and port from discovered server info
            const port = this.serverInfo.port;
            const host = this.serverInfo.host;

            // Create TCP connection to the MCP server
            this.client = net.createConnection({ port, host }, () => {
                this.clientConnect = true; // Mark as connected once established
                console.log(`[SoftSync Client] TCP Connection established.`);
            });

            // Handle connection errors
            this.client.on('error', (err) => {
                this.clientConnect = false; // Reset connection flag on error
                console.error(`[SoftSync Client] Connection Error to ${this.serverInfo?.name}: ${err.message}`);
            });

            return new apiResponse(
                200,
                null,
                `Successfully connected to ${this.serverInfo?.name}`)
        } catch (error) {
            // Throw standardized API error if connection fails
            return new apiError(500, `failed to connect to ${this.serverInfo?.name}`);
        }
    }

    // Returns whether the client is currently connected
    isClientConnected(): boolean {
        return this.clientConnect;
    }
}
