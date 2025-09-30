/**
 * API Explorer Configuration Index
 * Central registry of all available API configurations
 */

import type { APIConfiguration } from '../types';
import { ecommerceAPIConfig } from './ecommerce-api';
import { fastapiTemplateConfig } from './fastapi-template';
import { financeMCPConfig } from './finance-mcp';

/**
 * All available API configurations
 */
export const availableAPIs: APIConfiguration[] = [
  ecommerceAPIConfig,
  fastapiTemplateConfig,
  financeMCPConfig,
];

/**
 * Get API configuration by ID
 */
export function getAPIConfig(id: string): APIConfiguration | undefined {
  return availableAPIs.find((api) => api.id === id);
}

/**
 * Get all API IDs
 */
export function getAPIIds(): string[] {
  return availableAPIs.map((api) => api.id);
}

/**
 * Get APIs by category
 */
export function getAPIsByCategory(category: string): APIConfiguration[] {
  return availableAPIs.filter((api) =>
    api.categories?.includes(category),
  );
}

/**
 * Search APIs by name or description
 */
export function searchAPIs(query: string): APIConfiguration[] {
  const lowerQuery = query.toLowerCase();
  return availableAPIs.filter(
    (api) =>
      api.name.toLowerCase().includes(lowerQuery) ||
      api.description.toLowerCase().includes(lowerQuery),
  );
}

/**
 * Get default API (first in the list)
 */
export function getDefaultAPI(): APIConfiguration {
  return availableAPIs[0];
}

/**
 * Get API statistics
 */
export function getAPIStats() {
  const totalAPIs = availableAPIs.length;
  const totalEndpoints = availableAPIs.reduce(
    (sum, api) => sum + api.endpoints.length,
    0,
  );
  
  const authTypes = new Set<string>();
  availableAPIs.forEach((api) => {
    if (api.authentication) {
      authTypes.add(api.authentication.type);
    }
  });

  const allCategories = new Set<string>();
  availableAPIs.forEach((api) => {
    api.categories?.forEach((cat) => allCategories.add(cat));
  });

  return {
    totalAPIs,
    totalEndpoints,
    authenticationTypes: Array.from(authTypes),
    categories: Array.from(allCategories),
  };
}
