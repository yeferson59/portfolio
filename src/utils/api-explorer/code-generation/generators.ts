/**
 * Code Generators
 * Generate code snippets for various programming languages
 */

import type { APIRequest, CodeLanguage } from "../types";

/**
 * Generate code for given language
 */
export function generateCode(
  request: APIRequest,
  language: CodeLanguage,
): string {
  switch (language) {
    case "curl":
      return generateCurl(request);
    case "javascript":
      return generateJavaScript(request);
    case "python":
      return generatePython(request);
    case "go":
      return generateGo(request);
    case "php":
      return generatePHP(request);
    case "java":
      return generateJava(request);
    case "ruby":
      return generateRuby(request);
    default:
      return generateCurl(request);
  }
}

/**
 * Generate cURL command
 */
export function generateCurl(request: APIRequest): string {
  const parts: string[] = ["curl"];

  // Add method
  if (request.method !== "GET") {
    parts.push(`-X ${request.method}`);
  }

  // Add headers
  Object.entries(request.headers).forEach(([key, value]) => {
    parts.push(`-H "${key}: ${value}"`);
  });

  // Add body
  if (request.body) {
    const bodyStr =
      typeof request.body === "string"
        ? request.body
        : JSON.stringify(request.body);
    parts.push(`-d '${bodyStr}'`);
  }

  // Add URL
  parts.push(`"${request.url}"`);

  return parts.join(" \\\n  ");
}

/**
 * Generate JavaScript (fetch) code
 */
export function generateJavaScript(request: APIRequest): string {
  const options: any = {
    method: request.method,
    headers: request.headers,
  };

  if (request.body) {
    options.body = JSON.stringify(request.body);
  }

  return `fetch('${request.url}', ${JSON.stringify(options, null, 2)})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
}

/**
 * Generate Python (requests) code
 */
export function generatePython(request: APIRequest): string {
  const lines: string[] = ["import requests", "", 'url = f"{request.url}"'];

  // Headers
  if (Object.keys(request.headers).length > 0) {
    lines.push("headers = {");
    Object.entries(request.headers).forEach(([key, value], index, arr) => {
      const comma = index < arr.length - 1 ? "," : "";
      lines.push(`    "${key}": "${value}"${comma}`);
    });
    lines.push("}");
  }

  // Body
  if (request.body) {
    lines.push(`data = ${JSON.stringify(request.body, null, 2)}`);
  }

  // Request
  const method = request.method.toLowerCase();
  const params: string[] = ["url"];
  if (Object.keys(request.headers).length > 0) params.push("headers=headers");
  if (request.body) params.push("json=data");

  lines.push("");
  lines.push(`response = requests.${method}(${params.join(", ")})`);
  lines.push("print(response.json())");

  return lines.join("\n");
}

/**
 * Generate Go code
 */
export function generateGo(request: APIRequest): string {
  const lines: string[] = [
    "package main",
    "",
    "import (",
    '    "bytes"',
    '    "encoding/json"',
    '    "fmt"',
    '    "io"',
    '    "net/http"',
    ")",
    "",
    "func main() {",
    `    url := "${request.url}"`,
  ];

  // Body
  if (request.body) {
    lines.push("");
    lines.push("    data := map[string]interface{}{");
    Object.entries(request.body).forEach(([key, value], index, arr) => {
      const comma = index < arr.length - 1 ? "," : "";
      const valueStr = typeof value === "string" ? `"${value}"` : value;
      lines.push(`        "${key}": ${valueStr}${comma}`);
    });
    lines.push("    }");
    lines.push("");
    lines.push("    jsonData, _ := json.Marshal(data)");
    lines.push("    payload := bytes.NewBuffer(jsonData)");
  }

  // Request
  const bodyArg = request.body ? "payload" : "nil";
  lines.push("");
  lines.push(
    `    req, _ := http.NewRequest("${request.method}", url, ${bodyArg})`,
  );

  // Headers
  if (Object.keys(request.headers).length > 0) {
    lines.push("");
    Object.entries(request.headers).forEach(([key, value]) => {
      lines.push(`    req.Header.Add("${key}", "${value}")`);
    });
  }

  // Execute
  lines.push("");
  lines.push("    client := &http.Client{}");
  lines.push("    resp, err := client.Do(req)");
  lines.push("    if err != nil {");
  lines.push("        panic(err)");
  lines.push("    }");
  lines.push("    defer resp.Body.Close()");
  lines.push("");
  lines.push("    body, _ := io.ReadAll(resp.Body)");
  lines.push("    fmt.Println(string(body))");
  lines.push("}");

  return lines.join("\n");
}

/**
 * Generate PHP code
 */
export function generatePHP(request: APIRequest): string {
  const lines: string[] = ["<?php", "", `$url = "${request.url}";`];

  // Initialize cURL
  lines.push("", "$ch = curl_init($url);");

  // Set options
  lines.push("curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);");
  lines.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${request.method}");`);

  // Headers
  if (Object.keys(request.headers).length > 0) {
    lines.push("");
    lines.push("$headers = [");
    Object.entries(request.headers).forEach(([key, value]) => {
      lines.push(`    "${key}: ${value}",`);
    });
    lines.push("];");
    lines.push("curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);");
  }

  // Body
  if (request.body) {
    lines.push("");
    lines.push(`$data = ${JSON.stringify(request.body, null, 2)};`);
    lines.push("curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));");
  }

  // Execute
  lines.push("");
  lines.push("$response = curl_exec($ch);");
  lines.push("curl_close($ch);");
  lines.push("");
  lines.push("echo $response;");
  lines.push("?>");

  return lines.join("\n");
}

/**
 * Generate Java code
 */
export function generateJava(request: APIRequest): string {
  const lines: string[] = [
    "import java.net.http.*;",
    "import java.net.URI;",
    "",
    "public class ApiClient {",
    "    public static void main(String[] args) throws Exception {",
    "        HttpClient client = HttpClient.newHttpClient();",
    "",
    `        String url = "${request.url}";`,
  ];

  // Body
  let bodyBuilder = "HttpRequest.BodyPublishers.noBody()";
  if (request.body) {
    const jsonBody = JSON.stringify(request.body);
    lines.push(`        String json = "${jsonBody.replace(/"/g, '\\"')}";`);
    bodyBuilder = "HttpRequest.BodyPublishers.ofString(json)";
  }

  // Request builder
  lines.push("");
  lines.push("        HttpRequest request = HttpRequest.newBuilder()");
  lines.push("            .uri(URI.create(url))");
  lines.push(`            .method("${request.method}", ${bodyBuilder})`);

  // Headers
  Object.entries(request.headers).forEach(([key, value]) => {
    lines.push(`            .header("${key}", "${value}")`);
  });

  lines.push("            .build();");
  lines.push("");
  lines.push("        HttpResponse<String> response = client.send(request,");
  lines.push("            HttpResponse.BodyHandlers.ofString());");
  lines.push("");
  lines.push("        System.out.println(response.body());");
  lines.push("    }");
  lines.push("}");

  return lines.join("\n");
}

/**
 * Generate Ruby code
 */
export function generateRuby(request: APIRequest): string {
  const lines: string[] = [
    'require "net/http"',
    'require "json"',
    "",
    `url = URI("${request.url}")`,
  ];

  // HTTP object
  lines.push("");
  lines.push("http = Net::HTTP.new(url.host, url.port)");
  if (request.url.startsWith("https")) {
    lines.push("http.use_ssl = true");
  }

  // Request
  const method =
    request.method.charAt(0) + request.method.slice(1).toLowerCase();
  lines.push("");
  lines.push(`request = Net::HTTP::${method}.new(url)`);

  // Headers
  Object.entries(request.headers).forEach(([key, value]) => {
    lines.push(`request["${key}"] = "${value}"`);
  });

  // Body
  if (request.body) {
    lines.push("");
    lines.push(`request.body = ${JSON.stringify(request.body, null, 2)}`);
  }

  // Execute
  lines.push("");
  lines.push("response = http.request(request)");
  lines.push("puts response.body");

  return lines.join("\n");
}

/**
 * Get all available languages
 */
export const availableLanguages: Array<{ id: CodeLanguage; name: string }> = [
  { id: "curl", name: "cURL" },
  { id: "javascript", name: "JavaScript (Fetch)" },
  { id: "python", name: "Python (Requests)" },
  { id: "go", name: "Go" },
  { id: "php", name: "PHP" },
  { id: "java", name: "Java" },
  { id: "ruby", name: "Ruby" },
];
