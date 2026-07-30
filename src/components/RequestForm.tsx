import { Send } from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { findSolution } from '../data/site-content';
import {
  type WebsiteRequestErrors,
  type WebsiteRequestInput,
  validateWebsiteRequest,
} from '../lib/intake';

const emptyRequest: WebsiteRequestInput = {
  name: '',
  phone: '',
  company: '',
  equipment: '',
  website: '',
};

function FieldError({ message }: { message?: string }) {
  return message ? <span className="field-error">{message}</span> : null;
}

export function RequestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState(emptyRequest);
  const [errors, setErrors] = useState<WebsiteRequestErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const validation = useMemo(() => validateWebsiteRequest(data), [data]);

  /**
   * As sete páginas de solução linkam para /contato/?area=<slug>, mas ninguém
   * lia o parâmetro: quem clicava em "talhas elétricas" caía num formulário
   * vazio e tinha que reinformar de onde veio. Preenche o campo de equipamento
   * com o rótulo da disciplina.
   *
   * Em efeito, não na renderização: ler window.location durante o render daria
   * markup diferente do pré-renderizado e quebraria a hidratação.
   */
  useEffect(() => {
    const area = new URLSearchParams(window.location.search).get('area');
    if (!area) return;

    const solution = findSolution(area);
    if (!solution) return;

    // Leitura única de fonte externa (a URL) no mount. Não pode sair da
    // renderização: o SSR não vê a query string, e divergir do markup
    // pré-renderizado reintroduziria a falha de hidratação. Roda uma vez só.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData((current) =>
      current.equipment ? current : { ...current, equipment: solution.shortName }
    );
  }, []);

  const update = (field: keyof WebsiteRequestInput, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validation.success) {
      setErrors(validation.errors);
      const firstInvalid = Object.keys(validation.errors)[0];
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)
          ?.focus();
      });
      return;
    }

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
        <h2>Dados registrados para contato.</h2>
        <p>A equipe recebeu seu nome, telefone, empresa e tipo de equipamento.</p>
        <small>
          O envio não representa diagnóstico, orçamento, prazo confirmado ou
          abertura automática de ordem de serviço.
        </small>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="request-form request-form--compact"
      aria-label="Solicitação técnica"
      noValidate
      onSubmit={submit}
    >
      <header className="request-form__head">
        <div>
          <span className="technical-code">CONTATO DIRETO · 04 DADOS</span>
          <h2>Informe o essencial. A Jotta continua a conversa com você.</h2>
        </div>
        <span className="request-form__status">
          <i aria-hidden="true" />
          Canal de entrada
        </span>
      </header>

      <div className="form-grid request-form__fields">
        <label>
          Nome
          <input
            data-field="name"
            aria-label="Nome"
            autoComplete="name"
            value={data.name}
            onChange={(event) => update('name', event.target.value)}
          />
          <FieldError message={errors.name} />
        </label>
        <label>
          Telefone
          <input
            data-field="phone"
            aria-label="Telefone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(event) => update('phone', event.target.value)}
          />
          <FieldError message={errors.phone} />
        </label>
        <label>
          Empresa
          <input
            data-field="company"
            aria-label="Empresa"
            autoComplete="organization"
            value={data.company}
            onChange={(event) => update('company', event.target.value)}
          />
          <FieldError message={errors.company} />
        </label>
        <label>
          Tipo de equipamento
          <input
            data-field="equipment"
            aria-label="Tipo de equipamento"
            placeholder="Ex.: cilindro hidráulico"
            value={data.equipment}
            onChange={(event) => update('equipment', event.target.value)}
          />
          <FieldError message={errors.equipment} />
        </label>
      </div>

      <label className="honeypot" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </label>

      {status === 'error' && (
        <p className="form-submit-error" role="alert">
          Não foi possível registrar a solicitação. Tente novamente ou utilize um
          dos canais diretos.
        </p>
      )}

      <div className="request-form__actions">
        <p>
          Ao enviar, você autoriza o contato da Jotta sobre esta solicitação.
        </p>
        <button className="button" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar solicitação'}
          <Send aria-hidden="true" size={17} />
        </button>
      </div>
    </form>
  );
}
