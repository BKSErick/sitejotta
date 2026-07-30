import { ArrowLink } from './ArrowLink';

interface PageConversionProps {
  heading?: string;
  body?: string;
  href?: string;
  cta?: string;
}

export function PageConversion({
  heading = 'O primeiro ganho não é consertar mais rápido. É começar com a pergunta certa.',
  body = 'Deixe seu nome, telefone, empresa e tipo de equipamento. A Jotta usa esses quatro dados para iniciar o contato técnico.',
  href = '/contato/',
  cta = 'Iniciar solicitação técnica',
}: PageConversionProps) {
  return (
    <section className="page-conversion">
      {/* Fundo é degradê + textura, sem foto. Ver --gradient-conversion. */}
      <div className="container page-conversion__inner">
        <div data-reveal-text="">
          <span className="technical-code">PRÓXIMO MOVIMENTO · TRIAGEM</span>
          <h2>{heading}</h2>
        </div>
        <div className="page-conversion__action" data-reveal="up">
          <p>{body}</p>
          <ArrowLink href={href}>{cta}</ArrowLink>
          <small>Sem diagnóstico, prazo ou orçamento automático no envio.</small>
        </div>
      </div>
    </section>
  );
}
