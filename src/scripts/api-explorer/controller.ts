/**
 * Client-side controller for the API Explorer component.
 *
 * Owns the DOM wiring: API/endpoint selection, sending requests through
 * the shared api-client, and rendering the response panels using the
 * HTML builders in ./templates.
 */

import { apiClient } from "@/utils/api-explorer/client/api-client";
import { buildAPIRequest } from "@/utils/api-explorer/client/request-builder";
import { generateCode } from "@/utils/api-explorer/code-generation/generators";
import { getAPIConfig } from "@/utils/api-explorer/config";
import type {
  APIConfiguration,
  APIEndpoint,
  APIRequestResult,
  AuthenticationType,
  CodeLanguage,
} from "@/utils/api-explorer/types";
import { copyToClipboard } from "./clipboard";
import {
  codeBlockHTML,
  metricsPanelHTML,
  responseBodyHTML,
  responseHeadersHTML,
  statusIndicatorHTML,
} from "./templates";

export class APIExplorerController {
  private currentAPI?: APIConfiguration;
  private currentEndpoint?: APIEndpoint;
  private requestHistory: APIRequestResult[] = [];

  constructor() {
    this.initEventListeners();
    this.loadDefaultAPI();
  }

  private initEventListeners() {
    // API selection
    const apiSelect = document.querySelector(
      "[data-api-select]",
    ) as HTMLSelectElement;
    apiSelect?.addEventListener("change", (e) => {
      const apiId = (e.target as HTMLSelectElement).value;
      this.loadAPI(apiId);
    });

    // Endpoint selection
    const endpointSelect = document.querySelector(
      "[data-endpoint-select]",
    ) as HTMLSelectElement;
    endpointSelect?.addEventListener("change", (e) => {
      const endpointId = (e.target as HTMLSelectElement).value;
      this.loadEndpoint(endpointId);
    });

    // Send request
    const sendBtn = document.querySelector(
      "[data-send-request]",
    ) as HTMLButtonElement;
    sendBtn?.addEventListener("click", () => this.sendRequest());

    // Clear request
    const clearBtn = document.querySelector(
      "[data-clear-request]",
    ) as HTMLButtonElement;
    clearBtn?.addEventListener("click", () => this.clearRequest());

    // Generate code
    const generateBtn = document.querySelector(
      "[data-generate-code]",
    ) as HTMLButtonElement;
    generateBtn?.addEventListener("click", () => this.generateRequestCode());
  }

  private loadDefaultAPI() {
    const apiSelect = document.querySelector(
      "[data-api-select]",
    ) as HTMLSelectElement;
    if (apiSelect?.value) {
      this.loadAPI(apiSelect.value);
    }
  }

  private loadAPI(apiId: string) {
    this.currentAPI = getAPIConfig(apiId);
    if (!this.currentAPI) return;

    // Populate endpoints
    const endpointSelect = document.querySelector(
      "[data-endpoint-select]",
    ) as HTMLSelectElement;
    if (endpointSelect) {
      endpointSelect.innerHTML =
        '<option value="">Select an endpoint...</option>';
      this.currentAPI.endpoints.forEach((endpoint) => {
        const option = document.createElement("option");
        option.value = endpoint.id;
        option.textContent = `${endpoint.method} ${endpoint.name}`;
        endpointSelect.appendChild(option);
      });
    }
  }

  private loadEndpoint(endpointId: string) {
    if (!this.currentAPI) return;

    this.currentEndpoint = this.currentAPI.endpoints.find(
      (e) => e.id === endpointId,
    );
    if (!this.currentEndpoint) return;

    // Update method select
    const methodSelect = document.querySelector(
      "[data-method-select]",
    ) as HTMLSelectElement;
    if (methodSelect) {
      methodSelect.value = this.currentEndpoint.method;
    }

    // Update URL input
    const urlInput = document.querySelector(
      "[data-url-input]",
    ) as HTMLInputElement;
    if (urlInput) {
      urlInput.value = `${this.currentAPI.baseUrl}${this.currentEndpoint.path}`;
    }
  }

  private getCurrentAuthentication() {
    const authType = (
      document.querySelector("[data-auth-type]") as HTMLSelectElement
    )?.value;
    const authToken = (
      document.querySelector("[data-auth-token]") as HTMLInputElement
    )?.value;

    if (authType && authType !== "none" && authToken) {
      return {
        type: authType as AuthenticationType,
        token: authToken,
      };
    }
    return undefined;
  }

  private selectedLanguage(selector: string): CodeLanguage | undefined {
    const languageSelect = document.querySelector(
      selector,
    ) as HTMLSelectElement;
    return (languageSelect?.value as CodeLanguage) || undefined;
  }

  private generateRequestCode() {
    if (!this.currentAPI || !this.currentEndpoint) {
      alert("Please select an API and endpoint first");
      return;
    }

    const language = this.selectedLanguage("[data-code-language]");
    if (!language) {
      alert("Please select a programming language");
      return;
    }

    try {
      const request = buildAPIRequest(this.currentAPI, this.currentEndpoint, {
        pathParams: {},
        queryParams: {},
        authentication: this.getCurrentAuthentication(),
      });

      const code = generateCode(request, language);
      this.displayCodeBlock("#generated-code-container", {
        title: "Generated Request Code",
        language,
        code,
        copyAttr: "data-copy-generated-code",
        codeAttr: "data-generated-code",
      });
    } catch (error) {
      console.error("Failed to generate code:", error);
      alert(
        "Failed to generate code. Please check your request configuration.",
      );
    }
  }

  private generateResponseCode() {
    if (!this.currentAPI || !this.currentEndpoint) return;

    const language = this.selectedLanguage("[data-response-code-language]");
    if (!language) {
      alert("Please select a programming language");
      return;
    }

    try {
      const request = buildAPIRequest(this.currentAPI, this.currentEndpoint, {
        pathParams: {},
        queryParams: {},
        authentication: this.getCurrentAuthentication(),
      });

      const code = generateCode(request, language);
      this.displayCodeBlock("#response-code-content", {
        title: "Request Code",
        language,
        code,
        copyAttr: "data-copy-response-code",
        codeAttr: "data-response-code",
      });
    } catch (error) {
      console.error("Failed to generate response code:", error);
      alert("Failed to generate code. Please check your configuration.");
    }
  }

  private displayCodeBlock(
    containerSelector: string,
    options: Parameters<typeof codeBlockHTML>[0],
  ) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = codeBlockHTML(options);
    this.wireCodeCopy(
      `[${options.copyAttr}]`,
      `[${options.codeAttr}]`,
      options.codeAttr,
    );
  }

  private wireCodeCopy(
    copySelector: string,
    codeSelector: string,
    codeAttr: string,
  ) {
    const copyBtn = document.querySelector(copySelector);
    if (!copyBtn) return;

    copyBtn.addEventListener("click", async () => {
      const codeElement = document.querySelector(codeSelector) as HTMLElement;
      if (!codeElement) return;

      const code = codeElement.getAttribute(codeAttr) || "";
      const success = await copyToClipboard(code);

      if (success) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = "✓ Copied!";
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
        }, 2000);
      }
    });
  }

  private async sendRequest() {
    if (!this.currentAPI || !this.currentEndpoint) {
      alert("Please select an API and endpoint");
      return;
    }

    const request = buildAPIRequest(this.currentAPI, this.currentEndpoint, {
      pathParams: {},
      queryParams: {},
      authentication: this.getCurrentAuthentication(),
    });

    const sendBtn = document.querySelector(
      "[data-send-request]",
    ) as HTMLButtonElement;
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    try {
      const result = await apiClient.executeRequest(request);
      this.requestHistory.push(result);
      this.displayResponse(result);
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<span class="btn-icon">🚀</span> Send Request';
    }
  }

  private displayResponse(result: APIRequestResult) {
    this.showResponseComponents();

    // Status indicator
    const statusElement = document
      .getElementById("response-status-container")
      ?.querySelector(".status-indicator");
    if (statusElement) {
      statusElement.innerHTML = statusIndicatorHTML(
        result.response?.status,
        result.response?.statusText,
      );
    }

    // Metrics panel
    const metricsElement = document
      .getElementById("response-metrics-container")
      ?.querySelector(".metrics-panel");
    if (metricsElement) {
      metricsElement.innerHTML = metricsPanelHTML(result);
    }

    // Body and headers tabs
    const bodyContainer = document.getElementById("response-body-content");
    if (bodyContainer) bodyContainer.innerHTML = responseBodyHTML(result);

    const headersContainer = document.getElementById(
      "response-headers-content",
    );
    if (headersContainer) {
      headersContainer.innerHTML = responseHeadersHTML(result);
    }

    this.initResponseCodeGeneration();
  }

  private showResponseComponents() {
    // Hide empty state
    const emptyState = document.getElementById("response-empty-state");
    if (emptyState) emptyState.style.display = "none";

    // Show response components
    const statusContainer = document.getElementById(
      "response-status-container",
    );
    const metricsContainer = document.getElementById(
      "response-metrics-container",
    );
    const tabsContainer = document.getElementById("response-tabs-container");

    if (statusContainer) statusContainer.style.display = "block";
    if (metricsContainer) metricsContainer.style.display = "block";
    if (tabsContainer) tabsContainer.style.display = "block";
  }

  private initResponseCodeGeneration() {
    const generateBtn = document.querySelector(
      "[data-generate-response-code]",
    ) as HTMLElement | null;
    if (!generateBtn || generateBtn.dataset.wired === "true") return;

    generateBtn.dataset.wired = "true";
    generateBtn.addEventListener("click", () => {
      this.generateResponseCode();
    });
  }

  private clearRequest() {
    // Clear all inputs
    const urlInput = document.querySelector(
      "[data-url-input]",
    ) as HTMLInputElement;
    if (urlInput) urlInput.value = "";

    const bodyEditor = document.querySelector(
      "#request-body-editor",
    ) as HTMLTextAreaElement;
    if (bodyEditor) bodyEditor.value = "";

    // Clear generated code
    const codeContainer = document.querySelector("#generated-code-container");
    if (codeContainer) {
      const emptyState = codeContainer.querySelector(".empty-code-state");
      if (emptyState) {
        (emptyState as HTMLElement).style.display = "flex";
      }
      codeContainer
        .querySelectorAll(".code-block")
        .forEach((block) => block.remove());
    }

    // Hide response components and show empty state
    const emptyState = document.getElementById("response-empty-state");
    const statusContainer = document.getElementById(
      "response-status-container",
    );
    const metricsContainer = document.getElementById(
      "response-metrics-container",
    );
    const tabsContainer = document.getElementById("response-tabs-container");

    if (emptyState) emptyState.style.display = "block";
    if (statusContainer) statusContainer.style.display = "none";
    if (metricsContainer) metricsContainer.style.display = "none";
    if (tabsContainer) tabsContainer.style.display = "none";
  }
}
