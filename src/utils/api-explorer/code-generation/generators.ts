/**
 * Code Generators
 * Generate code snippets for various programming languages
 */

import type { APIRequest, CodeLanguage } from "../types";
import {
  headerBuilders,
  bodyBuilders,
  hasHeaders,
  hasBody,
  formatMethod,
  executionPatterns,
  commonImports,
} from "./helpers";

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
  const lines: string[] = [...commonImports.python, "", `url = "${request.url}"`];

  // Headers
  if (hasHeaders(request)) {
    lines.push(...headerBuilders.python(request.headers));
  }

  // Body
  if (hasBody(request)) {
    lines.push(...bodyBuilders.python(request.body));
  }

  // Request
  const method = formatMethod(request.method, "python");
  const params: string[] = ["url"];
  if (hasHeaders(request)) params.push("headers=headers");
  if (hasBody(request)) params.push("json=data");

  lines.push(...executionPatterns.python(method, params));

  return lines.join("\n");
}

/**
 * Generate Go code
 */
export function generateGo(request: APIRequest): string {
  const lines: string[] = [
    ...commonImports.go,
    "",
    "func main() {",
    `    url := "${request.url}"`,
  ];

  // Body
  if (hasBody(request)) {
    lines.push("");
    lines.push(...bodyBuilders.go(request.body));
  }

  // Request
  const bodyArg = hasBody(request) ? "payload" : "nil";
  lines.push("");
  lines.push(
    `    req, _ := http.NewRequest("${request.method}", url, ${bodyArg})`,
  );

  // Headers
  if (hasHeaders(request)) {
    lines.push("");
    lines.push(...headerBuilders.go(request.headers));
  }

  // Execute
  lines.push(...executionPatterns.go());
  lines.push("}");

  return lines.join("\n");
}

/**
 * Generate PHP code
 */
export function generatePHP(request: APIRequest): string {
  const lines: string[] = [...commonImports.php, "", `$url = "${request.url}";`];

  // Initialize cURL
  lines.push("", "$ch = curl_init($url);");

  // Set options
  lines.push("curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);");
  lines.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${request.method}");`);

  // Headers
  if (hasHeaders(request)) {
    lines.push("");
    lines.push(...headerBuilders.php(request.headers));
    lines.push("curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);");
  }

  // Body
  if (hasBody(request)) {
    lines.push("");
    lines.push(...bodyBuilders.php(request.body));
    lines.push("curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));");
  }

  // Execute
  lines.push(...executionPatterns.php());
  lines.push("?>");

  return lines.join("\n");
}

/**
 * Generate Java code
 */
export function generateJava(request: APIRequest): string {
  const lines: string[] = [
    ...commonImports.java,
    "",
    "public class ApiClient {",
    "    public static void main(String[] args) throws Exception {",
    "        HttpClient client = HttpClient.newHttpClient();",
    "",
    `        String url = "${request.url}";`,
  ];

  // Body
  let bodyBuilder = "HttpRequest.BodyPublishers.noBody()";
  if (hasBody(request)) {
    const { lines: bodyLines, builder } = bodyBuilders.java(request.body);
    lines.push(...bodyLines);
    bodyBuilder = builder;
  }

  // Request builder
  lines.push("");
  lines.push("        HttpRequest request = HttpRequest.newBuilder()");
  lines.push("            .uri(URI.create(url))");
  lines.push(`            .method("${request.method}", ${bodyBuilder})`);

  // Headers
  if (hasHeaders(request)) {
    lines.push(...headerBuilders.java(request.headers));
  }

  lines.push("            .build();");
  lines.push(...executionPatterns.java());
  lines.push("    }");
  lines.push("}");

  return lines.join("\n");
}

/**
 * Generate Ruby code
 */
export function generateRuby(request: APIRequest): string {
  const lines: string[] = [
    ...commonImports.ruby,
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
  if (hasHeaders(request)) {
    lines.push(...headerBuilders.ruby(request.headers));
  }

  // Body
  if (hasBody(request)) {
    lines.push("");
    lines.push(...bodyBuilders.ruby(request.body));
  }

  // Execute
  lines.push(...executionPatterns.ruby());

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
