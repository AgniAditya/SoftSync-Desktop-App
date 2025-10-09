import net from "net";
import { getMCPServerHostAndPort } from "./mcpDiscovery.js";
import { apiError } from "../electronUtils/apiError.js";

export class MCPClient {
    private clientConnect : boolean = false;
    private client : net.Socket | null;
    private serverInfo : serverinfo | null

    constructor(){
        this.client = null
        this.serverInfo = null
    }

    async connectToSoftware(softwareName : string){
        try {
            if(!softwareName || softwareName.length === 0) throw new apiError(400,"software not provided");

            this.serverInfo = await getMCPServerHostAndPort(softwareName)
            console.log(`[SoftSync Client] Service Found: ${this.serverInfo.name} at ${this.serverInfo.host}:${this.serverInfo.port}`);

            const port = this.serverInfo.port
            const host = this.serverInfo.host
            this.client = net.createConnection({ port , host }, () => {
                this.clientConnect = true;
                console.log(`[SoftSync Client] TCP Connection established.`);
            })
            this.client.on('error',(err) => {
                this.clientConnect = false;
                console.error(`[SoftSync Client] Connection Error to ${this.serverInfo?.name}: ${err.message}`);
            })
        } catch (error) {
            throw new apiError(500,`failed to connect to ${this.serverInfo?.name}`)
        }
    }
}