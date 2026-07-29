import { MoveDownRight } from 'lucide-react';

import type { PublicRoute } from '../data/site-content';
import { ArrowLink } from './ArrowLink';

export function HomeHero({ route }: { route: PublicRoute }) {
  return (
    <section className="home-hero">
      <div className="container home-hero__main">
        <div className="home-hero__copy reveal">
          <span className="eyebrow">{route.eyebrow}</span>
          <h1 aria-label={route.heading}>
            <span aria-hidden="true">Manutenção industrial</span>
            <span aria-hidden="true">com método, documentação</span>
            <span aria-hidden="true">e rastreabilidade.</span>
          </h1>
          <p>{route.introduction}</p>
          <div className="home-hero__actions">
            <ArrowLink href="/contato/">Solicitar avaliação técnica</ArrowLink>
            <ArrowLink href="/metodo/" variant="text">
              Conhecer o método
            </ArrowLink>
          </div>
          <dl className="home-hero__facts">
            <div>
              <dt>Origem</dt>
              <dd>João Monlevade · MG</dd>
            </div>
            <div>
              <dt>Experiência</dt>
              <dd>Desde 1994</dd>
            </div>
            <div>
              <dt>Capacidade</dt>
              <dd>07 frentes técnicas</dd>
            </div>
          </dl>
        </div>

        <figure className="home-hero__visual">
          {/* Loop mudo: é o que libera autoplay sem interação em todos os
              navegadores. O poster cobre o primeiro paint. */}
          <video
            aria-label="Trabalho de precisão na bancada da oficina da Jotta"
            autoPlay
            loop
            muted
            playsInline
            poster="/media/hero-oficina.jpg"
            preload="metadata"
          >
            <source src="/media/hero-oficina.mp4" type="video/mp4" />
          </video>
          <figcaption>
            <span>REGISTRO OPERACIONAL</span>
            <strong>OFICINA · JM–01</strong>
          </figcaption>
          <div className="home-hero__visual-note">
            <MoveDownRight aria-hidden="true" />
            <span>
              Diagnóstico
              <br />
              Execução
              <br />
              Evidência
            </span>
          </div>
        </figure>
      </div>

    </section>
  );
}
