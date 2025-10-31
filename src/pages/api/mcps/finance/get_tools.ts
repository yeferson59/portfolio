import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";
import { getMockTools } from "@/utils/finance-api";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    // Check if FINANCE_MCP URL is configured and reachable
    const mcpUrl = FINANCE_MCP?.trim();
    if (!mcpUrl || mcpUrl === "") {
      // Return mock data when MCP server is not configured
      return new Response(JSON.stringify(getMockTools(false)), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const financeClientMCP = await createClient({
      url: mcpUrl,
    });
    const result = await financeClientMCP.listTools();

    return new Response(JSON.stringify(result.tools), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch MCP tools:", error);
    // Return mock data as fallback on error
    return new Response(JSON.stringify(getMockTools(true)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
