import { useEffect, useState } from 'react';

import {
  applyTrackingOverride,
  initializeMetaPixel,
  readTrackingConsent,
  saveTrackingConsent,
} from '../lib/metaPixel';

type ConsentState = 'loading' | 'all' | 'essential' | 'pending' | 'internal';

export function MetaTracking() {
  const [consent, setConsent] = useState<ConsentState>('loading');

  useEffect(() => {
    let cancelled = false;
    const internal = applyTrackingOverride();
    const saved = readTrackingConsent();
    const nextState: ConsentState = internal
      ? 'internal'
      : saved === 'all'
        ? 'all'
        : (saved ?? 'pending');

    if (!internal && saved === 'all') {
      initializeMetaPixel('Jotta Manutenções');
    }

    queueMicrotask(() => {
      if (!cancelled) setConsent(nextState);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  function acceptMeasurement() {
    saveTrackingConsent('all');
    setConsent('all');
    initializeMetaPixel('Jotta Manutenções');
  }

  function keepEssentialOnly() {
    saveTrackingConsent('essential');
    setConsent('essential');
  }

  if (consent !== 'pending') return null;

  return (
    <aside
      aria-label="Preferências de medição"
      aria-live="polite"
      className="tracking-consent"
      role="dialog"
    >
      <div>
        <strong>Medição e cookies</strong>
        <p>
          Podemos usar o Meta Pixel para medir visitas e melhorar nossas
          comunicações. Você pode manter somente os recursos essenciais.
        </p>
        <a href="/cookies/">Ver política de cookies</a>
      </div>
      <div className="tracking-consent__actions">
        <button onClick={keepEssentialOnly} type="button">
          Somente essenciais
        </button>
        <button
          className="tracking-consent__accept"
          onClick={acceptMeasurement}
          type="button"
        >
          Aceitar medição
        </button>
      </div>
    </aside>
  );
}
