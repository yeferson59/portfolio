import type { APIRoute } from "astro";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const baseUrl = new URL("http://155.133.22.54:8080/mcp");

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const symbol = new URL(request.url).searchParams.get("symbol");

  const client = new Client({
    name: "streamable-http-client",
    version: "1.0.0",
  });
  const transport = new StreamableHTTPClientTransport(new URL(baseUrl));

  await client.connect(transport);

  const result = await client.callTool({
    name: "get_overview_stock",
    arguments: {
      symbol,
    },
  });

  return new Response(JSON.stringify(result.structuredContent));
};
