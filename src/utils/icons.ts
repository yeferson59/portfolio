/**
 * Shared SVG icon utilities — single source of truth for every inline
 * icon used across the site.
 */

/**
 * Named UI icons. Base names are 16px stroke icons (navigation, lists);
 * the "-lg" variants and contact icons are 24px.
 */
export const icons = {
  // Navigation icons
  user: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>`,
  code: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m10 20 4-16m4 4 4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  activity: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  folder: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  "dollar-sign": `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  settings: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  mail: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>`,
  // Contact icons (larger size)
  "mail-lg": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 4.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/></svg>`,
  map: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>`,
  linkedin: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4.9v13.5H.5V8Zm7.48 0H12.7l.02 1.85h.09c.59-1.07 2.04-2.15 4.2-2.15 4 0 4.98 2.38 4.98 6.53V21.5h-4.9v-6.29c0-1.5-.03-3.44-2.18-3.44-2.18 0-2.51 1.63-2.51 3.32v6.41H7.98V8Z"/></svg>`,
  "code-lg": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m7 8-4 4 4 4m10-8 4 4-4 4m-6 6 2-20"/></svg>`,
  globe: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  "bar-chart": `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18M8 17V10m5 7V6m5 11v-4"/></svg>`,
  "alert-triangle": `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m10.29 3.86-8.18 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.89-3.14l-8.18-14a2 2 0 0 0-3.42 0Z"/><path stroke-linecap="round" d="M12 9v4"/><path stroke-linecap="round" d="M12 17h.01"/></svg>`,
  play: `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
} as const;

export type IconName = keyof typeof icons;

/**
 * Social profile icons (20px, fill-based), keyed by the `icon` field of
 * `socialLinks` in src/data/site.ts.
 */
export const socialIcons = {
  github: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.21.7-3.89-1.55-3.89-1.55-.52-1.32-1.27-1.67-1.27-1.67-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.52-1.46.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.77.12 3.06.73.8 1.17 1.83 1.17 3.09 0 4.43-2.71 5.39-5.29 5.67.41.35.77 1.05.77 2.13 0 1.54-.01 2.78-.01 3.15 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>`,
  linkedin: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4.9v13.5H.5V8Zm7.48 0H12.7l.02 1.85h.09c.59-1.07 2.04-2.15 4.2-2.15 4 0 4.98 2.38 4.98 6.53V21.5h-4.9v-6.29c0-1.5-.03-3.44-2.18-3.44-2.18 0-2.51 1.63-2.51 3.32v6.41H7.98V8Z"/></svg>`,
  twitter: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.43 4.84c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.97-2.47 9 9 0 0 1-2.85 1.1 4.49 4.49 0 0 0-7.66 4.09A12.75 12.75 0 0 1 3.16 3.6a4.48 4.48 0 0 0 1.4 5.99 4.42 4.42 0 0 1-2.03-.56v.06a4.49 4.49 0 0 0 3.6 4.4 4.52 4.52 0 0 1-2.02.08 4.49 4.49 0 0 0 4.19 3.12 8.99 8.99 0 0 1-5.57 1.92A9.18 9.18 0 0 1 2 18.56a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.77 0-.2 0-.39-.01-.58a9.1 9.1 0 0 0 2.23-2.33l-.45-.06Z"/></svg>`,
  blog: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6.18 17.82a2.18 2.18 0 1 1-4.36 0 2.18 2.18 0 0 1 4.36 0ZM.75 8.34a.75.75 0 0 1 .75-.75 14.41 14.41 0 0 1 14.41 14.41.75.75 0 0 1-1.5 0A12.91 12.91 0 0 0 1.5 9.09a.75.75 0 0 1-.75-.75Zm0-5.84A.75.75 0 0 1 1.5 1.75 20.25 20.25 0 0 1 21.75 22a.75.75 0 0 1-1.5 0A18.75 18.75 0 0 0 1.5 3.25.75.75 0 0 1 .75 2.5Z"/></svg>`,
} as const;

export type SocialIconName = keyof typeof socialIcons;

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
