/**
 * API Request Builder
 * Constructs HTTP requests from API configuration and user input
 */

import type {
  APIConfiguration,
  APIEndpoint,
  APIRequest,
  AuthenticationType,
} from "../types";

/**
 * Build complete request from endpoint configuration and parameters
 */
export function buildAPIRequest(
  api: APIConfiguration,
  endpoint: APIEndpoint,
  params: {
    pathParams?: Record<string, any>;
    queryParams?: Record<string, any>;
    headers?: Record<string, string>;
    body?: any;
    authentication?: {
      type: AuthenticationType;
      token?: string;
      credentials?: Record<string, string>;
    };
  } = {},
): APIRequest {
  // Build URL with path parameters
  const url = buildURL(
    api.baseUrl,
    endpoint.path,
    params.pathParams,
    params.queryParams,
  );

  // Build headers
  const headers = buildHeaders(
    api,
    endpoint,
    params.headers,
    params.authentication,
  );

  // Build request
  const request: APIRequest = {
    endpointId: endpoint.id,
    method: endpoint.method,
    url,
    headers,
    pathParams: params.pathParams,
    queryParams: params.queryParams,
    body: params.body,
    authentication: params.authentication,
  };

  return request;
}

/**
 * Build complete URL with path and query parameters
 */
export function buildURL(
  baseUrl: string,
  path: string,
  pathParams?: Record<string, any>,
  queryParams?: Record<string, any>,
): string {
  // Replace path parameters
  let finalPath = path;
  if (pathParams) {
    Object.entries(pathParams).forEach(([key, value]) => {
      finalPath = finalPath.replace(
        `{${key}}`,
        encodeURIComponent(String(value)),
      );
    });
  }

  // Build full URL
  const url = new URL(finalPath, baseUrl);

  // Add query parameters
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Build request headers
 */
export function buildHeaders(
  api: APIConfiguration,
  endpoint: APIEndpoint,
  customHeaders?: Record<string, string>,
  authentication?: {
    type: AuthenticationType;
    token?: string;
    credentials?: Record<string, string>;
  },
): Record<string, string> {
  const headers: Record<string, string> = {};

  // Add global headers from API config
  if (api.globalHeaders) {
    Object.assign(headers, api.globalHeaders);
  }

  // Add custom headers
  if (customHeaders) {
    Object.assign(headers, customHeaders);
  }

  // Add authentication headers
  if (authentication) {
    const authHeaders = buildAuthHeaders(
      authentication,
      api.authentication || endpoint.authentication,
    );
    Object.assign(headers, authHeaders);
  }

  return headers;
}

/**
 * Build authentication headers
 */
export function buildAuthHeaders(
  auth: {
    type: AuthenticationType;
    token?: string;
    credentials?: Record<string, string>;
  },
  config?: {
    type: AuthenticationType;
    location?: "header" | "query";
    parameterName?: string;
  },
): Record<string, string> {
  const headers: Record<string, string> = {};

  switch (auth.type) {
    case "bearer":
      if (auth.token) {
        headers["Authorization"] = `Bearer ${auth.token}`;
      }
      break;

    case "apiKey":
      if (auth.token && config?.location === "header") {
        const headerName = config.parameterName || "X-API-Key";
        headers[headerName] = auth.token;
      }
      break;

    case "basic":
      if (auth.credentials?.username && auth.credentials?.password) {
        const encoded = btoa(
          `${auth.credentials.username}:${auth.credentials.password}`,
        );
        headers["Authorization"] = `Basic ${encoded}`;
      }
      break;

    case "oauth2":
      if (auth.token) {
        headers["Authorization"] = `Bearer ${auth.token}`;
      }
      break;
  }

  return headers;
}

/**
 * Build request body based on content type
 */
export function buildRequestBody(
  body: any,
  contentType: string = "application/json",
): string | FormData | undefined {
  if (!body) return undefined;

  if (contentType === "application/json") {
    return JSON.stringify(body);
  }

  if (contentType === "application/x-www-form-urlencoded") {
    const formData = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    return formData.toString();
  }

  if (contentType.startsWith("multipart/form-data")) {
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });
    return formData;
  }

  return String(body);
}

/**
 * Extract required parameters from endpoint
 */
export function getRequiredParameters(endpoint: APIEndpoint): {
  path: string[];
  query: string[];
  body: string[];
} {
  const required = {
    path: [] as string[],
    query: [] as string[],
    body: [] as string[],
  };

  // Path parameters
  if (endpoint.parameters?.path) {
    Object.entries(endpoint.parameters.path).forEach(([key, param]) => {
      if (param.required !== false) {
        required.path.push(key);
      }
    });
  }

  // Query parameters
  if (endpoint.parameters?.query) {
    Object.entries(endpoint.parameters.query).forEach(([key, param]) => {
      if (param.required === true) {
        required.query.push(key);
      }
    });
  }

  // Body parameters
  if (endpoint.parameters?.body?.schema) {
    Object.entries(endpoint.parameters.body.schema).forEach(([key, param]) => {
      if (param.required === true) {
        required.body.push(key);
      }
    });
  }

  return required;
}

/**
 * Get default values for parameters
 */
export function getDefaultParameters(endpoint: APIEndpoint): {
  path: Record<string, any>;
  query: Record<string, any>;
  body: Record<string, any>;
} {
  const defaults = {
    path: {} as Record<string, any>,
    query: {} as Record<string, any>,
    body: {} as Record<string, any>,
  };

  // Query parameter defaults
  if (endpoint.parameters?.query) {
    Object.entries(endpoint.parameters.query).forEach(([key, param]) => {
      if (param.default !== undefined) {
        defaults.query[key] = param.default;
      }
    });
  }

  // Body parameter defaults
  if (endpoint.parameters?.body?.schema) {
    Object.entries(endpoint.parameters.body.schema).forEach(([key, param]) => {
      if (param.default !== undefined) {
        defaults.body[key] = param.default;
      }
    });
  }

  // Use example if available
  if (endpoint.examples?.[0]?.request) {
    const example = endpoint.examples[0].request;
    if (example.path) Object.assign(defaults.path, example.path);
    if (example.query) Object.assign(defaults.query, example.query);
    if (example.body) Object.assign(defaults.body, example.body);
  }

  return defaults;
}
