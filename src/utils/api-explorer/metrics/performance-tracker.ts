/**
 * Performance Metrics Tracker
 * Track and analyze API performance metrics
 */

import type { APIRequestResult } from '../types';

export interface MetricsSummary {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageDuration: number;
  minDuration: number;
  maxDuration: number;
  p50Duration: number; // Median
  p95Duration: number;
  p99Duration: number;
  statusCodes: Record<number, number>;
  errorRate: number;
}

/**
 * Calculate performance percentile
 */
export function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

/**
 * Analyze metrics from request history
 */
export function analyzeMetrics(results: APIRequestResult[]): MetricsSummary {
  if (results.length === 0) {
    return {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageDuration: 0,
      minDuration: 0,
      maxDuration: 0,
      p50Duration: 0,
      p95Duration: 0,
      p99Duration: 0,
      statusCodes: {},
      errorRate: 0,
    };
  }

  const durations = results.map((r) => r.metrics.duration);
  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  // Calculate status code distribution
  const statusCodes: Record<number, number> = {};
  results.forEach((result) => {
    const status = result.metrics.status;
    statusCodes[status] = (statusCodes[status] || 0) + 1;
  });

  // Calculate durations
  const totalDuration = durations.reduce((sum, d) => sum + d, 0);
  const avgDuration = totalDuration / durations.length;

  return {
    totalRequests: results.length,
    successfulRequests: successful.length,
    failedRequests: failed.length,
    averageDuration: Math.round(avgDuration),
    minDuration: Math.min(...durations),
    maxDuration: Math.max(...durations),
    p50Duration: Math.round(calculatePercentile(durations, 50)),
    p95Duration: Math.round(calculatePercentile(durations, 95)),
    p99Duration: Math.round(calculatePercentile(durations, 99)),
    statusCodes,
    errorRate: (failed.length / results.length) * 100,
  };
}

/**
 * Format duration for display
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Format file size for display
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  
  return `${size.toFixed(2)} ${units[i]}`;
}

/**
 * Get status code category
 */
export function getStatusCategory(status: number): {
  category: string;
  color: string;
  description: string;
} {
  if (status >= 200 && status < 300) {
    return {
      category: 'Success',
      color: 'green',
      description: 'Request succeeded',
    };
  }
  
  if (status >= 300 && status < 400) {
    return {
      category: 'Redirect',
      color: 'blue',
      description: 'Request redirected',
    };
  }
  
  if (status >= 400 && status < 500) {
    return {
      category: 'Client Error',
      color: 'orange',
      description: 'Client-side error',
    };
  }
  
  if (status >= 500) {
    return {
      category: 'Server Error',
      color: 'red',
      description: 'Server-side error',
    };
  }
  
  return {
    category: 'Unknown',
    color: 'gray',
    description: 'Unknown status',
  };
}

/**
 * Calculate request rate (requests per second)
 */
export function calculateRequestRate(results: APIRequestResult[]): number {
  if (results.length < 2) return 0;

  const timestamps = results.map((r) => new Date(r.timestamp).getTime());
  const timeSpan = Math.max(...timestamps) - Math.min(...timestamps);
  
  if (timeSpan === 0) return 0;
  
  return (results.length / timeSpan) * 1000; // Convert to per second
}

/**
 * Group metrics by time window
 */
export function groupMetricsByTime(
  results: APIRequestResult[],
  windowMs: number = 60000, // 1 minute default
): Array<{
  timestamp: string;
  count: number;
  avgDuration: number;
  successRate: number;
}> {
  if (results.length === 0) return [];

  const groups = new Map<number, APIRequestResult[]>();

  results.forEach((result) => {
    const time = new Date(result.timestamp).getTime();
    const window = Math.floor(time / windowMs) * windowMs;
    
    if (!groups.has(window)) {
      groups.set(window, []);
    }
    groups.get(window)!.push(result);
  });

  return Array.from(groups.entries())
    .map(([window, windowResults]) => {
      const successful = windowResults.filter((r) => r.success).length;
      const totalDuration = windowResults.reduce((sum, r) => sum + r.metrics.duration, 0);
      
      return {
        timestamp: new Date(window).toISOString(),
        count: windowResults.length,
        avgDuration: Math.round(totalDuration / windowResults.length),
        successRate: (successful / windowResults.length) * 100,
      };
    })
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

/**
 * Export metrics as JSON
 */
export function exportMetrics(results: APIRequestResult[]): string {
  const summary = analyzeMetrics(results);
  const timeGroups = groupMetricsByTime(results);

  return JSON.stringify(
    {
      summary,
      timeGroups,
      results: results.map((r) => ({
        timestamp: r.timestamp,
        endpoint: r.request.endpointId,
        method: r.request.method,
        status: r.metrics.status,
        duration: r.metrics.duration,
        success: r.success,
      })),
    },
    null,
    2,
  );
}

/**
 * Export metrics as CSV
 */
export function exportMetricsCSV(results: APIRequestResult[]): string {
  const headers = [
    'Timestamp',
    'Endpoint',
    'Method',
    'URL',
    'Status',
    'Duration (ms)',
    'Size (bytes)',
    'Success',
  ];

  const rows = results.map((r) => [
    r.timestamp,
    r.request.endpointId,
    r.request.method,
    r.request.url,
    r.metrics.status,
    r.metrics.duration,
    r.metrics.size || 0,
    r.success ? 'Yes' : 'No',
  ]);

  return [headers, ...rows].map((row) => row.join(',')).join('\n');
}
