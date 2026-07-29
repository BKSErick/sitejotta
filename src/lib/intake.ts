export interface WebsiteRequestInput {
  name: string;
  phone: string;
  company: string;
  equipment: string;
  website: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export type WebsiteRequestErrors = Partial<Record<keyof WebsiteRequestInput, string>>;

export interface WebsiteRequestValidation {
  success: boolean;
  isBot: boolean;
  errors: WebsiteRequestErrors;
}

function compact(value: unknown): string {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

function digits(value: unknown): string {
  return compact(value).replace(/\D/g, '');
}

export function normalizeWebsiteRequest(
  input: Partial<WebsiteRequestInput>
): WebsiteRequestInput {
  return {
    name: compact(input.name),
    phone: digits(input.phone),
    company: compact(input.company),
    equipment: compact(input.equipment),
    website: compact(input.website),
    source: compact(input.source) || 'website',
    utmSource: compact(input.utmSource),
    utmMedium: compact(input.utmMedium),
    utmCampaign: compact(input.utmCampaign),
  };
}

export function validateWebsiteRequest(
  input: Partial<WebsiteRequestInput>
): WebsiteRequestValidation {
  const request = normalizeWebsiteRequest(input);
  const errors: WebsiteRequestErrors = {};

  if (request.website) {
    return { success: false, isBot: true, errors };
  }

  if (request.name.length < 3) errors.name = 'Informe seu nome completo.';
  if (request.phone.length < 10 || request.phone.length > 13) {
    errors.phone = 'Digite um telefone com DDD.';
  }
  if (request.company.length < 2) errors.company = 'Informe a empresa.';
  if (request.equipment.length < 3) {
    errors.equipment = 'Informe o tipo de equipamento.';
  }

  return {
    success: Object.keys(errors).length === 0,
    isBot: false,
    errors,
  };
}
