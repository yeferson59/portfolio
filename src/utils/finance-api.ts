import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";

/**
 * Creates a generic finance API handler for calling MCP tools
 */
export const createFinanceAPIHandler = (toolName: string): APIRoute => {
  return async ({ request }) => {
    try {
      const symbol = new URL(request.url).searchParams.get("symbol");
      const financeClientMCP = await createClient({
        url: FINANCE_MCP,
      });
      const result = await financeClientMCP.callTool({
        name: toolName,
        arguments: {
          symbol,
        },
      });

      return new Response(JSON.stringify(result.structuredContent));
    } catch (error) {
      console.error(`Error executing ${toolName}:`, error);
      return new Response(JSON.stringify({ error: "Failed to execute tool" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
};

/**
 * Creates mock data for when MCP server is not available
 */
export const createMockResponse = (
  toolName: string,
  extraData: Record<string, unknown> = {},
) => {
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
                ...extraData,
              },
            },
            null,
            2,
          ),
        },
      ],
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};

/**
 * Mock tool definitions for when MCP server is not configured
 */
export const getMockTools = (mockMode = false) => {
  return [
    {
      name: "get_stock_quote",
      description: `Get real-time stock quote for a given symbol${mockMode ? " (Mock Mode)" : ""}`,
      inputSchema: {
        type: "object",
        properties: {
          symbol: {
            type: "string",
            description: "Stock symbol (e.g., AAPL, GOOGL)",
          },
        },
        required: ["symbol"],
      },
    },
    {
      name: "get_market_overview",
      description: `Get overview of major market indices${mockMode ? " (Mock Mode)" : ""}`,
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "get_crypto_price",
      description: `Get current cryptocurrency price${mockMode ? " (Mock Mode)" : ""}`,
      inputSchema: {
        type: "object",
        properties: {
          symbol: {
            type: "string",
            description: "Crypto symbol (e.g., BTC, ETH)",
          },
          currency: {
            type: "string",
            description: "Quote currency (default: USD)",
          },
        },
        required: ["symbol"],
      },
    },
  ];
};
