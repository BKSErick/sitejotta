import { describe, expect, it } from 'vitest';

import { normalizeWebsiteRequest, validateWebsiteRequest } from './intake';

const validRequest = {
  name: '  Marina Lopes  ',
  company: ' Indústria Horizonte ',
  role: ' Engenharia ',
  email: ' MARINA@EXAMPLE.COM ',
  phone: ' (31) 99999-0000 ',
  location: ' João Monlevade/MG ',
  discipline: 'hidraulica-industrial',
  equipment: ' Cilindro hidráulico ',
  manufacturer: ' Fabricante informado ',
  model: ' CH-200 ',
  needType: 'manutencao-corretiva',
  operationalCondition: 'equipamento-parado',
  description: 'O cilindro perdeu força durante a operação e apresenta vazamento.',
  preferredChannel: 'whatsapp',
  privacyAccepted: true,
  website: '',
};

describe('website request validation', () => {
  it('accepts and normalizes a complete technical request', () => {
    const result = validateWebsiteRequest(validRequest);

    expect(result.success).toBe(true);
    expect(normalizeWebsiteRequest(validRequest)).toMatchObject({
      name: 'Marina Lopes',
      email: 'marina@example.com',
      company: 'Indústria Horizonte',
      phone: '31999990000',
    });
  });

  it('rejects requests without privacy consent', () => {
    const result = validateWebsiteRequest({
      ...validRequest,
      privacyAccepted: false,
    });

    expect(result.success).toBe(false);
    expect(result.errors.privacyAccepted).toBeDefined();
  });

  it('rejects invalid email, phone and short descriptions', () => {
    const result = validateWebsiteRequest({
      ...validRequest,
      email: 'sem-arroba',
      phone: '123',
      description: 'Falhou.',
    });

    expect(result.success).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.phone).toBeDefined();
    expect(result.errors.description).toBeDefined();
  });

  it('silently rejects bots that fill the honeypot', () => {
    const result = validateWebsiteRequest({
      ...validRequest,
      website: 'https://spam.example',
    });

    expect(result.success).toBe(false);
    expect(result.isBot).toBe(true);
  });
});
