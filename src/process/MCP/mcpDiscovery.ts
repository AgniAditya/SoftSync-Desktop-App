import { Bonjour } from "bonjour-service";

function generateServiceType(appName : string) {
    if (!appName) {
        throw new Error("Application name must be provided.");
    }
    // Ensures consistency with the convention defined in the guide (2.2)
    return `_mcp_${appName.toLowerCase().trim()}._tcp.local.`;
}

function getMCPServerHostAndPort(appName : string) : Promise<serverinfo> {
    const targetType = generateServiceType(appName);
    console.log(`[SoftSync Client] Starting discovery for: ${targetType}`);

    const browserInstance = new Bonjour();

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("[SoftSync Client] Discovery Timeout: No matching server found. Is the plugin enabled?"));
        }, 5000);

        browserInstance.find({ type: targetType },(service) => {
            clearTimeout(timeout);
            resolve({
                name: service.name,
                host: service.host,
                port: service.port,
            });
        });
    });
}

export {
    getMCPServerHostAndPort
}