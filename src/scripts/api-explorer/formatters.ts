/**
 * Pure display-formatting helpers for the API Explorer client controller.
 */

export interface StatusInfo {
  category: string;
  color: string;
  description: string;
}

export function getStatusInfo(status?: number): StatusInfo {
  if (!status) {
    return {
      category: "Pending",
      color: "gray",
      description: "No request sent",
    };
  }
  if (status >= 200 && status < 300) {
    return {
      category: "Success",
      color: "green",
      description: "Request succeeded",
    };
  }
  if (status >= 300 && status < 400) {
    return {
      category: "Redirect",
      color: "blue",
      description: "Request redirected",
    };
  }
  if (status >= 400 && status < 500) {
    return {
      category: "Client Error",
      color: "orange",
      description: "Client-side error",
    };
  }
  if (status >= 500) {
    return {
      category: "Server Error",
      color: "red",
      description: "Server-side error",
    };
  }
  return { category: "Unknown", color: "gray", description: "Unknown status" };
}

export function getDurationColor(ms?: number): string {
  if (!ms) return "gray";
  if (ms < 100) return "green";
  if (ms < 500) return "blue";
  if (ms < 1000) return "orange";
  return "red";
}

export function formatDuration(ms?: number): string {
  if (!ms && ms !== 0) return "--";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function formatSize(bytes?: number): string {
  if (!bytes && bytes !== 0) return "--";
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);

  return `${size.toFixed(2)} ${units[i]}`;
}
