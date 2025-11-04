import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";
import { MOCK_EXECUTION_RESULT } from "@/utils/mcp-mock-data";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const toolName = url.searchParams.get("tool");
  const paramsStr = url.searchParams.get("params");

  if (!toolName) {
    return createErrorResponse("Tool name is required", 400);
  }

  try {
    // Check if FINANCE_MCP URL is configured and reachable
    const mcpUrl = FINANCE_MCP?.trim();
    if (!mcpUrl || mcpUrl === "") {
      // Return mock data when MCP server is not configured
      return createSuccessResponse(MOCK_EXECUTION_RESULT(toolName));
    }

    const params = paramsStr ? JSON.parse(paramsStr) : {};

    const financeClientMCP = await createClient({
      url: mcpUrl,
    });

    const result = await financeClientMCP.callTool({
      name: toolName,
      arguments: params,
    });

    return createSuccessResponse(result.content || result);
  } catch {
    // Return mock data as fallback on error
    return createSuccessResponse(MOCK_EXECUTION_RESULT(toolName));
  }
};
