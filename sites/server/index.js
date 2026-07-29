const MAX_BODY_BYTES = 24_000;
const rateLimit = new Map();

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const compact = (value) =>
  typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
const digits = (value) => compact(value).replace(/\D/g, '');

function normalize(input) {
  return {
    name: compact(input.name),
    company: compact(input.company),
    phone: digits(input.phone),
    equipment: compact(input.equipment),
    website: compact(input.website),
    source: 'website',
    utmSource: compact(input.utmSource),
    utmMedium: compact(input.utmMedium),
    utmCampaign: compact(input.utmCampaign),
  };
}

function isValid(input) {
  return (
    input.name.length >= 3 &&
    input.company.length >= 2 &&
    input.phone.length >= 10 &&
    input.phone.length <= 13 &&
    input.equipment.length >= 3
  );
}

function clientKey(request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

function isRateLimited(request) {
  const key = clientKey(request);
  const now = Date.now();
  const windowStart = now - 60_000;
  const attempts = (rateLimit.get(key) ?? []).filter((time) => time > windowStart);
  attempts.push(now);
  rateLimit.set(key, attempts);
  return attempts.length > 5;
}

async function handleIntake(request, environment) {
  if (request.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405);
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'unsupported_media_type' }, 415);
  }

  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return json({ error: 'payload_too_large' }, 413);
  }

  if (isRateLimited(request)) {
    return json({ error: 'rate_limited' }, 429);
  }

  let raw;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return json({ error: 'payload_too_large' }, 413);
    }
    raw = JSON.parse(body);
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const payload = normalize(raw);

  if (payload.website) {
    return new Response(null, { status: 204 });
  }

  if (!isValid(payload)) {
    return json({ error: 'invalid_request' }, 422);
  }

  if (!environment.JOTTA_INTAKE_URL) {
    return json({ error: 'intake_not_configured' }, 503);
  }

  const headers = {
    'content-type': 'application/json',
    'user-agent': 'jotta-site-intake/1.0',
  };
  if (environment.JOTTA_INTAKE_TOKEN) {
    headers.authorization = `Bearer ${environment.JOTTA_INTAKE_TOKEN}`;
  }

  try {
    const upstream = await fetch(environment.JOTTA_INTAKE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      return json({ error: 'intake_unavailable' }, 502);
    }

    const result = await upstream.json().catch(() => ({}));
    return json({
      accepted: true,
      protocol: typeof result.protocol === 'string' ? result.protocol : undefined,
    });
  } catch {
    return json({ error: 'intake_unavailable' }, 502);
  }
}

const isHtmlRequest = (request) =>
  request.method === 'GET' &&
  (request.headers.get('accept') ?? '').includes('text/html');

async function serveAsset(request, environment) {
  const response = await environment.ASSETS.fetch(request);
  if (response.status !== 404 || !isHtmlRequest(request)) {
    return response;
  }

  const url = new URL(request.url);
  const nestedPath = `${url.pathname.replace(/\/?$/, '/') }index.html`;
  const nestedResponse = await environment.ASSETS.fetch(
    new Request(new URL(nestedPath, request.url), request)
  );

  if (nestedResponse.status !== 404) {
    return nestedResponse;
  }

  return environment.ASSETS.fetch(new Request(new URL('/404.html', request.url), request));
}

export default {
  async fetch(request, environment) {
    const url = new URL(request.url);
    if (url.pathname === '/api/solicitacoes') {
      return handleIntake(request, environment);
    }

    return serveAsset(request, environment);
  },
};
