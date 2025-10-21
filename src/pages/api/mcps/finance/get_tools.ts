import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";

export const prerender = false;

export const GET: APIRoute = async () => {
  const financeClientMCP = await createClient({
    url: FINANCE_MCP,
  });
  const result = await financeClientMCP.listTools();

  return new Response(JSON.stringify(result.tools));
};
