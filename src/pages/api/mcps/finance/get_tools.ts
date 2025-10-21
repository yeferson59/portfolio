import type { APIRoute } from "astro";
import { createClient } from "@/utils/client-mcp";
import { FINANCE_MCP } from "astro:env/client";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    // Check if FINANCE_MCP URL is configured and reachable
    const mcpUrl = FINANCE_MCP?.trim();
    if (!mcpUrl || mcpUrl === "") {
      // Return mock data when MCP server is not configured
      return new Response(
        JSON.stringify([
          {
            name: "get_stock_quote",
            description: "Get real-time stock quote for a given symbol",
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
            description: "Get overview of major market indices",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "get_crypto_price",
            description: "Get current cryptocurrency price",
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
        ]),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
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
    return new Response(
      JSON.stringify([
        {
          name: "get_stock_quote",
          description: "Get real-time stock quote for a given symbol (Mock Mode)",
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
          description: "Get overview of major market indices (Mock Mode)",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "get_crypto_price",
          description: "Get current cryptocurrency price (Mock Mode)",
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
      ]),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
