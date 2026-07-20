/**
 * HTML string builders for the pieces of the API Explorer that are
 * rendered client-side after a request completes.
 */

import { escapeHtml } from "@/utils/escape-html";
import {
  formatDuration,
  formatSize,
  getDurationColor,
  getStatusInfo,
} from "./formatters";
import type { APIRequestResult } from "@/utils/api-explorer/types";

/** Approximate size in bytes of a response (body + headers). */
export function getResponseSize(result: APIRequestResult): number | undefined {
  if (!result.response) return undefined;
  const bodySize = result.response.body
    ? JSON.stringify(result.response.body).length
    : 0;
  const headersSize = Object.entries(result.response.headers || {}).reduce(
    (acc, [key, value]) => acc + key.length + value.length,
    0,
  );
  return bodySize + headersSize;
}

export function statusIndicatorHTML(
  status?: number,
  statusText?: string,
): string {
  const statusInfo = getStatusInfo(status);

  return `
    <div class="status-code">${status || "---"}</div>
    <div class="status-details">
      <div class="status-text">${statusText || statusInfo.category}</div>
      <div class="status-description">${statusInfo.description}</div>
    </div>
  `;
}

export function metricsPanelHTML(result: APIRequestResult): string {
  const responseSize = getResponseSize(result);

  return `
    <div class="metrics-grid">
      <div class="metric-item metric-${getDurationColor(result.metrics.duration)}">
        <div class="metric-icon">⚡</div>
        <div class="metric-content">
          <div class="metric-label">Duration</div>
          <div class="metric-value">${formatDuration(result.metrics.duration)}</div>
        </div>
      </div>
      <div class="metric-item">
        <div class="metric-icon">📦</div>
        <div class="metric-content">
          <div class="metric-label">Size</div>
          <div class="metric-value">${responseSize ? formatSize(responseSize) : "--"}</div>
        </div>
      </div>
      <div class="metric-item">
        <div class="metric-icon">🕐</div>
        <div class="metric-content">
          <div class="metric-label">Time</div>
          <div class="metric-value">${new Date(result.timestamp).toLocaleTimeString()}</div>
        </div>
      </div>
      ${
        result.metrics.cached
          ? `
        <div class="metric-item metric-cached">
          <div class="metric-icon">💾</div>
          <div class="metric-content">
            <div class="metric-label">Cache</div>
            <div class="metric-value">HIT</div>
          </div>
        </div>
      `
          : ""
      }
    </div>
  `;
}

export function responseBodyHTML(result: APIRequestResult): string {
  const responseBody = result.response?.body;
  if (!responseBody) {
    return '<div class="empty-body"><p>No response body</p></div>';
  }

  const formattedBody = JSON.stringify(responseBody, null, 2);
  return `
    <div class="json-viewer">
      <pre class="json-content">${escapeHtml(formattedBody)}</pre>
    </div>
  `;
}

export function responseHeadersHTML(result: APIRequestResult): string {
  const headers = result.response?.headers;
  if (!headers || Object.keys(headers).length === 0) {
    return '<div class="empty-headers"><p>No response headers</p></div>';
  }

  const rows = Object.entries(headers)
    .map(
      ([key, value]) => `
      <tr class="header-row">
        <td class="header-name"><code>${escapeHtml(key)}</code></td>
        <td class="header-value"><code>${escapeHtml(value)}</code></td>
        <td class="header-actions">
          <button type="button" class="copy-header-btn" data-copy-header="${escapeHtml(`${key}: ${value}`)}" title="Copy Header">📋</button>
        </td>
      </tr>
    `,
    )
    .join("");

  return `
    <div class="headers-table">
      <table>
        <thead>
          <tr><th>Header</th><th>Value</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

export interface CodeBlockOptions {
  title: string;
  language: string;
  code: string;
  /** data-* attribute name placed on the copy button, e.g. "data-copy-generated-code". */
  copyAttr: string;
  /** data-* attribute name that stores the raw code, e.g. "data-generated-code". */
  codeAttr: string;
}

export function codeBlockHTML({
  title,
  language,
  code,
  copyAttr,
  codeAttr,
}: CodeBlockOptions): string {
  const escaped = escapeHtml(code);
  return `
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-block-title">${title}</span>
        <span class="code-block-language">${language}</span>
        <button type="button" class="code-block-copy" ${copyAttr}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2h7v1H4V2zm0 3h7v1H4V5zm0 3h5v1H4V8z" />
          </svg>
          Copy
        </button>
      </div>
      <div class="code-block-content" style="max-height: 400px">
        <pre class="code-pre" data-language="${language}"><code class="code-text" ${codeAttr}="${escaped}">${escaped}</code></pre>
      </div>
    </div>
  `;
}
