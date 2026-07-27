import { describe, expect, it } from 'vitest';

import worker from './index.js';

const validPayload = {
  name: 'Marina Lopes',
  company: 'Indústria Horizonte',
  role: 'Engenharia',
  email: 'marina@example.com',
  phone: '(31) 99999-0000',
  location: 'João Monlevade/MG',
  discipline: 'hidraulica-industrial',
  equipment: 'Cilindro hidráulico',
  manufacturer: '',
  model: '',
  needType: 'manutencao-corretiva',
  operationalCondition: 'equipamento-parado',
  description: 'O cilindro perdeu força e apresenta vazamento durante a operação.',
  preferredChannel: 'whatsapp',
  privacyAccepted: true,
  website: '',
};

function post(payload) {
  return new Request('https://site.example/api/solicitacoes', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

describe('website intake endpoint', () => {
  it('rejects invalid payloads without calling an integration', async () => {
    const response = await worker.fetch(post({ name: 'A' }), {});
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body.error).toBe('invalid_request');
  });

  it('never simulates persistence when the CRM intake is not configured', async () => {
    const response = await worker.fetch(post(validPayload), {});
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe('intake_not_configured');
    expect(body.protocol).toBeUndefined();
  });

  it('returns a neutral response to honeypot submissions', async () => {
    const response = await worker.fetch(post({ ...validPayload, website: 'spam' }), {});

    expect(response.status).toBe(204);
  });
});
