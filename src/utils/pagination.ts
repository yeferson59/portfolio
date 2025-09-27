/**
 * Pagination utilities for projects and other content
 */

export interface PaginationData<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  itemsPerPage: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Paginate an array of items
 */
export function paginate<T>(
  items: T[],
  currentPage: number = 1,
  itemsPerPage: number = 6
): PaginationData<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Ensure current page is within bounds
  const page = Math.max(1, Math.min(currentPage, totalPages));
  
  // Calculate start and end indices
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Get items for current page
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    currentPage: page,
    totalPages,
    totalItems,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    itemsPerPage,
  };
}

/**
 * Generate page numbers for pagination controls
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): number[] {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxVisiblePages - 1);

  // Adjust start if we're near the end
  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Get pagination info for URL generation
 */
export function getPaginationInfo(
  currentPage: number,
  totalPages: number
): PaginationInfo {
  return {
    currentPage: Math.max(1, Math.min(currentPage, totalPages)),
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}