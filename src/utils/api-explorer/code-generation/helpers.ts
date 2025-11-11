/**
 * Shared Code Generation Helpers
 * Common utilities for generating code snippets
 */

import type { APIRequest } from "../types";

/**
 * Common helper functions for code generation
 */

/**
 * Build headers as key-value pairs for different languages
 */
export const headerBuilders = {
  /**
   * Build headers for Python dictionary format
   */
  python: (headers: Record<string, string>, indent = "    "): string[] => {
    const lines: string[] = ["headers = {"];
    const entries = Object.entries(headers);
    entries.forEach(([key, value], index) => {
      const comma = index < entries.length - 1 ? "," : "";
      lines.push(`${indent}"${key}": "${value}"${comma}`);
    });
    lines.push("}");
    return lines;
  },

  /**
   * Build headers for Go map format
   */
  go: (headers: Record<string, string>, indent = "    "): string[] => {
    return Object.entries(headers).map(
      ([key, value]) => `${indent}req.Header.Add("${key}", "${value}")`,
    );
  },

  /**
   * Build headers for PHP array format
   */
  php: (headers: Record<string, string>): string[] => {
    const lines: string[] = ["$headers = ["];
    Object.entries(headers).forEach(([key, value]) => {
      lines.push(`    "${key}: ${value}",`);
    });
    lines.push("];");
    return lines;
  },

  /**
   * Build headers for Ruby format
   */
  ruby: (headers: Record<string, string>): string[] => {
    return Object.entries(headers).map(
      ([key, value]) => `request["${key}"] = "${value}"`,
    );
  },

  /**
   * Build headers for Java format
   */
  java: (headers: Record<string, string>, indent = "            "): string[] => {
    return Object.entries(headers).map(
      ([key, value]) => `${indent}.header("${key}", "${value}")`,
    );
  },
};

/**
 * Build body for different languages
 */
export const bodyBuilders = {
  /**
   * Build JSON body for Python
   */
  python: (body: any): string[] => {
    return [`data = ${JSON.stringify(body, null, 2)}`];
  },

  /**
   * Build JSON body for Go
   */
  go: (body: any, indent = "    "): string[] => {
    const lines: string[] = ["data := map[string]interface{}{"];
    const entries = Object.entries(body);
    entries.forEach(([key, value], index) => {
      const comma = index < entries.length - 1 ? "," : "";
      const valueStr = typeof value === "string" ? `"${value}"` : value;
      lines.push(`${indent}    "${key}": ${valueStr}${comma}`);
    });
    lines.push(`${indent}}`);
    lines.push("");
    lines.push(`${indent}jsonData, _ := json.Marshal(data)`);
    lines.push(`${indent}payload := bytes.NewBuffer(jsonData)`);
    return lines;
  },

  /**
   * Build JSON body for PHP
   */
  php: (body: any): string[] => {
    return [`$data = ${JSON.stringify(body, null, 2)};`];
  },

  /**
   * Build JSON body for Ruby
   */
  ruby: (body: any): string[] => {
    return [`request.body = ${JSON.stringify(body, null, 2)}`];
  },

  /**
   * Build JSON body for Java
   */
  java: (body: any, indent = "        "): { lines: string[]; builder: string } => {
    const jsonBody = JSON.stringify(body);
    const lines = [`${indent}String json = "${jsonBody.replace(/"/g, '\\"')}";`];
    const builder = "HttpRequest.BodyPublishers.ofString(json)";
    return { lines, builder };
  },
};

/**
 * Check if headers exist and are not empty
 */
export function hasHeaders(request: APIRequest): boolean {
  return Object.keys(request.headers).length > 0;
}

/**
 * Check if body exists
 */
export function hasBody(request: APIRequest): boolean {
  return request.body !== undefined && request.body !== null;
}

/**
 * Convert HTTP method to appropriate case for different languages
 */
export function formatMethod(method: string, language: string): string {
  switch (language) {
    case "python":
    case "ruby":
      return method.toLowerCase();
    case "go":
    case "java":
      return method.toUpperCase();
    case "php":
      return method.toUpperCase();
    default:
      return method;
  }
}

/**
 * Build common request execution patterns
 */
export const executionPatterns = {
  /**
   * Python requests execution
   */
  python: (method: string, params: string[]): string[] => {
    return [
      "",
      `response = requests.${method}(${params.join(", ")})`,
      "print(response.json())",
    ];
  },

  /**
   * Go http client execution
   */
  go: (): string[] => {
    return [
      "",
      "client := &http.Client{}",
      "resp, err := client.Do(req)",
      "if err != nil {",
      "    panic(err)",
      "}",
      "defer resp.Body.Close()",
      "",
      "body, _ := io.ReadAll(resp.Body)",
      "fmt.Println(string(body))",
    ];
  },

  /**
   * PHP cURL execution
   */
  php: (): string[] => {
    return ["", "$response = curl_exec($ch);", "curl_close($ch);", "", "echo $response;"];
  },

  /**
   * Ruby Net::HTTP execution
   */
  ruby: (): string[] => {
    return ["", "response = http.request(request)", "puts response.body"];
  },

  /**
   * Java HttpClient execution
   */
  java: (indent = "        "): string[] => {
    return [
      "",
      `${indent}HttpResponse<String> response = client.send(request,`,
      `${indent}    HttpResponse.BodyHandlers.ofString());`,
      "",
      `${indent}System.out.println(response.body());`,
    ];
  },
};

/**
 * Common imports for different languages
 */
export const commonImports = {
  python: ["import requests"],
  go: [
    "package main",
    "",
    "import (",
    '    "bytes"',
    '    "encoding/json"',
    '    "fmt"',
    '    "io"',
    '    "net/http"',
    ")",
  ],
  php: ["<?php"],
  ruby: ['require "net/http"', 'require "json"'],
  java: ["import java.net.http.*;", "import java.net.URI;"],
};
