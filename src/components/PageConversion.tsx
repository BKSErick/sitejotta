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
      <div className="page-conversion__media" data-parallax="0.08" aria-hidden="true">
        <img src="/media/jotta-oficina.jpg" alt="" width="1600" height="1067" loading="lazy" />
      </div>
      <div className="container page-conversion__inner">
        <div data-reveal="up">
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
