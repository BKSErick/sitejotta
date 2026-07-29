import type { CSSProperties } from 'react';

import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero } from '../components/PageHero';
import { PageConversion } from '../components/PageConversion';
import { SectionHeading } from '../components/SectionHeading';
import type { PublicRoute, Solution } from '../data/site-content';

export function SolutionPage({ route, solution }: { route: PublicRoute; solution: Solution }) {
  return (
    <>
      <Breadcrumbs current={solution.shortName} parent={{ label: 'Soluções', href: '/solucoes/' }} />
      <PageHero route={route} marker={`JM / SOLUÇÃO ${solution.number}`} />
      <section className="section">
        <div className="container split-editorial">
          <SectionHeading
            index="01"
            eyebrow="LEITURA DO EQUIPAMENTO"
            title="O sintoma é o início da investigação, não a conclusão."
          />
          <p className="lead-copy" data-reveal="up">{solution.context}</p>
        </div>
      </section>
      <section className="section section--blueprint">
        <div className="container blueprint-grid">
          <div data-reveal="right">
            <span className="technical-code">APLICAÇÕES RELACIONADAS</span>
            <h2>Equipamentos e conjuntos</h2>
            <ul className="indexed-list">
              {solution.applications.map((item, index) => (
                <li
                  key={item}
                  data-reveal="up"
                  style={{ '--reveal-delay': `${index * 55}ms` } as CSSProperties}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="left">
            <span className="technical-code">SINAIS PARA TRIAGEM</span>
            <h2>Condições observáveis</h2>
            <ul className="indexed-list">
              {solution.warningSigns.map((item, index) => (
                <li
                  key={item}
                  data-reveal="up"
                  style={{ '--reveal-delay': `${index * 55}ms` } as CSSProperties}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container process-band">
          {['Diagnóstico', 'Escopo', 'Execução', 'Teste', 'Registro'].map((item, index) => (
            <div
              key={item}
              data-reveal="up"
              style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>
      <PageConversion
        heading={`Leve o contexto de ${solution.shortName.toLowerCase()} para a triagem.`}
        body="Informe seu contato, sua empresa e o tipo de equipamento. A equipe aprofunda o contexto na conversa."
        href={`/contato/?area=${solution.slug}`}
        cta={solution.cta}
      />
    </>
  );
}
