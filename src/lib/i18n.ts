// i18n.ts - Shared internationalization utilities for CodeArmy site
// This module provides locale detection, language switching, and path mapping
// Rule priority (from highest to lowest):
// 1. User explicit preference (stored in localStorage)
// 2. Current path (/zh/* indicates Chinese)
// 3. Browser locale detection
// 4. Default: English

// Must match astro.config.mjs `base`
export const BASE_PATH = "/codearmy-site";

export type Locale = "en" | "zh";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "codearmy-locale-pref";

// Path mappings between English and Chinese versions (without base prefix)
// NOTE: These are forward mappings for planned /zh/* routes.
// Auto-redirect and language switching only work for paths in AVAILABLE_ZH_PATHS.
export const PATH_MAPPINGS: Record<string, string> = {
  "/": "/zh/",
  "/how-it-works/": "/zh/how-it-works/",
  "/research-use-cases/": "/zh/research-use-cases/",
  "/integrations/": "/zh/integrations/",
  "/roadmap/": "/zh/roadmap/",
  "/docs/": "/zh/docs/",
  "/docs/quickstart/": "/zh/docs/quickstart/",
};

// Set of available Chinese paths that actually exist in the build.
// T401 adds the homepage /zh/ to enable full browser validation.
// T402/T403 will add more pages here.
// This controls auto-redirect behavior - we only redirect to paths that exist.
export const AVAILABLE_ZH_PATHS: Set<string> = new Set([
  "/zh/", // Homepage added in T401 for complete validation
]);

// Reverse mapping for Chinese to English
export const REVERSE_PATH_MAPPINGS: Record<string, string> = Object.fromEntries(
  Object.entries(PATH_MAPPINGS).map(([en, zh]) => [zh, en])
);

function stripBase(path: string, base: string = BASE_PATH): string {
  if (base && base !== "/" && path.startsWith(base)) {
    const remainder = path.slice(base.length);
    return remainder || "/";
  }
  return path;
}

function addBase(path: string, base: string = BASE_PATH): string {
  if (!base || base === "/") return path;
  if (path.startsWith(base)) return path;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : "/" + path;
  return normalizedBase + normalizedPath;
}

/**
 * Check if the current path is a Chinese path (/zh/*)
 */
export function isZhPath(path: string): boolean {
  const stripped = stripBase(path);
  return stripped.startsWith("/zh/") || stripped === "/zh";
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

  return chineseLocales.some((locale) =>
    lang.toLowerCase().startsWith(locale.toLowerCase())
  );
}

/**
 * Get the counterpart path for language switching
 * English -> Chinese, Chinese -> English
 */
export function getCounterpartPath(currentPath: string): string {
  const stripped = stripBase(currentPath);

  // Handle /zh without trailing slash - treat as /zh/
  if (stripped === "/zh") {
    return addBase("/");
  }

  // Exact match first
  if (PATH_MAPPINGS[stripped]) {
    return addBase(PATH_MAPPINGS[stripped]);
  }
  if (REVERSE_PATH_MAPPINGS[stripped]) {
    return addBase(REVERSE_PATH_MAPPINGS[stripped]);
  }

  // Handle /zh/* prefix for reverse lookup
  if (stripped.startsWith("/zh/")) {
    const mapped = Object.entries(PATH_MAPPINGS).find(
      ([_, zh]) => zh === stripped || zh === stripped + "/"
    );
    if (mapped) return addBase(mapped[0]);
    // Default: remove /zh/ prefix
    const enPath = "/" + stripped.slice(4);
    return addBase(enPath.endsWith("/") ? enPath : enPath + "/");
  }

  // Add /zh/ prefix for English paths
  const zhPath =
    "/zh" + (stripped.startsWith("/") ? stripped : "/" + stripped);
  return addBase(zhPath.endsWith("/") ? zhPath : zhPath + "/");
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
 * Check if a Chinese path is actually available (exists in the build)
 */
export function isZhPathAvailable(zhPath: string): boolean {
  const stripped = stripBase(zhPath);
  return AVAILABLE_ZH_PATHS.has(stripped);
}

/**
 * Check if redirect is needed based on locale rules
 * Returns the target path if redirect needed, null otherwise
 * NOTE: Only redirects to /zh/* paths if they exist in AVAILABLE_ZH_PATHS
 */
export function getRedirectPath(currentPath: string): string | null {
  const stored = getStoredLocale();
  const currentLocale = getLocaleFromPath(currentPath);

  // If user has explicit preference and current path doesn't match
  if (stored && stored !== currentLocale) {
    const targetPath = getCounterpartPath(currentPath);
    // Only redirect if target Chinese path exists
    if (stored === "zh" && !isZhPathAvailable(targetPath)) {
      return null;
    }
    return targetPath;
  }

  return null;
}

/**
 * Initialize locale handling on page load
 * Should be called in client-side script
 * 
 * NOTE on auto-redirect (T401): 
 * - Stored preference mismatch: Only redirects if target /zh/* path exists
 * - First-time browser locale: Disabled until /zh/* pages are available (T402/T403)
 * - T402/T403 should add paths to AVAILABLE_ZH_PATHS and test before enabling full auto-redirect
 */
export function initLocale(): void {
  if (typeof window === "undefined") return;

  const path = window.location.pathname;
  const currentLocale = getLocaleFromPath(path);

  // Handle redirect for stored preference mismatch
  const stored = getStoredLocale();
  if (stored && stored !== currentLocale) {
    const targetPath = getCounterpartPath(path);
    // Only redirect if target Chinese path exists (avoid 404)
    if (stored === "zh" && !isZhPathAvailable(targetPath)) {
      // Stay on current page, just update lang attribute
      document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";
      sessionStorage.removeItem("codearmy-locale-redirect");
      return;
    }
    // Avoid redirect loops
    if (targetPath !== path && !sessionStorage.getItem("codearmy-locale-redirect")) {
      sessionStorage.setItem("codearmy-locale-redirect", "1");
      window.location.href = targetPath;
      return;
    }
  }

  // First-time browser locale auto-redirect: Chinese locale -> /zh/
  // Only redirect if: 1) no stored preference, 2) not already on Chinese path,
  // 3) target path exists, 4) avoid redirect loops
  const effectiveLocale = detectEffectiveLocale(path);
  if (!stored && effectiveLocale === "zh" && currentLocale !== "zh") {
    const targetPath = getCounterpartPath(path);
    if (isZhPathAvailable(targetPath) && !sessionStorage.getItem("codearmy-locale-redirect")) {
      sessionStorage.setItem("codearmy-locale-redirect", "1");
      window.location.href = targetPath;
      return;
    }
  }

  // Clear redirect flag after successful load
  sessionStorage.removeItem("codearmy-locale-redirect");

  // Update html lang attribute based on current path
  document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";
}

/**
 * Handle language switch click
 * NOTE: Switching to Chinese only works if the target /zh/* path exists
 */
export function switchLanguage(currentPath: string): string | null {
  const currentLocale = getLocaleFromPath(currentPath);
  const newLocale: Locale = currentLocale === "zh" ? "en" : "zh";

  // Store preference
  storeLocale(newLocale);

  // Navigate to counterpart path
  const targetPath = getCounterpartPath(currentPath);
  
  // If switching to Chinese but path doesn't exist yet, stay on current page
  if (newLocale === "zh" && !isZhPathAvailable(targetPath)) {
    console.log(`[i18n] Chinese page not yet available: ${targetPath}`);
    return null;
  }
  
  if (typeof window !== "undefined") {
    window.location.href = targetPath;
  }
  return targetPath;
}
