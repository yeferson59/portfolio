/**
 * API Explorer Type Definitions
 * Comprehensive type system for interactive API testing
 */

// HTTP Methods
export type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

// Authentication Types
export type AuthenticationType =
  | "bearer"
  | "apiKey"
  | "basic"
  | "oauth2"
  | "none";

export interface AuthenticationConfig {
  type: AuthenticationType;
  required: boolean;
  tokenEndpoint?: string;
  description?: string;
  placeholder?: string;
  location?: "header" | "query"; // For API Key
  parameterName?: string; // For API Key in query or custom header
}

// Parameter Types
export type ParameterType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object"
  | "integer"
  | "float";

export interface ParameterDefinition {
  type: ParameterType;
  description: string;
  required?: boolean;
  default?: any;
  enum?: string[] | number[];
  pattern?: string; // Regex pattern for validation
  min?: number;
  max?: number;
  example?: any;
}

// Body Definition
export interface BodyDefinition {
  type: "json" | "formData" | "xml" | "text";
  schema?: Record<string, ParameterDefinition>;
  example?: any;
  description?: string;
}

// Endpoint Parameters
export interface EndpointParameters {
  path?: Record<string, ParameterDefinition>;
  query?: Record<string, ParameterDefinition>;
  headers?: Record<string, ParameterDefinition>;
  body?: BodyDefinition;
}

// Request/Response Examples
export interface APIExample {
  request?: {
    path?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, any>;
    body?: any;
  };
  response?: {
    status: number;
    headers?: Record<string, string>;
    body: any;
  };
}

// Performance Metrics
export interface PerformanceMetrics {
  requestTime?: string;
  responseTime?: string;
  duration: number; // milliseconds
  status: number;
  statusText: string;
  size?: number; // bytes
  cached?: boolean;
}

// API Endpoint Definition
export interface APIEndpoint {
  id: string;
  name: string;
  method: HTTPMethod;
  path: string;
  description: string;
  category?: string;
  authentication?: AuthenticationConfig;
  parameters?: EndpointParameters;
  examples?: APIExample[];
  responseSchema?: Record<string, any>;
  deprecated?: boolean;
  version?: string;
}

// Complete API Configuration
export interface APIConfiguration {
  id: string;
  name: string;
  baseUrl: string;
  version: string;
  description: string;
  documentation?: string;
  repositoryUrl?: string;
  endpoints: APIEndpoint[];
  authentication?: AuthenticationConfig;
  globalHeaders?: Record<string, string>;
  categories?: string[];
  rateLimit?: {
    requests: number;
    period: string;
  };
}

// Request Configuration
export interface APIRequest {
  endpointId: string;
  method: HTTPMethod;
  url: string;
  headers: Record<string, string>;
  pathParams?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: any;
  authentication?: {
    type: AuthenticationType;
    token?: string;
    credentials?: {
      username?: string;
      password?: string;
      apiKey?: string;
    };
  };
}

// Response Data
export interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

// Complete Request/Response Cycle
export interface APIRequestResult {
  request: APIRequest;
  response?: APIResponse;
  metrics: PerformanceMetrics;
  timestamp: string;
  success: boolean;
  error?: string;
}

// Code Generation Types
export type CodeLanguage =
  | "curl"
  | "javascript"
  | "python"
  | "go"
  | "php"
  | "java"
  | "ruby";

export interface CodeGenerationOptions {
  language: CodeLanguage;
  includeComments?: boolean;
  indentation?: number;
  asyncAwait?: boolean; // For JavaScript/TypeScript
}

// Validation Result
export interface ValidationResult {
  valid: boolean;
  errors?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

// Explorer State (for UI)
export interface APIExplorerState {
  selectedAPI: string;
  selectedEndpoint: string;
  authentication: {
    type: AuthenticationType;
    token?: string;
    credentials?: Record<string, string>;
  };
  request: {
    pathParams: Record<string, any>;
    queryParams: Record<string, any>;
    headers: Record<string, string>;
    body?: any;
  };
  response?: APIRequestResult;
  loading: boolean;
  history: APIRequestResult[];
}
