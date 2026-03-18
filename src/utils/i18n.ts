/**
 * i18n utilities for Astro internationalization
 *
 * This module provides helper functions for working with Astro's i18n routing.
 * For more information, see: https://docs.astro.build/en/guides/internationalization/
 */

import {
  getRelativeLocaleUrl,
  getAbsoluteLocaleUrl,
  getRelativeLocaleUrlList,
  getAbsoluteLocaleUrlList,
} from "astro:i18n";

/**
 * Available locales in the application
 */
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

/**
 * Default locale
 */
export const defaultLocale: Locale = "en";

/**
 * Locale labels for display in UI
 */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

/**
 * Get the relative URL for a path in a specific locale
 * Example: getLocalizedPath('es', 'about') => '/es/about'
 *          getLocalizedPath('en', 'about') => '/about' (no prefix for default locale)
 */
export function getLocalizedPath(locale: Locale, path: string = ""): string {
  return getRelativeLocaleUrl(locale, path);
}

/**
 * Get the absolute URL for a path in a specific locale
 * Example: getAbsoluteLocalizedPath('es', 'about') => 'https://example.com/es/about'
 */
export function getAbsoluteLocalizedPath(
  locale: Locale,
  path: string = ""
): string {
  return getAbsoluteLocaleUrl(locale, path);
}

/**
 * Get all relative URLs for a path in all locales
 * Example: getAllLocalizedPaths('about') => ['/about', '/es/about']
 */
export function getAllLocalizedPaths(path: string = ""): string[] {
  return getRelativeLocaleUrlList(path);
}

/**
 * Get all absolute URLs for a path in all locales
 * Example: getAllAbsoluteLocalizedPaths('about')
 *   => ['https://example.com/about', 'https://example.com/es/about']
 */
export function getAllAbsoluteLocalizedPaths(path: string = ""): string[] {
  return getAbsoluteLocaleUrlList(path);
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get the alternate locale (for language switcher)
 */
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === "en" ? "es" : "en";
}

/**
 * Get the current locale from Astro's context or fallback to default
 */
export function getCurrentLocale(astroLocale: string | undefined): Locale {
  if (astroLocale && isValidLocale(astroLocale)) {
    return astroLocale;
  }
  return defaultLocale;
}
