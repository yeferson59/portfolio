import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const toolName = url.searchParams.get("tool");
    const paramsStr = url.searchParams.get("params");

    if (!toolName) {
      return new Response(
        JSON.stringify({ error: "Tool name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if FINANCE_MCP URL is configured and reachable
    const mcpUrl = FINANCE_MCP?.trim();
    if (!mcpUrl || mcpUrl === "" || mcpUrl === "undefined") {
      // Return mock data when MCP server is not configured
      return new Response(
        JSON.stringify({
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  tool: toolName,
                  status: "success",
                  mode: "mock",
                  message: "Mock data - MCP server not configured",
                  data: {
                    symbol: "AAPL",
                    price: 185.92,
                    change: 2.45,
                    changePercent: 1.34,
                    timestamp: new Date().toISOString(),
                  },
                },
                null,
                2
              ),
            },
          ],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
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
    const url = new URL(request.url);
    const toolName = url.searchParams.get("tool");
    
    return new Response(
      JSON.stringify({
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                tool: toolName,
                status: "success",
                mode: "mock_fallback",
                message: "Mock data - MCP server error",
                data: {
                  symbol: "AAPL",
                  price: 185.92,
                  change: 2.45,
                  changePercent: 1.34,
                  volume: 52847392,
                  timestamp: new Date().toISOString(),
                },
              },
              null,
              2
            ),
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
