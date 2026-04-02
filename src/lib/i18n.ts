// i18n.ts - Shared internationalization utilities for CodeArmy site
// This module provides locale detection, language switching, and path mapping
// Rule priority (from highest to lowest):
// 1. User explicit preference (stored in localStorage)
// 2. Current path (/zh/* indicates Chinese)
// 3. Browser locale detection
// 4. Default: English

export type Locale = "en" | "zh";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "codearmy-locale-pref";

// Path mappings between English and Chinese versions
export const PATH_MAPPINGS: Record<string, string> = {
  "/": "/zh/",
  "/how-it-works/": "/zh/how-it-works/",
  "/research-use-cases/": "/zh/research-use-cases/",
  "/integrations/": "/zh/integrations/",
  "/roadmap/": "/zh/roadmap/",
  "/docs/": "/zh/docs/",
  "/docs/quickstart/": "/zh/docs/quickstart/",
};

// Reverse mapping for Chinese to English
export const REVERSE_PATH_MAPPINGS: Record<string, string> = Object.fromEntries(
  Object.entries(PATH_MAPPINGS).map(([en, zh]) => [zh, en])
);

/**
 * Check if the current path is a Chinese path (/zh/*)
 */
export function isZhPath(path: string): boolean {
  return path.startsWith("/zh/") || path === "/zh";
}

/**
 * Get the current locale from path
 */
export function getLocaleFromPath(path: string): Locale {
  return isZhPath(path) ? "zh" : "en";
}

/**
 * Detect if browser locale is Chinese
 */
export function isBrowserLocaleChinese(): boolean {
  if (typeof navigator === "undefined") return false;
  
  const lang = navigator.language || (navigator as any).userLanguage || "en";
  const chineseLocales = ["zh", "zh-CN", "zh-TW", "zh-HK", "zh-SG", "zh-MO"];
  
  return chineseLocales.some(locale => 
    lang.toLowerCase().startsWith(locale.toLowerCase())
  );
}

/**
 * Get the counterpart path for language switching
 * English -> Chinese, Chinese -> English
 */
export function getCounterpartPath(currentPath: string): string {
  // Exact match first
  if (PATH_MAPPINGS[currentPath]) {
    return PATH_MAPPINGS[currentPath];
  }
  if (REVERSE_PATH_MAPPINGS[currentPath]) {
    return REVERSE_PATH_MAPPINGS[currentPath];
  }
  
  // Handle /zh/* prefix for reverse lookup
  if (currentPath.startsWith("/zh/")) {
    const enPath = "/" + currentPath.slice(4); // Remove /zh/
    // Check if there's a direct mapping
    const mapped = Object.entries(PATH_MAPPINGS).find(([_, zh]) => 
      zh === currentPath || zh === currentPath + "/"
    );
    if (mapped) return mapped[0];
    // Default: remove /zh/ prefix
    return enPath.endsWith("/") ? enPath : enPath + "/";
  }
  
  // Add /zh/ prefix for English paths
  const zhPath = "/zh" + (currentPath.startsWith("/") ? currentPath : "/" + currentPath);
  return zhPath.endsWith("/") ? zhPath : zhPath + "/";
}

/**
 * Get stored user preference
 */
export function getStoredLocale(): Locale | null {
  if (typeof localStorage === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "zh") {
      return stored;
    }
  } catch (e) {
    // localStorage might be blocked/disabled
  }
  return null;
}

/**
 * Store user locale preference
 */
export function storeLocale(locale: Locale): void {
  if (typeof localStorage === "undefined") return;
  
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch (e) {
    // localStorage might be blocked/disabled
  }
}

/**
 * Determine the effective locale based on priority rules:
 * 1. Stored user preference (highest priority)
 * 2. Current path detection
 * 3. Browser locale
 * 4. Default locale (lowest priority)
 */
export function detectEffectiveLocale(currentPath: string): Locale {
  // Priority 1: User explicit preference
  const stored = getStoredLocale();
  if (stored) {
    return stored;
  }
  
  // Priority 2: Current path
  const pathLocale = getLocaleFromPath(currentPath);
  if (pathLocale === "zh") {
    return "zh";
  }
  
  // Priority 3: Browser locale
  if (isBrowserLocaleChinese()) {
    return "zh";
  }
  
  // Priority 4: Default
  return DEFAULT_LOCALE;
}

/**
 * Check if redirect is needed based on locale rules
 * Returns the target path if redirect needed, null otherwise
 */
export function getRedirectPath(currentPath: string): string | null {
  const stored = getStoredLocale();
  const currentLocale = getLocaleFromPath(currentPath);
  
  // If user has explicit preference and current path doesn't match
  if (stored && stored !== currentLocale) {
    const targetPath = getCounterpartPath(currentPath);
    return targetPath;
  }
  
  return null;
}

/**
 * Initialize locale handling on page load
 * Should be called in client-side script
 */
export function initLocale(): void {
  if (typeof window === "undefined") return;
  
  const path = window.location.pathname;
  const effectiveLocale = detectEffectiveLocale(path);
  const currentLocale = getLocaleFromPath(path);
  
  // Handle redirect for stored preference mismatch
  const stored = getStoredLocale();
  if (stored && stored !== currentLocale) {
    const targetPath = getCounterpartPath(path);
    // Avoid redirect loops
    if (targetPath !== path && !sessionStorage.getItem("codearmy-locale-redirect")) {
      sessionStorage.setItem("codearmy-locale-redirect", "1");
      window.location.href = targetPath;
      return;
    }
  }
  
  // Handle first-time visit based on browser locale (no stored preference)
  if (!stored && effectiveLocale !== currentLocale) {
    const targetPath = getCounterpartPath(path);
    // Avoid redirect loops
    if (targetPath !== path && !sessionStorage.getItem("codearmy-locale-redirect")) {
      sessionStorage.setItem("codearmy-locale-redirect", "1");
      window.location.href = targetPath;
      return;
    }
  }
  
  // Clear redirect flag after successful load
  sessionStorage.removeItem("codearmy-locale-redirect");
  
  // Update html lang attribute
  document.documentElement.lang = effectiveLocale === "zh" ? "zh-CN" : "en";
}

/**
 * Handle language switch click
 */
export function switchLanguage(currentPath: string): void {
  const currentLocale = getLocaleFromPath(currentPath);
  const newLocale: Locale = currentLocale === "zh" ? "en" : "zh";
  
  // Store preference
  storeLocale(newLocale);
  
  // Navigate to counterpart path
  const targetPath = getCounterpartPath(currentPath);
  if (typeof window !== "undefined") {
    window.location.href = targetPath;
  }
}
