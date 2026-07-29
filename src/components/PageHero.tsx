import type { PublicRoute } from '../data/site-content';
import { ArrowLink } from './ArrowLink';

interface PageHeroProps {
  route: PublicRoute;
  cta?: boolean;
  marker?: string;
}

/**
 * Uma imagem por assunto. Antes as dez rotas dividiam duas fotos, o que fazia
 * páginas diferentes abrirem com o mesmo herói. Os registros novos vêm do
 * b-roll real da operação (ver scripts/prepare-footage.mjs).
 */
const routeVisuals: Partial<Record<PublicRoute['kind'], { src: string; position: string }>> = {
  company: { src: '/media/jotta-estrutura-aerea.jpg', position: '50% 46%' },
  solutions: { src: '/media/frames/bancada-ferramenta.jpg', position: '52% 52%' },
  solution: { src: '/media/frames/cilindro-hidraulico.jpg', position: '58% 52%' },
  assistance: { src: '/media/frames/bancada-componente.jpg', position: '46% 54%' },
  method: { src: '/media/frames/oficina-jateamento.jpg', position: '48% 48%' },
  cases: { src: '/media/frames/compressor-oficina.jpg', position: '54% 50%' },
  content: { src: '/media/frames/oficina-geral.jpg', position: '40% 52%' },
  book: { src: '/media/jotta-estrutura-aerea.jpg', position: '50% 52%' },
  contact: { src: '/media/frames/estrutura-externa.jpg', position: '52% 56%' },
  legal: { src: '/media/jotta-oficina.jpg', position: '50% 50%' },
};

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
  const visual = routeVisuals[route.kind] ?? routeVisuals.solution!;

  return (
    <section className={`page-hero page-hero--${route.kind}`}>
      <div className="page-hero__media" data-parallax="0.11">
        <img
          src={visual.src}
          alt="Estrutura operacional da Jotta preparada para manutenção industrial"
          width="1600"
          height="1067"
          style={{ objectPosition: visual.position }}
        />
      </div>
      <div className="page-hero__shade" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="page-hero__copy" data-reveal="up">
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
