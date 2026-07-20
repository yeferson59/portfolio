/**
 * Client controller for the "MCP Client Performance" metric cards.
 * Renders the cards from the shared MCP data feed and refreshes them
 * on a fixed interval.
 */

import { icons } from "@/utils/icons";
import { fetchMCPData, MCP_AUTO_REFRESH_INTERVAL_MS } from "./data";

export class MCPMetricsIntegration {
  private updateInterval: number | null = null;

  constructor() {
    this.loadMCPMetrics();
    this.startAutoUpdate();
  }

  private async loadMCPMetrics() {
    const grid = document.getElementById("mcp-metrics-grid");
    if (!grid) return;

    try {
      const { tools, duration } = await fetchMCPData();
      const toolsCount = tools.length;

      // Display MCP metrics
      grid.innerHTML = `
        <div class="mcp-metric-card">
          <div class="metric-icon">${icons.settings}</div>
          <div class="metric-content">
            <div class="metric-label">Available Tools</div>
            <div class="metric-value">${toolsCount}</div>
          </div>
        </div>

        <div class="mcp-metric-card">
          <div class="metric-icon">${icons.activity}</div>
          <div class="metric-content">
            <div class="metric-label">API Response</div>
            <div class="metric-value">${duration}ms</div>
          </div>
        </div>

        <div class="mcp-metric-card">
          <div class="metric-icon">${icons.globe}</div>
          <div class="metric-content">
            <div class="metric-label">Connection</div>
            <div class="metric-value">Active</div>
          </div>
        </div>

        <div class="mcp-metric-card">
          <div class="metric-icon">${icons["bar-chart"]}</div>
          <div class="metric-content">
            <div class="metric-label">Protocol</div>
            <div class="metric-value">MCP v1.0</div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error("Failed to load MCP metrics:", error);
      grid.innerHTML = `
        <div class="mcp-metrics-error">
          <span class="metric-icon">${icons["alert-triangle"]}</span>
          <p>Unable to load MCP metrics</p>
        </div>
      `;
    }
  }

  private startAutoUpdate() {
    // Update MCP metrics at configured interval
    this.updateInterval = window.setInterval(() => {
      this.loadMCPMetrics();
    }, MCP_AUTO_REFRESH_INTERVAL_MS);
  }

  public destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

/** Instantiate the metrics panel controller once the DOM is ready. */
export function initMcpMetricsPanel() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      new MCPMetricsIntegration();
    });
  } else {
    new MCPMetricsIntegration();
  }
}
