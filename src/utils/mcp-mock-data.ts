/**
 * Shared mock data for MCP Finance API
 * Used as fallback when MCP server is not configured or unavailable
 */

export const MOCK_TOOLS = [
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
];

export const MOCK_EXECUTION_RESULT = (toolName: string) => ({
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
            volume: 52847392,
            timestamp: new Date().toISOString(),
          },
        },
        null,
        2,
      ),
    },
  ],
});
