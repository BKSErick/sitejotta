import { describe, expect, it } from 'vitest';

import { normalizeWebsiteRequest, validateWebsiteRequest } from './intake';

const validRequest = {
  name: '  Marina Lopes  ',
  phone: ' (31) 99999-0000 ',
  company: ' Indústria Horizonte ',
  equipment: ' Cilindro hidráulico ',
  website: '',
};

describe('website request validation', () => {
  it('accepts and normalizes the four-field technical request', () => {
    const result = validateWebsiteRequest(validRequest);

    expect(result.success).toBe(true);
    expect(normalizeWebsiteRequest(validRequest)).toMatchObject({
      name: 'Marina Lopes',
      phone: '31999990000',
      company: 'Indústria Horizonte',
      equipment: 'Cilindro hidráulico',
    });
  });

  it('rejects an invalid phone and missing equipment', () => {
    const result = validateWebsiteRequest({
      ...validRequest,
      phone: '123',
      equipment: '',
    });

    expect(result.success).toBe(false);
    expect(result.errors.phone).toBeDefined();
    expect(result.errors.equipment).toBeDefined();
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
