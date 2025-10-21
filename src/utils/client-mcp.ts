import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export const createClient = async ({
  url,
}: {
  url: string;
}): Promise<Client> => {
  const baseURL = new URL(url);

  const client = new Client({
    name: "portfolio-http-client",
    version: "1.0.0",
    title: "Yeferson's Porfolio",
  });
  const transport = new StreamableHTTPClientTransport(new URL(baseURL));

  await client.connect(transport);

  return client;
};
