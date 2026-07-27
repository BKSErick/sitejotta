import { useMemo, useState } from 'react';

import {
  type WebsiteRequestErrors,
  type WebsiteRequestInput,
  validateWebsiteRequest,
} from '../lib/intake';

const emptyRequest: WebsiteRequestInput = {
  name: '',
  company: '',
  role: '',
  email: '',
  phone: '',
  location: '',
  discipline: '',
  equipment: '',
  manufacturer: '',
  model: '',
  needType: '',
  operationalCondition: '',
  description: '',
  preferredChannel: '',
  privacyAccepted: false,
  website: '',
};

const disciplineOptions = [
  ['talhas-eletricas', 'Talhas elétricas'],
  ['lavadoras-industriais', 'Lavadoras industriais'],
  ['ferrovia', 'Ferrovia'],
  ['mecanica-industrial', 'Mecânica industrial'],
  ['hidraulica-industrial', 'Hidráulica industrial'],
  ['pneumatica-industrial', 'Pneumática industrial'],
  ['eletrica-industrial', 'Elétrica industrial'],
  ['nao-tenho-certeza', 'Não tenho certeza'],
];

const needOptions = [
  ['manutencao-corretiva', 'Manutenção corretiva'],
  ['manutencao-preventiva', 'Manutenção preventiva'],
  ['diagnostico', 'Diagnóstico'],
  ['garantia', 'Garantia'],
  ['assistencia-tecnica', 'Assistência técnica'],
  ['homologacao-capacidade', 'Homologação ou capacidade'],
  ['outra', 'Outra'],
];

const conditionOptions = [
  ['equipamento-parado', 'Equipamento parado'],
  ['operacao-restrita', 'Operação restrita'],
  ['atendimento-planejado', 'Atendimento planejado'],
  ['em-avaliacao', 'Ainda em avaliação'],
];

const firstStepFields: (keyof WebsiteRequestInput)[] = [
  'name',
  'company',
  'role',
  'email',
  'phone',
  'location',
];
const secondStepFields: (keyof WebsiteRequestInput)[] = [
  'discipline',
  'equipment',
  'needType',
  'operationalCondition',
];

function FieldError({ message }: { message?: string }) {
  return message ? <span className="field-error">{message}</span> : null;
}

export function RequestForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(emptyRequest);
  const [errors, setErrors] = useState<WebsiteRequestErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const validation = useMemo(() => validateWebsiteRequest(data), [data]);

  const update = (field: keyof WebsiteRequestInput, value: string | boolean) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateStep = (fields: (keyof WebsiteRequestInput)[]) => {
    const nextErrors = { ...validation.errors };
    fields.forEach((field) => {
      const value = data[field];
      if ((typeof value === 'string' && !value.trim()) || value === false) {
        nextErrors[field] = 'Informe este dado para continuar.';
      }
    });
    const visibleErrors = Object.fromEntries(
      Object.entries(nextErrors).filter(([key]) =>
        fields.includes(key as keyof WebsiteRequestInput)
      )
    );
    setErrors(visibleErrors);
    return Object.keys(visibleErrors).length === 0;
  };

  const next = () => {
    const fields = step === 1 ? firstStepFields : secondStepFields;
    if (validateStep(fields)) setStep((current) => Math.min(3, current + 1));
  };

  const submit = async () => {
    if (!validateStep(['description', 'preferredChannel', 'privacyAccepted'])) return;
    setStatus('sending');

    try {
      const response = await fetch('/api/solicitacoes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('request-failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-status" role="status">
        <span className="eyebrow">SOLICITAÇÃO RECEBIDA</span>
        <h2>Dados registrados para triagem.</h2>
        <p>
          A equipe avaliará a empresa, o equipamento e a condição informada para
          definir o próximo contato.
        </p>
        <small>
          O envio não representa diagnóstico, orçamento, prazo confirmado ou
          abertura automática de ordem de serviço.
        </small>
      </div>
    );
  }

  return (
    <div className="request-form">
      <div className="request-form__progress" aria-label={`Etapa ${step} de 3`}>
        {[1, 2, 3].map((item) => (
          <span key={item} className={item <= step ? 'is-active' : ''}>
            {String(item).padStart(2, '0')}
          </span>
        ))}
      </div>
      <p className="technical-code">Etapa {step} de 3</p>

      {step === 1 && (
        <fieldset>
          <legend>Você e sua empresa</legend>
          <p>Dados para identificar o contato e direcionar o retorno.</p>
          <div className="form-grid">
            <label>
              Nome completo
              <input
                aria-label="Nome completo"
                value={data.name}
                onChange={(event) => update('name', event.target.value)}
              />
              <FieldError message={errors.name} />
            </label>
            <label>
              Empresa
              <input
                aria-label="Empresa"
                value={data.company}
                onChange={(event) => update('company', event.target.value)}
              />
              <FieldError message={errors.company} />
            </label>
            <label>
              Cargo ou área
              <input
                aria-label="Cargo ou área"
                value={data.role}
                onChange={(event) => update('role', event.target.value)}
              />
              <FieldError message={errors.role} />
            </label>
            <label>
              E-mail corporativo
              <input
                aria-label="E-mail corporativo"
                type="email"
                value={data.email}
                onChange={(event) => update('email', event.target.value)}
              />
              <FieldError message={errors.email} />
            </label>
            <label>
              Telefone ou WhatsApp
              <input
                aria-label="Telefone ou WhatsApp"
                type="tel"
                value={data.phone}
                onChange={(event) => update('phone', event.target.value)}
              />
              <FieldError message={errors.phone} />
            </label>
            <label>
              Cidade/UF ou unidade industrial
              <input
                aria-label="Cidade/UF ou unidade industrial"
                value={data.location}
                onChange={(event) => update('location', event.target.value)}
              />
              <FieldError message={errors.location} />
            </label>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>Equipamento e condição</legend>
          <p>Informações para identificar a disciplina e a criticidade.</p>
          <div className="form-grid">
            <label>
              Área de atuação
              <select
                aria-label="Área de atuação"
                value={data.discipline}
                onChange={(event) => update('discipline', event.target.value)}
              >
                <option value="">Selecione</option>
                {disciplineOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.discipline} />
            </label>
            <label>
              Tipo de equipamento
              <input
                value={data.equipment}
                onChange={(event) => update('equipment', event.target.value)}
              />
              <FieldError message={errors.equipment} />
            </label>
            <label>
              Fabricante ou marca
              <input
                value={data.manufacturer}
                onChange={(event) => update('manufacturer', event.target.value)}
              />
            </label>
            <label>
              Modelo ou identificação, se disponível
              <input value={data.model} onChange={(event) => update('model', event.target.value)} />
            </label>
            <label>
              Tipo de necessidade
              <select
                value={data.needType}
                onChange={(event) => update('needType', event.target.value)}
              >
                <option value="">Selecione</option>
                {needOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.needType} />
            </label>
            <label>
              Condição operacional
              <select
                value={data.operationalCondition}
                onChange={(event) => update('operationalCondition', event.target.value)}
              >
                <option value="">Selecione</option>
                {conditionOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <FieldError message={errors.operationalCondition} />
            </label>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>Descreva a necessidade</legend>
          <p>Inclua sintomas, contexto de uso e informações que ajudem na triagem.</p>
          <label>
            Descrição do problema ou necessidade
            <textarea
              rows={6}
              value={data.description}
              onChange={(event) => update('description', event.target.value)}
            />
            <FieldError message={errors.description} />
          </label>
          <div className="form-grid form-grid--channels">
            <label>
              Canal preferido para retorno
              <select
                value={data.preferredChannel}
                onChange={(event) => update('preferredChannel', event.target.value)}
              >
                <option value="">Selecione</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telefone">Telefone</option>
                <option value="email">E-mail</option>
              </select>
              <FieldError message={errors.preferredChannel} />
            </label>
          </div>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={data.privacyAccepted}
              onChange={(event) => update('privacyAccepted', event.target.checked)}
            />
            <span>
              Autorizo a Jotta Manutenções a utilizar estes dados para analisar e
              responder à solicitação, conforme a Política de Privacidade.
            </span>
          </label>
          <FieldError message={errors.privacyAccepted} />
          <label className="honeypot" aria-hidden="true">
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={data.website}
              onChange={(event) => update('website', event.target.value)}
            />
          </label>
        </fieldset>
      )}

      {status === 'error' && (
        <p className="form-submit-error" role="alert">
          Não foi possível registrar a solicitação. Tente novamente ou utilize um
          dos canais diretos abaixo.
        </p>
      )}

      <div className="request-form__actions">
        {step > 1 && (
          <button className="button button--secondary" type="button" onClick={() => setStep(step - 1)}>
            Voltar
          </button>
        )}
        {step < 3 ? (
          <button className="button" type="button" onClick={next}>
            Continuar
          </button>
        ) : (
          <button className="button" type="button" onClick={submit} disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar solicitação técnica'}
          </button>
        )}
      </div>
    </div>
  );
}
