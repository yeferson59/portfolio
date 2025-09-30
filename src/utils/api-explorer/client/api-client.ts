/// <reference lib="dom" />
/**
 * Generic API Client
 * Handles HTTP requests with performance tracking and error handling
 */

import type {
  APIRequest,
  APIResponse,
  APIRequestResult,
  PerformanceMetrics,
} from "../types";

export class APIClient {
  /**
   * Execute API request and return result with metrics
   */
  async executeRequest(request: APIRequest): Promise<APIRequestResult> {
    const startTime = performance.now();
    const timestamp = new Date().toISOString();

    try {
      // Prepare fetch options
      const fetchOptions: RequestInit = {
        method: request.method,
        headers: request.headers,
      };

      // Add body if present (not for GET/HEAD)
      if (request.body && !["GET", "HEAD"].includes(request.method)) {
        const contentType =
          request.headers["Content-Type"] || "application/json";

        if (contentType === "application/json") {
          fetchOptions.body = JSON.stringify(request.body);
        } else if (contentType === "application/x-www-form-urlencoded") {
          const params = new URLSearchParams();
          Object.entries(request.body).forEach(([key, value]) => {
            params.append(key, String(value));
          });
          fetchOptions.body = params.toString();
        } else {
          fetchOptions.body = request.body;
        }
      }

      // Execute request
      const response = await fetch(request.url, fetchOptions);

      // Calculate metrics
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Parse response
      const responseHeaders = this.extractHeaders(response.headers);
      const contentType = response.headers.get("content-type") || "";

      let responseBody: any;
      try {
        if (contentType.includes("application/json")) {
          responseBody = await response.json();
        } else if (contentType.includes("text/")) {
          responseBody = await response.text();
        } else {
          responseBody = await response.blob();
        }
      } catch {
        responseBody = await response.text();
      }

      // Build metrics
      const metrics: PerformanceMetrics = {
        duration: Math.round(duration),
        status: response.status,
        statusText: response.statusText,
        size: parseInt(response.headers.get("content-length") || "0"),
        cached: response.headers.get("x-cache") === "HIT",
      };

      // Build response
      const apiResponse: APIResponse = {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseBody,
      };

      // Check for errors
      if (!response.ok) {
        apiResponse.error = {
          message:
            responseBody?.message || responseBody?.error || response.statusText,
          code: responseBody?.code || String(response.status),
          details: responseBody,
        };
      }

      return {
        request,
        response: apiResponse,
        metrics,
        timestamp,
        success: response.ok,
      };
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      return {
        request,
        metrics: {
          duration: Math.round(duration),
          status: 0,
          statusText: "Network Error",
        },
        timestamp,
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Extract headers from Response Headers object
   */
  private extractHeaders(headers: Headers): Record<string, string> {
    const extracted: Record<string, string> = {};
    headers.forEach((value, key) => {
      extracted[key] = value;
    });
    return extracted;
  }

  /**
   * Test endpoint connectivity
   */
  async testEndpoint(
    url: string,
  ): Promise<{ reachable: boolean; responseTime: number }> {
    const startTime = performance.now();

    try {
      await fetch(url, {
        method: "HEAD",
        mode: "no-cors",
      });

      const endTime = performance.now();
      return {
        reachable: true,
        responseTime: Math.round(endTime - startTime),
      };
    } catch {
      const endTime = performance.now();
      return {
        reachable: false,
        responseTime: Math.round(endTime - startTime),
      };
    }
  }

  /**
   * Batch execute multiple requests
   */
  async executeBatch(requests: APIRequest[]): Promise<APIRequestResult[]> {
    return Promise.all(requests.map((req) => this.executeRequest(req)));
  }

  /**
   * Execute request with retry logic
   */
  async executeWithRetry(
    request: APIRequest,
    maxRetries: number = 3,
    retryDelay: number = 1000,
  ): Promise<APIRequestResult> {
    let lastError: APIRequestResult | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const result = await this.executeRequest(request);

      if (result.success) {
        return result;
      }

      lastError = result;

      // Don't retry on client errors (4xx)
      if (
        result.response?.status &&
        result.response.status >= 400 &&
        result.response.status < 500
      ) {
        break;
      }

      // Wait before retry (except on last attempt)
      if (attempt < maxRetries) {
        await this.delay(retryDelay * (attempt + 1));
      }
    }

    return (
      lastError || {
        request,
        metrics: { duration: 0, status: 0, statusText: "Failed" },
        timestamp: new Date().toISOString(),
        success: false,
        error: "Max retries exceeded",
      }
    );
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const apiClient = new APIClient();
