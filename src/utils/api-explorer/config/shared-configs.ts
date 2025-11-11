/**
 * Shared API Configuration Helpers
 * Reusable authentication and parameter configurations
 */

import type { AuthenticationConfig, ParameterDefinition } from "../types";

/**
 * Common Authentication Configurations
 */
export const authConfigs = {
  /**
   * Bearer token authentication (JWT)
   */
  bearer: (
    tokenEndpoint?: string,
    description = "JWT token obtained from login endpoint",
  ): AuthenticationConfig => ({
    type: "bearer",
    required: true,
    tokenEndpoint,
    description,
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  }),

  /**
   * API Key authentication in header
   */
  apiKeyHeader: (
    parameterName = "X-API-Key",
    description = "API key for authentication",
  ): AuthenticationConfig => ({
    type: "apiKey",
    required: true,
    location: "header",
    parameterName,
    description,
    placeholder: "your-api-key-here",
  }),

  /**
   * OAuth2 password grant
   */
  oauth2Password: (
    tokenEndpoint = "/auth/token",
    description = "OAuth2 password bearer token",
  ): AuthenticationConfig => ({
    type: "bearer",
    required: true,
    tokenEndpoint,
    description,
    placeholder: "your-access-token-here",
  }),

  /**
   * No authentication required
   */
  none: (): AuthenticationConfig => ({
    type: "none",
    required: false,
  }),

  /**
   * Optional bearer token (for public endpoints that support auth)
   */
  optionalBearer: (): AuthenticationConfig => ({
    type: "bearer",
    required: false,
  }),
};

/**
 * Common Query Parameters
 */
export const queryParams = {
  /**
   * Standard pagination parameters (page-based)
   */
  pagination: {
    page: {
      type: "integer" as const,
      default: 1,
      min: 1,
      description: "Page number for pagination",
      example: 1,
    },
    limit: {
      type: "integer" as const,
      default: 10,
      min: 1,
      max: 100,
      description: "Number of items per page",
      example: 10,
    },
  },

  /**
   * Offset-based pagination parameters
   */
  paginationOffset: {
    skip: {
      type: "integer" as const,
      default: 0,
      min: 0,
      description: "Number of records to skip",
    },
    limit: {
      type: "integer" as const,
      default: 100,
      min: 1,
      max: 100,
      description: "Maximum number of records to return",
    },
  },

  /**
   * Common sorting parameters
   */
  sorting: {
    sortBy: {
      type: "string" as const,
      required: false,
      description: "Field to sort by",
    },
    order: {
      type: "string" as const,
      enum: ["asc", "desc"],
      default: "desc",
      description: "Sort order",
    },
  },

  /**
   * Search query parameter
   */
  search: {
    type: "string" as const,
    required: false,
    description: "Search query",
  },

  /**
   * Date range parameters
   */
  dateRange: {
    from: {
      type: "string" as const,
      required: false,
      description: "Start date (ISO 8601)",
      example: "2025-01-01",
    },
    to: {
      type: "string" as const,
      required: false,
      description: "End date (ISO 8601)",
      example: "2025-01-20",
    },
  },
};

/**
 * Common Body Schemas
 */
export const bodySchemas = {
  /**
   * Email field with validation
   */
  email: {
    type: "string" as const,
    required: true,
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    description: "User email address",
    example: "user@example.com",
  },

  /**
   * Password field with minimum length
   */
  password: (minLength = 8): ParameterDefinition => ({
    type: "string",
    required: true,
    min: minLength,
    description: `User password (minimum ${minLength} characters)`,
    example: "SecurePass123!",
  }),

  /**
   * Optional name field
   */
  name: {
    type: "string" as const,
    required: false,
    description: "User full name",
    example: "John Doe",
  },

  /**
   * Boolean field with default
   */
  booleanField: (
    description: string,
    defaultValue = true,
  ): ParameterDefinition => ({
    type: "boolean",
    default: defaultValue,
    description,
  }),
};

/**
 * Common Path Parameters
 */
export const pathParams = {
  /**
   * Integer ID parameter
   */
  id: (resourceName = "item"): ParameterDefinition => ({
    type: "integer",
    required: true,
    description: `${resourceName} ID`,
    example: 1,
  }),

  /**
   * String identifier parameter
   */
  slug: (resourceName = "item"): ParameterDefinition => ({
    type: "string",
    required: true,
    description: `${resourceName} slug or identifier`,
    example: "example-slug",
  }),
};

/**
 * Common Global Headers
 */
export const globalHeaders = {
  json: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  formData: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

/**
 * Common Rate Limit Configurations
 */
export const rateLimits = {
  standard: {
    requests: 100,
    period: "1 minute",
  },
  strict: {
    requests: 60,
    period: "1 minute",
  },
  relaxed: {
    requests: 1000,
    period: "1 minute",
  },
};
