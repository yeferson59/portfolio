import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Connection pool configuration
const MAX_POOL_SIZE = 10; // Limit number of cached connections
const CONNECTION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

// Connection pool to reuse client connections
interface CachedClient {
  client: Client;
  lastUsed: number;
}

const clientPool = new Map<string, CachedClient>();

/**
 * Cleanup stale connections that haven't been used recently
 */
function cleanupStaleConnections() {
  const now = Date.now();
  const staleUrls: string[] = [];

  for (const [url, cached] of clientPool.entries()) {
    if (now - cached.lastUsed > CONNECTION_TIMEOUT) {
      staleUrls.push(url);
    }
  }

  staleUrls.forEach((url) => clientPool.delete(url));
}

/**
 * Create or reuse an MCP client connection
 */
export const createClient = async ({
  url,
}: {
  url: string;
}): Promise<Client> => {
  // Cleanup stale connections periodically
  cleanupStaleConnections();

  // Return existing client if available and recently used
  if (clientPool.has(url)) {
    const cached = clientPool.get(url)!;
    cached.lastUsed = Date.now(); // Update last used time
    return cached.client;
  }

  // Enforce pool size limit
  if (clientPool.size >= MAX_POOL_SIZE) {
    // Remove oldest connection
    let oldestUrl = "";
    let oldestTime = Date.now();
    for (const [poolUrl, cached] of clientPool.entries()) {
      if (cached.lastUsed < oldestTime) {
        oldestTime = cached.lastUsed;
        oldestUrl = poolUrl;
      }
    }
    if (oldestUrl) {
      clientPool.delete(oldestUrl);
    }
  }

  const baseURL = new URL(url);

  const client = new Client({
    name: "portfolio-http-client",
    version: "1.0.0",
    title: "Yeferson's Porfolio",
  });
  const transport = new StreamableHTTPClientTransport(new URL(baseURL));

  try {
    await client.connect(transport);

    // Store client in pool with timestamp
    clientPool.set(url, {
      client,
      lastUsed: Date.now(),
    });

    return client;
  } catch (error) {
    // Remove from pool if connection fails
    clientPool.delete(url);
    throw error;
  }
};
