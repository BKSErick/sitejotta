import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  CONSENT_KEY,
  INTERNAL_OPTOUT_KEY,
  applyTrackingOverride,
  initializeMetaPixel,
  isTrackingAllowed,
} from './metaPixel';

describe('Meta Pixel tracking policy', () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.querySelectorAll('script[data-crm-meta-pixel]').forEach((script) => script.remove());
    window.history.replaceState({}, '', '/?utm_source=whatsapp');
    delete window.fbq;
    vi.restoreAllMocks();
  });

  it('persists internal opt-out before tracking and keeps campaign parameters', () => {
    window.history.replaceState(
      {},
      '',
      '/?utm_source=whatsapp&crm_no_track=1&utm_campaign=crm_erick'
    );

    applyTrackingOverride();

    expect(localStorage.getItem(INTERNAL_OPTOUT_KEY)).toBe('disabled');
    expect(window.location.search).toBe(
      '?utm_source=whatsapp&utm_campaign=crm_erick'
    );
    expect(isTrackingAllowed()).toBe(false);
  });

  it('reactivates the browser without granting measurement consent', () => {
    localStorage.setItem(INTERNAL_OPTOUT_KEY, 'disabled');
    window.history.replaceState({}, '', '/?crm_track=1');

    applyTrackingOverride();

    expect(localStorage.getItem(INTERNAL_OPTOUT_KEY)).toBeNull();
    expect(window.location.search).toBe('');
    expect(isTrackingAllowed()).toBe(false);
  });

  it('allows tracking only after optional consent and outside internal mode', () => {
    localStorage.setItem(CONSENT_KEY, 'all');
    expect(isTrackingAllowed()).toBe(true);

    localStorage.setItem(INTERNAL_OPTOUT_KEY, 'disabled');
    expect(isTrackingAllowed()).toBe(false);
  });

  it('loads the public Pixel once and queues PageView plus ViewContent', () => {
    localStorage.setItem(CONSENT_KEY, 'all');

    expect(initializeMetaPixel('Jotta Manutenções')).toBe(true);
    expect(initializeMetaPixel('Jotta Manutenções')).toBe(false);

    const script = document.head.querySelector<HTMLScriptElement>(
      'script[data-crm-meta-pixel]'
    );
    expect(script?.src).toBe('https://connect.facebook.net/en_US/fbevents.js');
    expect(window.fbq).toBeTypeOf('function');
    expect(window.fbq?.queue).toEqual(
      expect.arrayContaining([
        ['init', '1175331711422463'],
        ['track', 'PageView'],
        [
          'track',
          'ViewContent',
          {
            content_category: 'case_site',
            content_name: 'Jotta Manutenções',
          },
        ],
      ])
    );
  });
});
