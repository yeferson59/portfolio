/**
 * Client controller for the interactive MCP viewer: connection status,
 * tool cards, and the parameterized tool executor.
 */

import { icons } from "@/utils/icons";
import { escapeHtml } from "@/utils/escape-html";
import { fetchMCPData, type MCPTool } from "./data";

export class MCPViewerController {
  private tools: MCPTool[] = [];
  private selectedTool: MCPTool | null = null;

  constructor() {
    this.initMCPClient();
  }

  private async initMCPClient() {
    const statusIndicator = document.getElementById("mcp-connection-status");
    const statusText = statusIndicator?.querySelector(".status-text");
    const pulseDot = statusIndicator?.querySelector(".pulse-dot");

    try {
      // Use shared cache to avoid duplicate API call
      const { tools, duration } = await fetchMCPData();

      this.tools = tools;

      // Update status
      if (statusText) statusText.textContent = "Connected to Finance MCP";
      if (pulseDot) pulseDot.classList.add("connected");

      // Update details
      const toolsCountEl = document.getElementById("tools-count");
      const responseTimeEl = document.getElementById("mcp-response-time");
      if (toolsCountEl) {
        toolsCountEl.textContent = String(this.tools.length);
      }
      if (responseTimeEl) {
        responseTimeEl.textContent = `${duration}ms`;
      }

      // Render tools
      this.renderTools();
      this.populateToolSelect();
    } catch (error) {
      console.error("Failed to connect to MCP:", error);
      if (statusText) statusText.textContent = "Connection Failed";
      if (pulseDot) {
        pulseDot.classList.remove("connected");
        pulseDot.classList.add("error");
      }
      this.showError("Failed to load MCP tools. Please try again later.");
    }
  }

  private renderTools() {
    const grid = document.getElementById("mcp-tools-grid");
    if (!grid) return;

    if (this.tools.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <p>No MCP tools available</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.tools
      .map(
        (tool, index) => `
        <div class="tool-card" data-tool-index="${index}">
          <h5 class="tool-name">${escapeHtml(tool.name)}</h5>
          <p class="tool-description">
            ${escapeHtml(tool.description || "No description available")}
          </p>
          <div class="tool-meta">
            ${
              tool.inputSchema?.required?.length
                ? `<span class="meta-badge">${tool.inputSchema.required.length} required params</span>`
                : `<span class="meta-badge">No required params</span>`
            }
            ${
              tool.inputSchema?.properties
                ? `<span class="meta-badge">${Object.keys(tool.inputSchema.properties).length} total params</span>`
                : ""
            }
          </div>
        </div>
      `,
      )
      .join("");

    // Add click handlers
    grid.querySelectorAll(".tool-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const index = parseInt(
          (e.currentTarget as HTMLElement).dataset.toolIndex!,
        );
        this.selectTool(index);
      });
    });
  }

  private populateToolSelect() {
    const select = document.getElementById("tool-select") as HTMLSelectElement;
    if (!select) return;

    select.innerHTML = '<option value="">Select a tool...</option>';
    this.tools.forEach((tool, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = tool.name;
      select.appendChild(option);
    });

    select.disabled = false;

    select.addEventListener("change", (e) => {
      const index = parseInt((e.target as HTMLSelectElement).value);
      if (!isNaN(index)) {
        this.selectTool(index);
      }
    });

    // Execute button
    const executeBtn = document.getElementById("execute-tool-btn");
    executeBtn?.addEventListener("click", () => this.executeTool());

    // Clear button
    const clearBtn = document.getElementById("clear-result-btn");
    clearBtn?.addEventListener("click", () => this.clearResult());
  }

  private selectTool(index: number) {
    this.selectedTool = this.tools[index];

    // Update UI
    const select = document.getElementById("tool-select") as HTMLSelectElement;
    if (select) select.value = String(index);

    // Update tool cards
    document.querySelectorAll(".tool-card").forEach((card, i) => {
      if (i === index) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }
    });

    // Render parameters form
    this.renderParametersForm();

    // Enable execute button
    const executeBtn = document.getElementById(
      "execute-tool-btn",
    ) as HTMLButtonElement;
    if (executeBtn) executeBtn.disabled = false;
  }

  private renderParametersForm() {
    const paramsSection = document.getElementById("tool-params");
    const paramsContainer = document.getElementById("params-container");

    if (!this.selectedTool || !paramsSection || !paramsContainer) return;

    const schema = this.selectedTool.inputSchema;

    if (!schema?.properties || Object.keys(schema.properties).length === 0) {
      paramsSection.style.display = "none";
      return;
    }

    paramsSection.style.display = "block";
    paramsContainer.innerHTML = "";

    Object.entries(schema.properties).forEach(([name, prop]: [string, any]) => {
      const isRequired = schema.required?.includes(name) || false;
      const field = document.createElement("div");
      field.className = "param-field";

      const label = document.createElement("label");
      label.textContent = name;
      label.htmlFor = `param-${name}`;
      if (isRequired) label.classList.add("required");

      let input: HTMLInputElement | HTMLTextAreaElement;

      if (prop.type === "object" || prop.type === "array") {
        input = document.createElement("textarea");
        input.rows = 3;
        input.placeholder = `Enter ${prop.type} (JSON format)`;
      } else {
        input = document.createElement("input");
        input.type =
          prop.type === "number" || prop.type === "integer" ? "number" : "text";
        input.placeholder = prop.description || `Enter ${name}`;
      }

      input.id = `param-${name}`;
      input.dataset.paramName = name;
      input.dataset.paramType = prop.type;
      input.required = isRequired;

      if (prop.default !== undefined) {
        input.value = String(prop.default);
      }

      field.appendChild(label);
      field.appendChild(input);
      paramsContainer.appendChild(field);
    });
  }

  private async executeTool() {
    if (!this.selectedTool) return;

    const executeBtn = document.getElementById(
      "execute-tool-btn",
    ) as HTMLButtonElement;
    const resultDiv = document.getElementById("tool-result");
    const resultContent = document.getElementById("result-content");

    if (!executeBtn || !resultDiv || !resultContent) return;

    // Collect parameters
    const params: Record<string, any> = {};
    const paramInputs = document.querySelectorAll("[data-param-name]");

    try {
      paramInputs.forEach((input) => {
        const name = (input as HTMLElement).dataset.paramName!;
        const type = (input as HTMLElement).dataset.paramType!;
        const value = (input as HTMLInputElement).value.trim();

        if (value) {
          if (type === "object" || type === "array") {
            try {
              params[name] = JSON.parse(value);
            } catch {
              throw new Error(`Invalid JSON for parameter "${name}"`);
            }
          } else if (type === "number" || type === "integer") {
            params[name] = Number(value);
          } else if (type === "boolean") {
            params[name] = value === "true";
          } else {
            params[name] = value;
          }
        }
      });

      // Show loading state
      executeBtn.disabled = true;
      executeBtn.innerHTML =
        '<span class="loading-spinner" aria-hidden="true"></span> Executing...';

      const startTime = Date.now();

      // Call the MCP tool through our API
      const response = await fetch(
        `/api/mcps/finance/execute?tool=${encodeURIComponent(this.selectedTool.name)}&params=${encodeURIComponent(JSON.stringify(params))}`,
      );

      const duration = Date.now() - startTime;
      const result = await response.json();

      // Update result display
      resultDiv.style.display = "block";
      const durationEl = document.getElementById("result-duration");
      const statusEl = document.getElementById("result-status");

      if (durationEl) durationEl.textContent = `${duration}ms`;

      if (response.ok) {
        if (statusEl) {
          statusEl.textContent = "SUCCESS";
          statusEl.className = "metric-badge success";
        }
        resultContent.textContent = JSON.stringify(result, null, 2);
      } else {
        throw new Error(result.error || "Execution failed");
      }
    } catch (error) {
      resultDiv.style.display = "block";
      const statusEl = document.getElementById("result-status");
      const durationEl = document.getElementById("result-duration");

      if (statusEl) {
        statusEl.textContent = "ERROR";
        statusEl.className = "metric-badge error";
      }
      if (durationEl) durationEl.textContent = "--";
      resultContent.textContent =
        error instanceof Error ? error.message : String(error);
    } finally {
      executeBtn.disabled = false;
      executeBtn.innerHTML = `<span class="btn-icon">${icons.play}</span> Execute Tool`;
    }
  }

  private clearResult() {
    const resultDiv = document.getElementById("tool-result");
    if (resultDiv) resultDiv.style.display = "none";
  }

  private showError(message: string) {
    const grid = document.getElementById("mcp-tools-grid");
    if (grid) {
      grid.innerHTML = `
        <div class="error-state">
          <span class="metric-icon" style="color: var(--color-error);">${icons["alert-triangle"]}</span>
          <p style="color: var(--color-error);">${escapeHtml(message)}</p>
        </div>
      `;
    }
  }
}

/** Instantiate the viewer controller once the DOM is ready. */
export function initMcpViewer() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      new MCPViewerController();
    });
  } else {
    new MCPViewerController();
  }
}
