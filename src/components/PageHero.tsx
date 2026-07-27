import type { PublicRoute } from '../data/site-content';
import { ArrowLink } from './ArrowLink';

interface PageHeroProps {
  route: PublicRoute;
  cta?: boolean;
  marker?: string;
}

export function PageHero({ route, cta = true, marker = 'JOTTA / DOSSIÊ TÉCNICO' }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="technical-rail" aria-hidden="true">
        <span>01</span>
        <i />
        <span>07</span>
      </div>
      <div className="container page-hero__grid">
        <div className="page-hero__copy reveal">
          <span className="eyebrow">{route.eyebrow}</span>
          <h1>{route.heading}</h1>
          <p>{route.introduction}</p>
          {cta && <ArrowLink href="/contato/">Solicitar avaliação técnica</ArrowLink>}
        </div>
        <div className="page-hero__plate" aria-label="Identificação técnica da página">
          <span className="technical-code">{marker}</span>
          <strong>{route.label}</strong>
          <div className="plate-axis" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className="plate-note">DIAGNÓSTICO · EXECUÇÃO · EVIDÊNCIA</span>
        </div>
      </div>
    </section>
  );
}
