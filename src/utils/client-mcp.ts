import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Connection pool to reuse client connections
const clientPool = new Map<string, Client>();

export const createClient = async ({
  url,
}: {
  url: string;
}): Promise<Client> => {
  // Return existing client if already connected
  if (clientPool.has(url)) {
    const existingClient = clientPool.get(url)!;
    return existingClient;
  }

  const baseURL = new URL(url);

  const client = new Client({
    name: "portfolio-http-client",
    version: "1.0.0",
    title: "Yeferson's Porfolio",
  });
  const transport = new StreamableHTTPClientTransport(new URL(baseURL));

  await client.connect(transport);

  // Store client in pool for reuse
  clientPool.set(url, client);

  return client;
};
