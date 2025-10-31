/**
 * Shared SVG icon utilities
 */

/**
 * Checkmark icon used in feature lists, skills, etc.
 */
export const getCheckmarkIcon = (
  width: number = 10,
  height: number = 10,
): string => {
  return `<svg width="${width}" height="${height}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
  </svg>`;
};

/**
 * Right arrow icon - commonly used in CTAs and navigation
 */
export const getArrowRightIcon = (
  width: number = 20,
  height: number = 20,
  ariaHidden: boolean = true,
): string => {
  const ariaAttr = ariaHidden ? ' aria-hidden="true"' : "";
  return `<svg width="${width}" height="${height}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"${ariaAttr}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
  </svg>`;
};

/**
 * Icons for different link types (repository, demo, documentation, API)
 */
export const getLinkIcon = (type: string = "repository"): string => {
  const icons: Record<string, string> = {
    repository: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>`,
    demo: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>`,
    documentation: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>`,
    api: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.5 2c-5.621 0-10.211 4.443-10.495 10h-3.005l4 5.917 4-5.917h-2.321c.24-8.052 6.96-10 7.821-10v-1zm.5 6l-4 6h2.518c-.24 8.052-6.96 10-7.821 10v1c5.621 0 10.211-4.443 10.495-10h3.005l-4-5.917-.197-.083z"/>
    </svg>`,
  };
  return icons[type] || icons.repository;
};
