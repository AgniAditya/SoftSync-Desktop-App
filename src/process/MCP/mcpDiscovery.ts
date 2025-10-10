import { Bonjour } from "bonjour-service"; // Import Bonjour for local network service discovery (mDNS)

// Generate a unique Bonjour service type string based on the application name
function generateServiceType(appName: string) {
    if (!appName) {
        throw new Error("Application name must be provided."); // Ensure app name is given
    }
    // Format service type (example: _mcp_photoshop._tcp.local.)
    return `_mcp_${appName.toLowerCase().trim()}._tcp.local.`;
}

// Discover MCP server host and port for a given application using Bonjour
function getMCPServerHostAndPort(appName: string): Promise<serverinfo> {
    const targetType = generateServiceType(appName); // Generate target service type
    console.log(`[SoftSync Client] Starting discovery for: ${targetType}`);

    const browserInstance = new Bonjour(); // Create Bonjour browser instance

    return new Promise((resolve, reject) => {
        // Set timeout to fail discovery if no service is found within 5 seconds
        const timeout = setTimeout(() => {
            reject(new Error("[SoftSync Client] Discovery Timeout: No matching server found. Is the plugin enabled?"));
        }, 5000);

        // Start searching for a service that matches the target type
        browserInstance.find({ type: targetType }, (service) => {
            clearTimeout(timeout); // Clear timeout once service is found
            // Resolve with server details
            resolve({
                name: service.name,
                host: service.host,
                port: service.port,
            });
        });
    });
}

// Export the discovery function for use in other modules
export {
    getMCPServerHostAndPort
}
