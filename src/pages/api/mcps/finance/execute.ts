import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";
import { MOCK_EXECUTION_RESULT } from "@/utils/mcp-mock-data";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const toolName = url.searchParams.get("tool");
  const paramsStr = url.searchParams.get("params");

  if (!toolName) {
    return new Response(JSON.stringify({ error: "Tool name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Check if FINANCE_MCP URL is configured and reachable
    const mcpUrl = FINANCE_MCP?.trim();
    if (!mcpUrl || mcpUrl === "") {
      // Return mock data when MCP server is not configured
      return new Response(JSON.stringify(MOCK_EXECUTION_RESULT(toolName)), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const params = paramsStr ? JSON.parse(paramsStr) : {};

    const financeClientMCP = await createClient({
      url: mcpUrl,
    });

    const result = await financeClientMCP.callTool({
      name: toolName,
      arguments: params,
    });

    return new Response(JSON.stringify(result.content || result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MCP tool execution error:", error);
    // Return mock data as fallback on error
    return new Response(JSON.stringify(MOCK_EXECUTION_RESULT(toolName)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
