import { describe, expect, it } from 'vitest';

import intakeFunction from './solicitacoes.js';

describe('Vercel intake function', () => {
  it('reuses the validated intake contract', async () => {
    const request = new Request('https://site.example/api/solicitacoes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'A' }),
    });

    const response = await intakeFunction.fetch(request);
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body.error).toBe('invalid_request');
  });
});
