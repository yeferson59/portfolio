import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";
import { MOCK_TOOLS } from "@/utils/mcp-mock-data";
import { createSuccessResponse } from "@/utils/api-response";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    // Check if FINANCE_MCP URL is configured and reachable
    const mcpUrl = FINANCE_MCP?.trim();
    if (!mcpUrl || mcpUrl === "") {
      // Return mock data when MCP server is not configured
      return createSuccessResponse(MOCK_TOOLS);
    }

    const financeClientMCP = await createClient({
      url: mcpUrl,
    });
    const result = await financeClientMCP.listTools();

    return createSuccessResponse(result.tools);
  } catch {
    // Return mock data as fallback on error
    return createSuccessResponse(MOCK_TOOLS);
  }
};
