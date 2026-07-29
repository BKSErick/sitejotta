const DEFAULT_PIXEL_ID = '1175331711422463';

export const CONSENT_KEY = 'crm_meta_consent_v1';
export const INTERNAL_OPTOUT_KEY = 'crm_meta_internal_optout_v1';

type Consent = 'all' | 'essential' | null;

type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  push?: MetaPixelFunction;
  queue: unknown[][];
  version?: string;
};

declare global {
  interface Window {
    _fbq?: MetaPixelFunction;
    fbq?: MetaPixelFunction;
  }
}

let pixelInitialized = false;

function storageOrNull() {
  return typeof window === 'undefined' ? null : window.localStorage;
}

export function readTrackingConsent(storage = storageOrNull()): Consent {
  const value = storage?.getItem(CONSENT_KEY);
  return value === 'all' || value === 'essential' ? value : null;
}

export function saveTrackingConsent(
  value: Exclude<Consent, null>,
  storage = storageOrNull()
) {
  storage?.setItem(CONSENT_KEY, value);
}

export function applyTrackingOverride() {
  if (typeof window === 'undefined') return false;

  const url = new URL(window.location.href);
  const disable = url.searchParams.get('crm_no_track') === '1';
  const enable = url.searchParams.get('crm_track') === '1';

  if (disable) {
    window.localStorage.setItem(INTERNAL_OPTOUT_KEY, 'disabled');
  } else if (enable) {
    window.localStorage.removeItem(INTERNAL_OPTOUT_KEY);
  }

  if (url.searchParams.has('crm_no_track') || url.searchParams.has('crm_track')) {
    url.searchParams.delete('crm_no_track');
    url.searchParams.delete('crm_track');
    const search = url.searchParams.toString();
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${search ? `?${search}` : ''}${url.hash}`
    );
  }

  return window.localStorage.getItem(INTERNAL_OPTOUT_KEY) === 'disabled';
}

export function isTrackingAllowed(storage = storageOrNull()) {
  return (
    storage?.getItem(CONSENT_KEY) === 'all' &&
    storage.getItem(INTERNAL_OPTOUT_KEY) !== 'disabled'
  );
}

function createPixelQueue(): MetaPixelFunction {
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
      return;
    }
    fbq.queue.push(args);
  } as MetaPixelFunction;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  return fbq;
}

export function initializeMetaPixel(siteName: string) {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    pixelInitialized ||
    !isTrackingAllowed()
  ) {
    return false;
  }

  const fbq = window.fbq ?? createPixelQueue();
  window.fbq = fbq;
  window._fbq = fbq;

  if (!document.head.querySelector('script[data-crm-meta-pixel]')) {
    const script = document.createElement('script');
    script.async = true;
    script.dataset.crmMetaPixel = 'true';
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  fbq('init', DEFAULT_PIXEL_ID);
  fbq('track', 'PageView');
  fbq('track', 'ViewContent', {
    content_category: 'case_site',
    content_name: siteName,
  });
  pixelInitialized = true;
  return true;
}
