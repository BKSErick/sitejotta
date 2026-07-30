import type { PublicRoute } from '../data/site-content';
import { ArrowLink } from './ArrowLink';

interface PageHeroProps {
  route: PublicRoute;
  cta?: boolean;
  marker?: string;
}

const proofSteps = [
  ['01', 'Entrada', 'Equipamento e condição'],
  ['02', 'Controle', 'Escopo e execução'],
  ['03', 'Saída', 'Teste e registro'],
];

export function PageHero({
  route,
  cta = true,
  marker = 'JM / DOSSIÊ TÉCNICO',
}: PageHeroProps) {
  return (
    <section className={`page-hero page-hero--${route.kind}`}>
      {/* Fundo é degradê + textura, sem foto. Ver --gradient-hero em tokens.css. */}
      <div className="page-hero__shade" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="page-hero__copy" data-reveal-text="">
          <span className="eyebrow">{route.eyebrow}</span>
          <h1>{route.heading}</h1>
          <p>{route.introduction}</p>
          {cta && (
            <div className="page-hero__actions">
              <ArrowLink href="/contato/">Iniciar solicitação técnica</ArrowLink>
              <ArrowLink href="/metodo/" variant="secondary">
                Ver como funciona
              </ArrowLink>
            </div>
          )}
        </div>

        <aside className="page-hero__console" data-reveal="left">
          <div className="page-hero__console-head">
            <span className="technical-code">{marker}</span>
            <i aria-hidden="true" />
          </div>
          <strong>{route.label}</strong>
          <div className="page-hero__proof">
            {proofSteps.map(([number, label, description]) => (
              <div key={label}>
                <span>{number}</span>
                <p>
                  <b>{label}</b>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <div className="page-hero__ticker" aria-hidden="true">
        DIAGNÓSTICO / ESCOPO / EXECUÇÃO / TESTE / DOCUMENTAÇÃO / ENTREGA
      </div>
    </section>
  );
}
