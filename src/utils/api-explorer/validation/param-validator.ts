/**
 * Parameter Validator
 * Validates request parameters against endpoint schema
 */

import type {
  ParameterDefinition,
  ValidationResult,
  APIEndpoint,
} from '../types';

/**
 * Validate all request parameters
 */
export function validateRequestParameters(
  endpoint: APIEndpoint,
  params: {
    pathParams?: Record<string, any>;
    queryParams?: Record<string, any>;
    body?: any;
  },
): ValidationResult {
  const errors: Array<{ field: string; message: string; value?: any }> = [];

  // Validate path parameters
  if (endpoint.parameters?.path) {
    Object.entries(endpoint.parameters.path).forEach(([key, definition]) => {
      const value = params.pathParams?.[key];
      const paramErrors = validateParameter(key, value, definition, 'path');
      errors.push(...paramErrors);
    });
  }

  // Validate query parameters
  if (endpoint.parameters?.query) {
    Object.entries(endpoint.parameters.query).forEach(([key, definition]) => {
      const value = params.queryParams?.[key];
      const paramErrors = validateParameter(key, value, definition, 'query');
      errors.push(...paramErrors);
    });
  }

  // Validate body parameters
  if (endpoint.parameters?.body?.schema) {
    Object.entries(endpoint.parameters.body.schema).forEach(([key, definition]) => {
      const value = params.body?.[key];
      const paramErrors = validateParameter(key, value, definition, 'body');
      errors.push(...paramErrors);
    });
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Validate single parameter
 */
export function validateParameter(
  name: string,
  value: any,
  definition: ParameterDefinition,
  location: 'path' | 'query' | 'body' | 'header',
): Array<{ field: string; message: string; value?: any }> {
  const errors: Array<{ field: string; message: string; value?: any }> = [];
  const field = `${location}.${name}`;

  // Check required
  if (definition.required && (value === undefined || value === null || value === '')) {
    errors.push({
      field,
      message: `${name} is required`,
      value,
    });
    return errors;
  }

  // Skip validation if not required and empty
  if (!definition.required && (value === undefined || value === null || value === '')) {
    return errors;
  }

  // Type validation
  const typeError = validateType(name, value, definition.type);
  if (typeError) {
    errors.push({ field, ...typeError });
  }

  // Pattern validation (for strings)
  if (definition.pattern && typeof value === 'string') {
    const regex = new RegExp(definition.pattern);
    if (!regex.test(value)) {
      errors.push({
        field,
        message: `${name} does not match required pattern`,
        value,
      });
    }
  }

  // Enum validation
  if (definition.enum && Array.isArray(definition.enum)) {
    const enumValues = definition.enum as Array<string | number>;
    if (!enumValues.includes(value as string | number)) {
      errors.push({
        field,
        message: `${name} must be one of: ${enumValues.join(', ')}`,
        value,
      });
    }
  }

  // Min/Max validation
  if (typeof value === 'number') {
    if (definition.min !== undefined && value < definition.min) {
      errors.push({
        field,
        message: `${name} must be at least ${definition.min}`,
        value,
      });
    }
    if (definition.max !== undefined && value > definition.max) {
      errors.push({
        field,
        message: `${name} must be at most ${definition.max}`,
        value,
      });
    }
  }

  // String length validation (using min/max for strings)
  if (typeof value === 'string') {
    if (definition.min !== undefined && value.length < definition.min) {
      errors.push({
        field,
        message: `${name} must be at least ${definition.min} characters`,
        value,
      });
    }
    if (definition.max !== undefined && value.length > definition.max) {
      errors.push({
        field,
        message: `${name} must be at most ${definition.max} characters`,
        value,
      });
    }
  }

  return errors;
}

/**
 * Validate value type
 */
function validateType(
  name: string,
  value: any,
  expectedType: string,
): { message: string; value: any } | null {
  const actualType = getValueType(value);

  // Handle type conversions
  if (expectedType === 'number' || expectedType === 'integer' || expectedType === 'float') {
    if (actualType !== 'number') {
      const converted = Number(value);
      if (isNaN(converted)) {
        return {
          message: `${name} must be a number`,
          value,
        };
      }
    }
    if (expectedType === 'integer' && !Number.isInteger(Number(value))) {
      return {
        message: `${name} must be an integer`,
        value,
      };
    }
  } else if (expectedType === 'boolean') {
    if (actualType !== 'boolean') {
      if (value !== 'true' && value !== 'false' && value !== 0 && value !== 1) {
        return {
          message: `${name} must be a boolean`,
          value,
        };
      }
    }
  } else if (expectedType === 'array') {
    if (!Array.isArray(value)) {
      return {
        message: `${name} must be an array`,
        value,
      };
    }
  } else if (expectedType === 'object') {
    if (actualType !== 'object' || Array.isArray(value)) {
      return {
        message: `${name} must be an object`,
        value,
      };
    }
  } else if (expectedType === 'string') {
    if (actualType !== 'string') {
      return {
        message: `${name} must be a string`,
        value,
      };
    }
  }

  return null;
}

/**
 * Get actual type of value
 */
function getValueType(value: any): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

/**
 * Validate JSON string
 */
export function validateJSON(jsonString: string): ValidationResult {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch {
    return {
      valid: false,
      errors: [
        {
          field: 'json',
          message: 'Invalid JSON format',
        },
      ],
    };
  }
}

/**
 * Validate URL
 */
export function validateURL(url: string): ValidationResult {
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return {
      valid: false,
      errors: [
        {
          field: 'url',
          message: 'Invalid URL format',
        },
      ],
    };
  }
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Sanitize parameter value based on type
 */
export function sanitizeValue(value: any, type: string): any {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  switch (type) {
    case 'number':
    case 'integer':
    case 'float':
      return Number(value);
    
    case 'boolean':
      if (typeof value === 'boolean') return value;
      if (value === 'true' || value === 1) return true;
      if (value === 'false' || value === 0) return false;
      return Boolean(value);
    
    case 'array':
      return Array.isArray(value) ? value : [value];
    
    case 'object':
      return typeof value === 'object' ? value : {};
    
    case 'string':
    default:
      return String(value);
  }
}
