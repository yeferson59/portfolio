import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const symbol = new URL(request.url).searchParams.get("symbol");
  const financeClientMCP = await createClient({
    url: FINANCE_MCP,
  });
  const result = await financeClientMCP.callTool({
    name: "get_overview_stock",
    arguments: {
      symbol,
    },
  });

  return new Response(JSON.stringify(result.structuredContent));
};
