/**
 * Fuente única de verdad para el consentimiento de cookies.
 *
 * Antes cada componente leía/escribía `localStorage` por su cuenta y nadie
 * avisaba a los demás, así que Analytics cargaba GA4 y Clarity sin esperar a
 * que el usuario eligiera. Ahora el banner guarda con `saveConsent()` y
 * Analytics se suscribe con `onConsentChange()`.
 */

export interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export const CONSENT_STORAGE_KEY = 'cookie-consent';
export const CONSENT_CHANGED_EVENT = 'mqm:consent-changed';

export const DENY_ALL: CookieSettings = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalization: false,
};

export const ACCEPT_ALL: CookieSettings = {
  necessary: true,
  analytics: true,
  marketing: true,
  personalization: true,
};

/** Lee el consentimiento guardado. Devuelve null si aún no ha elegido. */
export function readConsent(): CookieSettings | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookieSettings>;
    if (typeof parsed !== 'object' || parsed === null) return null;

    return { ...DENY_ALL, ...parsed, necessary: true };
  } catch {
    // Consentimiento corrupto: se trata como "aún no ha elegido"
    return null;
  }
}

/** Guarda el consentimiento y avisa a quien esté suscrito. */
export function saveConsent(settings: CookieSettings): void {
  if (typeof window === 'undefined') return;

  const normalizado: CookieSettings = { ...settings, necessary: true };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(normalizado));
  } catch {
    // Modo privado o cuota llena: el consentimiento sigue aplicándose en memoria
  }

  window.dispatchEvent(
    new CustomEvent<CookieSettings>(CONSENT_CHANGED_EVENT, { detail: normalizado })
  );
}

/** Se suscribe a los cambios de consentimiento. Devuelve la función para cancelar. */
export function onConsentChange(
  callback: (settings: CookieSettings) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (event: Event) => {
    callback((event as CustomEvent<CookieSettings>).detail);
  };

  window.addEventListener(CONSENT_CHANGED_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, handler);
}
