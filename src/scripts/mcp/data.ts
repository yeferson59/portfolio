/**
 * Shared client-side access to the Finance MCP tools endpoint.
 *
 * Both the MCP metrics panel and the interactive viewer consume this
 * module; the in-flight promise is cached so simultaneous consumers
 * trigger a single request, and results are reused for a short window.
 */

export const MCP_CACHE_DURATION_MS = 30 * 1000; // 30 seconds
export const MCP_AUTO_REFRESH_INTERVAL_MS = 30 * 1000; // 30 seconds

export type MCPTool = {
  name: string;
  description?: string;
  inputSchema?: {
    type?: string;
    properties?: Record<string, any>;
    required?: string[];
  };
};

export interface MCPData {
  tools: MCPTool[];
  duration: number;
  timestamp: number;
}

let cache: MCPData | null = null;
let inflight: Promise<MCPData> | null = null;

export async function fetchMCPData(): Promise<MCPData> {
  // Return cached data if still fresh
  if (cache && Date.now() - cache.timestamp < MCP_CACHE_DURATION_MS) {
    return cache;
  }

  // Deduplicate concurrent callers into a single request
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const startTime = Date.now();
      const response = await fetch("/api/mcps/finance/get_tools");
      const duration = Date.now() - startTime;

      if (!response.ok) {
        throw new Error("Failed to fetch MCP data");
      }

      const tools = await response.json();
      cache = {
        tools: Array.isArray(tools) ? tools : [],
        duration,
        timestamp: Date.now(),
      };
      return cache;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
