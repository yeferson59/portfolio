/**
 * Simulated data backing the "API Performance Metrics" section.
 * Keeping it here keeps the section components purely presentational.
 */

export type EndpointStatus = "healthy" | "warning" | "error";

export interface EndpointMetric {
  endpoint: string;
  calls: number;
  avgTime: number;
  status: EndpointStatus;
}

export interface ResponseTimePoint {
  time: string;
  value: number;
}

export const currentMetrics = {
  responseTime: 156,
  uptime: 99.97,
  totalRequests: 847392,
  requestsToday: 12847,
  activeConnections: 234,
  errorRate: 0.03,
  throughput: 1247,
  avgLoad: 45.2,
};

export const responseTimeHistory: ResponseTimePoint[] = [
  { time: "00:00", value: 143 },
  { time: "04:00", value: 128 },
  { time: "08:00", value: 167 },
  { time: "12:00", value: 189 },
  { time: "16:00", value: 156 },
  { time: "20:00", value: 134 },
];

export const endpointMetrics: EndpointMetric[] = [
  { endpoint: "/api/users", calls: 23567, avgTime: 89, status: "healthy" },
  { endpoint: "/api/projects", calls: 18324, avgTime: 124, status: "healthy" },
  { endpoint: "/api/auth", calls: 15892, avgTime: 67, status: "healthy" },
  { endpoint: "/api/analytics", calls: 9847, avgTime: 234, status: "warning" },
  { endpoint: "/api/reports", calls: 6432, avgTime: 445, status: "error" },
];

const MILLION = 1_000_000;
const THOUSAND = 1_000;

export const formatMetricNumber = (num: number): string => {
  if (num >= MILLION) return (num / MILLION).toFixed(1) + "M";
  if (num >= THOUSAND) return (num / THOUSAND).toFixed(1) + "K";
  return num.toString();
};

/* 24px stroke icons used only by the KPI cards below. */
const kpiIcon = (path: string) =>
  `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="${path}"></path></svg>`;

export interface KpiCardData {
  title: string;
  value: string;
  icon: string;
  iconTone: "primary" | "secondary";
  badgeVariant: "primary" | "secondary";
  badgeLabel: string;
}

export const kpiCards: KpiCardData[] = [
  {
    title: "Response Time",
    value: `${currentMetrics.responseTime}ms`,
    icon: kpiIcon("M13 10V3L4 14h7v7l9-11h-7z"),
    iconTone: "primary",
    badgeVariant: "primary",
    badgeLabel: "Excellent",
  },
  {
    title: "Uptime",
    value: `${currentMetrics.uptime}%`,
    icon: kpiIcon("M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"),
    iconTone: "secondary",
    badgeVariant: "primary",
    badgeLabel: "Stable",
  },
  {
    title: "Total Requests",
    value: formatMetricNumber(currentMetrics.totalRequests),
    icon: kpiIcon(
      "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
    ),
    iconTone: "primary",
    badgeVariant: "secondary",
    badgeLabel: "All Time",
  },
  {
    title: "Requests Today",
    value: formatMetricNumber(currentMetrics.requestsToday),
    icon: kpiIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
    ),
    iconTone: "secondary",
    badgeVariant: "primary",
    badgeLabel: "+15.3%",
  },
];
