export const DISCIPLINES = [
  'talhas-eletricas',
  'lavadoras-industriais',
  'ferrovia',
  'mecanica-industrial',
  'hidraulica-industrial',
  'pneumatica-industrial',
  'eletrica-industrial',
  'nao-tenho-certeza',
] as const;

export const NEED_TYPES = [
  'manutencao-corretiva',
  'manutencao-preventiva',
  'diagnostico',
  'garantia',
  'assistencia-tecnica',
  'homologacao-capacidade',
  'outra',
] as const;

export const OPERATIONAL_CONDITIONS = [
  'equipamento-parado',
  'operacao-restrita',
  'atendimento-planejado',
  'em-avaliacao',
] as const;

export const PREFERRED_CHANNELS = ['whatsapp', 'telefone', 'email'] as const;

export interface WebsiteRequestInput {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  discipline: string;
  equipment: string;
  manufacturer: string;
  model: string;
  needType: string;
  operationalCondition: string;
  description: string;
  preferredChannel: string;
  privacyAccepted: boolean;
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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function compact(value: unknown): string {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

function digits(value: unknown): string {
  return compact(value).replace(/\D/g, '');
}

export function normalizeWebsiteRequest(input: Partial<WebsiteRequestInput>): WebsiteRequestInput {
  return {
    name: compact(input.name),
    company: compact(input.company),
    role: compact(input.role),
    email: compact(input.email).toLowerCase(),
    phone: digits(input.phone),
    location: compact(input.location),
    discipline: compact(input.discipline),
    equipment: compact(input.equipment),
    manufacturer: compact(input.manufacturer),
    model: compact(input.model),
    needType: compact(input.needType),
    operationalCondition: compact(input.operationalCondition),
    description: compact(input.description),
    preferredChannel: compact(input.preferredChannel),
    privacyAccepted: input.privacyAccepted === true,
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
  if (request.company.length < 2) errors.company = 'Informe a empresa.';
  if (request.role.length < 2) errors.role = 'Informe seu cargo ou área.';
  if (!emailPattern.test(request.email)) errors.email = 'Digite um e-mail válido.';
  if (request.phone.length < 10 || request.phone.length > 13) {
    errors.phone = 'Digite um telefone com DDD.';
  }
  if (request.location.length < 3) errors.location = 'Informe a cidade, UF ou unidade.';
  if (!DISCIPLINES.includes(request.discipline as (typeof DISCIPLINES)[number])) {
    errors.discipline = 'Selecione uma área de atuação.';
  }
  if (request.equipment.length < 3) errors.equipment = 'Informe o tipo de equipamento.';
  if (!NEED_TYPES.includes(request.needType as (typeof NEED_TYPES)[number])) {
    errors.needType = 'Selecione o tipo de necessidade.';
  }
  if (
    !OPERATIONAL_CONDITIONS.includes(
      request.operationalCondition as (typeof OPERATIONAL_CONDITIONS)[number]
    )
  ) {
    errors.operationalCondition = 'Selecione a condição operacional.';
  }
  if (request.description.length < 20) {
    errors.description = 'Descreva a necessidade com pelo menos 20 caracteres.';
  }
  if (
    !PREFERRED_CHANNELS.includes(
      request.preferredChannel as (typeof PREFERRED_CHANNELS)[number]
    )
  ) {
    errors.preferredChannel = 'Selecione o canal de retorno.';
  }
  if (!request.privacyAccepted) {
    errors.privacyAccepted = 'Autorize o uso dos dados para enviar a solicitação.';
  }

  return {
    success: Object.keys(errors).length === 0,
    isBot: false,
    errors,
  };
}
