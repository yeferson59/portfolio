/**
 * Utility functions for creating consistent API responses
 */

/**
 * Creates a JSON response with proper headers
 */
export function createJSONResponse(
  data: unknown,
  status: number = 200,
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Creates an error response
 */
export function createErrorResponse(
  message: string,
  status: number = 500,
): Response {
  return createJSONResponse({ error: message }, status);
}

/**
 * Creates a success response
 */
export function createSuccessResponse(data: unknown): Response {
  return createJSONResponse(data, 200);
}
